import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronDown, CreditCard, Lock, Pencil, Phone } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Useauth";
import Navbar from "../components/Navbar";

// ─── Helpers ──────────────────────────────────────────────────
function formatINR(n) {
  return "₹ " + Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 });
}

const STEPS = ["Personal Details", "Finance", "Order Deposit", "Overview"];

// ─── Progress Header ──────────────────────────────────────────
function StepHeader({ step, vehicle }) {
  const [collapsed, setCollapsed] = useState(false);
  const price = parseFloat(String(vehicle?.price ?? "6150000").replace(/[₹,]/g, "")) || 6150000;

  return (
    <>
      <div className="bg-white">
        <Navbar dark={true} staticPos={true} />
        <div className="border-b border-gray-200 px-8 py-3">
          <div className="flex items-center justify-between">
            <div>
              <button onClick={() => setCollapsed(!collapsed)} className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition">
                <ChevronDown size={16} className={`transition duration-200 ${collapsed ? "-rotate-90" : ""}`} />
                <span className="font-light">
                  <span className="font-semibold">{step + 1} /4</span> {STEPS[step]}
                </span>
              </button>
              {!collapsed && (
                <div className="mt-1 pl-6 text-sm text-gray-500">
                  Total Amount &nbsp; <span className="text-gray-900 font-medium">{formatINR(price)}</span>
                </div>
              )}
            </div>
            {vehicle?.img && (
              <img src={vehicle.img} alt={vehicle.name} className="h-14 object-contain" onError={e => e.target.style.display = "none"} />
            )}
          </div>
          <div className="flex gap-1 mt-3">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-[3px] flex-1 transition-colors duration-500 ${i <= step ? "bg-gray-900" : "bg-gray-200"}`} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── STEP 1: Personal Details ─────────────────────────────────
function StepPersonal({ data, onChange, onNext }) {
  const [editName, setEditName] = useState(false);
  const [editAddr, setEditAddr] = useState(false);
  const [editContact, setEditContact] = useState(false);

  return (
    <div className="px-16 py-10">
      {/* Name */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-1">Name and Surname</p>
            {editName ? (
              <div className="flex gap-3 mt-2">
                <select
                  value={data.salutation}
                  onChange={e => onChange("salutation", e.target.value)}
                  className="border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-gray-600"
                >
                  <option>Mr.</option><option>Ms.</option><option>Dr.</option>
                </select>
                <input value={data.firstName} onChange={e => onChange("firstName", e.target.value)} placeholder="First Name" className="border border-gray-300 px-3 py-2 text-sm flex-1 focus:outline-none focus:border-gray-600" />
                <input value={data.lastName} onChange={e => onChange("lastName", e.target.value)} placeholder="Last Name" className="border border-gray-300 px-3 py-2 text-sm flex-1 focus:outline-none focus:border-gray-600" />
                <button onClick={() => setEditName(false)} className="text-xs bg-gray-900 text-white px-4 py-2">Save</button>
              </div>
            ) : (
              <p className="text-base text-gray-900 font-light mt-1">{data.salutation} {data.firstName} {data.lastName}</p>
            )}
          </div>
          {!editName && (
            <button onClick={() => setEditName(true)} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-black transition">
              <Pencil size={13} /> Change
            </button>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-1">Address</p>
            {editAddr ? (
              <div className="grid grid-cols-2 gap-3 mt-2">
                <input value={data.street} onChange={e => onChange("street", e.target.value)} placeholder="Street & Number" className="border border-gray-300 px-3 py-2 text-sm col-span-2 focus:outline-none focus:border-gray-600" />
                <input value={data.city} onChange={e => onChange("city", e.target.value)} placeholder="City" className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-600" />
                <input value={data.pincode} onChange={e => onChange("pincode", e.target.value)} placeholder="PIN Code" className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-600" />
                <input value={data.state} onChange={e => onChange("state", e.target.value)} placeholder="State" className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-600" />
                <button onClick={() => setEditAddr(false)} className="text-xs bg-gray-900 text-white px-4 py-2 col-span-2">Save</button>
              </div>
            ) : (
              <div className="text-base text-gray-900 font-light mt-1 space-y-0.5">
                <p>{data.street}</p>
                <p>{data.city}, {data.state} {data.pincode}</p>
                <p>India</p>
              </div>
            )}
          </div>
          {!editAddr && (
            <button onClick={() => setEditAddr(true)} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-black transition">
              <Pencil size={13} /> Change
            </button>
          )}
        </div>
      </div>

      {/* Contact */}
      <div className="pb-6 mb-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-1">Contact Details</p>
            {editContact ? (
              <div className="flex flex-col gap-3 mt-2">
                <input value={data.email} onChange={e => onChange("email", e.target.value)} placeholder="Email" type="email" className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-600" />
                <input value={data.phone} onChange={e => onChange("phone", e.target.value)} placeholder="Phone" className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-600" />
                <button onClick={() => setEditContact(false)} className="text-xs bg-gray-900 text-white px-4 py-2 self-start">Save</button>
              </div>
            ) : (
              <div className="text-base text-gray-900 font-light mt-1 space-y-0.5">
                <p>{data.email}</p>
                <p>{data.phone}</p>
              </div>
            )}
          </div>
          {!editContact && (
            <div className="flex gap-3">
              <button onClick={() => setEditContact(true)} className="text-gray-500 hover:text-black transition"><Pencil size={14} /></button>
              <button className="text-gray-500 hover:text-black transition"><Phone size={14} /></button>
            </div>
          )}
        </div>
      </div>

      <button onClick={onNext} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-sm font-semibold transition">
        Continue
      </button>
    </div>
  );
}

// ─── Finance constants ─────────────────────────────────────────

const FINANCE_PRODUCTS = [
  { value: "360", label: "360° Finance", desc: "Low monthly payments with an Assured Buyback Value at end of term. Options: Trade-in, Refinance, Return, or Keep your vehicle." },
  { value: "emi", label: "Standard EMI", desc: "Fixed monthly instalment plan with standard interest rate over the selected loan term." },
];
const LOAN_TERMS    = [24, 36, 48, 60];
const DOWN_PAYMENTS = [10, 15, 20, 25, 30];
const MILEAGES      = [5000, 10000, 15000, 20000];
const BUYBACK_RATE  = { 24: 0.60, 36: 0.55, 48: 0.51, 60: 0.45 };
const INTEREST_RATE = 0.089;

function formatINRShort(n) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function DropSelect({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = options.find(o => String(o.value) === String(value));
  return (
    <div>
      {label && <p className="text-xs text-gray-400 mb-1.5">{label}</p>}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full border border-gray-300 px-4 py-3 flex items-center justify-between text-sm text-gray-800 hover:border-gray-600 transition"
        >
          <span>{selected?.label ?? value}</span>
          <ChevronDown size={14} className={`transition ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg z-50">
            {options.map(opt => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 ${String(opt.value) === String(value) ? "font-semibold" : ""}`}
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

// ─── STEP 2: Finance ──────────────────────────────────────────
function StepFinance({ financeType, setFinanceType, emiConfig, setEmiConfig, vehicle, onNext, onPrev }) {
  const exShowroom = parseFloat(String(vehicle?.price ?? "6150000").replace(/[₹,]/g, "")) || 6150000;

  const calc = useMemo(() => {
    const downAmt    = exShowroom * (emiConfig.downPct / 100);
    const financeAmt = exShowroom - downAmt;
    const r          = INTEREST_RATE / 12;
    const n          = emiConfig.loanTerm;
    const buybackVal = exShowroom * (BUYBACK_RATE[n] || 0.51);
    let emi;
    if (emiConfig.product === "360") {
      emi = (financeAmt * r - buybackVal * r / Math.pow(1 + r, n)) / (1 - Math.pow(1 + r, -n));
    } else {
      emi = financeAmt * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    }
    return { downAmt, financeAmt, emi, buybackVal };
  }, [emiConfig, exShowroom]);

  const set = (key, val) => setEmiConfig(prev => ({ ...prev, [key]: val }));

  return (
    <div className="px-16 py-10">
      <h2 className="text-4xl font-light text-gray-900 mb-3">Finance</h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-8">
        Please select a purchasing method for your dealer to prepare the contracts for. The contract will be concluded directly with your dealer.
      </p>

      {/* Radio options */}
      <div className="space-y-3 mb-8">
        {[
          { value: "bmw", label: "Financing plans from BMW India Financial Services" },
          { value: "self", label: "Self Finance" },
        ].map(opt => (
          <button
            key={opt.value}
            onClick={() => setFinanceType(opt.value)}
            className={`w-full flex items-center gap-4 px-5 py-4 border transition text-left ${financeType === opt.value ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:border-gray-400"}`}
          >
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${financeType === opt.value ? "border-gray-900" : "border-gray-300"}`}>
              {financeType === opt.value && <div className="w-2 h-2 rounded-full bg-gray-900" />}
            </div>
            <span className="text-sm text-gray-800">{opt.label}</span>
          </button>
        ))}
      </div>

      {/* ── SELF FINANCE: show full price ── */}
      {financeType === "self" && (
        <div className="border border-gray-200 p-6 bg-gray-50 mb-10">
          <p className="text-xs text-gray-400 mb-2">Total Payable Amount (Ex-Showroom)</p>
          <p className="text-3xl font-light text-gray-900 mb-3">{formatINRShort(exShowroom)}</p>
          <p className="text-sm text-gray-500 leading-relaxed">
            You will pay the full amount directly. After order confirmation, your preferred dealer will reach out to you with final payment details and on-road price breakdown.
          </p>
        </div>
      )}

      {/* ── BMW FINANCE: EMI calculator ── */}
      {financeType === "bmw" && (
        <div className="border border-gray-200 p-6 mb-10">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-5">BMW Finance Calculator</p>

          <div className="mb-5">
            <DropSelect
              value={emiConfig.product}
              options={FINANCE_PRODUCTS}
              onChange={v => set("product", v)}
            />
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              {FINANCE_PRODUCTS.find(p => p.value === emiConfig.product)?.desc}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <DropSelect
              label="Loan Term"
              value={emiConfig.loanTerm}
              options={LOAN_TERMS.map(t => ({ value: t, label: `${t} months` }))}
              onChange={v => set("loanTerm", Number(v))}
            />
            <DropSelect
              label="Down Payment"
              value={emiConfig.downPct}
              options={DOWN_PAYMENTS.map(d => ({ value: d, label: `${d}%` }))}
              onChange={v => set("downPct", Number(v))}
            />
            <DropSelect
              label="Annual Mileage"
              value={emiConfig.mileage}
              options={MILEAGES.map(m => ({ value: m, label: m.toLocaleString("en-IN") + " km" }))}
              onChange={v => set("mileage", Number(v))}
            />
          </div>

          {/* Summary */}
          <div className="border-t-2 border-gray-900 pt-4 flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-gray-900">Monthly Instalment</p>
            <p className="text-2xl font-light text-gray-900">{formatINRShort(calc.emi)}</p>
          </div>
          <div className="grid grid-cols-3 gap-x-6 gap-y-3 pt-2 border-t border-gray-100">
            <div><p className="text-xs text-gray-400">Ex-Showroom</p><p className="text-sm font-light">{formatINRShort(exShowroom)}</p></div>
            <div><p className="text-xs text-gray-400">Down Payment</p><p className="text-sm font-light">{formatINRShort(calc.downAmt)}</p></div>
            <div><p className="text-xs text-gray-400">Finance Amount</p><p className="text-sm font-light">{formatINRShort(calc.financeAmt)}</p></div>
            {emiConfig.product === "360" && (
              <div><p className="text-xs text-gray-400">Assured Buyback</p><p className="text-sm font-light">{formatINRShort(calc.buybackVal)}</p></div>
            )}
            <div><p className="text-xs text-gray-400">Loan Term</p><p className="text-sm font-light">{emiConfig.loanTerm} months</p></div>
            <div><p className="text-xs text-gray-400">Interest Rate</p><p className="text-sm font-light">{(INTEREST_RATE * 100).toFixed(1)}% p.a.</p></div>
          </div>
          <p className="text-xs text-gray-300 mt-4">* T&Cs apply. Finance subject to BMW India Financial Services approval.</p>
        </div>
      )}

      <button onClick={onNext} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-sm font-semibold transition mb-3">
        Continue
      </button>
      <button onClick={onPrev} className="w-full border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 py-4 text-sm transition flex items-center justify-center gap-2">
        <ChevronLeft size={16} /> Previous
      </button>
    </div>
  );
}

// ─── STEP 3: Order Deposit ────────────────────────────────────
function StepDeposit({ vehicle, financeType, onNext, onPrev }) {
  const price = parseFloat(String(vehicle?.price ?? "6150000").replace(/[₹,]/g, "")) || 6150000;
  const deposit = Math.round(price * 0.025);

  return (
    <div className="px-16 py-10">
      <h2 className="text-4xl font-light text-gray-900 mb-6">Order Deposit</h2>
      {financeType === "self" ? (
        <p className="text-sm text-gray-500 leading-relaxed mb-12">
          You have selected <span className="text-gray-900 font-medium">Self Finance</span>. Your dealer will contact you after order confirmation with the complete on-road price breakdown and payment details.
        </p>
      ) : (
        <p className="text-sm text-gray-500 leading-relaxed mb-12">
          Your dealer will contact you to process the order deposit of{" "}
          <span className="text-gray-900 font-medium">{formatINR(deposit)}</span> for your vehicle, after you complete the order.
        </p>
      )}

      <button onClick={onNext} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-sm font-semibold transition mb-3">
        Continue to Order Overview
      </button>
      <button onClick={onPrev} className="w-full border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 py-4 text-sm transition flex items-center justify-center gap-2">
        <ChevronLeft size={16} /> Previous
      </button>
    </div>
  );
}

// ─── STEP 4: Overview ─────────────────────────────────────────
function StepOverview({ data, vehicle, financeType, emiConfig, onPrev, onSubmit }) {
  const { getToken } = useAuth();
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const price = parseFloat(String(vehicle?.price ?? "6150000").replace(/[₹,]/g, "")) || 6150000;

  const handleBuyNow = async () => {
    if (!agreed || loading) return;
    setLoading(true);
    setError(null);
    const token = getToken();

    try {
      // Step 1: Backend se Razorpay order banao
      const createRes = await fetch("http://localhost:5000/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: price }),
      });
      const createData = await createRes.json();
      if (!createData.success) throw new Error("Payment init failed");

      // Step 2: Razorpay popup kholo
      const options = {
        key:         import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount:      createData.order.amount,
        currency:    "INR",
        name:        "BMW India",
        description: vehicle?.name ?? "BMW Vehicle",
        image:       vehicle?.img ?? "",
        order_id:    createData.order.id,
        prefill: {
          name:    `${data.firstName} ${data.lastName}`,
          email:   data.email,
          contact: data.phone,
        },
        theme: { color: "#1C1C1C" },

        handler: async (response) => {
          // Step 3: Payment verify + order save karo
          try {
            const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_order_id:   response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature:  response.razorpay_signature,
                orderData: {
                  vehicle: {
                    vehicleId: vehicle?.id,
                    name:      vehicle?.name,
                    img:       vehicle?.img,
                    price:     vehicle?.price,
                    vin:       vehicle?.vin,
                    dealer:    vehicle?.dealer,
                    tag:       vehicle?.tag,
                  },
                  personalData: data,
                  financeType,
                  emiConfig: financeType === "bmw" ? emiConfig : null,
                },
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyData.success) throw new Error("Verify failed");
            setSubmitted(true);
            onSubmit && onSubmit();
          } catch {
            setError("Payment verify nahi hua. Support se contact karo.");
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
            setError("Payment cancelled. Please try again.");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="px-16 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" fill="none" stroke="#16a34a" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 className="text-3xl font-light text-gray-900 mb-3">Order Placed Successfully</h2>
        <p className="text-sm text-gray-500 mb-8">Your request has been transmitted securely. Your dealer will contact you shortly to complete the process.</p>
        <div className="bg-gray-50 border border-gray-200 p-6 text-left space-y-2 mb-8">
          <p className="text-xs text-gray-400">Vehicle</p>
          <p className="text-base font-light text-gray-900">{vehicle?.name ?? "BMW Vehicle"}</p>
          <p className="text-xs text-gray-400 mt-3">Total Amount</p>
          <p className="text-base font-light text-gray-900">{formatINR(price)}</p>
        </div>
        <p className="text-xs text-gray-400">A confirmation has been sent to <span className="text-gray-700">{data.email}</span></p>
      </div>
    );
  }

  return (
    <div className="px-16 py-10">
      <h2 className="text-4xl font-light text-gray-900 mb-8">Overview</h2>

      {/* Personal Data */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-light text-gray-900">Personal Data</h3>
          <button className="text-gray-400 hover:text-black transition"><Pencil size={14} /></button>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">Personal Details</p>
            <p className="text-sm text-gray-900 font-light">{data.salutation} {data.firstName} {data.lastName}</p>
            <p className="text-sm text-gray-900 font-light underline">{data.phone}</p>
            <p className="text-sm text-gray-900 font-light underline">{data.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Address</p>
            <p className="text-sm text-gray-900 font-light">{data.street}</p>
            <p className="text-sm text-gray-900 font-light">{data.city}, {data.state} {data.pincode}</p>
            <p className="text-sm text-gray-900 font-light">India</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8 mb-8">
        <h3 className="text-xl font-light text-gray-900 mb-4">Finance Method</h3>
        <p className="text-sm text-gray-700 font-light mb-1">
          {financeType === "bmw" ? "Financing plans from BMW India Financial Services" : "Self Finance"}
        </p>
        {financeType === "bmw" && emiConfig && (
          <p className="text-xs text-gray-400">
            {emiConfig.product === "360" ? "360° Finance" : "Standard EMI"} · {emiConfig.loanTerm} months · {emiConfig.downPct}% down
          </p>
        )}
        {financeType === "self" && (
          <p className="text-xs text-gray-400">Full payment — dealer will share final on-road price</p>
        )}
      </div>

      {/* Delivery Details */}
      <div className="border-t border-gray-200 pt-8 mb-8">
        <h3 className="text-xl font-light text-gray-900 mb-3">Delivery Details</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          The Delivery details will depend on the terms and conditions in the final contract. Your respective dealer will get in touch with you to close the contract.
        </p>
      </div>

      {/* Confirm order */}
      <div className="border-t border-gray-200 pt-8 mb-8">
        <h3 className="text-xl font-light text-gray-900 mb-2">Confirm your order</h3>
        <p className="text-xs text-gray-400 mb-4">Required fields *</p>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">
          By confirming the details, you submit a binding request to the dealer. Only after checking and confirmation of the dealer by e-mail, the purchase contract is concluded. For this purpose, we will forward your inquiry data to a BMW dealer.
        </p>

        <div className="border border-gray-200 rounded px-5 py-4 flex items-start gap-3 mb-6 bg-gray-50">
          <CreditCard size={18} className="text-gray-500 mt-0.5 shrink-0" />
          <p className="text-sm text-gray-600">Once you place your order, you will be directed to our payment provider to pay the order deposit.</p>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed mb-5">
          Your data will be stored and processed on BMW Group side and by the associated MINI/BMW Agent for the purpose of processing your order.
        </p>

        <label className="flex items-start gap-3 cursor-pointer mb-8">
          <div
            onClick={() => setAgreed(!agreed)}
            className={`w-4 h-4 border mt-0.5 shrink-0 flex items-center justify-center transition ${agreed ? "border-gray-900 bg-gray-900" : "border-gray-400"}`}
          >
            {agreed && <svg width="10" height="8" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 12 10"><polyline points="1 5 4 8 11 1"/></svg>}
          </div>
          <span className="text-sm text-gray-600 leading-relaxed">
            I agree to the{" "}
            <span className="underline font-medium text-gray-800 cursor-pointer">terms and conditions (PDF file)</span>
            {" "}of the contract and accept the content of the general terms of BMW AG and accept the declaration of revocation which is included in the document. *
          </span>
        </label>

        {error && (
          <p className="text-sm text-red-500 mb-3 text-center">{error}</p>
        )}
        <button
          onClick={handleBuyNow}
          disabled={!agreed || loading}
          className={`w-full py-4 text-sm font-semibold transition mb-3 flex items-center justify-center gap-2 ${agreed && !loading ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Placing Order...
            </>
          ) : "Buy Now"}
        </button>

        <button onClick={onPrev} className="w-full border border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 py-4 text-sm transition flex items-center justify-center gap-2">
          <ChevronLeft size={16} /> Previous
        </button>

        <div className="flex items-center gap-2 mt-5 text-xs text-gray-400">
          <Lock size={13} />
          <span>Your request will be transmitted securely and SSL-encrypted</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function ReserveVehicle() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const vehicle = location.state?.vehicle ?? null;

  const [step, setStep] = useState(0);
  const [financeType, setFinanceType] = useState("self");
  const [emiConfig, setEmiConfig] = useState({
    product: "360",
    loanTerm: 48,
    downPct: 20,
    mileage: 10000,
  });
  const [personalData, setPersonalData] = useState({
    salutation: user?.salutation ?? "Mr.",
    firstName: user?.firstName ?? user?.name?.split(" ")[0] ?? "",
    lastName: user?.lastName ?? user?.name?.split(" ").slice(1).join(" ") ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    street: user?.street ?? "",
    city: user?.city ?? "",
    state: user?.state ?? "Rajasthan",
    pincode: user?.pincode ?? "",
  });

  const updateField = (key, val) => setPersonalData(prev => ({ ...prev, [key]: val }));

  return (
    <div className="min-h-screen bg-white font-sans">
      <StepHeader step={step} vehicle={vehicle} />
      {step === 0 && (
        <StepPersonal data={personalData} onChange={updateField} onNext={() => setStep(1)} />
      )}
      {step === 1 && (
        <StepFinance financeType={financeType} setFinanceType={setFinanceType} emiConfig={emiConfig} setEmiConfig={setEmiConfig} vehicle={vehicle} onNext={() => setStep(2)} onPrev={() => setStep(0)} />
      )}
      {step === 2 && (
        <StepDeposit vehicle={vehicle} financeType={financeType} onNext={() => setStep(3)} onPrev={() => setStep(1)} />
      )}
      {step === 3 && (
        <StepOverview data={personalData} vehicle={vehicle} financeType={financeType} emiConfig={emiConfig} onPrev={() => setStep(2)} onSubmit={() => {}} />
      )}
    </div>
  );
}