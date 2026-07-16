import { useState, useMemo } from "react";
import Navbar from "../components/Navbar.jsx";
import VehicleCard from "../components/VehicleCard.jsx";
import Footer from "../components/Footer.jsx";
import { ChevronDown } from "lucide-react";
import { ALL_VEHICLES, MODELS, FUELS, SORTS } from "../data/vehicleData.js";

const PAGE_SIZE = 10;

export default function VehicleFinder() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [model, setModel] = useState("All");
  const [fuel, setFuel] = useState("All");
  const [sort, setSort] = useState(SORTS[0]);
  const [openFilter, setOpenFilter] = useState(null);

  const filtered = useMemo(() => {
    let list = [...ALL_VEHICLES];
    if (model !== "All") list = list.filter(v => v.name.includes(model));
    if (fuel !== "All") list = list.filter(v => v.fuel === fuel);
    if (sort === "Price: Low to High") list.sort((a, b) => parseFloat(a.price.replace(/[₹,.]/g, "")) - parseFloat(b.price.replace(/[₹,.]/g, "")));
    if (sort === "Price: High to Low") list.sort((a, b) => parseFloat(b.price.replace(/[₹,.]/g, "")) - parseFloat(a.price.replace(/[₹,.]/g, "")));
    return list;
  }, [model, fuel, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const toggle = (name) => setOpenFilter(prev => prev === name ? null : name);

  return (
    <div className="min-h-screen bg-white">
      <Navbar dark={true} />

      <div className="pt-24 px-10 max-w-7xl mx-auto">
        <h1 className="text-3xl font-light text-gray-900 mb-6">BMW Vehicle Finder</h1>
        <hr className="border-gray-200 mb-6" />

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-6 relative">
          <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 text-sm font-medium">
            Advanced Search ▽
          </button>

          {/* Model Filter */}
          <div className="relative">
            <button onClick={() => toggle("model")} className="flex items-center gap-2 border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:border-gray-600 transition">
              <ChevronDown size={14} /> Model
            </button>
            {openFilter === "model" && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg z-50 w-48 max-h-60 overflow-y-auto">
                {MODELS.map(m => (
                  <button key={m} onClick={() => { setModel(m); toggle("model"); setVisibleCount(PAGE_SIZE); }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${model === m ? "font-semibold" : ""}`}>
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Fuel Filter */}
          <div className="relative">
            <button onClick={() => toggle("fuel")} className="flex items-center gap-2 border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:border-gray-600 transition">
              <ChevronDown size={14} /> Fuel Type
            </button>
            {openFilter === "fuel" && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 shadow-lg z-50 w-40">
                {FUELS.map(f => (
                  <button key={f} onClick={() => { setFuel(f); toggle("fuel"); setVisibleCount(PAGE_SIZE); }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${fuel === f ? "font-semibold" : ""}`}>
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:border-gray-600 transition">
            <ChevronDown size={14} /> Exterior Colors
          </button>
          <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:border-gray-600 transition">
            <ChevronDown size={14} /> Dealer & Location
          </button>
        </div>

        {/* Sort Bar */}
        <div className="bg-gray-100 mb-6">
          <select
            value={sort}
            onChange={e => { setSort(e.target.value); setVisibleCount(PAGE_SIZE); }}
            className="w-full max-w-md bg-transparent px-4 py-3 text-sm text-gray-700 cursor-pointer border-none outline-none"
          >
            {SORTS.map(s => <option key={s}>Sort by {s}</option>)}
          </select>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {visible.map(v => <VehicleCard key={v.id} vehicle={v} />)}
        </div>

        {/* Show More */}
        <div className="flex flex-col items-center gap-4 pb-16">
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm text-gray-500">{Math.min(visibleCount, filtered.length)} of {filtered.length} vehicles</p>
            <div className="w-32 h-1 bg-gray-200 rounded">
              <div
                className="h-1 bg-gray-800 rounded transition-all duration-500"
                style={{ width: `${(Math.min(visibleCount, filtered.length) / filtered.length) * 100}%` }}
              />
            </div>
          </div>
          {hasMore && (
            <button
              onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
              className="w-full max-w-xl border border-gray-400 py-4 text-sm text-gray-800 hover:bg-gray-900 hover:text-white transition"
            >
              Show more
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}