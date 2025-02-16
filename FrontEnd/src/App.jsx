import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Nav from './Components/Nav';
import Company from "./Views/Company/Index";
import CreateCompany from "./Views/Company/Create";
import EditCompany from "./Views/Company/Edit";
import ViewCompany from "./Views/Company/View"
import Users from "./Views/Users/Index";
import CreateUsers from "./Views/Users/Create";
import EditUsers from "./Views/Users/Edit";
import Login from './Views/Login'
import Register from './Views/Register'
import ProtectedRoutes from './Components/ProtectedRoutes'
import Inscriptions from "./Views/Inscriptions/Index";
import CreateInscription from "./Views/Inscriptions/Create";
import ViewUser from "./Views/Users/View";

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
          <Route path="company/view/:id" element={<ViewCompany />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/create" element={<CreateUsers />} />
          <Route path="/users/edit/:id" element={<EditUsers />} />
          <Route path="/users/view/:id" element={<ViewUser />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
