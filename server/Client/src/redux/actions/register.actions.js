
import axios from 'axios';
import {toast } from 'react-toastify'; 
import { errorRegister, startRegister, successAfficherCompteInstg, successConfirm, successRegister } from '../reducers/register.reducer';

//----
 export const register = async (data,dispatch)=>{
     dispatch(startRegister());
     try{
        const res = await axios({
         method:"post",
         url:`${process.env.REACT_APP_URL_SERVER}/api/v1/auth/register`,
         data
     });
  
         window.location.href=`/register/verifierEmail`

     }catch(err){
      console.log(err)
       dispatch(errorRegister(err.response.data.errors[0].message))
     }
 }
 
 export const confirmEmail=async (token,dispatch)=>{
  dispatch(startRegister());
    if(token!==null){
     try{
        const res = await axios({
         method:"get",
         url:`${process.env.REACT_APP_URL_SERVER}/api/v1/influenceur/confirmer-email?token=${token}`
             });
         localStorage.setItem("idUser",res.data.id);
         toast.success("Success Confirm Email");
         dispatch(successRegister(res.data.id));

     }catch(err){
      console.log(err)
        if(err.response.data.errors[0].message==="UserId must be unique"){
         toast.error("Deja confirmer votre Email ! ");
       }else{
         toast.error("erreur dans confirmations email");
       }
       dispatch(errorRegister(err.response.data.errors[0].message))
     }
    }
 }

 //---
 export const afficherCompteInstagram=async (id,data,dispatch)=>{
 
  dispatch(startRegister());
   try{
    const res=await axios.put(`${process.env.REACT_APP_URL_SERVER}/api/v1/influenceur/afficherCompte/${id}`,{
     ...data
     });
     dispatch(successAfficherCompteInstg(res.data));
   }catch(err){
     console.log(err);
     dispatch(errorRegister());
   }

 }

 //----
 export const validerCompteInstagram=async (id,dispatch)=>{
  dispatch(startRegister());
  try{
    const res=await axios.put(`${process.env.REACT_APP_URL_SERVER}/api/v1/influenceur/valideCompte/${id}`);
    window.location.href=`/register/completeProfil?id=${id}`;
  }catch(err){
    dispatch(errorRegister());
  }
 }

 //----
//compelete profil : 
 export const compeleteProfil=async (id,data,dispatch)=>{
  dispatch(startRegister());
  try{

    await axios({
      method:"put",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/influenceur/complete/${id}`,
      data
      });
    
    await axios.put(`${process.env.REACT_APP_URL_SERVER}/api/v1/influenceur/accepterCondition/${id}`);
    window.location.href=`/login`;
  }catch(err){
     dispatch(errorRegister());
  }
 }
