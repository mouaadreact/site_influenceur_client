import React, { useState } from 'react'
import { useDispatch} from 'react-redux';
import { addInteret } from '../../../../redux/actions/interet.actions';

function AddInteret() {
 const dispatch=useDispatch();

 const [inputValue,setInputValue]=useState({
  "interetNom":""
 });

  const handleChange=(e)=>{
      setInputValue({...inputValue,[e.target.name]:e.target.value})
  }

  const handleAdd=(event)=>{
   event.preventDefault();
   addInteret(inputValue,dispatch);
  }


  return (
    <div className="container-fluid px-4">
     <div className="container mt-5 w-75 mb-5">
       <div className="row">
         <div className="col-md-12">
             <div className="card">
                 <div className="card-header">
                     <h4>Interet Add 
                         <a href="/dashboard/interet" className="btn btn-danger float-end">BACK</a>
                     </h4>
                 </div>
                 <div className="card-body">
                 <form onSubmit={(e)=>handleAdd(e)}> 
                     <div className="mb-3">
                       <label htmlFor="interetNom">Interet Nom: </label>
                        <input 
                         name="interetNom"
                         id="interetNom" 
                         type="text"
                         className="form-control" 
                         onChange={(e)=>handleChange(e)}
                        />
                     </div>
                      
                     <div className="mb-3">         
                       <button type="submit"  className="btn btn-primary">
                         Add Interet
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

export default AddInteret