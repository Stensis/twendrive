// src/components/RedirectIfAuthenticated.tsx
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "@/redux/store";

const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (user && token) {
    const role = user.role;

    // Redirect based on role
    if (role === "car_owner") {
      return <Navigate to="/owner-dashboard" state={{ from: location }} replace />;
    }
    if (role === "car_renter") {
      return <Navigate to="/renter-dashboard" state={{ from: location }} replace />;
    }
  }

  return children;
};

export default RedirectIfAuthenticated;
