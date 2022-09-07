import { errorLangue, startLangue, successGetAllLangue } from "../reducers/langue.reducer";
import axios from 'axios';

export const getAllLangue=async (dispatch)=>{
 dispatch(startLangue());
 try{
   const res=await axios({ 
    method:"get",
    url:`${process.env.REACT_APP_URL_SERVER}/api/v1/langue`,
    withCredentials:true
   });
   
   dispatch(successGetAllLangue(res.data));
   
 }catch(err){
   dispatch(errorLangue());
 }
}

 
 export const addLangue=async (data,dispatch)=>{
  dispatch(startLangue());
  try{
    const res=await axios({ 
     method:"post",
     url:`${process.env.REACT_APP_URL_SERVER}/api/v1/langue`,
     withCredentials:true,
     data
    });

    //getAllInteret(dispatch);
    window.location.href="/dashboard/langue";
    
  }catch(err){
    dispatch(errorLangue());
  }
 }

 
 export const deleteLangue=async (id,dispatch)=>{
  dispatch(startLangue());
  try{
    const res = await axios({
      method:"delete",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/langue/${id}`,
      withCredentials:true
     });

    getAllLangue(dispatch)
    
  }catch(err){
    dispatch(errorLangue());
  }
 }
 

