import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/home/Home";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import Verification from "./pages/verfication/Verification";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import PageNotFound from "./pages/404/PageNotFound";
import { useContext } from "react";
import RoleBasedRoute from "./routes/RoleBasedRoute";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { AuthContext } from "./context/AuthProvider";
import Loader from "./components/Loader";
import "./App.css";

const App = () => {
  const { pageLoading } = useContext(AuthContext);

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen dark:bg-dark ">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/resetpassword/:id" element={<ResetPassword />} />
        </Route>

        <Route element={<RoleBasedRoute />}>
          <Route path="/admin" element={<p>Hi , Admin</p>} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
