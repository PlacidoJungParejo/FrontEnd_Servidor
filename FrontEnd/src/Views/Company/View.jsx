import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { sendRequest } from "../../functions";
import DivAdd from "../../Components/DivAdd";
import DivTable from "../../Components/DivTable";

const View = () => {
  const { id } = useParams(); // Obtener ID desde la URL
  const [empresa, setEmpresa] = useState(null);
  const [classLoad, setClassLoad] = useState("");
  const [classTable, setClassTable] = useState("d-none");

  useEffect(() => {
    getEmpresa();
  }, []);

  const getEmpresa = async () => {
    setClassLoad("");
    setClassTable("d-none");
    const res = await sendRequest("GET", "", `/company/CSR/${id}`, "");
    if (res && res.empresa) {
      setEmpresa(res.empresa);
    }
    setClassLoad("d-none");
    setClassTable("");
  };

  if (!empresa) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container-fluid">
      <DivAdd>
        <Link to="/company" className="btn btn-primary">
          <i className="fa-solid fa-arrow-left"></i> Volver
        </Link>
      </DivAdd>
      <DivTable col="6" off="0" classLoad={classLoad} classTable={classTable}>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{empresa._id}</td>
            </tr>
            <tr>
              <th>Nombre</th>
              <td>{empresa.name}</td>
            </tr>
            <tr>
              <th>Ciudad</th>
              <td>{empresa.city}</td>
            </tr>
            <tr>
              <th>Tipo</th>
              <td>{empresa.type}</td>
            </tr>
            <tr>
              <th>Responsable</th>
              <td>{empresa.personInCharge}</td>
            </tr>
          </tbody>
        </table>
      </DivTable>
    </div>
  );
};

export default View;