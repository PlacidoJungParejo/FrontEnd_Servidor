import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sendRequest, show_alerta } from '../functions';
import DivInput from '../Components/DivInput';
import storage from '../Storage/storage';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [contraMal, setContraMal] = useState(true);
  const go = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const form = { username, password };

    const res = await sendRequest('POST', form, '/users/CSR/login', '', false, "Iniciado sesión correctamente");

    if (res.data) {
      storage.set('authToken', res.token);
      storage.set('authUser', res.data);
      storage.set('profile', res.data.profile);
      go("/company");
    } else {
      show_alerta("Error al iniciar sesión, credenciales inválidas", "error");
    }
  };

  const logout = async () => {
    try {
      await sendRequest('POST', {}, '/users/CSR/logout', '', true);
      
      storage.remove("authToken");
      storage.remove("authUser");
      storage.remove("profile");
      setUsername("");
      setPassword("");
      show_alerta("Sesión cerrada con éxito", "success");
      go("/login");
    } catch (error) {
      show_alerta("No se pudo cerrar sesión", "error");
    }
  };

  function validarContrasena(e) {
    setPassword(e.target.value);

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&]{8,}$/;
    setContraMal(regex.test(e.target.value));
  }

  // Verifica si el usuario está autenticado
  const authUser = storage.get("authUser");
  const authToken = storage.get("authToken");

  if (authUser && authToken) {
    return (
      <div className='container-fluid'>
        <div className="row mt-5">
          <div className='col-md-4 offset-md-4'>
            <div className='card border border-dark'>
              <div className='card-header bg-dark border boder-dark text-white'>
                PERFIL
              </div>
              <div className='card-body text-center'>
                <h5>{authUser.username}</h5>
                <p>{authUser.email}</p>
                <p><strong>Rol:</strong> {authUser.profile}</p>
                <button className='btn btn-info m-2' onClick={logout}>
                  <i className='fa-solid fa-sign-out-alt'></i> Cerrar Sesión
                </button>
                <Link to='/register' className='btn btn-dark m-2'>
                  <i className='fa-solid fa-user-plus'></i> Registrarse
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container-fluid'>
      <div className="row mt-5">
        <div className='col-md-4 offset-md-4'>
          <div className='card border border-dark'>
            <div className='card-header bg-dark border boder-dark text-white'>
              LOGIN
            </div>
            <div className='card-body'>
              <form onSubmit={login}>
                <DivInput type='text' icon='fa-at' value={username} className='form-control' placeholder='Username...' required='required' handleChange={(e) => setUsername(e.target.value)} />
                <DivInput type='password' icon='fa-key' value={password} className='form-control' placeholder='Password' required='required' handleChange={validarContrasena} />
                <p hidden={contraMal} className='text-danger'>
                  La contraseña debe contener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.
                </p>
                <div className='d-grid col-10 mx-auto'>
                  <button className='btn btn-dark'>
                    <i className='fa-solid fa-door-open'></i> Login
                  </button>
                </div>
              </form>
              <br />
              <Link to='/register'>
                <i className='fa-solid fa-user-plus'></i> Registrarse
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
