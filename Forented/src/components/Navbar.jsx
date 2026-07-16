import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { User, ShoppingCart, Heart, Menu, LogOut, Car } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Useauth";
import Bmw from "../assets/logo.svg";

function Navbar({ dark = false, staticPos = false }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState(null);

  useEffect(() => {
    if (menuOpen || activePanel) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.position = "static";
    }
  }, [menuOpen, activePanel]);

  const handleLogout = () => {
    logout();
    setActivePanel(null);
    navigate("/");
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className={`${staticPos ? "relative" : "absolute top-0 left-0 z-50"} w-full px-10 py-6 flex items-center justify-between ${dark || staticPos ? "text-black" : "text-white"}`}>
        <img src={Bmw} alt="BMW Logo" onClick={() => navigate("/")} className="w-12 cursor-pointer" />

        <div className="flex items-center gap-8">
          <div className="relative cursor-pointer" onClick={() => setActivePanel("dashboard")}>
            <User className="hover:scale-110 transition" size={22} strokeWidth={1.5} />
            {user && (
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_6px_2px_rgba(74,222,128,0.7)]" />
            )}
          </div>
          <ShoppingCart onClick={() => navigate("/shopping-cart")} className="cursor-pointer hover:scale-110 transition" size={22} strokeWidth={1.5} />
          <Heart onClick={() => navigate("/wishlist")} className="cursor-pointer hover:scale-110 transition" size={22} strokeWidth={1.5} />
          <Menu onClick={() => setMenuOpen(true)} className="cursor-pointer hover:scale-110 transition" size={22} strokeWidth={1.5} />
        </div>
      </nav>

      {/* ================= SLIDE MENU ================= */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#f2f2f2] z-[200]"
          >
            <div className="flex items-center justify-between px-16 py-8 border-b border-gray-300">
              <img src={Bmw} alt="BMW Logo" onClick={() => navigate("/")} className="w-12 cursor-pointer" />
              <FaTimes onClick={() => setMenuOpen(false)} className="text-2xl cursor-pointer text-black" />
            </div>
            <div className="max-w-5xl mx-auto mt-10 px-10 font-light">
              <div className="py-5 border-b border-gray-300 text-2xl text-gray-700 hover:text-black cursor-pointer transition">All Models</div>
              <div className="py-5 border-b border-gray-300 text-2xl text-gray-700 hover:text-black cursor-pointer transition">Electric</div>
              <div className="py-5 border-b border-gray-300 text-2xl text-gray-700 flex justify-between items-center hover:text-black cursor-pointer transition">Visit Online Shop <span className="text-2xl">›</span></div>
              <div className="py-5 border-b border-gray-300 text-2xl text-gray-700 flex justify-between items-center hover:text-black cursor-pointer transition">More BMW <span className="text-2xl">›</span></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= SLIDING PANELS ================= */}
      <AnimatePresence>
        {activePanel && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActivePanel(null)}
              className="fixed inset-0 bg-black bg-opacity-30 z-[300]"
            />
            {activePanel === "dashboard" && (
              <motion.div
                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="fixed right-0 top-0 h-screen w-screen bg-white z-[301] overflow-y-auto"
              >
                <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200 sticky top-0 bg-white">
                  <img src={Bmw} alt="BMW Logo" onClick={() => navigate("/")} className="w-12 cursor-pointer" />
                  <FaTimes onClick={() => setActivePanel(null)} className="text-2xl cursor-pointer text-gray-900 hover:text-gray-600" />
                </div>
                <div className="px-10 py-10">
                  <h1 className="text-3xl font-light text-gray-900 mb-10">
                    Welcome, {user?.name?.split(" ")[0] ?? "Guest"}.
                  </h1>
                  <div className="grid grid-cols-4 gap-8 border-t border-gray-200 pt-8">
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 tracking-widest uppercase mb-5">MY NEXT BMW</h3>
                      <button onClick={() => { navigate("/wishlist"); setActivePanel(null); }} className="flex items-center gap-3 text-gray-900 hover:text-blue-600 transition">
                        <Heart size={18} strokeWidth={1.5} />
                        <span className="text-sm font-semibold">My wishlist</span>
                      </button>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 tracking-widest uppercase mb-5">MY VEHICLES</h3>
                      <div className="space-y-4">
                        <button onClick={() => { navigate("/vehiclefinder"); setActivePanel(null); }} className="flex items-center gap-3 text-gray-900 hover:text-blue-600 transition">
                          <Car size={18} strokeWidth={1.5} />
                          <span className="text-sm font-semibold">Vehicle overview</span>
                        </button>
                        <button onClick={() => { navigate("/vehiclefinder"); setActivePanel(null); }} className="flex items-center gap-3 text-gray-900 hover:text-blue-600 transition">
                          <Car size={18} strokeWidth={1.5} />
                          <span className="text-sm font-semibold">Add vehicle</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 tracking-widest uppercase mb-5">MY ACCOUNT</h3>
                      <div className="space-y-4">
                        <button onClick={() => { navigate("/shopping-cart"); setActivePanel(null); }} className="flex items-center gap-3 text-gray-900 hover:text-blue-600 transition">
                          <span className="text-sm font-semibold">My orders</span>
                        </button>
                        <button onClick={() => { navigate("/profile"); setActivePanel(null); }} className="flex items-center gap-3 text-gray-900 hover:text-blue-600 transition">
                          <span className="text-sm font-semibold">My Profile</span>
                        </button>
                        <button className="flex items-center gap-3 text-gray-900 hover:text-blue-600 transition">
                          <span className="text-sm font-semibold">Declarations of consent</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-500 tracking-widest uppercase mb-5">HOW CAN WE HELP YOU?</h3>
                      <div className="space-y-4">
                        <button className="flex items-center gap-3 text-gray-900 hover:text-blue-600 transition">
                          <span className="text-sm font-semibold">Customer support</span>
                        </button>
                        <button className="flex items-center gap-3 text-gray-900 hover:text-blue-600 transition">
                          <span className="text-sm font-semibold">BMW Partner and online appointment</span>
                        </button>
                      </div>
                      <div className="mt-16 pt-6 border-t border-gray-200">
                        <button onClick={handleLogout} className="flex items-center gap-3 text-gray-900 hover:text-red-500 transition font-semibold text-sm">
                          <LogOut size={18} strokeWidth={1.5} />
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;