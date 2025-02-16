import React, { useEffect, useState, useRef } from 'react';
import { sendRequest } from '../functions';
import DivInput from './DivInput';

const FormDep = ({ id, title, Create = false , type}) => {

    if (type == "Compañia") {
        const [name, setName] = useState('');
        const [cif, setCif] = useState('');
        const [city, setCity] = useState('');
        const [personInCharge, setPersonInCharge] = useState('');
        const [personInChargeID, setPersonInChargeID] = useState('');
        const [type, setType] = useState('');
        const [address, setAddress] = useState('');
        const [area, setArea] = useState('');
        const [postalCode, setPostalCode] = useState('');
        const [phone, setPhone] = useState('');
        const [email, setEmail] = useState('');
        const [createdDate, setCreatedDate] = useState('');
        const [modifiedDate, setModifiedDate] = useState('');
    
    
        useEffect(() => {
            if (id) {
                getCompañia();
            }
        }, [id]); 
    
        const getCompañia = async () => {
            console.log("Obteniendo departamento para ID:", id);
            const res = await sendRequest('GET', '', `/company/CSR/${id}`, '', true, "Datos obtenidos correctamente");
            console.log("Respuesta de getCompañia:", res);
            if (res) {
                setName(res.name || '');
                setCif(res.cif || '');
                setCity(res.city || '');
                setPersonInCharge(res.personInCharge || '');
                setPersonInChargeID(res.personInChargeID || '');
                setType(res.type || '');
                setAddress(res.address || '');
                setArea(res.area || '');
                setPostalCode(res.postalCode || '');
                setPhone(res.phone || '');
                setEmail(res.email || '');
                setModifiedDate(res.modifiedDate || '');
            }
        };
    
        const save = async (e) => {
            e.preventDefault();
            let method = id ? 'PATCH' : 'POST';
            let url = id ? `/company/CSR/${id}` : '/company/CSR';
            let mensaje = id ? "Datos actualizados correctamente" : "Compañía creada correctamente";
            let data = Create
                ? { name, cif, city, personInCharge, personInChargeID, type, address, area, postalCode, phone, email }
                : { name, type, city, address, area, postalCode, phone, email, modifiedDate };
    
            const res = await sendRequest(method, data, url, '', true, mensaje);
            console.log("Respuesta de save:", res);
            if (res.status === true) {
                setName('Indefinido');
                setCif('');
                setCity('');
                setPersonInCharge('');
                setPersonInChargeID('');
                setType('');
                setAddress('');
                setArea('');
                setPostalCode('');
                setPhone('');
                setEmail('');
                setModifiedDate('');
                setCreatedDate(new Date().toLocaleDateString)
                setModifiedDate(new Date().toLocaleDateString)
            }
        };
    
        return (
            <div className='container-fluid'>
                <div className='row mt-5'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='card border border-info'>
                            <div className='card-header gb-info border border-info'>
                                {title}
                            </div>
                            <div className='card-body'>
                                <form onSubmit={save}>
                                    {!Create ? (
                                        <>
                                            <DivInput type='text' icon='fa-id-card' value={type} className='form-control' placeholder='Tipo' required handleChange={(e) => setType(e.target.value)} />
                                            <DivInput type='text' icon='fa-id-card' value={city} className='form-control' placeholder='Ciudad' required handleChange={(e) => setCity(e.target.value)} />
                                            <DivInput type='text' icon='fa-id-card' value={area} className='form-control' placeholder='Area' required handleChange={(e) => setArea(e.target.value)} />
                                            <DivInput type='text' icon='fa-id-card' value={postalCode} className='form-control' placeholder='Codigo postal' required handleChange={(e) => setPostalCode(e.target.value)} />
                                            <DivInput type='text' icon='fa-id-card' value={address} className='form-control' placeholder='Dirección' required handleChange={(e) => setAddress(e.target.value)} />
                                            <DivInput type='text' icon='fa-id-card' value={phone} className='form-control' placeholder='Teléfono' required handleChange={(e) => setPhone(e.target.value)} />
                                            <DivInput type='text' icon='fa-id-card' value={email} className='form-control' placeholder='Email' required handleChange={(e) => setEmail(e.target.value)} />
                                        </>
                                    ) : (
                                        <>
                                            <DivInput type='text' icon='fa-industry' value={cif} className='form-control' placeholder='Cif' handleChange={(e) => setCif(e.target.value)} />
                                            <DivInput type='text' icon='fa-building' value={name} className='form-control' placeholder='Name' required handleChange={(e) => setName(e.target.value)} />
                                            <DivInput type='text' icon='fa-industry' value={type} className='form-control' placeholder='Type' handleChange={(e) => setType(e.target.value)} />
                                            <DivInput type='text' icon='fa-city' value={city} className='form-control' placeholder='City' required handleChange={(e) => setCity(e.target.value)} />
                                            <DivInput type='text' icon='fa-industry' value={personInCharge} className='form-control' placeholder='setPersonInCharge' handleChange={(e) => setPersonInCharge(e.target.value)} />
                                            <DivInput type='text' icon='fa-industry' value={personInChargeID} className='form-control' placeholder='setPersonInChargeID' handleChange={(e) => setPersonInChargeID(e.target.value)} />
                                            <DivInput type='text' icon='fa-map-marker-alt' value={address} className='form-control' placeholder='Address' handleChange={(e) => setAddress(e.target.value)} />
                                            <DivInput type='text' icon='fa-map' value={area} className='form-control' placeholder='Area' handleChange={(e) => setArea(e.target.value)} />
                                            <DivInput type='number' icon='fa-envelope' value={postalCode} className='form-control' placeholder='Postal Code' handleChange={(e) => setPostalCode(e.target.value)} />
                                            <DivInput type='tel' icon='fa-phone' value={phone} className='form-control' placeholder='Phone' handleChange={(e) => setPhone(e.target.value)} />
                                            <DivInput type='email' icon='fa-envelope' value={email} className='form-control' placeholder='Email' handleChange={(e) => setEmail(e.target.value)} />
                                        </>
                                    )}
                                    <div className='d-grid col-10 mx-auto'>
                                        <button className='btn btn-dark'>
                                            <i className='fa-solid fa-save'></i> Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }else if (type == "Inscripcion"){
        return (
            <div>
                <h1>Inscripciones Crear</h1>
            </div>
        )

// -------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------USUARIOS--------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------
    }else if (type == "Usuarios"){
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
            }
        };
    
        const save = async (e) => {
            e.preventDefault();
            let method = id ? 'PATCH' : 'POST';
            let url = id ? `/users/CSR/${id}` : '/users/CSR';
            let mensaje = id ? "Datos actualizados correctamente" : "Usuario creado correctamente";
            let data = Create
                ? { nif, username, firstName, lastName, email, password }
                : { username, firstName, lastName, email };
    
            const res = await sendRequest(method, data, url, '', true, mensaje);
            console.log("Respuesta de save:", res);
        };
    
        return (
            <div className='container-fluid'>
                <div className='row mt-5'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='card border border-info'>
                            <div className='card-header gb-info border border-info'>
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
                                        </>
                                    ) : (
                                        <>
                                            <DivInput type='text' icon='fa-industry' value={nif} className='form-control' placeholder='Nif' handleChange={(e) => setNif(e.target.value)} />
                                            <DivInput type='text' icon='fa-building' value={username} className='form-control' placeholder='Usuario' required handleChange={(e) => setUsername(e.target.value)} />
                                            <DivInput type='text' icon='fa-industry' value={firstName} className='form-control' placeholder='Nombre' handleChange={(e) => setFirstName(e.target.value)} />
                                            <DivInput type='text' icon='fa-city' value={lastName} className='form-control' placeholder='Apellido' handleChange={(e) => setLastName(e.target.value)} />
                                            <DivInput type='email' icon='fa-industry' value={email} className='form-control' placeholder='Email' handleChange={(e) => setEmail(e.target.value)} />
                                            <DivInput type='password' icon='fa-industry' value={password} className='form-control' placeholder='Password' handleChange={(e) => setPassword(e.target.value)} />
                                        </>
                                    )}
                                    <div className='d-grid col-10 mx-auto'>
                                        <button className='btn btn-dark'>
                                            <i className='fa-solid fa-save'></i> Save
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

   

export default FormDep;