import React, { useEffect, useState } from "react";
import DivAdd from "../../Components/DivAdd";
import DivTable from "../../Components/DivTable";
import { Link } from "react-router-dom";
import { confirmation, sendRequest } from "../../functions";

const Inscripciones = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [classLoad, setClassLoad] = useState("");
  const [classTable, setClassTable] = useState("d-none");

  useEffect(() => {
    getInscripciones();
  }, []);

  const getInscripciones = async () => {
    const res = await sendRequest("GET", "", "/inscription/CSR", "");
    console.log(res);

    if (res && res.Inscripciones) {
      setInscripciones(res.Inscripciones);
    } else {  
      setInscripciones([]); // Evitar errores si la API no devuelve datos correctos
    }
    setClassTable("");
    setClassLoad("d-none");
  };

  const deleteInscripcion = (id, name) => {
    confirmation(name, "/inscription/CSR/" + id);
  };

  return (
    <div className="container-fluid">
      <DivAdd>
        <Link to="create" className="btn btn-dark">
          <i className="fa-solid fa-circle-plus"></i> Add
        </Link>
      </DivAdd>
      <DivTable col="6" off="3" classLoad={classLoad} classTable={classTable}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>FECHA DE INICIO</th>
              <th>COMPAÑÍA</th>
              <th>USUARIO</th>
              <th>FECHA EXPIRACIÓN</th>
              <th>OBSERVACIONES</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {inscripciones.map((inscripcion, i) => (
              <tr key={inscripcion._id}>
                <td>{i + 1}</td>
                <td>{inscripcion.FecIni}</td>
                <td>{inscripcion.company.name} - {inscripcion.company.cif}</td>
                <td>{inscripcion.user.firstName} {inscripcion.user.lastName} - {inscripcion.user.nif}</td>
                <td>{inscripcion.FecFin ? inscripcion.FecFin : "No especificada"}</td>
                <td>{inscripcion.Observaciones}</td>
                <td>
                  <Link to={"/edit/" + inscripcion._id} className="btn btn-warning">
                    <i className="fa-solid fa-edit"></i>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteInscripcion(inscripcion._id, inscripcion.name)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DivTable>
    </div>
  );
};

export default Inscripciones;
