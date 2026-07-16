import { useState, useEffect } from "react";
import { ChevronDown, Check, AlertCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/Useauth";
import Footer from "./Footer";

const API = "http://localhost:5000/api";
const SERIES = ["1 Series","2 Series","3 Series","5 Series","7 Series","X1","X3","X5","X7","M3","M4","M5","iX","i5","i7","XM"];
const MODELS = {
  "1 Series":["118i","M135i"],"2 Series":["220i","M240i","M2"],
  "3 Series":["320i","330i","330Li","M340i"],"5 Series":["520d","530d","540i","M550i"],
  "7 Series":["730Li","740Li","750Li"],"X1":["sDrive18i","xDrive20d"],
  "X3":["xDrive20d","M40i"],"X5":["xDrive30d","M Sport Pro","M Competition"],
  "X7":["xDrive40i M Sport"],"M3":["M3 Competition"],"M4":["M4 Competition"],
  "M5":["M5 Sedan"],"iX":["xDrive50"],"i5":["M60"],"i7":["xDrive60"],"XM":["XM Label"],
};
const CITIES = ["Mumbai","Delhi","Bengaluru","Chennai","Hyderabad","Pune","Kolkata","Ahmedabad","Jaipur","Chandigarh","Gurgaon","Noida"];

function SelectField({ label, value, options, onChange, required, disabled }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => !disabled && setOpen(!open)}
        className={`w-full border border-gray-300 px-5 py-4 flex items-center justify-between text-sm bg-white transition ${disabled ? "opacity-40 cursor-not-allowed" : "hover:border-gray-500 cursor-pointer"}`}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>{value || `${label}${required ? " *" : ""}`}</span>
        <ChevronDown size={16} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && !disabled && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg z-50 max-h-52 overflow-y-auto">
          {options.map(opt => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false); }}
              className={`block w-full text-left px-5 py-3 text-sm hover:bg-gray-50 ${value === opt ? "font-semibold" : ""}`}
            >{opt}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function InputField({ placeholder, value, onChange, type = "text" }) {
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      className="w-full border border-gray-300 px-5 py-4 text-sm text-gray-900 outline-none focus:border-gray-600 transition placeholder-gray-400"
    />
  );
}

export default function TestDrive() {
  const { state } = useLocation();
  const navigate  = useNavigate();
  const { user, getToken } = useAuth();
  const vehicle   = state?.vehicle;
  const nameParts = user?.name?.split(" ") || [];

  const getSeriesFromVehicle = () => {
    if (!vehicle) return "";
    const name = vehicle.name || "";
    for (const s of SERIES) {
      if (name.toLowerCase().includes(s.toLowerCase().replace(" series", ""))) return s;
    }
    return "";
  };

  const [series, setSeries]         = useState(getSeriesFromVehicle());
  const [model, setModel]           = useState(vehicle?.name || "");
  const [salutation, setSalutation] = useState("");
  const [firstName, setFirstName]   = useState(nameParts[0] || "");
  const [lastName, setLastName]     = useState(nameParts.slice(1).join(" ") || "");
  const [email, setEmail]           = useState(user?.email || "");
  const [mobile, setMobile]         = useState("");
  const [city, setCity]             = useState("");
  const [financing, setFinancing]   = useState(false);
  const [terms, setTerms]           = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError]           = useState("");
  const [loading, setLoading]       = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [existingBooking, setExistingBooking] = useState(null);

  // Check if already applied for this vehicle
  useEffect(() => {
    if (!vehicle?.name) return;
    fetch(`${API}/testdrive/check/${encodeURIComponent(vehicle.name)}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(r => r.json())
      .then(data => {
        if (data.applied) {
          setAlreadyApplied(true);
          setExistingBooking(data.booking);
        }
      })
      .catch(() => {});
  }, [vehicle?.name]);

  const handleSubmit = async () => {
    if (!series || !model || !salutation || !firstName || !lastName || !email || !mobile || !city) {
      setError("Please fill all mandatory fields."); return;
    }
    if (!terms) { setError("Please accept Terms and Conditions."); return; }
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/testdrive`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({
          vehicleName: model,vehicleImg: vehicle?.img ?? "",  series, model, salutation,
          firstName, lastName, email, mobile, city, financing,
        }),
      });
      const data = await res.json();

      if (res.status === 409) {
        setAlreadyApplied(true);
        setExistingBooking(data.booking);
        return;
      }
      if (!res.ok) { setError(data.message || "Something went wrong."); return; }

      setSubmittedData(data.booking);
      setSubmitted(true);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Already applied screen
  if (alreadyApplied && existingBooking) {
    const appliedDate = new Date(existingBooking.appliedAt).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
    });
    return (
      <div className="min-h-screen bg-white">
        <Navbar dark={true} />
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-8">
          <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center">
            <AlertCircle size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-light text-gray-900">Already Applied!</h1>
          <div className="border border-gray-200 p-8 max-w-md w-full">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">Booking Details</p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Vehicle</span><span className="font-medium">{existingBooking.vehicleName}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">City</span><span className="font-medium">{existingBooking.city}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Applied On</span><span className="font-medium">{appliedDate}</span></div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-0.5 capitalize">{existingBooking.status}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500">You have already requested a test drive for this vehicle.</p>
          <div className="flex gap-4">
            <button onClick={() => navigate("/bookings")} className="border border-gray-900 px-8 py-3 text-sm font-semibold hover:bg-gray-900 hover:text-white transition">
              View My Bookings
            </button>
            <button onClick={() => navigate(-1)} className="text-sm text-gray-500 hover:text-black underline">
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success screen
  if (submitted && submittedData) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar dark={true} />
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-8">
          <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center">
            <Check size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-light text-gray-900">Request Submitted!</h1>
          <div className="border border-gray-200 p-8 max-w-md w-full">
            <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">Booking Confirmation</p>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Vehicle</span><span className="font-medium">{submittedData.vehicleName}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="font-medium">{firstName} {lastName}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">City</span><span className="font-medium">{submittedData.city}</span></div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-0.5">Pending</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 text-center max-w-sm">
            A confirmation email has been sent to <strong>{email}</strong>.<br />
            Your BMW Dealer will contact you within 24–48 hours.
          </p>
          <div className="flex gap-4">
            <button onClick={() => navigate("/shopping-cart")} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-sm font-semibold transition">
              View My Bookings
            </button>
            <button onClick={() => navigate("/")} className="border border-gray-300 px-8 py-3 text-sm text-gray-600 hover:border-gray-600 transition">
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar dark={true} />
      <div className="relative z-10 pt-24 max-w-2xl mx-auto px-8 pb-24">
        <h1 className="text-5xl font-light text-gray-900 mb-4 mt-8 leading-tight">
          Which vehicle would you like to test drive?
        </h1>
        <p className="text-sm text-gray-500 mb-2">Complete your details below and your BMW Dealer will be in touch shortly to arrange a test drive.</p>
        <p className="text-xs text-gray-400 mb-10">* Mandatory fields</p>

        <div className="space-y-4 mb-12">
          <SelectField label="Series" value={series} options={SERIES} onChange={v => { setSeries(v); setModel(""); }} required />
          <SelectField label="Model" value={model} options={MODELS[series] || []} onChange={setModel} required disabled={!series} />
        </div>

        <h2 className="text-3xl font-light text-gray-900 mb-6">Contact details.</h2>
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">SALUTATION *</p>
          <div className="flex gap-8">
            {["Mr", "Ms"].map(s => (
              <label key={s} onClick={() => setSalutation(s)} className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${salutation === s ? "border-blue-600" : "border-gray-400"}`}>
                  {salutation === s && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                </div>
                {s}
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4 mb-12">
          <InputField placeholder="First Name *" value={firstName} onChange={e => setFirstName(e.target.value)} />
          <InputField placeholder="Last Name *"  value={lastName}  onChange={e => setLastName(e.target.value)} />
          <InputField placeholder="Email *" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <InputField placeholder="Mobile Number *" type="tel" value={mobile} onChange={e => setMobile(e.target.value)} />
        </div>

        <h2 className="text-3xl font-light text-gray-900 mb-6">Please select your current city.</h2>
        <div className="mb-12">
          <SelectField label="City" value={city} options={CITIES} onChange={setCity} required />
        </div>

        <h2 className="text-3xl font-light text-gray-900 mb-4">I am interested in</h2>
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">FINANCING</p>
          <div className="flex items-center gap-3">
            <button onClick={() => setFinancing(!financing)}
              className={`relative w-12 h-6 rounded-sm transition-colors ${financing ? "bg-blue-600" : "bg-gray-300"}`}>
              <span className={`absolute top-0.5 w-5 h-5 bg-white shadow flex items-center justify-center text-xs font-bold transition-all ${financing ? "left-6 text-blue-600" : "left-0.5 text-gray-400"}`}>
                {financing ? "✓" : "✕"}
              </span>
            </button>
            <span className="text-sm text-gray-600">{financing ? "Interested" : "Not interested"}</span>
          </div>
        </div>

        <div className="flex items-start gap-3 mb-6">
          <button onClick={() => setTerms(!terms)}
            className={`w-5 h-5 border-2 shrink-0 mt-0.5 flex items-center justify-center transition ${terms ? "border-blue-600 bg-blue-600" : "border-gray-400"}`}>
            {terms && <Check size={12} className="text-white" />}
          </button>
          <p className="text-sm text-gray-600">I accept the <span className="text-blue-600 cursor-pointer hover:underline">Terms and Conditions.</span></p>
        </div>

        {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

        <button onClick={handleSubmit} disabled={loading}
          className={`px-12 py-4 text-sm font-semibold transition text-white ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
          {loading ? "Submitting..." : "Submit request"}
        </button>

        <div className="mt-10 text-xs text-gray-400 leading-relaxed space-y-2 border-t border-gray-100 pt-8">
          <p>The data provided will be used for the purpose of fulfilling your request. Further information on data procession can be found on the <span className="text-blue-500 cursor-pointer">Data Privacy Policy</span>.</p>
          <p>The model, equipment and possible vehicle configurations illustrated in this advertisement may differ from the vehicles supplied in the Indian market.</p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}