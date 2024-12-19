import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./PAGES/HOME/Home";
import AuthLayout from "./LAYOUTS/AuthLayout";
import SignUp from "./PAGES/SIGNUP/SignUp";
import Login from "./PAGES/LOGIN/Login";
import Verification from "./PAGES/VERIFICATION/Verification";
import ResetPassword from "./PAGES/RESETPASSWORD/ResetPassword";
import PageNotFound from "./PAGES/404/PageNotFound";
import "./App.css";
import { RootState } from "./LIB/REDUX/store";
import { useSelector } from "react-redux";


const App = () => {
  const user = useSelector((state: RootState) => state.user);

  console.log(user)
  
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Home />} />
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
