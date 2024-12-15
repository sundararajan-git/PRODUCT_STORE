import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./PAGES/HOME/Home";
import AuthLayout from "./LAYOUTS/AuthLayout";
import "./App.css";
import SignUp from "./PAGES/SIGNUP/SignUp";
import Login from "./PAGES/LOGIN/Login";
import Verification from "./PAGES/VERIFICATION/Verification";
import ResetPassword from "./PAGES/RESETPASSWORD/ResetPassword";


const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/resetpassword/:id" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
};

export default App;
