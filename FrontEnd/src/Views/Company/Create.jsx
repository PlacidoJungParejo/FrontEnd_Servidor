import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormCompany from '../../Components/FormCompany';
import storage from '../../Storage/storage';

const Create = () => {
  const go = useNavigate();

  console.log((storage.get("profile")));
  

  useEffect(() => {
    if ((storage.get("profile")) === "USER") {
      go("/company");
    }
  }, [go]);

  return (
    <div>
      <FormCompany title='Crear Compañía' Create={true} type={"Compañia"} />
    </div>
  );
};

export default Create;
