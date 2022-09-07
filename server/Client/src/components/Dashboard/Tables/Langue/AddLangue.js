import React, { useState } from 'react'
import { useDispatch} from 'react-redux';
import { addLangue } from '../../../../redux/actions/langue.actions';

function AddLangue() {
 const dispatch=useDispatch();

 const [inputValue,setInputValue]=useState({
  "langueNom":""
 });

  const handleChange=(e)=>{
      e.preventDefault();
      setInputValue({...inputValue,[e.target.name]:e.target.value})
  }

  const handleAdd=(event)=>{
   event.preventDefault();
   addLangue(inputValue,dispatch);
  }


  return (
    <div className="container-fluid px-4">
     <div className="container mt-5 w-75 mb-5">
       <div className="row">
         <div className="col-md-12">
             <div className="card">
                 <div className="card-header">
                     <h4>Langue Add 
                         <a href="/dashboard/langue" className="btn btn-danger float-end">BACK</a>
                     </h4>
                 </div>
                 <div className="card-body">
                 <form onSubmit={(e)=>handleAdd(e)}> 
                     <div className="mb-3">
                       <label htmlFor="langueNom">Langue Nom: </label>
                        <input 
                         name="langueNom"
                         id="langueNom" 
                         type="text"
                         className="form-control" 
                         onChange={(e)=>handleChange(e)}
                        />
                     </div>
                      
                    
                     <div className="mb-3">         
                       <button type="submit"  className="btn btn-primary">
                         Add Langue
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

export default AddLangue