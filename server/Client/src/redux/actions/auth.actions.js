
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { errorAuth, startAuth, successJwt, successJwtId, successLogin } from '../reducers/auth.reducer';
import cookie from 'js-cookie';
import {toast } from 'react-toastify'; 

//----
 export const authJwt = async (dispatch)=>{
     dispatch(startAuth());
     try{
        const res = await axios({
         method:"get",
         url:`${process.env.REACT_APP_URL_SERVER}/jwtid`,
         withCredentials:true
       })
        
        dispatch(successJwtId(res.data.id));
        //console.log(res.data.id)
     }catch(err){
       console.log("No token");
       dispatch(errorAuth()) 
     }
 }

 //----------------

 export const authLogin=async (data,dispatch)=>{
  dispatch(startAuth());
  try{
     const res = await axios({
      method:"post",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/auth/login`,
      withCredentials:true,
      data
    });

   
     console.log(res.data)
     
     if(res.data.status==='login'){
      dispatch(successLogin(res.data));
      localStorage.setItem('jwt',res.data.token);
      localStorage.setItem('role',res.data.role);

      switch(res.data.role){
       case "admin":
        window.location='/dashboard/home'
              break;
       case "influenceur":
        window.location='/profil/home'
             break;
       default:
             break;
      }
     }else if(res.data.status==='confirmEmail'){
      window.location='/register/verifierEmail';
     }else if(res.data.status==='validCompte'){
      window.location=`/register/confirmInstagram?id=${res.data.id}`;
     }else if(res.data.status==='completeProfil'){
      window.location=`/register/completeProfil?id=${res.data.id}`;
     }
      else if(res.data.status==='conditionGenrale'){
        window.location=`/register/completeProfil?id=${res.data.id}`;
     }else if(res.data.status==="ActiveCompte"){
      toast.error("cette Compte est desactiver");
     }

  }catch(error){
    console.log(error)
    dispatch(errorAuth(error.response.data.err));
  }
 }

 //---

 export const authLogout= async (dispatch)=>{
  dispatch(startAuth());
  try{
     const res =await axios({
     method:"get",
     url:`${process.env.REACT_APP_URL_SERVER}/api/v1/auth/logout`,
     withCredentials:true
    });
      cookie.remove("jwt",{expires:1});
      localStorage.removeItem("jwt");
      localStorage.removeItem("role");
      window.location.href='/login';  
    

  } catch(err){
    console.log(err)
    dispatch(errorAuth())
  }


 }