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
  const [favoritos, setFavoritos] = useState([]);  // Estado para gestionar favoritos

  useEffect(() => {
    // Cargar favoritos desde localStorage cuando se monta el componente
    const favoritosStorage = storage.get('empresaFAV');
    if (favoritosStorage) {
      setFavoritos(favoritosStorage);
    }
    getEmpresas();
    // Obtener las empresas favoritas del localStorage
  const storedFavoritos = storage.get("empresaFAV") || [];
  setFavoritos(storedFavoritos);
  }, []);

  const getEmpresas = async () => {
    const res = await sendRequest("GET", "", "/company/CSR", "");
    console.log(res);
  
    if (res && res.empresas) {
      setEmpresas(res.empresas);
    } else {
      setEmpresas([]); // Evitar errores si la API no devuelve datos correctos
      <h1 className="text-center">No hay empresas</h1>
    }
    setClassTable("");
    setClassLoad("d-none");
  };

  const deleteEmpresa = (id, name) => {
    confirmation(name, "/company/CSR/" + id);
  };

// Función para manejar el cambio de favorito
const toggleFavorito = (empresaId) => {
  setFavoritos(prev => {
    let newFavoritos;
    if (prev.includes(empresaId)) {
      newFavoritos = prev.filter(id => id !== empresaId);  // Eliminar de favoritos
    } else {
      newFavoritos = [...prev, empresaId];  // Agregar a favoritos
    }

    // Si la lista de favoritos está vacía, eliminar la clave del localStorage
    if (newFavoritos.length === 0) {
      storage.remove('empresaFAV');  // Eliminar del localStorage si no hay favoritos
    } else {
      // Guardar el nuevo estado en localStorage
      storage.set('empresaFAV', newFavoritos);  
    }

    return newFavoritos;
  });
  
};

  return (
    <div className="container-fluid">
      <DivAdd>
        {storage.get("authUser").profile === "ADMIN" &&
          <Link to="create" className="btn btn-dark">
            <i className="fa-solid fa-circle-plus"></i> Añadir
          </Link>
        }
        {storage.get("authUser").profile === "Superadministrador" &&
          <Link to="create" className="btn btn-dark">
            <i className="fa-solid fa-circle-plus"></i> Añadir
          </Link>
        }
      </DivAdd>
      {empresas.length === 0 ? <h1 className="text-center">No hay empresas</h1> :
      <DivTable col="6" off="0" classLoad={classLoad} classTable={classTable}>
        <table className="table border table-bordered border-3 border-warning text-center">
          <thead className="border-3 border-warning">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Ciudad</th>
              <th>Tipo</th>
              <th>Responsable</th>
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
            {empresas.map((empresa, i) => (
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

export default Empresas;
