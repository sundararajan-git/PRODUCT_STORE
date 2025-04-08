import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

const RoleBasedRoute = () => {
  const { userRole } = useContext(AuthContext);
  const allowedRoles = ["admin", "user"];
  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/" />;
};

export default RoleBasedRoute;
