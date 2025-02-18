import React, { useEffect, useState } from "react";
import DivAdd from "../../Components/DivAdd";
import DivTable from "../../Components/DivTable";
import { confirmation, sendRequest } from "../../functions";
import storage from "../../Storage/storage";
import { useNavigate, Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [classLoad, setClassLoad] = useState("");
  const [classTable, setClassTable] = useState("d-none");
  const go = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await sendRequest("GET", "", "/users/CSR", "");
    console.log(res);
  
    if (res) {
      setUsers(res);
    } else {
      setUsers([]);
    }
    setClassTable("");
    setClassLoad("d-none");
  };
  
  const deleteUsers = (id, name) => {
    confirmation(name, "/users/CSR/" + id);
  };

  // Verificar el perfil del usuario autenticado
  const authUserProfile = storage.get("authUser").profile;
  const isAdminOrSuperAdmin = authUserProfile === "ADMIN" || authUserProfile === "Superadministrador";

  return (
    <div className="container-fluid">
      <DivAdd>
        {isAdminOrSuperAdmin && (
          <Link to="create" className="btn btn-dark">
            <i className="fa-solid fa-circle-plus"></i> Añadir
          </Link>
        )}
      </DivAdd>
      <DivTable col="6" off="0" classLoad={classLoad} classTable={classTable}>
        <table className="table border table-bordered border-3 border-warning text-center">
          <thead className="border-3 border-warning">
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Visualizar</th>
              {isAdminOrSuperAdmin && <th>Editar</th>}
              {isAdminOrSuperAdmin && <th>Eliminar</th>}
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {users.map((usuario, i) => (
              <tr key={usuario.idUser}>
                <td>{i + 1}</td>
                <td>{usuario.username}</td>
                <td>{usuario.firstName}</td>
                <td>{usuario.lastName}</td>
                <td>{usuario.email}</td>
                <td>
                  <Link to={`/users/view/${usuario.idUser}`} className="btn btn-success">
                    <i className="fas fa-eye"></i>
                  </Link>
                </td>

                {/* Solo mostrar "Editar" si el usuario autenticado es ADMIN o Superadministrador */}
                {isAdminOrSuperAdmin && (
                  <td>
                    <Link to={`/users/edit/${usuario.idUser}`} className="btn btn-warning">
                      <i className="fa-solid fa-edit"></i>
                    </Link>
                  </td>
                )}

                {/* Solo mostrar "Eliminar" si el usuario autenticado tiene permisos */}
                {isAdminOrSuperAdmin && (
                  <td>
                    {authUserProfile === "Superadministrador" && usuario.profile !== "Superadministrador" ? (
                      <button className="btn btn-danger" onClick={() => deleteUsers(usuario.idUser, usuario.username)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    ) : authUserProfile === "ADMIN" && usuario.profile !== "Superadministrador" && usuario.profile !== "ADMIN" ? (
                      <button className="btn btn-danger" onClick={() => deleteUsers(usuario.idUser, usuario.username)}>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    ) : (
                      <button className="btn btn-secondary">
                        <i className="fa-solid fa-x"></i>
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </DivTable>
    </div>
  );
};

export default Users;
