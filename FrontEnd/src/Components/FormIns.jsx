import React, { useEffect, useState } from 'react';
import { sendRequest } from '../functions';
import DivInput from './DivInput';
import DivSelect from './DivSelect';

const FormIns = ({ id, title }) => {
    const [idUser, setIdUser] = useState('');
    const [idEmpresa, setIdEmpresa] = useState('');
    const [fecIni, setFecIni] = useState('');
    const [fecFin, setFecFin] = useState('');
    const [observaciones, setObservaciones] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [empresas, setEmpresas] = useState([]);

    useEffect(() => {
        if (id) {
            getInscription();
        }
        getUsuariosAndEmpresas();
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

    const getUsuariosAndEmpresas = async () => {
        const [usuariosRes, empresasRes] = await Promise.all([
            sendRequest('GET', '', '/users/CSR', '', true, "Usuarios obtenidos correctamente"),
            sendRequest('GET', '', '/company/CSR', '', true, "Empresas obtenidas correctamente")
        ]);

        if (usuariosRes && Array.isArray(usuariosRes)) {
            setUsuarios(usuariosRes.filter(user => !user.idEmpresa));
        }

        if (empresasRes && empresasRes.empresas) {
            setEmpresas(empresasRes.empresas);
        }
    };

    const save = async (e) => {
        e.preventDefault();
        let method = id ? 'PATCH' : 'POST';
        let url = id ? `/inscription/CSR/${id}` : '/inscription/CSR';
        let mensaje = id ? "Inscripción actualizada correctamente" : "Inscripción creada correctamente";
    
        const formatDate = (date) => {
            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`;
        };
    
        const data = {
            IdUser: idUser,
            IdCompany: idEmpresa,
            FecIni: formatDate(fecIni),
            FecFin: formatDate(fecFin),
            Observaciones: observaciones
        };
    
        console.log("Datos a enviar:", data);
    
        const res = await sendRequest(method, data, url, '', true, mensaje);
        console.log("Respuesta de save:", res);
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
                                <DivSelect 
                                    icon='fa-id-card' 
                                    value={idUser} 
                                    className='form-control' 
                                    placeholder='ID Usuario' 
                                    required 
                                    handleChange={(e) => setIdUser(e.target.value)} 
                                    options={usuarios.map(user => ({ label: `${user.firstName} ${user.lastName}`, value: user.idUser }))} 
                                />
                                <DivSelect 
                                    icon='fa-building' 
                                    value={idEmpresa} 
                                    className='form-control' 
                                    placeholder='ID Empresa' 
                                    required 
                                    handleChange={(e) => setIdEmpresa(e.target.value)} 
                                    options={empresas.map(empresa => ({ label: empresa.name, value: empresa._id }))} 
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
