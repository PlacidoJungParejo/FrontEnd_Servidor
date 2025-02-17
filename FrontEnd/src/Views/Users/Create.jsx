import React from 'react'
import FormDep from '../../Components/FormCompany'
import FormUser from '../../Components/FormUser'
import storage from '../../Storage/storage'

const Create = () => {
  if (storage.get("profile") == "Superadministrador") {
    return (
      <div>
        <FormUser title='Crear Usuario' Create={true} type={"Usuarios"} Superadministrador={true}/>
      </div>
    )
  }

  return (
    <div>
      <FormUser title='Crear Usuario' Create={true} type={"Usuarios"} />
    </div>
  )
}

export default Create
