import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/home/Home";
import AuthLayout from "./layouts/AuthLayout";
import PublicLayout from "./layouts/PublicLayout";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import Verification from "./pages/verfication/Verification";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import PageNotFound from "./pages/404/PageNotFound";
import "./App.css";
import Loader from "./components/Loader";
import useValidUser from "./hook/useValidUser";
import { Toaster } from "react-hot-toast";

const App = () => {
  // validate from the custom hook
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
