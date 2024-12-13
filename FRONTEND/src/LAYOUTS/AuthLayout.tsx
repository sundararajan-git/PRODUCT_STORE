import { Outlet } from "react-router-dom";
import Header from "../COMPONENTS/Header";
import { Toaster } from "react-hot-toast";

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen max-h-full dark:bg-dark">
      <Header />
      <Toaster />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
