import Swal from "sweetalert2";
import storage from './Storage/storage'

export const show_alerta = (msj,icon) =>{
    Swal.fire({title:msj, icon:icon, buttonStyling:true})
}

import axios from "axios";

export const sendRequest = async (method, params, url, redir = '', useToken = true) => {
    try {
        if (useToken) {
            const authToken = localStorage.getItem('authToken'); // Asegurar que obtienes el token
            if (authToken) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken; // Corregido 'Bearer'
            }
        }

        console.log(`📡 Enviando ${method} a:`, url);

        const response = await axios({
            method: method,
            url: url,
            data: params,
        });

        console.log("✅ Respuesta recibida:", response.data);

        if (method !== 'GET') {
            show_alerta(response.data.message, 'success');
            if (redir) {
                setTimeout(() => window.location.href = redir, 2000);
            }
        }

        return response.data;
    } catch (error) {
        console.error("❌ Error en la solicitud:", error);

        if (error.response) {
            let desc = error.response.data.errors?.map(e => e).join(" ") || error.response.data.message || "Error desconocido";
            show_alerta(desc, 'error');
            return error.response.data;
        } else {
            show_alerta("No se pudo conectar al servidor", 'error');
            return null;
        }
    }
};


export const confirmation = async (name,url,redir) => {
    const alert = Swal.mixin({buttonStyling:true});
    alert.fire({
        title:'Are you sure delete '+name+' ?',
        icon:'question',showCancelButton:true,
        confirmButtonText:'<i class="fa-solid fa-check"></i> Yes, delete',
        cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancel'
    }).then( (retult) => {
        if (XPathResult.isConfirmed) {
            sendRequest('DELETE',{},url,redir);
        }
    })
}

export default show_alerta;