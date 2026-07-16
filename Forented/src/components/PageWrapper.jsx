import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageSkeleton from "./PageSkeleton";
import AuthSkeleton from "./AuthSkeleton";
import ProfileSkeleton from "./ProfileSkeleton";
import ConfiguratorSkeleton from "./ConfiguratorSkeleton";
import VehicleFinderSkeleton from "./VehicleFinderSkeleton";
import CartSkeleton from "./CartSkeleton";
import VehicleDetailSkeleton from "./VehicleDetailSkeleton";
import FormSkeleton from "./FormSkeleton";
import AdminSkeleton from "./AdminSkeleton";
import GenericSkeleton from "./GenericSkeleton";

export default function PageWrapper({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // When the route changes, show the skeleton loader
    setLoading(true);
    
    // Simulate a loading delay to let heavy assets (videos, images) mount and buffer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // 1.2 seconds of smooth skeleton before showing the heavy page

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) {
    const path = location.pathname.toLowerCase();
    
    if (path === "/login" || path === "/signup") return <AuthSkeleton />;
    if (path === "/profile") return <ProfileSkeleton />;
    if (path === "/") return <PageSkeleton />;
    if (path === "/configurator") return <ConfiguratorSkeleton />;
    if (path === "/vehiclefinder") return <VehicleFinderSkeleton />;
    if (path.startsWith("/vehicledetail")) return <VehicleDetailSkeleton />;
    if (path === "/shopping-cart" || path === "/wishlist") return <CartSkeleton />;
    if (path === "/testdrive" || path === "/reserve") return <FormSkeleton />;
    if (path === "/admindashboard") return <AdminSkeleton />;
    
    return <GenericSkeleton />;
  }

  return children;
}
