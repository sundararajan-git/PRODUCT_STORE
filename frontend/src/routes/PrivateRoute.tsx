import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";

const PrivateRoute = () => {
  const { isValidUser } = useContext(AuthContext);
  return isValidUser !== null ? (
    <div className="flex flex-col h-full dark:bg-dark ">
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
