import React from 'react'
import { useParams, Link } from 'react-router-dom'
import FormUser from '../../Components/FormUser';
import DivAdd from '../../Components/DivAdd';
import storage from '../../Storage/storage';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const Edit = () => {

  const go = useNavigate();
  

  useEffect(() => {
    if ((storage.get("profile")) === "USER") {
      go("/users");
    }
  }, [go]);

  const {id} = useParams();

  if (storage.get("profile") == "Superadministrador") {
    return (
      <div>
        <FormUser id={id} title='Editar Usuario' type={"Usuarios"} Superadministrador={true}/>
      </div>
    )
  }

  return (
    <div>
      <FormUser id={id} title='Editar User' type={"Usuarios"}></FormUser>
    </div>
  )
}

export default Edit
