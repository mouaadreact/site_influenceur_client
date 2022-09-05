import React, { useEffect, useState } from 'react'
import {AiFillEdit,AiFillDelete, AiFillDingtalkSquare} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { changeEtatCompteInfluenceur, deleteInfluenceur, getAllInfluenceur } from '../../../../redux/actions/influenceur.actions';

function Table({name,fieldsTable}) {
  const dispatch=useDispatch();
  const [data,setData]=useState([]);

  const {allInfluenceurData,loading}=useSelector(state=>state.influenceur);
 
  useEffect(() => {
    getAllInfluenceur(dispatch); 
    setData(allInfluenceurData);
  }, []);
 
 
  const handleChangeStatusActive=(e,id,status)=>{
        e.preventDefault();
        changeEtatCompteInfluenceur(id,status,dispatch);
  }


  return (
   <div className="container-fluid px-4">

<div  className="row my-5  p-4" 
     style={{ backgroundColor:"#DDD",
             borderRadius:"10px"}}>
     
        <div className='card-hearder mb-3'>
          <h4>{name} Table
          </h4>
        </div>
     
 
         
         
        
      <div className="table-responsive">
          <table  className="table bg-white rounded shadow-sm  table-hover">
            <thead>
                  <tr className="text-center">
                  <th scope="col" width="50" className='text-warning'>ID</th>
                     {
                       fieldsTable && fieldsTable.map((ele,index)=>{
                         return <th key={index} scope="col">{ele}</th>
                        })
                     }

                    
                   <th scope='col'>Actions</th>
                  </tr>
              </thead>
              <tbody>
              {allInfluenceurData?.map((ele,index)=>{
                  return (<tr key={index+1} className="text-center">
                      <td className="text-warning">{
                        ele.id<10 
                        ?"0"+ele.id
                        : ele.id
                      }</td>
                      <td>{ele.nom}</td>
                      <td>{ele.prenom}</td>   
                      <td>{ele.instagramUsernameCompte}</td>   
                      <td>{ele.commentaire ? ele.commentaire :"-"}</td>  
                      <td >
                          <div 
                          onClick={(e)=>handleChangeStatusActive(e,ele.id,ele.statusEtatActiver)}
                          className={"btn btn-" + (ele.statusEtatActiver == true ? "success" : "danger")}
                          >
                          {ele.statusEtatActiver == true ? "Active" : "Desactive" }
                          </div>
                      </td>   
                      <td scope="col" width="150">
                      <a href={`/dashboard/influenceur/view/${ele.id}`} className="text-success" style={{fontSize:"16px",marginRight:"10px"}}>view</a>
                      <a href={`/dashboard/influenceur/edit/${ele.id}`}  className="text-warning" style={{fontSize:"18px",marginRight:"10px"}}><AiFillEdit/></a>
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