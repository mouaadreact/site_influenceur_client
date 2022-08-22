import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';
import ConfirmInstagram from '../ConfimerInstagram/ConfirmInstagram';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { confirmEmail } from '../../redux/actions/register.actions';

function ConfimerEmail() {
 const location=useLocation();
 const dispatch=useDispatch();

 useEffect(()=>{
  
  const fetchUser=async ()=>{
     const Querys=new URLSearchParams(location.search);
     const queryToken=Querys.get('token');
     confirmEmail(queryToken,dispatch);
      
  }
  fetchUser()
  },[]);

  return (
   <>
     <ToastContainer autoClose={3000}/>
         
        <div className='col d-flex justify-content-center m-5'>
        <div className="card text-center border border-2" style={{width:"18rem"}}>
          <div className="card-body">
            <p className="card-text">Complete votre compte instagram et compete register</p>
          </div>
          <NavLink  
          className="btn btn-primary w-30 m-1" 
          to={`/register/confirmInstagram?id=${localStorage.getItem('idUser')}`}
           >Go Complete</NavLink>
        </div>
        </div>

      
    </>
  )
}

export default ConfimerEmail