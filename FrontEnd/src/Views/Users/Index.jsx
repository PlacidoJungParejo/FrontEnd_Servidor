import React, { useEffect, useState } from "react";
import DivAdd from "../../Components/DivAdd";
import DivTable from "../../Components/DivTable";
import { Link } from "react-router-dom";
import { confirmation, sendRequest } from "../../functions";
import storage from "../../Storage/storage";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [classLoad, setClassLoad] = useState("");
  const [classTable, setClassTable] = useState("d-none");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await sendRequest("GET", "", "/users/CSR", "");
    console.log(res);
  
    if (res) {
      setUsers(res);
    } else {
      setUsers([]); // Evitar errores si la API no devuelve datos correctos
    }
    setClassTable("");
    setClassLoad("d-none");
  };
  

  const deleteUsers = (id, name) => {
    confirmation(name, "/users/CSR/" + id);
  };

  return (
    <div className="container-fluid">
      <DivAdd>
        {storage.get("authUser").profile == "ADMIN" &&
        <Link to="create" className="btn btn-dark">
          <i className="fa-solid fa-circle-plus"></i> Añadir
        </Link>
        }
      </DivAdd>
      <DivTable col="6" off="0" classLoad={classLoad} classTable={classTable}>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>USUARIO</th>
              <th>NOMBRE</th>
              <th>APELLIDO</th>
              <th>EMAIL</th>
              {storage.get("authUser").profile == "ADMIN" &&
              <th></th>&&
              <th></th>
              }
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {console.log("Usuarios" +users)}
            {users.map((usuario, i) => (
              <tr key={usuario.idUser}>
                <td>{i + 1}</td>
                <td>{usuario.username}</td>
                <td>{usuario.firstName}</td>
                <td>{usuario.lastName}</td>
                <td>{usuario.email}</td>
                {storage.get("authUser").profile == "ADMIN" &&
                  <>
                  <td>
                  <Link to={"/users/edit/" + usuario.idUser} className="btn btn-warning">
                    <i className="fa-solid fa-edit"></i>
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUsers(usuario.idUser, usuario.username)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
                  </>
                }
                <td>
                  <Link to={"/users/view/" + usuario.idUser} className="btn btn-success">
                    <i className="fas fa-eye"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DivTable>
    </div>
  );
};

export default Users;
