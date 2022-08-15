import axios from 'axios';
import React, { useEffect, useId, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import ConfirmInstagram from '../ConfimerInstagram/ConfirmInstagram';

function ConfimerEmail() {
 const location=useLocation();
 const [isConfirm,setIsConfirm]=useState(false);
 //const [idUser,setIdUser]=useState();
 useEffect(()=>{
  
  const fetchUser=async ()=>{
     const Querys=new URLSearchParams(location.search);
     const queryToken=Querys.get('token');
     await axios.get(`http://localhost:3000/api/v1/influenceur/confirmer-email?token=${queryToken}`)
       .then(res=>{
        setIsConfirm(true);
        localStorage.setItem("idUser",res.data.id);
        //setIdUser(res.data.id)
       
        toast.success("Success Confirm Email");
       })
       .catch((err)=>{
        console.log(err);
        if(err.response.data.errors[0].message=="UserId must be unique"){
          setIsConfirm(true)
          toast.error("Deja confirmer votre Email ! ");
        }else{
          toast.error("erreur dans confirmations email");
        }
       });
  }
  fetchUser()
  },[]);

console.log(isConfirm);
console.log(localStorage.getItem("idUser"));
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