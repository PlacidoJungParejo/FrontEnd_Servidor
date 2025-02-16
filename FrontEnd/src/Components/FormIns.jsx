import React, { useEffect, useState, useRef } from 'react';
import { sendRequest } from '../functions';
import DivInput from './DivInput';

const FormIns = ({ id, title }) => {
    const [idInscription, setidInscription] = useState('');
    const [idUser, setIdUser] = useState(0);
    const [idEmpresa, setIdEmpresa] = useState('');
    const [fecIni, setFecIni] = useState('');
    const [fecFin, setFecFin] = useState('');
    const [observaciones, setObservaciones] = useState('');

    const NameInput = useRef();

    useEffect(() => {
        NameInput.current.focus();
        if (id) {
            getInscription();
        }
    }, [id]); 

    const getInscription = async () => {
        console.log("Obteniendo departamento para ID:", id);
        const res = await sendRequest('GET', '', `/inscription/CSR/${id}`, '', true, "Datos obtenidos correctamente");
        console.log("Respuesta de getInscription:", res);
        if (res) {
            if (res.idUser) setIdUser(res.idUser);
            if (res.idEmpresa) setIdEmpresa(res.idEmpresa);
            if (res.fecIni) setFecIni(res.fecIni);
            if (res.fecFin) setFecFin(res.fecFin);
            if (res.observaciones) setObservaciones(res.observaciones);
        }
    };

    const save = async (e) => {
        e.preventDefault();
        let method;
        let url = '/inscription/CSR';
        let mensaje;
        let data = {};

        if (id) {
            method = 'PATCH';
            url = `/inscription/CSR/${id}`;
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
            setidInscription('Indefinido')
            setIdUser('');
            setIdEmpresa('');
            setFecIni('');
            setFecFin('');
            setObservaciones('');
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
                                {/* Añadir más campos de entrada para los demás datos */}
                                <DivInput type='num' icon='fa-id-card' value={idUser} className='form-control' placeholder='ID Usuario' required handleChange={(e) => setIdUser(e.target.value)} />
                                <DivInput type='text' icon='fa-id-card' value={idEmpresa} className='form-control' placeholder='ID Empresa' required handleChange={(e) => setIdEmpresa(e.target.value)} />
                                <DivInput type='text' icon='fa-calendar-days' value={fecIni} className='form-control' placeholder='Fecha Inicio' required handleChange={(e) => setFecIni(e.target.value)} />
                                <DivInput type='text' icon='fa-calendar-days' value={fecFin} className='form-control' placeholder='Fecha Final' required handleChange={(e) => setFecFin(e.target.value)} />
                                <DivInput type='text' icon='fa-magnifying-glass' value={observaciones} className='form-control' placeholder='Observaciones' handleChange={(e) => setObservaciones(e.target.value)} />
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

export default FormIns;