import React, { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom";

 

function ConfirmConditionGenerale() {
  
  let navigate=useNavigate();
  const location=useLocation();
  const Querys=new URLSearchParams(location.search);
  const userId=Querys.get('id');

 //on cancel et on confirm instagram data
 const handleCancel=async (e)=>{
   e.preventDefault();
   console.log("cancel");
   window.location.reload(false);
  
 }  

 const handleConfirm=async (e)=>{
  e.preventDefault();
  console.log("confirm");

  await axios.put(`http://localhost:5000/api/v1/influenceur/accepterCondition/${userId}`)
   .then(res=>{
      navigate('/login');
   })
   .catch((err)=>{
    console.log(err);
   });
 }
 //---------------
  return (

        <form className='container '>
        <div className='col d-flex justify-content-center m-5'>
        <div className="card text-center border border-2" style={{width:"18rem"}}>
          <div className="card-body">
            <p className="card-text">Les Condition Generale</p>
          </div>
          <button 
          className="btn btn-primary w-30 m-1"
          name='confirm'
          onClick={(e) => handleConfirm(e)}
          >Confirm</button>
          <button 
          className="btn btn-danger w-30 m-1"
          name='cancel'
          onClick={(e)=> handleCancel(e)}
          >Cancel</button>
          
        </div>
        </div>
        </form>
        
  )
}

export default ConfirmConditionGenerale
