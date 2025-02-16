import React, { useEffect, useState, useRef } from 'react';
import { sendRequest } from '../functions';
import DivInput from './DivInput';

const FormIns = ({ id, title }) => {
    const [idUser, setIdUser] = useState('');
    const [idEmpresa, setIdEmpresa] = useState('');
    const [fecIni, setFecIni] = useState('');
    const [fecFin, setFecFin] = useState('');
    const [observaciones, setObservaciones] = useState('');


    useEffect(() => {
        if (id) {
            getInscription();
        }
    }, [id]);

    const getInscription = async () => {
        console.log("Obteniendo inscripción para ID:", id);
        const res = await sendRequest('GET', '', `/inscription/CSR/${id}`, '', true, "Datos obtenidos correctamente");
        
        if (res) {
            setIdUser(res.idUser || '');
            setIdEmpresa(res.idEmpresa || '');
            setFecIni(res.fecIni || '');
            setFecFin(res.fecFin || '');
            setObservaciones(res.observaciones || '');
        }
    };

    const save = async (e) => {
        e.preventDefault();
        let method = id ? 'PATCH' : 'POST';
        let url = id ? `/inscription/CSR/${id}` : '/inscription/CSR';
        let mensaje = id ? "Inscripción actualizada correctamente" : "Inscripción creada correctamente";

        const data = {
            idUser,
            idEmpresa,
            fecIni,
            fecFin,
            observaciones
        };

        const res = await sendRequest(method, data, url, '', true, mensaje);
        console.log("Respuesta de save:", res);

        if (res.status === true) {
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
                        <div className='card-header bg-info text-white border border-info'>
                            {title}
                        </div>
                        <div className='card-body'>
                            <form onSubmit={save}>
                                <DivInput 
                                    type='number' 
                                    icon='fa-id-card' 
                                    value={idUser} 
                                    className='form-control' 
                                    placeholder='ID Usuario' 
                                    required 
                                    handleChange={(e) => setIdUser(e.target.value)} 
                                />
                                <DivInput 
                                    type='text' 
                                    icon='fa-building' 
                                    value={idEmpresa} 
                                    className='form-control' 
                                    placeholder='ID Empresa' 
                                    required 
                                    handleChange={(e) => setIdEmpresa(e.target.value)} 
                                />
                                <DivInput 
                                    type='date' 
                                    icon='fa-calendar-days' 
                                    value={fecIni} 
                                    className='form-control' 
                                    placeholder='Fecha Inicio' 
                                    required 
                                    handleChange={(e) => setFecIni(e.target.value)} 
                                />
                                <DivInput 
                                    type='date' 
                                    icon='fa-calendar-days' 
                                    value={fecFin} 
                                    className='form-control' 
                                    placeholder='Fecha Final' 
                                    handleChange={(e) => setFecFin(e.target.value)} 
                                />
                                <DivInput 
                                    type='text' 
                                    icon='fa-magnifying-glass' 
                                    value={observaciones} 
                                    className='form-control' 
                                    placeholder='Observaciones' 
                                    handleChange={(e) => setObservaciones(e.target.value)} 
                                />
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
};

export default FormIns;
