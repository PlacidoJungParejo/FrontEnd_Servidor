import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendRequest } from '../functions'
import DivInput from '../Components/DivInput'

const Register = () => {
  const [nif, setNif] = useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const [repeat, setRepeat] = useState('')
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mal, setMal] = useState(true)
  const [contraMal, setContraMal] = useState(true)
  const go = useNavigate();

  const register = async (e) => {
    console.log(password)
    console.log(repeat)
    if(password === repeat){
      setMal(true)
      e.preventDefault();
      const form = { nif:nif, username:username, password:password, email: email, firstName: firstName, lastName: lastName };
      const res = await sendRequest('POST', form, '/users/CSR', '', false, "Usuario Registrado Correctamente");
      // Depuración: Ver qué responde el backend
    console.log("Respuesta del backend:", res);
      if (res) {
        go('/login')
      }
    }else{
      e.preventDefault()
      setMal(false)
      console.log("mala contraseña")
    }
    
  }

  function validarContrasena(e) {
    setPassword(e.target.value)
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&]{8,}$/;
    if(regex.test(e.target.value)){
      setContraMal(true)
    }else{
      e.preventDefault()
      setContraMal(false)
    }
  }
  return (
    <div className='container-fluid'>
      <div className="row mt-5">
        <div className='col-md-4 offset-md-4'>
          <div className='card border border-dark'>
            <div className='card-header bg-dark border boder-dark text-white'>
              REGISTER
            </div>
            <div className='card-body'>
              <form onSubmit={register}>
                <DivInput type='text' icon='fa-user' value={nif} className='form-control' placeholder='NIF' required='required' handleChange={(e) => setNif(e.target.value)} />
                <DivInput type='text' icon='fa-user' value={username} className='form-control' placeholder='Username' required='required' handleChange={(e) => setUsername(e.target.value)} />
                <DivInput type='text' icon='fa-user' value={firstName} className='form-control' placeholder='First name' required='required' handleChange={(e) => setFirstName(e.target.value)} />
                <DivInput type='text' icon='fa-user' value={lastName} className='form-control' placeholder='Last name' required='required' handleChange={(e) => setLastName(e.target.value)} />
                <DivInput type='email' icon='fa-at' value={email} className='form-control' placeholder='Email' required='required' handleChange={(e) => setEmail(e.target.value)} />
                <DivInput type='password' icon='fa-key' value={password} className='form-control' placeholder='Password' required='required' handleChange={(e) => validarContrasena(e)} />
                <p hidden={contraMal}>La contraseña debe contener al menos 8 carácteres y al menos 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial</p>
                <DivInput type='password' icon='fa-key' value={repeat} className='form-control' placeholder='Repeat password' required='required' handleChange={(e) => setRepeat(e.target.value)} />
                <p hidden={mal}>Las contraseñas no coinciden</p>
                <div className='d-grid col-10 mx-auto'>
                  <button className='btn btn-dark'>
                    <i className='fa-solid fa-door-open'></i> Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
