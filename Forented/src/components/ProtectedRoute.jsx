import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth"
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center gap-4">
          <img src="/logo.svg" alt="BMW" className="w-16 invert" />
          <div className="w-32 h-0.5 bg-gray-200 overflow-hidden">
            <div className="h-full bg-gray-800 animate-pulse w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
}