import React from 'react';
import { useParams, Link } from 'react-router-dom';
import FormDep from '../../Components/FormDep';
import DivAdd from '../../Components/DivAdd';


const Edit = () => {
  const { id } = useParams();
  return (
    <div>
      <DivAdd>
        <Link to="/company" className="btn btn-primary">
          <i className="fa-solid fa-arrow-left"></i> Volver
        </Link>
      </DivAdd>
      <FormDep id={id} title='Editar Compañía' type={"Compañia"} />
    </div>
  );
};

export default Edit;
