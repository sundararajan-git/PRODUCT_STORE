import { Navigate, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { RootState } from "../LIB/REDUX/store";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  // GET USER DATA FROM THE GLOBAL STATE MANAGEMENT
  const user = useSelector((state: RootState) => state.user);

  if (!user?.email) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col h-full dark:bg-dark">
      <Toaster position="top-right" reverseOrder={false} />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
