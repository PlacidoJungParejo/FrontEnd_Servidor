import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { sendRequest, show_alerta } from '../functions'
import DivInput from '../Components/DivInput'
import storage from '../Storage/storage'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const go = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    const form = { username: username, password: password };
    
    // Depuración: Ver qué se envía al backend
    console.log("Enviando datos:", form); 

    const res = await sendRequest('POST', form, '/users/CSR/login', '', false);

    // Depuración: Ver qué responde el backend
    console.log("Respuesta del backend:", res.data);

    console.log(res.data);
    if (res.data != undefined) {
        storage.set('authToken', res.token);
        storage.set('authUser', res.data);
        go("/inscription")
    } else {
        show_alerta("Error al iniciar sesion, credenciales inválidas", "error")
        console.error("Error al iniciar sesion, credenciales inválidas");
    }
};

const logout = async () => {
  try {
    await axios.post(
      "http://127.0.0.1:3033/api/v4/users/CSR/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${storage.get("authToken")}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (storage.get("authToken")) {
      // Redirigir al login
      go("/login");
      // Eliminar token correctamente
      storage.remove("authToken");
      storage.remove("authUser");
      setUsername("")
      setPassword("")
      show_alerta("Sesión cerrada con éxito", "success")
    }
    
  } catch (error) {
    if (!storage.get("authToken")) {
      show_alerta("No se puede cerrar sesión si no hay una sesión iniciada", "error")
    }
  }
};

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
                <DivInput type='password' icon='fa-key' value={password} className='form-control' placeholder='Password' required='required' handleChange={(e) => setPassword(e.target.value)} />
                <div className='d-grid col-10 mx-auto'>
                  <button className='btn btn-dark'>
                    <i className='fa-solid fa-door-open'></i> Login
                  </button>
                </div>
              </form>
              <br />
              <Link to='/register'>
                <i className='fa-solid fa-user-plus'></i> Register
              </Link>
              <button className='btn btn-info' onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
