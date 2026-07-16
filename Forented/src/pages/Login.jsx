import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/Useauth";
import CAR_IMG from "../assets/f1-car.png";

function Field({ label, type = "text", placeholder, value, onChange, onKeyDown }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{
        display: "block", fontSize: "9px", letterSpacing: "3px",
        textTransform: "uppercase", marginBottom: "5px",
        fontFamily: "'Rajdhani', sans-serif",
        color: focused ? "rgba(255,80,60,0.9)" : "rgba(255,255,255,0.3)",
        transition: "0.3s",
      }}>{label}</label>
      <input
        type={type} value={value} onChange={onChange} onKeyDown={onKeyDown}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          width: "100%", background: "transparent", border: "none",
          borderBottom: `1px solid ${focused ? "rgba(220,40,20,0.7)" : "rgba(255,255,255,0.1)"}`,
          padding: "8px 0", color: "white", fontSize: "14px",
          fontFamily: "'Rajdhani', sans-serif", outline: "none",
          caretColor: "#FF3311", boxSizing: "border-box",
        }}
      />
    </div>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  // Load Google GSI script
  useEffect(() => {
    const existing = document.getElementById("google-gsi-script");
    if (existing) {
      initGoogle();
      return;
    }
    const script = document.createElement("script");
    script.id = "google-gsi-script";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initGoogle;
    document.body.appendChild(script);
  }, []);

  const initGoogle = () => {
    if (!window.google) return;
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleGoogleCallback,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("google-btn"),
      { theme: "filled_black", size: "large", width: 300, text: "continue_with" }
    );
  };

  const handleGoogleCallback = async ({ credential }) => {
    setError("");
    setLoading(true);
    try {
      await googleLogin(credential);
      navigate("/");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setError("");
    if (!email || !password) { setError("Please fill all fields"); return; }
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; height: 100%; overflow: hidden; margin: 0; padding: 0; }
        @media (max-width: 900px) {
          .car-wrapper { display: none !important; }
          .login-card { margin: 0 auto !important; padding: 32px 24px !important; }
        }
        /* Google button dark override */
        #google-btn > div { border-radius: 0 !important; }
      `}</style>

      <div style={{
        width: "100vw", height: "100vh", background: "#06000a",
        display: "flex", alignItems: "center", justifyContent: "flex-end",
        overflow: "hidden", position: "fixed", top: 0, left: 0,
        fontFamily: "'Rajdhani', sans-serif",
      }}>
        {/* Background */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 100% 80% at 40% 55%, #180008 0%, #08000e 45%, #030008 100%)",
          zIndex: 0,
        }} />

        {/* Car */}
        <motion.div className="car-wrapper" style={{
          position: "absolute", left: "-8%", bottom: 0,
          width: "75%", height: "100%", zIndex: 1,
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          overflow: "hidden", pointerEvents: "none",
        }}
          initial={{ opacity: 0, x: -120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={CAR_IMG} alt="F1 Car" style={{
            width: "100%", height: "100%",
            objectFit: "contain", objectPosition: "center bottom",
            transform: "scaleX(-1)",
          }} />
        </motion.div>

        {/* Login Card */}
        <AnimatePresence>
          <motion.div className="login-card" style={{
            position: "relative", zIndex: 10, marginRight: "6vw",
            width: "100%", maxWidth: "380px",
            background: "rgba(8,2,12,0.65)", backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.07)", padding: "40px",
          }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{ fontSize: "34px", color: "white", marginBottom: "30px" }}>
              Welcome Back
            </h1>

            {error && (
              <div style={{
                background: "rgba(200,20,5,0.15)", border: "1px solid rgba(200,20,5,0.4)",
                color: "rgba(255,100,80,1)", fontSize: "12px", padding: "10px 14px",
                marginBottom: "16px", letterSpacing: "0.5px",
              }}>{error}</div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
              <Field label="Email" type="email" placeholder="max@redbull.com"
                value={email} onChange={e => setEmail(e.target.value)} />
              <Field label="Password" type="password" placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()} />
            </div>

            <motion.button onClick={handleLogin} disabled={loading}
              style={{
                width: "100%", marginTop: "30px", padding: "14px",
                background: loading ? "rgba(200,20,5,0.15)" : "rgba(200,20,5,0.3)",
                border: "1px solid rgba(200,20,5,0.6)", color: "white",
                letterSpacing: "3px", textTransform: "uppercase",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "'Rajdhani', sans-serif", opacity: loading ? 0.6 : 1,
              }}
              whileTap={{ scale: loading ? 1 : 0.97 }}
            >
              {loading ? "Authenticating..." : "Enter the Paddock →"}
            </motion.button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "2px" }}>OR</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
            </div>

            {/* Google Button */}
            <div id="google-btn" style={{ display: "flex", justifyContent: "center" }} />

            <div style={{
              marginTop: "20px", textAlign: "center",
              fontSize: "13px", color: "rgba(255,255,255,0.5)",
            }}>
              Don't have an account?{" "}
              <motion.span onClick={() => navigate("/signup")}
                style={{ color: "rgba(255,80,60,0.9)", cursor: "pointer", letterSpacing: "1px" }}
                whileHover={{ color: "rgba(255,120,100,1)" }}
              >
                Create Account
              </motion.span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}