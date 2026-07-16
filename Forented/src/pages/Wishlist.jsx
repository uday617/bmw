import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Car, Heart, MapPin, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/Useauth";

const API = "http://localhost:5000/api";

export default function Wishlist() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch wishlist from backend
  useEffect(() => {
    fetch(`${API}/wishlist`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(r => r.json())
      .then(data => setWishlist(data.vehicles || []))
      .catch(() => setWishlist([]))
      .finally(() => setLoading(false));
  }, []);

  // Remove from wishlist
  const handleRemove = async (vehicleId) => {
    try {
      await fetch(`${API}/wishlist/${vehicleId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setWishlist(prev => prev.filter(v => v.vehicleId !== vehicleId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f2f2f2]">
        <Navbar dark={true} />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-400 text-sm">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <Navbar dark={true} />

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen gap-8">
          <Car size={64} strokeWidth={1} className="text-gray-700" />
          <p className="text-2xl font-light text-gray-800 tracking-wide text-center uppercase">
            Your Wishlist is Empty.<br />Add Your Favourites.
          </p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => navigate("/configurator")}
              className="px-10 py-4 border border-gray-800 text-gray-800 text-sm font-semibold hover:bg-gray-800 hover:text-white transition"
            >
              Configure vehicle
            </button>
            <button
              onClick={() => navigate("/vehiclefinder")}
              className="px-10 py-4 border border-gray-800 text-gray-800 text-sm font-semibold hover:bg-gray-800 hover:text-white transition"
            >
              Find new vehicle
            </button>
          </div>
        </div>
      ) : (
        <div className="pt-28 px-10 pb-16 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-light text-gray-900">My Wishlist</h1>
            <p className="text-sm text-gray-500">{wishlist.length} vehicle{wishlist.length > 1 ? "s" : ""}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map(vehicle => (
              <div key={vehicle.vehicleId} className="bg-white border border-gray-200 flex flex-col">
                {/* Image */}
                <div className="relative bg-gray-50 flex items-center justify-center h-52">
                  <button
                    onClick={() => handleRemove(vehicle.vehicleId)}
                    className="absolute top-4 right-4 z-10 group"
                    title="Remove from wishlist"
                  >
                    <Heart
                      size={22}
                      strokeWidth={1.5}
                      className="fill-black text-black group-hover:fill-red-500 group-hover:text-red-500 transition"
                    />
                  </button>
                  <img
                    src={vehicle.img}
                    alt={vehicle.name}
                    className="h-40 object-contain"
                    onError={e => { e.target.style.display = "none"; }}
                  />
                </div>

                {/* Info */}
                <div className="px-5 pb-5 flex flex-col gap-3">
                  <h3 className="text-xl font-light text-gray-900">{vehicle.name}</h3>
                  <span className="text-xs font-bold text-gray-800 border border-gray-300 px-2 py-0.5 w-fit">
                    {vehicle.tag}
                  </span>

                  {/* Price */}
                  <div className="flex gap-4 border-b border-gray-100 pb-3">
                    <div>
                      <p className="text-xs text-gray-500">Monthly Instalment</p>
                      <p className="text-base font-bold text-gray-900">{vehicle.emi}</p>
                    </div>
                    <div className="border-l border-gray-200 pl-4">
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="text-base font-bold text-gray-900">{vehicle.price}</p>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="text-xs text-gray-500 space-y-0.5 border-b border-gray-100 pb-3">
                    <p>Performance {vehicle.performance}</p>
                    <p>Fuel Type {vehicle.fuel}</p>
                  </div>

                  {/* Dealer */}
                  <div className="flex items-start gap-1 text-xs text-gray-500">
                    <MapPin size={13} className="mt-0.5 shrink-0" />
                    <span>{vehicle.dealer}</span>
                  </div>

                  {/* Buttons */}
                  <button
                    onClick={() => navigate(`/vehicledetail/${vehicle.vehicleId}`)}
                    className="w-full border border-gray-900 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition mt-1"
                  >
                    Show vehicle details
                  </button>
                  <button
                    onClick={() => handleRemove(vehicle.vehicleId)}
                    className="w-full flex items-center justify-center gap-2 py-2 text-sm text-red-400 hover:text-red-600 transition"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}