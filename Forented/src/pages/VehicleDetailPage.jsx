import { useParams, useNavigate } from "react-router-dom";
import { ALL_VEHICLES } from "../data/vehicleData.js";
import VehicleDetail from "../components/VehicleDetail";
import Footer from "../components/Footer.jsx";

export default function VehicleDetailPage() {                 
  const { id } = useParams();
  const navigate = useNavigate();

  const currentIdx = ALL_VEHICLES.findIndex(v => v.id === Number(id));
  const vehicle = ALL_VEHICLES[currentIdx];

  // Vehicle not found guard
  if (!vehicle) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Vehicle not found.{" "}
        <button onClick={() => navigate("/vehiclefinder")} className="ml-2 underline">
          Go back
        </button>
      </div>
    );
  }

  const goPrev = () => {
    const prevId = ALL_VEHICLES[(currentIdx - 1 + ALL_VEHICLES.length) % ALL_VEHICLES.length].id;
    navigate(`/vehicle/${prevId}`);
  };

  const goNext = () => {
    const nextId = ALL_VEHICLES[(currentIdx + 1) % ALL_VEHICLES.length].id;
    navigate(`/vehicle/${nextId}`);
  };

  return (
    <div>
    <VehicleDetail
      vehicle={vehicle}
      currentIndex={currentIdx + 1}
      total={ALL_VEHICLES.length}
      onPrev={goPrev}
      onNext={goNext}
    />
    <Footer/>
    </div>
  );
}