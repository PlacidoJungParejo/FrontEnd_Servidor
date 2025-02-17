import React from 'react'
import { useParams } from 'react-router-dom'
import FormIns from '../../Components/FormIns'

const Edit = () => {
  const {id} = useParams();
  return (
    <div>
      <FormIns id={id} title='Editar Inscription'></FormIns>
    </div>
  )
}

export default Edit
