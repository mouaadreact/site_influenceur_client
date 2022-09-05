import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useParams } from 'react-router-dom';
import { addCommentaire, getOneInfluenceur } from '../../../../redux/actions/influenceur.actions';


function EditInfluenceur() {

 const dispatch=useDispatch();
 const params=useParams();
 const {loading,oneInfluenceurData}=useSelector(state=>state.influenceur);
 const [commentaireValue,setCommentaireValue]=useState("");


  useEffect(() => {
     getOneInfluenceur(params.id,dispatch);
  }, []);

  useEffect(()=>{
   setCommentaireValue(oneInfluenceurData.commentaireValue);
  },[oneInfluenceurData?.commmentaire]);


  
  const handleChange=(e)=>{
      setCommentaireValue(e.target.value)

  }

  const handleEdit=async (event)=>{
   event.preventDefault();
   addCommentaire(params.id,commentaireValue,dispatch);
   
  }


  return (
    <div className="container-fluid px-4">
     <div className="container mt-5 w-75 mb-5">
       <div className="row">
         <div className="col-md-12">
             <div className="card">
                 <div className="card-header">
                     <h4>Influenceur Commentaire
                         <a href="/dashboard/influenceur" className="btn btn-danger float-end">BACK</a>
                     </h4>
                 </div>
                 <div className="card-body">
                 <form onSubmit={(e)=>handleEdit(e)}>
                     <div className='mb-3'>
                      <input 
                       name="id"
                       type="text" 
                       disabled={true} 
                       defaultValue={oneInfluenceurData.id}
                       onChange={(e)=>handleChange(e)}
                      />
                     </div>

                     
                     <div className="mb-3">
                       <label htmlFor="titre">Commentaire: </label>
                        <textarea
                         name="titre"
                         id="titre" 
                         className="form-control" 
                         defaultValue={oneInfluenceurData.commmentaire}
                         onChange={(e)=>handleChange(e)}
                        ></textarea>
                     </div>
                      
                     

                     <div className="mb-3">         
                       <button type="submit"  className="btn btn-primary">
                         Add/Edit Commentaire
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

export default EditInfluenceur