import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./PAGES/HOME/Home";
import Create from "./PAGES/CREATE/Create";
import Update from "./PAGES/UPDATE/Update";
import AuthLayout from "./LAYOUTS/AuthLayout";
import "./App.css";


const App = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update" element={<Update />} />
      </Route>
    </Routes>
  );
};

export default App;
