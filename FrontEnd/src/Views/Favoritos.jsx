import React, { useEffect, useState } from "react";
import DivAdd from "../Components/DivAdd";
import DivTable from "../Components/DivTable";
import { Link } from "react-router-dom";
import { confirmation, sendRequest } from "../functions";
import storage from "../Storage/storage";

const Favoritos = () => {
  const [empresas, setEmpresas] = useState([]);
  const [classLoad, setClassLoad] = useState("");
  const [classTable, setClassTable] = useState("d-none");
  const [favoritos, setFavoritos] = useState([]);  // Estado para gestionar favoritos

    console.log( "FAVORITO",storage.get("empresaFAV"));

  useEffect(() => {
    // Obtener empresas favoritas del localStorage
    const storedFavoritos = storage.get("empresaFAV") || [];
    setFavoritos(storedFavoritos);
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

 // Función para manejar el cambio de favorito
const toggleFavorito = (empresaId) => {
    // Asegurarse de que empresaId sea una cadena
    const stringifiedEmpresaId = String(empresaId);
  
    setFavoritos(prev => {
      let newFavoritos;
      if (prev.includes(stringifiedEmpresaId)) {
        // Eliminar de favoritos
        newFavoritos = prev.filter(id => id !== stringifiedEmpresaId);
      } else {
        // Agregar a favoritos
        newFavoritos = [...prev, stringifiedEmpresaId];
      }
  
      // Guardar el nuevo estado en localStorage
      if (newFavoritos.length === 0) {
        storage.remove('empresaFAV');  // Eliminar del localStorage si no hay favoritos
      } else {
        storage.set('empresaFAV', newFavoritos);
      }
  
      return newFavoritos;
    });
  };
  
  console.log(favoritos);

  return (
    <div className="container-fluid">
      <DivAdd>
        {storage.get("authUser").profile === "ADMIN" &&
          <Link to="create" className="btn btn-dark">
            <i className="fa-solid fa-circle-plus"></i> Add
          </Link>
        }
        {storage.get("authUser").profile === "Superadministrador" &&
          <Link to="create" className="btn btn-dark">
            <i className="fa-solid fa-circle-plus"></i> Add
          </Link>
        }
      </DivAdd>
      {empresas.length === 0 ? <h1 className="text-center">No hay Favoritos</h1> :
      <DivTable col="6" off="0" classLoad={classLoad} classTable={classTable}>
        <table className="table border table-bordered border-3 border-warning text-center">
          <thead className="border-3 border-warning">
            <tr>
              <th>ID</th>
              <th>NOMBRE</th>
              <th>CIUDAD</th>
              <th>TIPO</th>
              <th>RESPONSABLE</th>
              <th>Visualizar</th>
              {storage.get("authUser").profile === "ADMIN" &&
              <>
                <th>Editar</th>
                <th>Eliminar</th>
              </>
              }
              {storage.get("authUser").profile === "Superadministrador" &&
              <>
                <th>Editar</th>
                <th>Eliminar</th>
              </>
              }
              <th>Favoritos</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {/* Filtrar solo las empresas que están en favoritos */}
            {empresas.filter(empresa => favoritos.includes(empresa._id)).map((empresa, i) => (
              <tr key={empresa._id}>
                <td>{i + 1}</td>
                <td>{empresa.name}</td>
                <td>{empresa.city}</td>
                <td>{empresa.type}</td>
                <td>{empresa.personInCharge}</td>
                {storage.get("authUser").profile === "ADMIN" && 
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
                {storage.get("authUser").profile === "Superadministrador" && 
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
                <td>
                  <button
                    className={`btn ${favoritos.includes(empresa._id) ? "btn-warning" : "btn-outline-warning"}`}
                    onClick={() => toggleFavorito(empresa._id)}
                  >
                    <i className={`fa${favoritos.includes(empresa._id) ? "s" : "r"} fa-star`}></i>
                  </button>
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

export default Favoritos;
