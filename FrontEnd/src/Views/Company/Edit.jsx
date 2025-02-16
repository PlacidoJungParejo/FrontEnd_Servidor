import React from 'react';
import { useParams } from 'react-router-dom';
import FormDep from '../../Components/FormDep';

const Edit = () => {
  const { id } = useParams();
  return (
    <div>
      <FormDep id={id} title='Editar Compañía' type={"Compañia"} />
    </div>
  );
};

export default Edit;
