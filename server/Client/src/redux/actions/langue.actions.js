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
   console.log(res.data);
   dispatch(successGetAllLangue(res.data));
   
 }catch(err){
   dispatch(errorLangue());
 }
}