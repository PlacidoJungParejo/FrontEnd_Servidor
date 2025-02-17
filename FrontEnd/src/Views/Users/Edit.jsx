import React from 'react'
import { useParams } from 'react-router-dom'
import FormDep from '../../Components/FormCompany'
import FormUser from '../../Components/FormUser';
import storage from '../../Storage/storage'

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
      <FormUser id={id} title='Editar Usuario' type={"Usuarios"}></FormUser>
    </div>
  )
}

export default Edit
