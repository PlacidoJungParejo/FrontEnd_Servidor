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
        const [modifiedDate, setModifiedDate] = useState('');
    
        const NameInput = useRef();
    
        useEffect(() => {
            NameInput.current.focus();
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
                                    <DivInput type='text' icon='fa-building' value={name} className='form-control' placeholder='Name' required ref={NameInput} handleChange={(e) => setName(e.target.value)} />
                                    {!Create ? (
                                        <>
                                            <DivInput type='text' icon='fa-id-card' value={cif} className='form-control' placeholder='CIF' required handleChange={(e) => setCif(e.target.value)} />
                                            <DivInput type='text' icon='fa-user' value={personInCharge} className='form-control' placeholder='Person In Charge' required handleChange={(e) => setPersonInCharge(e.target.value)} />
                                            <DivInput type='text' icon='fa-id-card' value={personInChargeID} className='form-control' placeholder='Person In Charge ID' required handleChange={(e) => setPersonInChargeID(e.target.value)} />
                                        </>
                                    ) : (
                                        <>
                                            <DivInput type='text' icon='fa-industry' value={type} className='form-control' placeholder='Type' handleChange={(e) => setType(e.target.value)} />
                                            <DivInput type='text' icon='fa-city' value={city} className='form-control' placeholder='City' required handleChange={(e) => setCity(e.target.value)} />
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
                <h1>Inscripciones</h1>
            </div>
        )
    }else if (type == "Usuarios"){
        return (
            <div>
                <h1>Inscripciones</h1>
            </div>
        )

    }
}

   

export default FormDep;