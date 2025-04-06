import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ isValidUser }: { isValidUser: boolean | null }) => {
  // While auth status is unknown, don't render anything yet
  if (isValidUser === null) return null;

  return isValidUser ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
