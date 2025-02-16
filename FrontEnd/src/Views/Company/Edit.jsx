import React from 'react'
import { useParams } from 'react-router-dom'
import FormDep from '../../Components/FormDep'

const Edit = () => {
  const { id } = useParams();
  return (
    <div>
      <FormDep id={id} title='Editar Company'></FormDep>
    </div>
  )
}

export default Edit
