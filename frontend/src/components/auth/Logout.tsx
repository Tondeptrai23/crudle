import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return <Navigate to='/login' replace />;
} 
