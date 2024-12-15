import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const AuthLayout = () => {
  return (
    <div className="flex flex-col h-screen dark:bg-dark">
      <Toaster />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
