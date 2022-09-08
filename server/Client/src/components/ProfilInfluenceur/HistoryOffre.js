import React, { useEffect, useState } from 'react'
import {AiFillEdit,AiFillDelete, AiFillDingtalkSquare} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { changeEtatCompteInfluenceur, deleteInfluenceur, getAllInfluenceur } from '../../redux/actions/influenceur.actions';
import Sidebar from './Sidebar'

function HistoryOffre({name,fieldsTable}) {
  const dispatch=useDispatch();
  const [data,setData]=useState([]);
  const [q,setQ]=useState("");
  const [searchField,setSearchField]=useState("id");

  const {allInfluenceurData,loading}=useSelector(state=>state.influenceur);
  
  useEffect(() => {
    getAllInfluenceur(dispatch); 
    setData(allInfluenceurData);
  }, []);
 
  //!-----------------------------------------
 
  const handleChangeStatusActive=(e,id,status)=>{
        e.preventDefault();
        changeEtatCompteInfluenceur(id,status,dispatch);
  }

  //******************************************

  const search=(rows)=>{
    return rows?.filter((row)=>{
         
      if(q===""){
         return row

      }else{
       return ( 
        row[searchField]?.toString().toLowerCase().indexOf(q?.toString().toLowerCase())>-1
         
         )
      }

 })

  }

  return (
   <>
    <div className="d-flex" id="wrapper">
    <Sidebar/>
    <div className="container-fluid px-4">
   <div  className="row my-5  p-4" 
     style={{ backgroundColor:"#DDD",
             borderRadius:"10px"}}>
     
        <div className='card-hearder mb-3'>
          <h4>{name} Table
          </h4>
        </div>
     

        <div className='card-hearder mb-3'>
         <input 
         className='p-1 form-control w-25 mb-2'
         placeholder='search ..'
         value={q}

         onChange={(e)=>setQ(e.target.value)}
         />
         <label htmlFor="id" style={{fontWeight:"bold"}}>Search : </label>
        <input 
                id="id1" 
                name="searchDField" 
                type="radio" 
                value="id"
                defaultChecked="checked"
                style={{marginLeft:"10px"}}
                onChange={(e)=>setSearchField(e.target.value)}
                />
        <label htmlFor="id1">ID</label>

        <input 
                id="id2" 
                name="searchDField" 
                type="radio" 
                value="nom"
                style={{marginLeft:"10px"}}
                onChange={(e)=>setSearchField(e.target.value)}
                />
        <label htmlFor="id2">Nom</label>

        <input 
                id="id3" 
                name="searchDField" 
                type="radio" 
                value="prenom"
                style={{marginLeft:"10px"}}
                onChange={(e)=>setSearchField(e.target.value)}
                />          
        <label htmlFor="id3">Prenom</label>

        <input 
                id="id3" 
                name="searchDField" 
                type="radio" 
                value="instagramUsernameCompte"
                style={{marginLeft:"10px"}}
                onChange={(e)=>setSearchField(e.target.value)}
                />          
        <label htmlFor="id3">Username Instagram</label>
         
         
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
              {search(allInfluenceurData)?.map((ele,index)=>{
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
   </div>
   </>
  )
}

export default HistoryOffre