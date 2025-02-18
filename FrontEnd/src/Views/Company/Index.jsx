import React, { useEffect, useState } from "react";
import DivAdd from "../../Components/DivAdd";
import DivTable from "../../Components/DivTable";
import { Link } from "react-router-dom";
import { confirmation, sendRequest } from "../../functions";
import storage from "../../Storage/storage";

const Empresas = () => {
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
        {storage.get("authUser").profile == "ADMIN" &&
          <Link to="create" className="btn btn-dark">
            <i className="fa-solid fa-circle-plus"></i> Add
          </Link>
        }
        {storage.get("authUser").profile == "Superadministrador" &&
          <Link to="create" className="btn btn-dark">
            <i className="fa-solid fa-circle-plus"></i> Add
          </Link>
        }
      </DivAdd>
      {empresas.length === 0 ? <h1 className="text-center">No hay empresas</h1> :
      <DivTable col="6" off="0" classLoad={classLoad} classTable={classTable}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>CIUDAD</th>
              <th>TIPO</th>
              <th>RESPONSABLE</th>
              {storage.get("authUser").profile == "ADMIN" &&
              <>
              <th>Editar</th>
              <th>Eliminar</th>
              <th>Visualizar</th>
              </>
              }
              {storage.get("authUser").profile == "Superadministrador" &&
              <>
              <th>Editar</th>
              <th>Eliminar</th>
              <th>Visualizar</th>
              </>
              }
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
                {storage.get("authUser").profile == "ADMIN" && 
                <>
                <td>
                  <Link to={"/company/edit/" + empresa._id} className="btn btn-warning">
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
                </>
                }
                {storage.get("authUser").profile == "Superadministrador" && 
                <>
                <td>
                  <Link to={"/company/edit/" + empresa._id} className="btn btn-warning">
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
                </>
                }
                <td>
                  <Link to={"/company/view/" + empresa._id} className="btn btn-success">
                    <i className="fas fa-eye"></i>
                  </Link>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </DivTable>
    }
    </div>
  );
};

export default Empresas;
