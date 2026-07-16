import { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MapPin, Info } from "lucide-react";
import { useAuth } from "../context/Useauth";

const API = "http://localhost:5000/api";

const VehicleCard = memo(({ vehicle, index }) => {
  const [liked, setLiked] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const images = vehicle.images || [vehicle.img];

  // Check if already in wishlist on mount
  useEffect(() => {
    const token = getToken();
    if (!token) return;
    fetch(`${API}/wishlist`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        const isLiked = data.vehicles?.some(v => v.vehicleId === vehicle.id);
        setLiked(isLiked);
      })
      .catch(() => {});
  }, [vehicle.id]);

  const handleHeart = async () => {
    if (loading) return;
    setLoading(true);
    const token = getToken();

    try {
      if (!liked) {
        // Add to wishlist
        await fetch(`${API}/wishlist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            vehicleId:    vehicle.id,
            name:         vehicle.name,
            img:          vehicle.img,
            price:        vehicle.price,
            emi:          vehicle.emi,
            fuel:         vehicle.fuel,
            transmission: vehicle.transmission,
            performance:  vehicle.performance,
            dealer:       vehicle.dealer,
            tag:          vehicle.tag,
          }),
        });
        setLiked(true);
      } else {
        // Remove from wishlist
        await fetch(`${API}/wishlist/${vehicle.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        setLiked(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 flex flex-col">
      {/* Image + Heart */}
      <div className="relative bg-gray-50 flex items-center justify-center h-52">
        <button onClick={handleHeart} className="absolute top-4 right-4 z-10" disabled={loading}>
          <Heart
            size={22}
            strokeWidth={1.5}
            className={`transition ${liked ? "fill-black text-black" : "text-gray-500"} ${loading ? "opacity-50" : ""}`}
          />
        </button>
        <img
          src={images[imgIndex]}
          alt={vehicle.name}
          loading={index < 3 ? "eager" : "lazy"}
          className="h-40 object-contain"
          onError={(e) => { e.target.style.display = "none"; }}
        />
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 py-2">
        {images.map((_, i) => (
          <button key={i} onClick={() => setImgIndex(i)}
            className={`w-2 h-2 rounded-full transition ${i === imgIndex ? "bg-gray-900" : "bg-gray-300"}`}
          />
        ))}
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
            <div className="flex items-center gap-1 text-xs text-gray-500">Monthly Instalment <Info size={11} /></div>
            <p className="text-base font-bold text-gray-900">{vehicle.emi}</p>
          </div>
          <div className="border-l border-gray-200 pl-4">
            <div className="flex items-center gap-1 text-xs text-gray-500">Price Information <Info size={11} /></div>
            <p className="text-base font-bold text-gray-900">{vehicle.price}</p>
          </div>
        </div>

        {/* Fuel + Transmission */}
        <div className="flex gap-6 py-1">
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl">⊗</span>
            <span className="text-xs text-gray-500">{vehicle.fuel}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl">⊞</span>
            <span className="text-xs text-gray-500">{vehicle.transmission}</span>
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

        {/* CTA */}
        <button
          onClick={() => navigate(`/vehicledetail/${vehicle.id}`)}
          className="w-full border border-gray-900 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition mt-1"
        >
          Show vehicle details
        </button>
      </div>
    </div>
  );
});

export default VehicleCard;