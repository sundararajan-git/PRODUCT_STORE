import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ isValidUser }: { isValidUser: boolean | null }) => {
  // While auth status is unknown, don't render anything yet
  if (isValidUser === null) return null;

  return isValidUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
