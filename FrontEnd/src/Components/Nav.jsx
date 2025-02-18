import { Link, useNavigate } from 'react-router-dom';
import storage from '../Storage/storage';
import image from "./img/logo.png"
import "./styles/nav.css"


const Nav = () => {

  return (
    <nav className='navbar navbar-expand-lg navbar-white'>
      <div className='container-fluid'>
        <a className='navbar-brand'><img src={image} alt="JTP" /></a>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#nav' aria-controls='navbarSupportedContent'>
          <span className='navbar-toggler-icon'></span>
        </button>
      </div>
      { storage.get('authUser') ? (
        <div className='collapse navbar-collapse' id='nav'>
          <ul className='navbar-nav mx-auto mb-2'>
            <li className='nav-item px-lg-5'>
              <Link to='/company' className='nav-link'>Company</Link>
            </li>
            <li className='nav-item px-lg-5'>
              <Link to='/users' className='nav-link'>Users</Link>
            </li>
            <li className='nav-item px-lg-5'>
              <Link to='/inscription' className='nav-link'>Inscripciones</Link>
            </li>
            <li className='nav-item px-lg-5'>
              <Link to='/favoritos' className='nav-link'>Favoritos</Link>
            </li>
          </ul>
          
          </div>
      ) : '' }
      <div className='collapse navbar-collapse' id='nav'>
      <ul className='navbar-nav mx-auto mb-2'>
          <li className='nav-item px-lg-5'>
            <Link to='/login' className='nav-link'>{storage.get("authUser") ? "Perfil" : "Login"}</Link>
          </li>
      </ul>
      </div>
    </nav>
  );
};

export default Nav;

