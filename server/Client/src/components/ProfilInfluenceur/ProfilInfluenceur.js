import React, { useState } from 'react'
import cookie from 'js-cookie';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authLogout } from '../../redux/actions/auth.actions';

function ProfilInfluenceur() {
  const dispatch=useDispatch();
  
  const handleLogout= async (e)=>{
    e.preventDefault();
    authLogout(dispatch);
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