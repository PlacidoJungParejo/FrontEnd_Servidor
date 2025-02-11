import React,{useEffect,useState,useRef} from 'react'
import { sendRequest } from '../functions'
import DivInput from './DivInput'

const FormDep = (params) => {
    const [name,setName] = useState('')
    const NameInput = useRef();
    let method = 'POST';
    let url = '/api/departments';
    let redirect = '';
    useEffect(()=>{
        NameInput.current.focus();
        getDepartment();
    });
    const getDepartment = async () => {
        if (params.id !== null) {
            const res = await sendRequest('GET','',(url+'/'+params))
            setName(res.data.name);
        }
    }
    const save = async (e) => {
        e.preventDefault();
        if (params.id !== null) {
            method= 'PUT';
            url = 'api/departments/'
        }
    }
  return (
    <div>
      
    </div>
  )
}

export default FormDep
