import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import Home from "./PAGES/HOME/Home"
import Create from "./PAGES/CREATE/Create"
import Update from "./PAGES/UPDATE/Update"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/update" element={<Update />} />
    </Routes>
  )
}

export default App;