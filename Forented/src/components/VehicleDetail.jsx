import { useState, useMemo, useEffect } from "react";
import { Heart, MapPin, Info, Share2, Maximize2, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Useauth";
import Navbar from "./Navbar";

const API = "http://localhost:5000/api";

// ─── Finance helpers ───────────────────────────────────────────
const FINANCE_PRODUCTS = [
  { value: "360", label: "360° Finance", desc: "Our 360° Finance Plan offers you low monthly payments and a contract term from 24 months to 60 months with an Assured Buyback Value at the end. At the end of your finance contract you will have the following options: Trade-in your vehicle, Refinance your principal outstanding - equal to Assured Buyback Value, Return your vehicle, Keep your vehicle." },
  { value: "emi", label: "Standard EMI", desc: "Simple monthly instalment plan with fixed interest rate over the selected loan term." },
];
const LOAN_TERMS    = [24, 36, 48, 60];
const DOWN_PAYMENTS = [10, 15, 20, 25, 30];
const MILEAGES      = [5000, 10000, 15000, 20000];
const BUYBACK_RATE  = { 24: 0.60, 36: 0.55, 48: 0.51, 60: 0.45 };
const INTEREST_RATE = 0.089;

function formatINR(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function CustomSelect({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => String(o.value) === String(value));
  return (
    <div>
      {label && <p className="text-xs text-gray-500 mb-2">{label}</p>}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full border border-gray-300 px-5 py-4 flex items-center justify-between text-sm text-gray-800 hover:border-gray-500 transition"
        >
          <span>{selected?.label ?? value}</span>
          <ChevronDown size={16} className={`transition ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg z-50">
            {options.map(opt => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`block w-full text-left px-5 py-3 text-sm hover:bg-gray-50 ${String(opt.value) === String(value) ? "font-semibold" : ""}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FinanceSection({ price }) {
  const exShowroom = parseFloat(String(price).replace(/[₹,]/g, "")) || 6150000;
  const [product,  setProduct]  = useState("360");
  const [loanTerm, setLoanTerm] = useState(48);
  const [downPct,  setDownPct]  = useState(20);
  const [mileage,  setMileage]  = useState(10000);

  const calc = useMemo(() => {
    const downAmt    = exShowroom * (downPct / 100);
    const financeAmt = exShowroom - downAmt;
    const r          = INTEREST_RATE / 12;
    const n          = loanTerm;
    const buybackVal = exShowroom * (BUYBACK_RATE[loanTerm] || 0.51);
    let emi;
    if (product === "360") {
      emi = (financeAmt * r - buybackVal * r / Math.pow(1 + r, n)) / (1 - Math.pow(1 + r, -n));
    } else {
      emi = financeAmt * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    }
    return { downAmt, financeAmt, emi, buybackVal };
  }, [product, loanTerm, downPct, mileage, exShowroom]);

  const selectedProduct = FINANCE_PRODUCTS.find(p => p.value === product);

  return (
    <div className="px-16 py-12 border-t border-gray-200 w-full">
      <h2 className="text-3xl font-light tracking-wide text-gray-900 mb-1">BMW FINANCE</h2>
      <p className="text-sm text-gray-500 mb-6">Select your financial product</p>
      <CustomSelect value={product} options={FINANCE_PRODUCTS} onChange={setProduct} />
      <p className="text-sm text-gray-500 leading-relaxed mt-5 mb-8">{selectedProduct?.desc}</p>
      <div className="space-y-6">
        <CustomSelect label="Loan Term" value={loanTerm} options={LOAN_TERMS.map(t => ({ value: t, label: `${t} months` }))} onChange={v => setLoanTerm(Number(v))} />
        <CustomSelect label="Down payment Percentage" value={downPct} options={DOWN_PAYMENTS.map(d => ({ value: d, label: `${d}%` }))} onChange={v => setDownPct(Number(v))} />
        <CustomSelect label="Annual Mileage" value={mileage} options={MILEAGES.map(m => ({ value: m, label: m.toLocaleString("en-IN") }))} onChange={v => setMileage(Number(v))} />
      </div>
      <div className="mt-10 border-t-2 border-gray-900 pt-5 flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-900">Monthly Instalment of</p>
        <p className="text-2xl font-light text-gray-900">{formatINR(calc.emi)}</p>
      </div>
      <div className="border-b border-gray-200 mb-8" />
      <div className="grid grid-cols-3 gap-x-8 gap-y-6">
        <div><p className="text-xs text-gray-500 mb-1">Ex-Showroom Price</p><p className="text-base font-light">{formatINR(exShowroom)}</p></div>
        <div><p className="text-xs text-gray-500 mb-1">Loan Term</p><p className="text-base font-light">{loanTerm} months</p></div>
        <div><p className="text-xs text-gray-500 mb-1">Down payment Percentage</p><p className="text-base font-light">{downPct}%</p></div>
        <div><p className="text-xs text-gray-500 mb-1">Annual Mileage</p><p className="text-base font-light">{mileage.toLocaleString("en-IN")}</p></div>
        <div><p className="text-xs text-gray-500 mb-1">Down payment Amount</p><p className="text-base font-light">{formatINR(calc.downAmt)}</p></div>
        <div><p className="text-xs text-gray-500 mb-1">Finance Amount</p><p className="text-base font-light">{formatINR(calc.financeAmt)}</p></div>
        {product === "360" && (
          <div>
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">Assured Buyback Value <Info size={11} /></div>
            <p className="text-base font-light">{formatINR(calc.buybackVal)}</p>
          </div>
        )}
        <div><p className="text-xs text-gray-500 mb-1">Monthly Instalment</p><p className="text-base font-light">{formatINR(calc.emi)}</p></div>
      </div>
      <div className="mt-12 text-xs text-gray-400 leading-relaxed space-y-2">
        <p>1 T&Cs apply. Any information provided regarding finance products are subject to change and/or may be amended at any time.</p>
        <p>2 BMW Group India entities or the Authorized Dealer shall not be responsible/liable to compensate for the difference in the prices.</p>
        <p>3 Assured buyback value is based on your selection of vehicle model, variant, loan tenure, annual mileage and vehicle manufacturing year.</p>
      </div>
    </div>
  );
}

// ─── Main VehicleDetail ────────────────────────────────────────
export default function VehicleDetail({ vehicle, currentIndex, total, onPrev, onNext }) {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [imgIndex, setImgIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [showFinance, setShowFinance] = useState(false);

  const images = vehicle?.images?.length ? vehicle.images : [vehicle?.img];

  // Check wishlist status on mount
  useEffect(() => {
    if (!vehicle) return;
    const token = getToken();
    if (!token) return;
    fetch(`${API}/wishlist`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        const isLiked = data.vehicles?.some(v => v.vehicleId === vehicle.id);
        setLiked(isLiked);
      })
      .catch(() => {});
  }, [vehicle?.id]);

  const handleHeart = async () => {
    if (likeLoading || !vehicle) return;
    setLikeLoading(true);
    const token = getToken();
    try {
      if (!liked) {
        await fetch(`${API}/wishlist`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            vehicleId: vehicle.id, name: vehicle.name, img: vehicle.img,
            price: vehicle.price, emi: vehicle.emi, fuel: vehicle.fuel,
            transmission: vehicle.transmission, performance: vehicle.performance,
            dealer: vehicle.dealer, tag: vehicle.tag,
          }),
        });
        setLiked(true);
      } else {
        await fetch(`${API}/wishlist/${vehicle.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        setLiked(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLikeLoading(false);
    }
  };

  if (!vehicle) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Vehicle not found.{" "}
        <button onClick={() => navigate("/vehiclefinder")} className="ml-2 underline">Go back</button>
      </div>
    );
  }

  return (
  
    <div className="min-h-screen bg-white">
      <Navbar staticPos={true}/>
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-700 hover:text-black transition">
          <ChevronLeft size={16} /> Back
        </button>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <button onClick={onPrev}><ChevronLeft size={18} /></button>
          <span>{currentIndex} / {total}</span>
          <button onClick={onNext}><ChevronRight size={18} /></button>
        </div>
        <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition">
          <Share2 size={16} /> Share
        </button>
      </div>

      {/* IMAGE + INFO */}
      <div className="flex h-[calc(100vh-65px)]">
        {/* LEFT */}
        <div className="flex-1 relative flex items-center justify-center bg-white px-16">
          <div className="absolute top-4 right-6 flex items-center gap-3 text-gray-500">
            <button className="text-xs border border-gray-400 rounded-full px-1.5 py-0.5 hover:text-black">360°</button>
            <button className="hover:text-black"><Maximize2 size={18} /></button>
          </div>
          <button onClick={() => setImgIndex(i => (i - 1 + images.length) % images.length)} className="absolute left-4 text-gray-400 hover:text-black">
            <ChevronLeft size={32} />
          </button>
          <img src={images[imgIndex]} alt={vehicle.name} className="max-h-[420px] object-contain w-full" onError={e => { e.target.style.display = "none"; }} />
          <button onClick={() => setImgIndex(i => (i + 1) % images.length)} className="absolute right-4 text-gray-400 hover:text-black">
            <ChevronRight size={32} />
          </button>
          <div className="absolute bottom-6 flex gap-2">
            {images.map((_, i) => (
              <button key={i} onClick={() => setImgIndex(i)} className={`w-2.5 h-2.5 rounded-full transition ${i === imgIndex ? "bg-gray-900" : "bg-gray-300"}`} />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-[420px] shrink-0 border-l border-gray-100 px-10 py-8 overflow-y-auto">
          <h1 className="text-2xl font-light text-gray-900 mb-1">{vehicle.name}</h1>
          <p className="text-xs text-gray-400 mb-4">VIN: {vehicle.vin ?? "—"} &nbsp;/&nbsp; CAR-ID: {vehicle.carId ?? "—"}</p>
          <span className="text-xs font-bold border border-gray-300 px-2 py-0.5 text-gray-800">{vehicle.tag}</span>

          <div className="flex gap-6 mt-6 mb-2">
            <div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">Monthly Cost <Info size={11} /></div>
              <p className="text-2xl font-light text-gray-900">{vehicle.emi}</p>
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">Price Information <Info size={11} /></div>
              <p className="text-2xl font-light text-gray-900">{vehicle.price}</p>
            </div>
          </div>

          <button
            onClick={() => setShowFinance(!showFinance)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-black mb-6 underline underline-offset-2"
          >
            ⊟ Adjust instalment
          </button>

          <div className="flex items-start gap-2 text-sm text-gray-600 mb-8">
            <MapPin size={15} className="mt-0.5 shrink-0" />
            <span>{vehicle.dealer}</span>
          </div>

          <button onClick={() => navigate("/reserve", { state: { vehicle } })} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-sm font-semibold transition mb-3">
            Reserve Vehicle
          </button>

          {/* Book a Test Drive → navigate to /testdrive with vehicle state */}
          <button
            onClick={() => navigate("/testdrive", { state: { vehicle } })}
            className="w-full border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white py-4 text-sm font-semibold transition mb-4"
          >
            Book a Test Drive
          </button>

          {/* Heart — wishlist toggle */}
          <button
            onClick={handleHeart}
            disabled={likeLoading}
            className="flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-black transition"
          >
            <Heart
              size={16}
              strokeWidth={1.5}
              className={`transition ${liked ? "fill-black text-black" : ""} ${likeLoading ? "opacity-50" : ""}`}
            />
            {liked ? "Saved in favorites" : "Save in favorites"}
          </button>
        </div>
      </div>

      {/* FINANCE SECTION */}
      {showFinance && <FinanceSection price={vehicle.price} />}
    </div>
  );
}