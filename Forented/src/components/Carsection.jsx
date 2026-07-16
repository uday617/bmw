import { memo } from "react";
import CarCard from "./CarCard";

const CarSection = memo(({ icon, title, cars }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 bg-gray-100 px-6 py-4 mb-6">
      <span className="text-xl">{icon}</span>
      <h2 className="text-base font-light text-gray-800">
        {title} <span className="text-gray-500">({cars.length})</span>
      </h2>
    </div>
    <div className="grid grid-cols-3 gap-4">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  </div>
));

export default CarSection;