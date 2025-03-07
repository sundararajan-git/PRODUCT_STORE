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
import { useContext } from "react";
import { ThemeContext } from "./layouts/ThemeProvider";

const App = () => {
  const { pageloading, isValidUser } = useValidUser();
  const { isDarkMode } = useContext(ThemeContext);

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
          <Route path="/verification" element={<Verification />} />
        </Route>
        <Route element={<PublicLayout isValidUser={isValidUser} />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword/:id" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: isDarkMode === "dark" ? "#030712" : "#fff",
            color: isDarkMode === "dark" ? "#fff" : "#000",
            padding: "10px 20px 10px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          },
        }}
      />
    </>
  );
};

export default App;
