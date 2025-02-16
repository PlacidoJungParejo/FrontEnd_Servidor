import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { sendRequest } from "../../functions";
import DivAdd from "../../Components/DivAdd";
import DivTable from "../../Components/DivTable";

const View = () => {
  const { id } = useParams(); // Obtener ID desde la URL
  const [usuario, setUsuario] = useState(null);
  const [classLoad, setClassLoad] = useState("");
  const [classTable, setClassTable] = useState("d-none");

  useEffect(() => {
    getUsuario();
  }, []);

  const getUsuario = async () => {
    setClassLoad("");
    setClassTable("d-none");
    let res = await sendRequest("GET", "", `/users/CSR/${id}`, "");
    res = res[0];
    console.log(res);
    
    if (res) {
      setUsuario(res);
    }
    setClassLoad("d-none");
    setClassTable("");
  };

  if (!usuario) {
    return <p>Cargando...</p>;
  }

const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
};

return (
    <div className="container-fluid">
        <DivAdd>
            <Link to="/users" className="btn btn-primary">
                <i className="fa-solid fa-arrow-left"></i> Volver
            </Link>
        </DivAdd>
        <DivTable col="6" off="0" classLoad={classLoad} classTable={classTable}>
            <table className="table table-bordered">
                {console.log(usuario)}
                <tbody>
                    <tr>
                        <th>ID</th>
                        <td>{usuario.idUser}</td>
                    </tr>
                    <tr>
                        <th>Nombre</th>
                        <td>{usuario.firstName}</td>
                    </tr>
                    <tr>
                        <th>Apellido</th>
                        <td>{usuario.lastName}</td>
                    </tr>
                    <tr>
                        <th>NIF</th>
                        <td>{usuario.nif}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{usuario.email}</td>
                    </tr>
                    <tr>
                        <th>Nombre de Usuario</th>
                        <td>{usuario.username}</td>
                    </tr>
                    <tr>
                        <th>Perfil</th>
                        <td>{usuario.profile}</td>
                    </tr>
                    <tr>
                        <th>Fecha de Creación</th>
                        <td>{formatDate(usuario.createdDate)}</td>
                    </tr>
                    <tr>
                        <th>Fecha de Modificación</th>
                        <td>{formatDate(usuario.modifiedDate)}</td>
                    </tr>
                    <tr>
                        <th>Foto</th>
                        <td>{usuario.picture ? <img src={usuario.picture} alt="Foto de perfil" /> : "No disponible"}</td>
                    </tr>
                </tbody>
            </table>
        </DivTable>
    </div>
);
};

export default View;