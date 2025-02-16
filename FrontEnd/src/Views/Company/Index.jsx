import React, { useEffect, useState } from "react";
import DivAdd from "../../Components/DivAdd";
import DivTable from "../../Components/DivTable";
import { Link } from "react-router-dom";
import { confirmation, sendRequest } from "../../functions";

const Inscripciones = () => {
  const [empresas, setEmpresas] = useState([]);
  const [classLoad, setClassLoad] = useState("");
  const [classTable, setClassTable] = useState("d-none");

  useEffect(() => {
    getEmpresas();
  }, []);

  const getEmpresas = async () => {
    const res = await sendRequest("GET", "", "/company/CSR", "");
    console.log(res);
  
    if (res && res.empresas) {
      setEmpresas(res.empresas);
    } else {
      setEmpresas([]); // Evitar errores si la API no devuelve datos correctos
    }
    setClassTable("");
    setClassLoad("d-none");
  };
  

  const deleteEmpresa = (id, name) => {
    confirmation(name, "/company/CSR/" + id);
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
              <th>NOMBRE</th>
              <th>CIUDAD</th>
              <th>TIPO</th>
              <th>RESPONSABLE</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {empresas.map((empresa, i) => (
              <tr key={empresa._id}>
                <td>{i + 1}</td>
                <td>{empresa.name}</td>
                <td>{empresa.city}</td>
                <td>{empresa.type}</td>
                <td>{empresa.personInCharge}</td>
                <td>
                  <Link to={"/edit/" + empresa._id} className="btn btn-warning">
                    <i className="fa-solid fa-edit"></i>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteEmpresa(empresa._id, empresa.name)}
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
