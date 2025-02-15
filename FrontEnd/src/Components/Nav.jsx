import { Link, useNavigate } from 'react-router-dom';
import storage from '../Storage/storage';
import {show_alerta} from "../functions"
import axios from 'axios'; // Asegúrate de importar axios



const Nav = () => {
  const go = useNavigate();

  function goLogin(){
    go("/login")
  }

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
              <Link to='/inscription' className='nav-link'>Inscripciones</Link>
            </li>
          </ul>
          
        </div>
      ) : '' }
      <ul className='navbar-nav mx-auto mb-2'>
            <li className='nav-item px-lg-5'>
              <button className='btn btn-info' onClick={goLogin}>Login</button>
            </li>
          </ul>
    </nav>
  );
};

export default Nav;

