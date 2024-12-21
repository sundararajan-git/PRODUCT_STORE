import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./PAGES/HOME/Home";
import AuthLayout from "./LAYOUTS/AuthLayout";
import PublicLayout from "./LAYOUTS/PublicLayout";
import SignUp from "./PAGES/SIGNUP/SignUp";
import Login from "./PAGES/LOGIN/Login";
import Verification from "./PAGES/VERIFICATION/Verification";
import ResetPassword from "./PAGES/RESETPASSWORD/ResetPassword";
import PageNotFound from "./PAGES/404/PageNotFound";
import "./App.css";
import Loader from "./COMPONENTS/Loader";
import useValidUser from "./HOOK/useValidUser";
import { Toaster } from "react-hot-toast";

const App = () => {
  // VALIDATE FROM THE CUSTOM HOOK
  const { pageloading, isValidUser } = useValidUser();

  if (pageloading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route element={<AuthLayout isValidUser={isValidUser} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<PublicLayout isValidUser={isValidUser} />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/resetpassword/:id" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
