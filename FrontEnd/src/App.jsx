import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './Components/Nav';
import Departments from "./Views/Departments/Index";
import CreateDepartments from "./Views/Departments/Create";
import EditDepartments from "./Views/Departments/Edit";
import Users from "./Views/Users/Index";
import Login from './Views/Login'
import Register from './Views/Register'
import ProtectedRoutes from './Components/ProtectedRoutes'
import Inscriptions from "./Views/Inscriptions/Index";
import CreateInscription from "./Views/Inscriptions/Create";

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/inscriptions" element={<Inscriptions />} />
        <Route path="/inscriptions/create" element={<CreateInscription />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Departments />} />
          <Route path="/create" element={<CreateDepartments />} />
          <Route path="/edit/:id" element={<EditDepartments />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
