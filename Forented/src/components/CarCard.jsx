import { Info, Zap, PlugZap, Droplets } from "lucide-react";
import { memo } from "react";

const FuelIcon = memo(({ fuel }) => {
  if (fuel === "Electric") return <Zap size={18} className="text-blue-500" />;
  if (fuel === "Hybrid") return <PlugZap size={18} className="text-blue-500" />;
  return <Droplets size={18} className="text-gray-500" />;
});

const MBadge = memo(() => (
  <div className="flex items-center">
    <span className="italic font-black text-lg leading-none text-[#1C69D4] tracking-[-4px]">/</span>
    <span className="italic font-black text-lg leading-none text-[#113d7a] tracking-[-4px]">/</span>
    <span className="italic font-black text-lg leading-none text-[#E30613] tracking-[-4px]">/</span>
    <span className="font-bold text-sm ml-0.5">M</span>
  </div>
));

const CarCard = memo(({ car }) => {
  const isColored = car.fuel === "Electric" || car.fuel === "Hybrid";

  return (
    <div className="bg-white border border-gray-200 p-5 flex flex-col cursor-pointer hover:shadow-md transition">
      {/* Badges */}
      <div className="flex gap-2 mb-1">
        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5">{car.type}</span>
        {car.badge && (
          <span className="text-xs bg-gray-800 text-white px-2 py-0.5">{car.badge}</span>
        )}
      </div>

      {/* Name */}
      <h3 className="text-2xl font-light text-gray-900 mt-1">{car.name}</h3>
      <p className="text-sm text-gray-500 mb-3">{car.sub}</p>

      {/* Image area */}
      <div className="relative flex-1 min-h-[160px] flex items-end">
        <div className="absolute left-0 bottom-4 w-12 h-12 rounded-full border-2 border-blue-500 flex items-center justify-center bg-white z-10">
          <FuelIcon fuel={car.fuel} />
        </div>
        <img
          src={car.img}
          alt={car.name}
          loading="lazy"
          className="w-full object-contain max-h-40"
          onError={(e) => { e.target.style.display = "none"; }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div>
          <p className={`text-sm ${isColored ? "text-blue-600" : "text-gray-500"}`}>{car.fuel}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-gray-900">From {car.price}</p>
            <Info size={14} className="text-gray-400" />
          </div>
        </div>
        {car.isM && <MBadge />}
      </div>
    </div>
  );
});

export default CarCard;