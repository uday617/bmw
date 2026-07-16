import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const API = "http://localhost:5000/api";

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount — check if token exists
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("bmw_token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res  = await fetch(`${API}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.id) setUser(data);
        else localStorage.removeItem("bmw_token");
      } catch {
        localStorage.removeItem("bmw_token");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const register = async (name, email, password) => {
    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    localStorage.setItem("bmw_token", data.token);
    setUser(data.user);
    return data.user;
  };

  const login = async (email, password) => {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    localStorage.setItem("bmw_token", data.token);
    setUser(data.user);
    return data.user;
  };

  const googleLogin = async (credential) => {
    const res = await fetch(`${API}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    localStorage.setItem("bmw_token", data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("bmw_token");
    setUser(null);
  };

  const getToken = () => localStorage.getItem("bmw_token");

  return (
    <AuthContext.Provider value={{ user, loading, login, register, googleLogin, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}