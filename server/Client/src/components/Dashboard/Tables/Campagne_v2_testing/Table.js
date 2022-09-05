import React, { useEffect, useState } from 'react'
import {AiFillEdit,AiFillDelete, AiFillDingtalkSquare} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCampagne, getAllCampagne } from '../../../../redux/actions/campagne.actions';
import dateformat from 'dateformat'

function Table({name,fieldsTable}) {
  const dispatch=useDispatch();
  const [q,setQ]=useState({
    "id":"",
    "titre":"",
    "dateDebut":"",
    "dateFin":"",
    "nombreInfluenceur":"",
    "status":"all"
  });  
  const {allCampagneData,loading}=useSelector(state=>state.campagne);
  const {centreInteret,statusCampagne}=useSelector(state=>state.filter);

  const [allData,setAllData]=useState([]);
 
  useEffect(() => {
    getAllCampagne(dispatch);
    console.log(allCampagneData)
    setAllData(allCampagneData) 
  }, [allCampagneData[0]?.id]);
 
  useEffect(()=>{
    handleFilterCentreInteret()
  },[centreInteret])

  //--------------------------------------
  const handleDelete=(event,id)=>{
    event.preventDefault();
    deleteCampagne(id,dispatch)
    setAllData(allCampagneData);
  }
 
  
  const handleFilterCentreInteret=()=>{
    
   let tableFilterInteret =  allCampagneData.filter(
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
        
    setAllData(tableFilterInteret)
   
    /*let tableFilterStatus=tableFilterInteret.filter((row)=>{
      
      if(q.status==="all" || q.status===""){
       
          return row
      }
      else 
        return q.status.toString()===row.presence.toString()
   })

     

     return tableFilterStatus.filter((row)=>{
         
         if(q.id===0&&q.titre===""&&q.nombreInfluenceur===0){
          return row
         }else{
          console.log(row.nombreInfluenceur)
          return ( 
            row.id.toString().indexOf(q.id) > -1 ||
            row.titre.includes(q.titre) ||
            row.nombreInfluenceur===q.nombreInfluenceur

            
        )
         }
   })*/
  
}


const handleChangeFilter=(field)=>(e)=>{
  const {value}=e.target;
  let tableFilter=[];
  switch(field){
        case "id":
          tableFilter = allCampagneData.filter((row)=>{
            if(value=="") return row
           else{
           return (
              row.id==parseInt(value)
            )  
           } 
          })
          setAllData(tableFilter);
            break;

        case "titre":
          tableFilter = allCampagneData.filter((row)=>{
            if(value=="") return row
           else{
           return (
              row.titre.toLowerCase().includes(value.toLowerCase())
            )  
           } 
          })
          setAllData(tableFilter);
          break;
        
        case "nombreInfluenceur":
          tableFilter = allCampagneData.filter((row)=>{
            if(value=="") return row
           else{
           return (
            row.nombreInfluenceur==parseInt(value)
            )  
           } 
          })
          setAllData(tableFilter);
          break;
  }

    //setQ((prev)=>({...prev,[e.target.name]:e.target.value}))
   
}

  
  return (
   <div className="container-fluid px-4">

   <div  className="row my-5  p-4" style={{width:"750px",backgroundColor:"#DDD"}}>
     
        <div className='card-hearder mb-3'>
          <h4>{name} Table 
             <a href={`/dashboard/campagne/add`} className='btn primary-bg text-white float-end'>+ add Campagne</a>
          </h4>
        </div>
     
      
        
      <div className=" table-responsive text-nowrap ">
          <table  className=" table table-striped my-3 bg-white rounded shadow-sm  table-hover">
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
               <tr>
                  <td>
                  <input 
                   style={{width:"55px"}}
                   type="text"
                   name="id"
                   className='form-control'
                   onChange={handleChangeFilter("id")}
                   />
                  </td>
                  <td>
                  <input 
                   type="text"
                   name="titre"
                   className='form-control'
                   onChange={handleChangeFilter("titre")}
                   />
                  </td>
                  <td>
                  <input 
                   type="date"
                   name="dateDebut"
                   className='form-control'
                   onChange={handleChangeFilter("dateDebut")}
                   />
                  </td>
                  <td>
                  <input 
                   type="date"
                   name="dateFin"
                   className='form-control'
                   onChange={handleChangeFilter("dateFin")}
                   />
                  </td>
                  <td>
                  <input 
                   type="text"
                   name="nomberInfluenceur"
                   className='form-control'
                   onChange={handleChangeFilter("nombreInfluenceur")}
                   />
                  </td>
                  <td>
                    <select 
                    name="status" 
                    className='form-control' 
                    onChange={handleChangeFilter("status")}>
                      <option  value="all">All</option>
                      <option value={true}>presence</option>
                      <option value={false}>online</option>
                    </select>
                  </td>
                  <td></td>
               </tr>
              { allCampagneData?.map((ele,index)=>{
                  return (<tr key={index+1} className="text-center">
                      <td className="text-warning" width="10">{
                        ele.id<10 
                        ?"0"+ele.id
                        : ele.id
                      }</td>
                      <td width="10">{ele.titre}</td>
                      <td width="10">{dateformat(ele.dateDebut,"dd/mm/yyyy")}</td>   
                      <td width="10">{dateformat(ele.dateFin,"dd/mm/yyyy")}</td>   
                      <td width="10">{
                        ele.nombreInfluenceur<10 
                        ?"0"+ele.nombreInfluenceur 
                        : ele.nombreInfluenceur}</td>  
                      <td width="10">
                          <div 
                          className={"btn btn-" + (ele.presence == true ? "success" : "danger")}
                          >
                          {ele.presence == true ? "presence" : "Online" }
                          </div>
                      </td>   
                      <td scope="col" >
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