import React from 'react';
import FormCompany from '../../Components/FormCompany';

const Create = () => {
  return (
    <div>
      <FormCompany title='Crear Compañía' Create={true} type={"Compañia"} />
    </div>
  );
};

export default Create;
