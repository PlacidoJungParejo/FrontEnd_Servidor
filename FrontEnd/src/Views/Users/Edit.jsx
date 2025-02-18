import React from 'react'
import { useParams, Link } from 'react-router-dom'
import FormUser from '../../Components/FormUser';
import DivAdd from '../../Components/DivAdd';
import storage from '../../Storage/storage';

const Edit = () => {
  const {id} = useParams();

  if (storage.get("profile") == "Superadministrador") {
    return (
      <div>
        <FormUser id={id} title='Editar Usuario' type={"Usuarios"} Superadministrador={true}/>
      </div>
    )
  }

  return (
    <div>
      <DivAdd>
        <Link to="/users" className="btn btn-dark">
          <i className="fa-solid fa-arrow-left"></i> Volver
        </Link>
      </DivAdd>
      <FormUser id={id} title='Editar User' type={"Usuarios"}></FormUser>
    </div>
  )
}

export default Edit
