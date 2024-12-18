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

const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route element={<PublicLayout />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/resetpassword/:id" element={<ResetPassword />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
