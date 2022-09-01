import React, { useEffect, useState } from 'react'
import {AiFillEdit,AiFillDelete, AiFillDingtalkSquare} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCampagne, getAllCampagne } from '../../../../redux/actions/campagne.actions';
import dateformat from 'dateformat'

function Table({name,fieldsTable}) {
  const dispatch=useDispatch();
  const [q,setQ]=useState("");
  const [data,setData]=useState([]);

  const {allCampagneData,loading}=useSelector(state=>state.campagne);
  const {centreInteret}=useSelector(state=>state.filter);

  useEffect(() => {
    getAllCampagne(dispatch); 
    setData(allCampagneData);
  }, []);
 
  const handleDelete=(event,id)=>{
    event.preventDefault();
    deleteCampagne(id,dispatch)
    setData(allCampagneData);
  }
  /*row.id==parseInt(q) ||
         row.titre.toLowerCase().indexOf(q.toLowerCase())>-1 ||
         row.nombreInfluenceur==parseInt(q)*/
 
  const search=(rows)=>{
    console.log(rows);
    return rows.filter(
      (ele)=>{
        let ok=false;
         
         for(let i=0;i<ele.Interets.length;i++){          
             if(centreInteret.includes(ele.Interets[i].interetNom)){ 
                 ok=true;
              }
              if(centreInteret.length==0){
                ok=true
              }
              
        }
        return ok;
        })
      

    }

  useEffect(()=>{
     // const data=allCampagneData.filter(ele=>ele.Interets.forEach(interet=>centreInteret.includes(interet.interetNom)))
      const rows=allCampagneData.filter(ele=>ele.id==1)
      console.log(rows)
      search(data);
  },[centreInteret])


  return (
   <div className="container-fluid px-4">

   <div className="row my-5">
     
        <div className='card-hearder mb-3'>
          <h4>{name} Table
             <a href={`/dashboard/campagne/add`} className='btn btn-primary float-end'>+ add Campagne</a>
          </h4>
        </div>
     
        <div className='card-hearder mb-3'>
         <input 
         className='p-1 form-control w-25' 
         placeholder='search ..'
         value={q}
         onChange={(e)=>setQ(e.target.value)}
         />
        </div>
      <div className="col">
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
              { search(allCampagneData)?.map((ele,index)=>{
                  return (<tr key={index+1} className="text-center">
                      <td key={index+1} className="text-warning">{
                        ele.id<10 
                        ?"0"+ele.id
                        : ele.id
                      }</td>
                      <td>{ele.titre}</td>
                      <td>{dateformat(ele.dateDebut,"dd/mm/yyyy")}</td>   
                      <td>{dateformat(ele.dateFin,"dd/mm/yyyy")}</td>   
                      <td>{
                        ele.nombreInfluenceur<10 
                        ?"0"+ele.nombreInfluenceur 
                        : ele.nombreInfluenceur}</td>  
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