import React, { useState } from 'react'
import cookie from 'js-cookie';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function ProfilInfluenceur() {
  let navigate=useNavigate();

  const removeCookie=(key)=>{
    cookie.remove(key,{expires:1});
   }
  const handleLogout= async (e)=>{
    e.preventDefault();
    await axios({
      method:"get",
      url:`http://localhost:5000/api/v1/auth/logout`,
      withCredentials:true
      }) 
      .then(()=> {
        removeCookie("jwt");
        navigate('/login');
    })
      .catch((err)=>console.log(err))
    ;
   }

  return (
    <form className='container '>
    <div className='col d-flex justify-content-center m-5'>
    <div className="card text-center border border-2" style={{width:"18rem"}}>
      <div className="card-body">
        <p className="card-text">Deconnexion This Page </p>
      </div>
      <button 
      className="btn btn-primary w-30 m-1"
      name='confirm'
      onClick={(e) => handleLogout(e)}
      >Logout</button>
      
    </div>
    </div>
    </form>
  )
}

export default ProfilInfluenceur