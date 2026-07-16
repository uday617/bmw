import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Car, ShoppingBag, Calendar, MapPin, Clock, Package, CreditCard, Building2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/Useauth";

const API = "http://localhost:5000/api";

const STATUS_STYLES = {
  pending: { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-400", label: "Pending" },
  confirmed: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-400", label: "Confirmed" },
  cancelled: { bg: "bg-red-100", text: "text-red-600", dot: "bg-red-400", label: "Cancelled" },
};

function formatINR(n) {
  return "₹ " + Number(String(n).replace(/[₹,]/g, "")).toLocaleString("en-IN", { minimumFractionDigits: 2 });
}

// ── Test Drives Tab ───────────────────────────────────────────
function TestDrivesTab() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/testdrive`, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then(r => r.json())
      .then(data => setBookings(data.bookings || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-32 text-center text-gray-400 text-sm">Loading...</div>;

  if (bookings.length === 0) return (
    <div className="flex flex-col items-center justify-center py-32 gap-6">
      <Car size={56} strokeWidth={1} className="text-gray-300" />
      <h2 className="text-2xl font-light text-gray-700">No Test Drive Requests Yet</h2>
      <p className="text-sm text-gray-400 text-center max-w-sm">Find your dream BMW and book a test drive experience.</p>
      <button onClick={() => navigate("/vehiclefinder")}
        className="px-10 py-3 border border-gray-800 text-gray-800 text-sm font-semibold hover:bg-gray-800 hover:text-white transition">
        Find a Vehicle
      </button>
    </div>
  );

  return (
    <div className="space-y-4">
      {bookings.map(booking => {
        const status = STATUS_STYLES[booking.status] || STATUS_STYLES.pending;
        const date = new Date(booking.appliedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
        return (
          <div key={booking._id} className="border border-gray-200 bg-white">
            <div className="flex items-start justify-between p-6 border-b border-gray-100">
              <div className="flex gap-4">
                {booking.vehicleImg ? (
                  <img src={booking.vehicleImg} alt={booking.vehicleName}
                    className="w-20 h-14 object-contain bg-gray-50 shrink-0"
                    onError={e => e.target.style.display = "none"} />
                ) : (
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center shrink-0">
                    <Car size={22} strokeWidth={1} className="text-gray-500" />
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">Test Drive Request</p>
                  <h3 className="text-lg font-light text-gray-900">{booking.vehicleName}</h3>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                    <span className="flex items-center gap-1"><MapPin size={11} />{booking.city}</span>
                    <span className="flex items-center gap-1"><Calendar size={11} />{date}</span>
                  </div>
                </div>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 ${status.bg}`}>
                <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                <span className={`text-xs font-semibold ${status.text}`}>{status.label}</span>
              </div>
            </div>
            <div className="px-6 py-4 flex flex-wrap gap-8 text-sm">
              <div><p className="text-xs text-gray-400 mb-0.5">Customer</p><p className="text-gray-800">{booking.salutation ? booking.salutation + ". " : ""}{booking.firstName} {booking.lastName}</p></div>
              <div><p className="text-xs text-gray-400 mb-0.5">Email</p><p className="text-gray-800">{booking.email}</p></div>
              <div><p className="text-xs text-gray-400 mb-0.5">Mobile</p><p className="text-gray-800">{booking.mobile}</p></div>
              <div><p className="text-xs text-gray-400 mb-0.5">Financing</p><p className="text-gray-800">{booking.financing ? "Interested" : "Not Interested"}</p></div>
            </div>
            {booking.status === "pending" && (
              <div className="px-6 py-3 bg-yellow-50 border-t border-yellow-100 flex items-center gap-2">
                <Clock size={13} className="text-yellow-600" />
                <p className="text-xs text-yellow-700">Your BMW Dealer will contact you within 24–48 hours to confirm your appointment.</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Purchases Tab ─────────────────────────────────────────────
function PurchasesTab() {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/orders`, { headers: { Authorization: `Bearer ${getToken()}` } })
      .then(r => r.json())
      .then(data => setOrders(data.orders || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-32 text-center text-gray-400 text-sm">Loading...</div>;

  if (orders.length === 0) return (
    <div className="flex flex-col items-center justify-center py-32 gap-6">
      <Package size={56} strokeWidth={1} className="text-gray-300" />
      <h2 className="text-2xl font-light text-gray-700">No Purchases Yet</h2>
      <p className="text-sm text-gray-400 text-center max-w-sm">Browse our collection and find the BMW that's perfect for you.</p>
      <button onClick={() => navigate("/vehiclefinder")}
        className="px-10 py-3 border border-gray-800 text-gray-800 text-sm font-semibold hover:bg-gray-800 hover:text-white transition">
        Browse Vehicles
      </button>
    </div>
  );

  return (
    <div className="space-y-4">
      {orders.map(order => {
        const status = STATUS_STYLES[order.status] || STATUS_STYLES.pending;
        const date = new Date(order.orderedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
        const p = order.personalData || {};
        const v = order.vehicle || {};
        const e = order.emiConfig;

        return (
          <div key={order._id} className="border border-gray-200 bg-white">

            {/* ── Header: vehicle image + name + status ── */}
            <div className="flex items-start justify-between p-6 border-b border-gray-100">
              <div className="flex gap-4">
                {v.img ? (
                  <img src={v.img} alt={v.name} className="w-20 h-14 object-contain bg-gray-50 shrink-0" onError={e => e.target.style.display = "none"} />
                ) : (
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center shrink-0">
                    <Car size={22} strokeWidth={1} className="text-gray-500" />
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-1">Vehicle Order</p>
                  <h3 className="text-lg font-light text-gray-900">{v.name ?? "BMW Vehicle"}</h3>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                    {v.dealer && <span className="flex items-center gap-1"><Building2 size={11} />{v.dealer}</span>}
                    <span className="flex items-center gap-1"><Calendar size={11} />{date}</span>
                  </div>
                </div>
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 ${status.bg}`}>
                <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                <span className={`text-xs font-semibold ${status.text}`}>{status.label}</span>
              </div>
            </div>

            {/* ── Owner details ── */}
            <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap gap-8 text-sm">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Customer</p>
                <p className="text-gray-800">{p.salutation} {p.firstName} {p.lastName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Email</p>
                <p className="text-gray-800">{p.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                <p className="text-gray-800">{p.phone}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Address</p>
                <p className="text-gray-800">{p.street}, {p.city}, {p.state} {p.pincode}</p>
              </div>
            </div>

            {/* ── Finance details ── */}
            <div className="px-6 py-4 flex flex-wrap gap-8 text-sm">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Vehicle Price</p>
                <p className="text-gray-800 font-medium">{formatINR(v.price ?? 0)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Finance Type</p>
                <p className="text-gray-800 flex items-center gap-1">
                  <CreditCard size={13} className="text-gray-400" />
                  {order.financeType === "bmw" ? "BMW India Financial Services" : "Self Finance"}
                </p>
              </div>
              {order.financeType === "bmw" && e && (
                <>
                  <div><p className="text-xs text-gray-400 mb-0.5">Plan</p><p className="text-gray-800">{e.product === "360" ? "360° Finance" : "Standard EMI"}</p></div>
                  <div><p className="text-xs text-gray-400 mb-0.5">Loan Term</p><p className="text-gray-800">{e.loanTerm} months</p></div>
                  <div><p className="text-xs text-gray-400 mb-0.5">Down Payment</p><p className="text-gray-800">{e.downPct}%</p></div>
                </>
              )}
              {v.vin && (
                <div><p className="text-xs text-gray-400 mb-0.5">VIN</p><p className="text-gray-800 font-mono text-xs">{v.vin}</p></div>
              )}
            </div>

            {/* ── Pending notice ── */}
            {order.status === "pending" && (
              <div className="px-6 py-3 bg-yellow-50 border-t border-yellow-100 flex items-center gap-2">
                <Clock size={13} className="text-yellow-600" />
                <p className="text-xs text-yellow-700">Your BMW Dealer will contact you within 24–48 hours to process your order.</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Cart Tab ──────────────────────────────────────────────────
function CartTab() {
  const navigate = useNavigate();
  const cart = [];

  if (cart.length === 0) return (
    <div className="flex flex-col items-center justify-center py-32 gap-6">
      <ShoppingBag size={56} strokeWidth={1} className="text-gray-300" />
      <h2 className="text-2xl font-light text-gray-700">Your shopping basket is still empty.</h2>
      <p className="text-sm text-gray-400 text-center max-w-sm">Discover all BMW ConnectedDrive products and get the most out of your vehicle.</p>
      <button onClick={() => navigate("/vehiclefinder")}
        className="px-10 py-3 border border-gray-800 text-gray-800 text-sm font-semibold hover:bg-gray-800 hover:text-white transition">
        Explore our products
      </button>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">{/* Cart items */}</div>
      <div className="bg-gray-50 border border-gray-200 p-6 h-fit">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>
        <div className="space-y-4 text-sm">
          <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹0</span></div>
          <div className="flex justify-between text-gray-600"><span>Shipping</span><span>₹0</span></div>
          <hr />
          <div className="flex justify-between font-semibold text-gray-900"><span>Total</span><span>₹0</span></div>
        </div>
        <button className="w-full mt-6 px-6 py-3 bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition">Checkout</button>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────
const TABS = [
  { id: "cart", label: "Shopping Basket", icon: ShoppingBag },
  { id: "testdrives", label: "Test Drives", icon: Car },
  { id: "purchases", label: "Purchases", icon: Package },
];

export default function ShoppingCart() {
  const [activeTab, setActiveTab] = useState("cart");

  return (
    <div className="min-h-screen bg-white">
      <Navbar dark={true} />
      <div className="pt-24 px-8 max-w-5xl mx-auto pb-20">
        <h1 className="text-4xl font-light text-gray-900 mt-6 mb-8">My Orders</h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          {TABS.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition border-b-2 -mb-px ${activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-400 hover:text-gray-700"
                  }`}
              >
                <Icon size={16} strokeWidth={1.5} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "cart" && <CartTab />}
        {activeTab === "testdrives" && <TestDrivesTab />}
        {activeTab === "purchases" && <PurchasesTab />}
      </div>
      <Footer />
    </div>
  );
}