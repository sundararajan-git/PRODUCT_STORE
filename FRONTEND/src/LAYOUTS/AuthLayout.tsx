import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const AuthLayout = () => {
  return (
    <div className="flex flex-col h-full dark:bg-dark">
      <Toaster position="top-right" reverseOrder={false} />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
