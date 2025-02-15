import { Link, useNavigate } from 'react-router-dom';
import storage from '../Storage/storage';
import axios from 'axios'; // Asegúrate de importar axios

const Nav = () => {
  const go = useNavigate();

  const logout = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:3033/api/v4/users/CSR/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${storage.get("authToken")}`,
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );

      // Eliminar token correctamente
      storage.remove("authToken");
      storage.remove("authUser");

      // Redirigir al login
      go("/login");
    } catch (error) {
      console.error("Error en logout:", error);
    }
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-white bg-info'>
      <div className='container-fluid'>
        <a className='navbar-brand'>Company</a>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#nav' aria-controls='navbarSupportedContent'>
          <span className='navbar-toggler-icon'></span>
        </button>
      </div>
      { storage.get('authUser') ? (
        <div className='collapse navbar-collapse' id='nav'>
          <ul className='navbar-nav mx-auto mb-2'>
            <li className='nav-item px-lg-5'>
              <Link to='/' className='nav-link'>Departments</Link>
            </li>
            <li className='nav-item px-lg-5'>
              <Link to='/users' className='nav-link'>Users</Link>
            </li>
            <li className='nav-item px-lg-5'>
              <Link to='/inscriptions' className='nav-link'>Inscripciones</Link>
            </li>
          </ul>
          <ul className='navbar-nav mx-auto mb-2'>
            <li className='nav-item px-lg-5'>
              <button className='btn btn-info' onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      ) : '' }
    </nav>
  );
};

export default Nav;
