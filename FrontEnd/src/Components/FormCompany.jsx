import React, { useEffect, useState, useRef } from 'react';
import { sendRequest } from '../functions';
import DivInput from './DivInput';

const FormCompany = ({ id, title, Create = false , type}) => {

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
    
            const res = await sendRequest(method, data, url, '/company', true, mensaje);
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
                        <div className='card border border-warning border-3'>
                            <div className='card-header border border-warning border-1'>
                                {title}
                            </div>
                            <div className='card-body'>
                                <form onSubmit={save}>
                                    {!Create ? (
                                        <>
                                            <DivInput type='text' icon='fa-id-card' value={type} className='form-control' placeholder='Tipo' required handleChange={(e) => setType(e.target.value)} />
                                            <DivInput type='text' icon='fa-id-card' value={city} className='form-control' placeholder='Ciudad' required handleChange={(e) => setCity(e.target.value)} />
                                            <DivInput type='text' icon='fa-id-card' value={area} className='form-control' placeholder='Area' required handleChange={(e) => setArea(e.target.value)} />
                                            <DivInput type='number' icon='fa-id-card' value={postalCode} className='form-control' placeholder='Codigo postal' required handleChange={(e) => setPostalCode(e.target.value)} />
                                            <DivInput type='text' icon='fa-id-card' value={address} className='form-control' placeholder='Dirección' required handleChange={(e) => setAddress(e.target.value)} />
                                            <DivInput type='tel' icon='fa-id-card' value={phone} className='form-control' placeholder='Teléfono' required handleChange={(e) => setPhone(e.target.value)} />
                                            <DivInput type='email' icon='fa-id-card' value={email} className='form-control' placeholder='Email' required handleChange={(e) => setEmail(e.target.value)} />
                                        </>
                                    ) : (
                                        <>
                                            <DivInput type='text' icon='fa-industry' value={cif} className='form-control' placeholder='Cif' handleChange={(e) => setCif(e.target.value)} />
                                            <DivInput type='text' icon='fa-building' value={name} className='form-control' placeholder='Name' required handleChange={(e) => setName(e.target.value)} />
                                            <DivInput type='text' icon='fa-industry' value={type} className='form-control' placeholder='Type' handleChange={(e) => setType(e.target.value)} />
                                            <DivInput type='text' icon='fa-city' value={city} className='form-control' placeholder='City' required handleChange={(e) => setCity(e.target.value)} />
                                            <DivInput type='text' icon='fa-industry' value={personInCharge} className='form-control' placeholder='setPersonInCharge' handleChange={(e) => setPersonInCharge(e.target.value)} />
                                            <DivInput type='number' icon='fa-industry' value={personInChargeID} className='form-control' placeholder='setPersonInChargeID' handleChange={(e) => setPersonInChargeID(e.target.value)} />
                                            <DivInput type='text' icon='fa-map-marker-alt' value={address} className='form-control' placeholder='Address' handleChange={(e) => setAddress(e.target.value)} />
                                            <DivInput type='text' icon='fa-map' value={area} className='form-control' placeholder='Area' handleChange={(e) => setArea(e.target.value)} />
                                            <DivInput type='number' icon='fa-envelope' value={postalCode} className='form-control' placeholder='Postal Code' handleChange={(e) => setPostalCode(e.target.value)} />
                                            <DivInput type='tel' icon='fa-phone' value={phone} className='form-control' placeholder='Phone' handleChange={(e) => setPhone(e.target.value)} />
                                            <DivInput type='email' icon='fa-envelope' value={email} className='form-control' placeholder='Email' handleChange={(e) => setEmail(e.target.value)} />
                                        </>
                                    )}
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
        );
    }
}

   

export default FormCompany;