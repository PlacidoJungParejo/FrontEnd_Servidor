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
    console.log(res);
    
    if (res) {
      setEmpresa(res);
    }
    setClassLoad("d-none");
    setClassTable("");
  };

  if (!empresa) {
    return <p>Cargando...</p>;
  }

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="container-fluid">
        <DivAdd>
          <Link to="/company" className="btn btn-dark">
            <i className="fa-solid fa-arrow-left"></i> Volver
          </Link>
        </DivAdd>
      <DivTable col="2" off="0" classLoad={classLoad} classTable={classTable} >
        <div className="d-flex align-items-center flex-column">
          <br />
        <h2>{empresa.name}</h2>
        <table className="table border table-bordered border-3 w-50 border-warning text-center ">
          <tbody>
            <tr>
              
            </tr>
            <tr>
              <th>Dirección</th>
              <td>{empresa.address}</td>
            </tr>
            <tr>
              <th>Área</th>
              <td>{empresa.area}</td>
            </tr>
            <tr>
              <th>CIF</th>
              <td>{empresa.cif}</td>
            </tr>
            <tr>
              <th>Ciudad</th>
              <td>{empresa.city}</td>
            </tr>
            <tr>
              <th>Fecha de Creación</th>
              <td>{formatDate(empresa.createDate) === "Invalid Date" ? "Fecha Invalida" : formatDate(empresa.createDate)}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{empresa.email}</td>
            </tr>
            <tr>
              <th>Fecha de Modificación</th>
              <td>{formatDate(empresa.modifiedDate) === "Invalid Date" ? "Fecha Invalida" : formatDate(empresa.modifiedDate)}</td>
            </tr>
            <tr>
              <th>Responsable</th>
              <td>{empresa.personInCharge}</td>
            </tr>
            <tr>
              <th>ID del Responsable</th>
              <td>{empresa.personInChargeID}</td>
            </tr>
            <tr>
              <th>Teléfono</th>
              <td>{empresa.phone}</td>
            </tr>
            <tr>
              <th>Código Postal</th>
              <td>{empresa.postalCode}</td>
            </tr>
            <tr>
              <th>Tipo</th>
              <td>{empresa.type}</td>
            </tr>
          </tbody>
        </table>
        </div>        
      </DivTable>
    </div>
  );
};

export default View;