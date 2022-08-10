import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmInstagram from '../ConfimerInstagram/ConfirmInstagram';

function ConfimerEmail() {
 const location=useLocation();
 const [isConfirm,setIsConfirm]=useState(false);
 const [idUser,setIdUser]=useState();
 useEffect(()=>{
  
  const fetchUser=async ()=>{
     const Querys=new URLSearchParams(location.search);
     const queryEmail=Querys.get('email');
     const queryId=Querys.get('id');
     await axios.get(`http://localhost:3000/api/v1/influenceur/confirmer-email?id=${queryId}&email=${queryEmail}`)
       .then(res=>{
        ///console.log(res);
        setIsConfirm(true);
        setIdUser(res.data.id)
        //console.log(isConfirm);
        toast.success("Success Confirm Email");
       })
       .catch((err)=>{
        console.log(err.response.data.errors[0].message);
        //UserId must be unique
        if(err.response.data.errors[0].message){
          toast.error("Deja confirmer votre Email ! ");
        }else{
          toast.error("erreur dans confirmations email");
        }
       });
  }
  fetchUser()
  },[]);

//console.log(isConfirm)
//http://localhost:3000/api/v1/influenceur/confirmer-email?email=${req.body.email}
  return (
   <>
     <ToastContainer autoClose={3000}/>
     {
      isConfirm ? 
      ( 
       <><ConfirmInstagram id={idUser} /></>
      ) 
      : 
      (
        <>
         <div>Error Confimation email ! </div>
        </>
      )
     }
      
    </>
  )
}

export default ConfimerEmail