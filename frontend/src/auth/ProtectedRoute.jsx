import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute() {
  const { session, loading } = useAuth();

  if (loading) return "Loading...";

  if (!session) return <Navigate to="/signin" replace />;

  return <Outlet />;
}