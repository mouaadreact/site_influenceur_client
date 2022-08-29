import React, { useEffect, useState } from 'react'
import {AiFillEdit,AiFillDelete} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCampagne, getAllCampagne } from '../../../../redux/actions/campagne.actions';

function Table({name,fieldsTable}) {
  const dispatch=useDispatch();

  const {allCampagneData,loading}=useSelector(state=>state.campagne);
  const [data,setData]=useState([]);

  useEffect(() => {
    getAllCampagne(dispatch); 
    setData(allCampagneData);
  }, []);
 
  

  const handleDelete=(event,id)=>{
    event.preventDefault();
    deleteCampagne(id,dispatch)
    setData(allCampagneData);
  }

  return (
   <div className="container-fluid px-4">

   <div className="row my-5">
     
        <div className='card-hearder mb-3'>
          <h4>{name} Table
             <a href={`/dashboard/campagne/add`} className='btn btn-danger float-end'>add</a>
          </h4>
        </div>
     
  
      <div className="col">
          <table className="table bg-white rounded shadow-sm  table-hover">
            <thead>
                  <tr className="text-center">
                  <th scope="col" width="50">#</th>
                     {
                       fieldsTable.map((ele,index)=>{
                         return <th key={index} scope="col">{ele}</th>
                        })
                     }
                   <th scope='col'>Actions</th>
                  </tr>
              </thead>
              <tbody>
              { allCampagneData?.map((ele,index)=>{
                  return (<tr key={index+1} className="text-center">
                      <td key={index+1}>{ele.id}</td>
                      <td>{ele.titre}</td>
                      <td>{ele.dateDebut}</td>   
                      <td>{ele.dateFin}</td>   
                      <td>{ele.nombreInfluenceur}</td>  
                      <td >
                          <div 
                          className={"btn btn-" + (ele.presence == true ? "success" : "danger")}
                          >
                          {ele.presence == true ? "presence" : "Online" }
                          </div>
                      </td>   
                      <td scope="col" width="150">
                      <a href={`/dashboard/campagne/view/${ele.id}`} className="text-success" style={{fontSize:"16px",marginRight:"10px"}}>view</a>
                      <a href={`/dashboard/campagne/edit/${ele.id}`}  className="text-warning" style={{fontSize:"18px",marginRight:"10px"}}><AiFillEdit/></a>
                      <a className="text-danger" style={{fontSize:"18px"}} onClick={(event)=>handleDelete(event,ele.id)}><AiFillDelete/></a>
                      </td>
                  </tr>)
                })
              }
              </tbody>
          </table>
      </div>
   </div>
  
   </div>
  )
}

export default Table