import React, { useEffect, useState } from 'react'
import { useDispatch} from 'react-redux';
import { addClient } from '../../../../redux/actions/client.actions';
import marocVille from '../../../../assets/data/marocAddress/ville.json'
import marocQuartier from '../../../../assets/data/marocAddress/quartier.json'

function AddClient() {
 const dispatch=useDispatch();

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

  const handleChange=(e)=>{
      e.preventDefault();
      setClientInputValue({...clientInputValue,[e.target.name]:e.target.value})
  }

  const handleAdd=(event)=>{
   event.preventDefault();
   addClient(clientInputValue,dispatch);
  }


  return (
    <div className="container-fluid px-4">
     <div className="container mt-5 w-75 mb-5">
       <div className="row">
         <div className="col-md-12">
             <div className="card">
                 <div className="card-header">
                     <h4>Client Add 
                         <a href="/dashboard/client" className="btn btn-danger float-end">BACK</a>
                     </h4>
                 </div>
                 <div className="card-body">
                 <form onSubmit={(e)=>handleAdd(e)}> 
                     <div className="mb-3">
                       <label htmlFor="nomSociete">nom societe: </label>
                        <input 
                         name="nomSociete"
                         id="nomSociete" 
                         type="text"
                         className="form-control" 
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
                           <option value="Maroc">Maroc</option>
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
                                  return <option key={index} value={ele}>{ele}</option>    
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
                                marocQuartier[clientInputValue?.ville]?.map((ele,index)=>{
                                  return <option key={index} value={ele}>{ele}</option>    
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
                         onChange={(e)=>handleChange(e)}
                        />
                     </div>

                     <div className="mb-3">         
                       <button type="submit"  className="btn btn-primary">
                         Add Client
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

export default AddClient