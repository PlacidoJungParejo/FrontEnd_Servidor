import React, { useEffect, useState } from "react";
import DivAdd from "../../Components/DivAdd";
import DivTable from "../../Components/DivTable";
import storage from "../../Storage/storage";
import { Link } from "react-router-dom";
import { confirmation, sendRequest } from "../../functions";

const Inscripciones = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [users, setUsers] = useState([]);
  const [classLoad, setClassLoad] = useState("");
  const [classTable, setClassTable] = useState("d-none");

  useEffect(() => {
    getInscripciones();
    getEmpresas();
    getUsers();
  }, []);

  const getInscripciones = async () => {
    const res = await sendRequest("GET", "", "/inscription/CSR", "");
    console.log(res);

    if (res && Array.isArray(res)) {
      setInscripciones(res);
    } else {
      setInscripciones([]);
    }
    setClassTable("");
    setClassLoad("d-none");
  };

  const getUsers = async () => {
    const res = await sendRequest("GET", "", "/users/CSR", "");

    if (res && Array.isArray(res)) {
      setUsers(res);
    } else {
      setUsers([]);
    }
  };

  const getEmpresas = async () => {
    const res = await sendRequest("GET", "", "/company/CSR", "");
    console.log(res.empresas);

    if (res) {
      setEmpresas(res.empresas);
    } else {
      setEmpresas([]);
    }
  };

  const deleteInscripcion = (id, name) => {
    confirmation(name, "/inscription/CSR/" + id);
  };

  // Función para obtener el nombre de la empresa
  const getCompanyName = (idCompany) => {
    const company = empresas.find((empresa) => empresa._id === idCompany);
    return company ? `${company.name}` : "Desconocido";
  };

  // Función para obtener el nombre del usuario
  const getUserName = (idUser) => {
    const user = users.find((user) => user.idUser === idUser);
    return user ? `${user.firstName} ${user.lastName}` : "Desconocido";
  };
  

  return (
    <div className="container-fluid">
      <DivAdd>
        {storage.get("authUser").profile === "ADMIN" && (
          <Link to="create" className="btn btn-dark">
            <i className="fa-solid fa-circle-plus"></i> Add
          </Link>
        )}
      </DivAdd>
      <DivTable col="6" off="0" classLoad={classLoad} classTable={classTable}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>FECHA DE INICIO</th>
              <th>COMPAÑÍA</th>
              <th>USUARIO</th>
              <th>FECHA EXPIRACIÓN</th>
              <th>OBSERVACIONES</th>
              {storage.get("authUser").profile === "ADMIN" && (
                <>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {inscripciones.map((inscripcion, i) => (
              <tr key={inscripcion._id}>
                <td>{i + 1}</td>
                <td>{inscripcion.FecIni}</td>
                <td>{getCompanyName(inscripcion.IdCompany)}</td>
                <td>{getUserName(inscripcion.IdUser)}</td>
                <td>{inscripcion.FecFin || "No especificada"}</td>
                <td>{inscripcion.Observaciones}</td>
                {storage.get("authUser").profile === "ADMIN" && (
                  <>
                    <td>
                      <Link to={`/edit/${inscripcion._id}`} className="btn btn-warning">
                        <i className="fa-solid fa-edit"></i>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteInscripcion(inscripcion._id, inscripcion.Observaciones)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </DivTable>
    </div>
  );
};

export default Inscripciones;
