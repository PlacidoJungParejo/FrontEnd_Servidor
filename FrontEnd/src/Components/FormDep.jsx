import React, { useEffect, useState, useRef } from 'react';
import { sendRequest } from '../functions';
import DivInput from './DivInput';

const FormDep = ({ id, title }) => {
    const [name, setName] = useState('Indefinido');
    const NameInput = useRef();

    useEffect(() => {
        NameInput.current.focus();
        if (id) {
            getDepartment();
        }
    }, [id]); 

    const getDepartment = async () => {
        console.log("Obteniendo departamento para ID:", id);
        const res = await sendRequest('GET', '', `/company/CSR/${id}`);
        console.log("Respuesta de getDepartment:", res);
        if (res && res.name) {
            console.log("Nombre res ", res.name);
            console.log("Nombre ", name);
            if (name === "Indefinido") {
                console.log("Nombre actualizado:", res.name);
                if (res.name) {
                    setName(res.name);
                    
                }
            }
        }
    };

    const save = async (e) => {
        e.preventDefault();
        let method = 'PATCH';
        let url = '/company/CSR';
        let redirect = '';

        if (id !== null) {
            method = 'PATCH';
            url = `/company/CSR/${id}`;
        }

        const res = await sendRequest(method, { name: name }, url, redirect);
        console.log("Respuesta de save:", res);
        if (method && res.status === true) {
            setName('');
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
