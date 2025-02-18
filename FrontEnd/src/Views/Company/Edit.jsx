import React from 'react';
import { useParams, Link } from 'react-router-dom';
import FormCompany from '../../Components/FormCompany';
import DivAdd from '../../Components/DivAdd';
import storage from '../../Storage/storage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Edit = () => {

  const go = useNavigate();

  console.log((storage.get("profile")));
  

  useEffect(() => {
    if ((storage.get("profile")) === "USER") {
      go("/company");
    }
  }, [go]);

  const { id } = useParams();
  return (
    <div>
      <DivAdd>
        <Link to="/company" className="btn btn-dark">
          <i className="fa-solid fa-arrow-left"></i> Volver
        </Link>
      </DivAdd>
      <FormCompany id={id} title='Editar Compañía' type={"Compañia"} />
    </div>
  );
};

export default Edit;
