import React, { useEffect, useState, useRef } from 'react';
import { sendRequest } from '../functions';
import DivInput from './DivInput';
import DivSelect from './DivSelect';
import { useNavigate, Link } from 'react-router-dom'
const FormUser = ({ id, title, Create = false , type, Superadministrador = false}) => {
    if (type == "Usuarios"){
        const go = useNavigate();
        const [profile, setProfile] = useState('')
        const [nif, setNif] = useState('');
        const [username, setUsername] = useState('');
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        useEffect(() => {
            if (id) {
                getUsuarios();
            }
        }, [id]); 

        const getUsuarios = async () => {
            console.log("Obteniendo departamento para ID:", id);
            let res = await sendRequest('GET', '', `/users/CSR/${id}`, '', true, "Datos obtenidos correctamente");
            res = res[0]
            console.log("Respuesta de getUsuarios:", res);


            if (res) {
                setNif(res.nif || '');
                setUsername(res.username || '');
                setFirstName(res.firstName || '');
                setLastName(res.lastName || '');
                setEmail(res.email || '');
                setPassword(res.password || '');
                setProfile(res.profile || '')
            }
        };



        const save = async (e) => {
            e.preventDefault();
            let method = id ? 'PATCH' : 'POST';
            let url = id ? `/users/CSR/${id}` : '/users/CSR';
            let mensaje = id ? "Datos actualizados correctamente" : "Usuario creado correctamente";
            
            let data = Create
                ? { nif, username, firstName, lastName, email, password, profile }
                : { username, firstName, lastName, email, profile };
        
            console.log("Datos que se envían en la petición:", data);
        
            const res = await sendRequest(method, data, url, '/users', true, mensaje);
            console.log("Respuesta de la API:", res);
        };
        
        return (
            <div className='container-fluid'>
                <div className='row mt-5'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='card border border-warning border-3'>
                            <div className='card-header text-black border border-warning border-2'>
                                {title}
                            </div>
                            <div className='card-body'>
                                <form onSubmit={save}>
                                    {!Create ? (
                                        <>
                                            <DivInput type='text' icon='fa-id-card' value={username} className='form-control' placeholder='Usuario' required handleChange={(e) => setUsername(e.target.value)} />
                                            <DivInput type='text' icon='fa-id-card' value={firstName} className='form-control' placeholder='Nombre' required handleChange={(e) => setFirstName(e.target.value)} />
                                            <DivInput type='text' icon='fa-id-card' value={lastName} className='form-control' placeholder='Apellido' required handleChange={(e) => setLastName(e.target.value)} />
                                            <DivInput type='text' icon='fa-id-card' value={email} className='form-control' placeholder='Email' required handleChange={(e) => setEmail(e.target.value)} />
                                            {Superadministrador && <DivSelect icon='fa-building' value={profile} className='form-control' placeholder='Perfil' handleChange={(e) => setProfile(e.target.value)} options={(([{ label: "Usuario", value: "USER"}, {label: "Administrador", value: "ADMIN"} ]))} />}                                  
                                        </>
                                    ) : (
                                        <>
                                            <DivInput type='text' icon='fa-industry' value={nif} className='form-control' placeholder='Nif' handleChange={(e) => setNif(e.target.value)} />
                                            <DivInput type='text' icon='fa-building' value={username} className='form-control' placeholder='Usuario' required handleChange={(e) => setUsername(e.target.value)} />
                                            <DivInput type='text' icon='fa-industry' value={firstName} className='form-control' placeholder='Nombre' handleChange={(e) => setFirstName(e.target.value)} />
                                            <DivInput type='text' icon='fa-city' value={lastName} className='form-control' placeholder='Apellido' handleChange={(e) => setLastName(e.target.value)} />
                                            <DivInput type='email' icon='fa-industry' value={email} className='form-control' placeholder='Email' handleChange={(e) => setEmail(e.target.value)} />
                                            <DivInput type='password' icon='fa-industry' value={password} className='form-control' placeholder='Password' handleChange={(e) => setPassword(e.target.value)} /> 
                                            {Superadministrador && <DivSelect icon='fa-building' value={profile} className='form-control' placeholder='Perfil' handleChange={(e) => setProfile(e.target.value)} options={(([{ label: "Usuario", value: "USER"}, {label: "Administrador", value: "ADMIN"} ]))} />}                                  
                                  
                                        </>
                                        
                                    )}
                                    {

                                    }
                                    <div className='d-grid col-10 mx-auto'>
                                        <button className='btn btn-dark'>
                                            <i className='fa-solid fa-save'></i> Guardar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )}
}

export default FormUser;