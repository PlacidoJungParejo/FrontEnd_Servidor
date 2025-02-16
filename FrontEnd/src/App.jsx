import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './Components/Nav';
import Company from "./Views/Company/Index";
import CreateCompany from "./Views/Company/Create";
import EditCompany from "./Views/Company/Edit";
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
        <Route path="/company" element={<Company />} />
        <Route path="/inscription" element={<Inscriptions />} />
        <Route path="/inscription/create" element={<CreateInscription />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Inscriptions />} />
          <Route path="company/create" element={<CreateCompany />} />
          <Route path="company/edit/:id" element={<EditCompany />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
