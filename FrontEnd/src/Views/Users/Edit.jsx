import React from 'react'
import { useParams } from 'react-router-dom'
import FormDep from '../../Components/FormCompany'
import FormUser from '../../Components/FormUser';

const Edit = () => {
  const {id} = useParams();
  return (
    <div>
      <FormUser id={id} title='Editar User' type={"Usuarios"}></FormUser>
    </div>
  )
}

export default Edit
