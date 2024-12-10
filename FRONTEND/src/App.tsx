import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import AuthLayout from './LAYOUTS/AuthLayout'
import Home from './PAGES/HOME/Home'
import Create from './PAGES/CREATE/Create'
import Update from './PAGES/UPDATE/Update'
import NotFound from './PAGES/404/NotFound'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<div>AuthLayout</div>}>
      <Route index element={<div>Home</div>} />
      <Route path='/home' element={<div>Home</div>} />
      <Route path='/create' element={<div>Create</div>} />
      <Route path='/update' element={<div>Update</div>} />
      <Route path='*' element={<div>NotFound</div>} />
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App