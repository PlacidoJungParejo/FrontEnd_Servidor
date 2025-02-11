import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './Components/Nav';
import Departments from "./Views/Departments/Index";
import CreateDepartments from "./Views/Departments/Create";
import EditDepartments from "./Views/Departments/Edit";
import Employees from "./Views/Employees/Index";
import Login from './Views/Login'
import Register from './Views/Register'
import ProtectedRoutes from './Components/ProtectedRoutes'

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Departments />} />
          <Route path="/create" element={<CreateDepartments />} />
          <Route path="/edit/:id" element={<EditDepartments />} />
          <Route path="/Employees" element={<Employees />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

//Video dejado en min 58:49

export default App
