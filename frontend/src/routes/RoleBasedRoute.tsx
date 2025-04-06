import { Navigate, Outlet } from "react-router-dom";

const RoleBasedRoute = ({
  allowedRoles,
  userRole,
}: {
  allowedRoles: string[];
  userRole: string;
}) => {
  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/" />;
};

export default RoleBasedRoute;
