import React from 'react'
import FormDep from '../../Components/FormCompany'
import FormUser from '../../Components/FormUser'
import storage from '../../Storage/storage'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Create = () => {
  const go = useNavigate();
  

  useEffect(() => {
    if ((storage.get("profile")) === "USER") {
      go("/users");
    }
  }, [go]);

  if (storage.get("profile") == "Superadministrador") {
    return (
      <div>
        <FormUser title='Crear Usuario' Create={true} type={"Usuarios"} Superadministrador={true}/>
      </div>
    )
  }

  return (
    <div>
      <FormUser title='Crear Usuario' Create={true} type={"Usuarios"} />
    </div>
  )
}

export default Create
