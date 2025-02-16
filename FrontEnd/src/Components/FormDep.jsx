import React, { useEffect, useState, useRef } from 'react';
import { sendRequest } from '../functions';
import DivInput from './DivInput';

const FormDep = ({ id, title }) => {
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

    const NameInput = useRef();

    useEffect(() => {
        NameInput.current.focus();
        if (id) {
            getDepartment();
        }
    }, [id]); 

    const getDepartment = async () => {
        console.log("Obteniendo departamento para ID:", id);
        const res = await sendRequest('GET', '', `/company/CSR/${id}`, '', true, "Datos obtenidos correctamente");
        console.log("Respuesta de getDepartment:", res);
        if (res) {
            if (res.name) setName(res.name);
            if (res.cif) setCif(res.cif);
            if (res.city) setCity(res.city);
            if (res.personInCharge) setPersonInCharge(res.personInCharge);
            if (res.personInChargeID) setPersonInChargeID(res.personInChargeID);
            if (res.type) setType(res.type);
            if (res.address) setAddress(res.address);
            if (res.area) setArea(res.area);
            if (res.postalCode) setPostalCode(res.postalCode);
            if (res.phone) setPhone(res.phone);
            if (res.email) setEmail(res.email);
        }
    };

    const save = async (e) => {
        e.preventDefault();
        let method;
        let url = '/company/CSR';
        let mensaje;
        let data = {};

        if (id) {
            method = 'PATCH';
            url = `/company/CSR/${id}`;
            mensaje = "Datos actualizados correctamente";
            data = { name, cif, city, personInCharge, personInChargeID, type, address, area, postalCode, phone, email };
        } else {
            method = 'POST';
            mensaje = "Compañía creada correctamente";
            data = { name, cif, city, personInCharge, personInChargeID, type, address, area, postalCode, phone, email };
        }

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
                                {/* Añadir más campos de entrada para los demás datos */}
                                <DivInput type='text' icon='fa-id-card' value={cif} className='form-control' placeholder='CIF' required handleChange={(e) => setCif(e.target.value)} />
                                <DivInput type='text' icon='fa-city' value={city} className='form-control' placeholder='City' required handleChange={(e) => setCity(e.target.value)} />
                                <DivInput type='text' icon='fa-user' value={personInCharge} className='form-control' placeholder='Person In Charge' required handleChange={(e) => setPersonInCharge(e.target.value)} />
                                <DivInput type='text' icon='fa-id-card' value={personInChargeID} className='form-control' placeholder='Person In Charge ID' required handleChange={(e) => setPersonInChargeID(e.target.value)} />
                                <DivInput type='text' icon='fa-industry' value={type} className='form-control' placeholder='Type' handleChange={(e) => setType(e.target.value)} />
                                <DivInput type='text' icon='fa-map-marker-alt' value={address} className='form-control' placeholder='Address' handleChange={(e) => setAddress(e.target.value)} />
                                <DivInput type='text' icon='fa-map' value={area} className='form-control' placeholder='Area' handleChange={(e) => setArea(e.target.value)} />
                                <DivInput type='number' icon='fa-envelope' value={postalCode} className='form-control' placeholder='Postal Code' handleChange={(e) => setPostalCode(e.target.value)} />
                                <DivInput type='tel' icon='fa-phone' value={phone} className='form-control' placeholder='Phone' handleChange={(e) => setPhone(e.target.value)} />
                                <DivInput type='email' icon='fa-envelope' value={email} className='form-control' placeholder='Email' handleChange={(e) => setEmail(e.target.value)} />
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
};

export default FormDep;
