import { useState } from "react";
import Navbar from "../components/Navbar";
import CarSection from "../components/CarSection";
import { ChevronDown } from "lucide-react";
import Footer from "../components/Footer";

const cars = {
  electric: [
    { id: 1, type: "SUV", badge: "New", name: "iX", sub: "Models", fuel: "Electric", price: "₹1,39,50,000", isM: false, img: "/cars/ix.png" },
    { id: 2, type: "SUV", badge: "New", name: "iX1 LWB", sub: "Models", fuel: "Electric", price: "₹50,90,000", isM: false, img: "/cars/ix1.png" },
    { id: 3, type: "Sedan", badge: null, name: "i7", sub: "Models", fuel: "Electric", price: "₹2,05,00,000", isM: false, img: "/cars/i7.png" },
    { id: 4, type: "Sedan", badge: null, name: "i7", sub: "M Model", fuel: "Electric", price: "₹2,58,00,000", isM: true, img: "/cars/i7m.png" },
    { id: 5, type: "Sedan", badge: null, name: "i5", sub: "M Model", fuel: "Electric", price: "₹1,19,50,000", isM: true, img: "/cars/i5.png" },
  ],
  hybrid: [
    { id: 6, type: "SUV", badge: null, name: "XM", sub: "Models", fuel: "Hybrid", price: "₹2,54,55,000", isM: true, img: "/cars/xm.png" },
    { id: 7, type: "Sedan", badge: null, name: "M5", sub: "Models", fuel: "Hybrid", price: "₹2,05,00,000", isM: true, img: "/cars/m5.png" },
  ],
  petrol: [
    { id: 8, type: "SUV", badge: null, name: "X7", sub: "Models", fuel: "Petrol", price: "₹1,28,00,000", isM: false, img: "/cars/x7.png" },
    { id: 9, type: "SUV", badge: null, name: "X5", sub: "Models", fuel: "Petrol", price: "₹95,40,000", isM: false, img: "/cars/x5.png" },
    { id: 10, type: "SUV", badge: "New", name: "X3", sub: "Models", fuel: "Petrol", price: "₹74,50,000", isM: false, img: "/cars/x3new.png" },
    { id: 11, type: "SUV", badge: null, name: "X3", sub: "Models", fuel: "Petrol", price: "₹72,50,000", isM: false, img: "/cars/x3.png" },
    { id: 12, type: "SUV", badge: null, name: "X1", sub: "Models", fuel: "Petrol", price: "₹50,90,000", isM: false, img: "/cars/x1.png" },
    { id: 13, type: "Coupé", badge: null, name: "M8", sub: "Models", fuel: "Petrol", price: "₹2,38,40,000", isM: true, img: "/cars/m8.png" },
    { id: 14, type: "Sedan", badge: null, name: "7 series", sub: "Models", fuel: "Petrol", price: "₹1,72,00,000", isM: false, img: "/cars/7series.png" },
    { id: 15, type: "Sedan", badge: null, name: "5 LWB", sub: "Models", fuel: "Petrol", price: "₹72,90,000", isM: false, img: "/cars/5lwb.png" },
    { id: 16, type: "Coupé", badge: null, name: "M4", sub: "Models", fuel: "Petrol", price: "₹1,49,00,000", isM: true, img: "/cars/m4.png" },
  ],
  diesel: [
    { id: 17, type: "SUV", badge: null, name: "X5", sub: "Models", fuel: "Diesel", price: "₹93,90,000", isM: false, img: "/cars/x5.png" },
    { id: 18, type: "SUV", badge: null, name: "X7", sub: "Models", fuel: "Diesel", price: "₹1,26,00,000", isM: false, img: "/cars/x7.png" },
    { id: 19, type: "Sedan", badge: null, name: "5 Series", sub: "Models", fuel: "Diesel", price: "₹68,90,000", isM: false, img: "/cars/5series.png" },
    { id: 20, type: "SUV", badge: null, name: "X3", sub: "Models", fuel: "Diesel", price: "₹71,00,000", isM: false, img: "/cars/x3.png" },
  ],
};

export default function Configurator() {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sort, setSort] = useState("Default");

  return (
    <div className="min-h-screen bg-white">
      <Navbar dark={true} />

      <div className="pt-24 px-10 max-w-7xl mx-auto">
        <h1 className="text-3xl font-light text-gray-900 mb-8">BMW configurator</h1>

        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setCategoryOpen(!categoryOpen)}
            className="flex items-center gap-2 border border-gray-400 px-4 py-2 text-sm text-gray-700 hover:border-gray-700 transition"
          >
            <ChevronDown size={16} className={`transition ${categoryOpen ? "rotate-180" : ""}`} />
            Categories
          </button>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-300 px-4 py-2 text-sm text-gray-700 cursor-pointer"
          >
            <option>Default</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        <CarSection icon="⚡" title="Full electric" cars={cars.electric} />
        <CarSection icon="🔌" title="Plug-in hybrid" cars={cars.hybrid} />
        <CarSection icon="⛽" title="Petrol" cars={cars.petrol} />
        <CarSection icon="🛢️" title="Diesel" cars={cars.diesel} />
      </div>
      <Footer/>
    </div>
  );
}