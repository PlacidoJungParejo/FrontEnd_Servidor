import React, { useEffect, useState } from 'react';
import { sendRequest } from '../functions';
import DivInput from './DivInput';
import DivSelect from './DivSelect';

const FormIns = ({ id, title, Create = false }) => {
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
        const res = await sendRequest('GET', '', '/inscription/CSR', '', true, "Inscripción realizada correctamente");
    
        if (res && Array.isArray(res)) {
            const inscription = res.find(item => item._id === id);
            
            if (inscription) {
                setIdUser(inscription.IdUser || '');
                setIdEmpresa(inscription.IdCompany || '');
                setFecIni(formatDateToInputFormat(inscription.FecIni) || '');
                setFecFin(formatDateToInputFormat(inscription.FecFin) || '');
                setObservaciones(inscription.Observaciones || '');
            } else {
                console.log("Inscripción no encontrada para el ID:", id);
            }
        }
    };
    
    const formatDateToInputFormat = (date) => {
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`;
    };
    
    const formatDateSlash = (date) => {
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`;
    };
    
    const getUsuariosAndEmpresas = async () => {
        const [usuariosRes, empresasRes, inscripcionesRes] = await Promise.all([
            sendRequest('GET', '', '/users/CSR', '', true, "Usuarios obtenidos correctamente"),
            sendRequest('GET', '', '/company/CSR', '', true, "Empresas obtenidas correctamente"),
            sendRequest('GET', '', '/inscription/CSR', '', true, "Inscripciones obtenidas correctamente")
        ]);

        if (usuariosRes && Array.isArray(usuariosRes)) {
            const usuariosSinInscripciones = usuariosRes.filter(user => 
                !inscripcionesRes.some(inscripcion => inscripcion.IdUser === user.idUser)
            );
            setUsuarios(usuariosSinInscripciones.filter(user => !user.idEmpresa));
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
        
        const formattedFecFin = fecFin === undefined || fecFin === '' || fecFin === "undefined-undefined-Fecha de finalización no definida" ? "Fecha de finalización no definida" : formatDateSlash(fecFin);
        const formattedFecIni = formatDateSlash(fecIni);
        
        const data = {
            IdUser: idUser,
            IdCompany: idEmpresa,
            FecIni: formattedFecIni,
            FecFin: formattedFecFin,
            Observaciones: observaciones
        };
    
        const res = await sendRequest(method, data, url, '/Inscription', true, mensaje);
        console.log("Respuesta de save:", res);
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
                                    </>
                                ) : (
                                    <>
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
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormIns;
