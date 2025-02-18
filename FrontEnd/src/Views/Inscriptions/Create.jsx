import React from 'react'
import FormIns from '../../Components/FormIns'
import { useNavigate } from 'react-router-dom';
import storage from '../../Storage/storage'
import { useEffect } from 'react';

const Create = () => {

  const go = useNavigate();

  console.log((storage.get("profile")));
  

  useEffect(() => {
    if ((storage.get("profile")) === "USER") {
      go("/inscription");
    }
  }, [go]);
  return (
    <div>
      <FormIns id={null} title='Crear inscripcion' Create={true}></FormIns>
    </div>
  )
}

export default Create
