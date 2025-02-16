import React from 'react'
import FormDep from '../../Components/FormCompany'
import FormUser from '../../Components/FormUser'

const Create = () => {
  return (
    <div>
      <FormUser title='Crear Usuario' Create={true} type={"Usuarios"} />
    </div>
  )
}

export default Create
