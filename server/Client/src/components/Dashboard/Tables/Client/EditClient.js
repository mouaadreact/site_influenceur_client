import React, { useEffect, useState } from 'react'
import {Formik,Form,Field,ErrorMessage,formik} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getOneClient, updateClient } from '../../../../redux/actions/client.actions';
import {useParams } from 'react-router-dom';
import marocVille from '../../../../assets/data/marocAddress/ville.json'
import marocQuartier from '../../../../assets/data/marocAddress/quartier.json'

function EditClient() {
 const dispatch=useDispatch();
 const {loading,oneClientData}=useSelector(state=>state.client);
 const params=useParams();

 const [clientInputValue,setClientInputValue]=useState({
  "id":"",
  "nomSociete":"",
  "pays":"",
  "ville":"",
  "quartier":"",
  "codePostal":"",
  "telephone":"",
  "email":""
 });

  useEffect(() => {
    getOneClient(params.id,dispatch);
    
  }, []);

  useEffect(()=>{
   setClientInputValue({...oneClientData});
  },[oneClientData.id]);


  const handleChange=(e)=>{
      e.preventDefault();
      setClientInputValue({...clientInputValue,[e.target.name]:e.target.value})
  }

  const handleEdit=(event)=>{
   event.preventDefault();
   updateClient(params.id,clientInputValue,dispatch);
  }


  return (
    <div className="container-fluid px-4">
     <div className="container mt-5 w-75 mb-5">
       <div className="row">
         <div className="col-md-12">
             <div className="card">
                 <div className="card-header">
                     <h4>Client Update
                         <a href="/dashboard/client" className="btn btn-danger float-end">BACK</a>
                     </h4>
                 </div>
                 <div className="card-body">
                 <form onSubmit={(e)=>handleEdit(e)}>
                     <div className='mb-3'>
                      <input 
                       name="id"
                       type="text" 
                       disabled={true} 
                       defaultValue={oneClientData.id}
                       onChange={(e)=>handleChange(e)}
                      />
                     </div>
                     <div className="mb-3">
                       <label htmlFor="nomSociete">nom societe: </label>
                        <input 
                         name="nomSociete"
                         id="nomSociete" 
                         type="text"
                         className="form-control" 
                         defaultValue={oneClientData.nomSociete}
                         onChange={(e)=>handleChange(e)}
                        />
                     </div>
                     
                     <div className="mb-3">
                       <label className='mb-2'>pays: </label>
                        <select 
                          name="pays"
                          className='form-control'
                          onChange={(e)=>handleChange(e)}
                        >
                           <option hidden={true} className="text-muted">Selection votre Pays</option>                          
                           <option value="Maroc" selected={true}>Maroc</option>
                        </select>
                     </div>

                     

                     <div className="mb-3">
                        <label className='mb-2'>ville: </label>
                        <select 
                              name="ville"
                              className='form-control'
                              
                              onChange={(e)=>handleChange(e)}
                            >
                             <option hidden={true} className="text-muted">Selection votre ville</option>
                              {
    
                                marocVille['ville'].map((ele,index)=>{
                                  if(ele==oneClientData.ville){
                                    return <option selected={true} key={index} value={ele}>{ele}</option>   
                                  }
                                  else{
                                    return <option key={index} value={ele}>{ele}</option>  
                                  }
                                   
                                })
                              }
                        </select>
                     </div>

                     <div className="mb-3">
                        <label className='mb-2'>quartier: </label>
                        <select 
                              name="quartier"
                              className='form-control'
                              onChange={(e)=>handleChange(e)}
                            >
                              <option hidden={true} className="text-muted">Selection votre quartier</option>
                              {
                                console.log(clientInputValue)
                              }
                              {                                
                                 marocQuartier[clientInputValue?.ville]?.map((ele,index)=>{
                                  if(ele==oneClientData.quartier){
                                    return <option selected={true} key={index} value={ele}>{ele}</option>   
                                  }
                                  else{
                                    return <option key={index} value={ele}>{ele}</option>  
                                  }    
                                 })
                              }
                        </select>
                     </div>

                     

                     <div className="mb-3">
                       <label htmlFor="nomDirecteur">nom directeur: </label>
                        <input 
                         name="nomDirecteur"
                         id="nomDirecteur" 
                         type="text"
                         className="form-control" 
                         defaultValue={oneClientData.nomDirecteur}
                         onChange={(e)=>handleChange(e)}
                        />
                     </div>

                     <div className="mb-3">
                       <label htmlFor="telephone">telephone: </label>
                        <input 
                         name="telephone"
                         id="telephone" 
                         type="text"
                         className="form-control" 
                         defaultValue={oneClientData.telephone}
                         onChange={(e)=>handleChange(e)}
                        />
                     </div>

                     <div className="mb-3">
                       <label htmlFor="email">email: </label>
                        <input 
                         name="email"
                         id="email" 
                         type="text"
                         className="form-control" 
                         defaultValue={oneClientData.email}
                         onChange={(e)=>handleChange(e)}
                        />
                     </div>

                     <div className="mb-3">         
                       <button type="submit"  className="btn btn-primary">
                         Update Client
                       </button>
                     </div>

                 </form>
                                 
                 </div>
             </div>
         </div>
     </div>
    </div>
  </div>
  )
}

export default EditClient