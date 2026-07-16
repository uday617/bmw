import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Lenis from "@studio-freight/lenis";
import PageWrapper from "./components/PageWrapper";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import Wishlist from "./pages/Wishlist";
import ShoppingCart from "./pages/Shoppingcart";
import Profile from "./pages/Profile";
import Configurator from "./pages/Configurator";
import VehicleFinder from "./pages/VehicleFinder";
import VehicleDetail from "./pages/VehicleDetailPage";
import UserNotFound from "./pages/UserNotFound";
import TestDrive from "./components/TestDrive";
import ReserveVehicle from "./pages/Reservevehicle";


function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.5, smooth: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div>
      <PageWrapper>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          {/* Protected */}
          <Route path="/admindashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/shopping-cart" element={<ProtectedRoute><ShoppingCart /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/configurator" element={<ProtectedRoute><Configurator /></ProtectedRoute>} />
          <Route path="/vehiclefinder" element={<ProtectedRoute><VehicleFinder /></ProtectedRoute>} />
          <Route path="/vehicledetail/:id" element={<ProtectedRoute><VehicleDetail /></ProtectedRoute>} />
             <Route path="/testdrive" element={<ProtectedRoute><TestDrive/></ProtectedRoute>} />
              <Route path="/reserve" element={<ProtectedRoute><ReserveVehicle/></ProtectedRoute>} />

          {/* Redirects */}
          <Route path="/Login" element={<Navigate to="/login" replace />} />
          <Route path="/Signup" element={<Navigate to="/signup" replace />} />

          <Route path="*" element={<UserNotFound />} />
        </Routes>
      </PageWrapper>
    </div>
  );
}

export default App;