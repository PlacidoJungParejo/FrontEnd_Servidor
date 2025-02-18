import React from 'react'
import { useParams, Link } from 'react-router-dom'
import FormIns from '../../Components/FormIns'
import DivAdd from '../../Components/DivAdd';

const Edit = () => {
  const { id } = useParams();
  return (
    <div>
      <DivAdd>
        <Link to="/users" className="btn btn-dark">
          <i className="fa-solid fa-arrow-left"></i> Volver
        </Link>
      </DivAdd>
      <FormIns id={id} title='Editar Inscription'></FormIns>
    </div>
  );
};

export default Edit;
