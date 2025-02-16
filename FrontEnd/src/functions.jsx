import Swal from "sweetalert2";
import storage from './Storage/storage'

export const show_alerta = (msj,icon) =>{
    Swal.fire({title:msj, icon:icon})
}

import axios from "axios";


export const sendRequest = async (method, params, url, redir = '', token = true) => {
    let res;
    try {
        if (token) {
            const authToken = storage.get('authToken');  // Obtener el token desde el almacenamiento
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;  // Asegúrate de que el token esté bien formateado
        }

        // Realiza la solicitud
        const response = await axios({
            method: method,
            url: url,
            data: params,
        });

        res = response.data;
        console.log(response.data);
        if (method !== 'GET') {
            console.log("asd");
            show_alerta(response.data.message, 'success');
        }

        // Redirige si es necesario
        setTimeout(() => {
            if (redir !== '') {
                window.location.href = redir;
            }
        }, 2000);

    } catch (errors) {
        let desc = '';
        res = errors.response.data;
    
        // Verifica si `errors.response.data.errors` es un array antes de llamar a `.map()`
        if (Array.isArray(errors.response.data.errors)) {
            errors.response.data.errors.forEach((e) => {
                desc = desc + ' ' + e;
            });
        } else {
            // Si no es un array, agrega un mensaje de error genérico
            desc = 'Error desconocido o formato de error inesperado.';
        }
    
        show_alerta(desc, 'error');
    }
    
    return res;
};

export const confirmation = async (name,url,redir) => {
    const alert = Swal.mixin({buttonStyling:true});
    alert.fire({
        title:'Are you sure delete '+name+' ?',
        icon:'question',showCancelButton:true,
        confirmButtonText:'<i class="fa-solid fa-check"></i> Yes, delete',
        cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancel'
    }).then( (result) => {
        if (result.isConfirmed) {
            sendRequest('DELETE',{},url,redir);
        }
    })
}

export default show_alerta;