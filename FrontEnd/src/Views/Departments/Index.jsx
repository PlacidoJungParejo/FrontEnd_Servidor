import React,{useEffect,useState} from 'react';
import DivAdd from '../../Components/DivAdd'
import DivTable from '../../Components/DivTable';
import { Link } from 'react-router-dom';
import {confirmation,sendRequest} from '../../functions'

const Departments = () => {
  const [departments,setDepartments] = useState([]);
  const [classLoad,setClassLoad] = useState('');
  const [classTable,setClassTable] = useState('d-none');
  useEffect(() =>{
    getDepartments();
  },[]);
  const getDepartments = async () => {
    const res = await sendRequest('GET','','/api/departments','');
    setDepartments(res);
    setClassTable('');
    setClassLoad('d-none')
  }
  const deleteDepartment = (id,name) => {
    confirmation(name,('/api/departments/'+id+'/'));
  }
  return (
    <div className='container-fluid'>
      <DivAdd>
        <Link to='create' className='btn btn-dark'>
          <i className='fa-solid fa-circle-plus'></i> Add
        </Link>
      </DivAdd>
      <DivTable col='6' off='3' classLoad={classLoad} classTable={classTable}>
        <table className='table table-bordered'>
          <thead><tr><th>#</th><th>DEPARTMENT</th><th></th><th></th></tr></thead>
          <tbody className='table-group-divider'>
            {departments.map((row,i)=>(
              <tr key={row.id}>
                <td>{(i+1)}</td>
                <td>{row.name}</td>
                <td>
                  <Link to={'/edit/'+row.id} className='btn btn-warning'>
                    <i className='fa-solid fa-edit'></i>
                  </Link>
                </td>
                <td>
                  <button className='btn btn-danger' onClick={() => deleteDepartment(row.id,row.name)}>
                    <i className='fa-solid fa-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DivTable>
    </div>
  )
}

export default Departments