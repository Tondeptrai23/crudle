import useAuth from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

function RequireAuth({ children }: { children: ReactNode }) {
  const { authed } = useAuth();
  const location = useLocation();

  return authed === true 
    ? (children) 
    : <Navigate to="/login" replace state={{ path: location.pathname }} />;
}

export default RequireAuth;