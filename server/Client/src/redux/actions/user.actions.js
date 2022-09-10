import axios from 'axios';
import {startUser,errorUser,successGetAllUser, successGetOneUser, successUser} from '../reducers/user.reducer';
import {toast } from 'react-toastify'; 

//---------
export const getAllUser = async (dispatch)=>{
 dispatch(startUser());
 try{
    const res = await axios({
     method:"get",
     url:`${process.env.REACT_APP_URL_SERVER}/api/v1/user`,
     withCredentials:true
   })
    dispatch(successGetAllUser(res.data));
 }catch(err){
   dispatch(errorUser())
 }
}

//-------
export const getOneUser = async (id,dispatch)=>{
  dispatch(startUser());
  try{
   let res;
    if(id){
     res = await axios({
      method:"get",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/user/${id}`,
      withCredentials:true
     })
    }else{
      res={
      data:""
     }
    }
     dispatch(successGetOneUser(res.data));
  }catch(err){
    dispatch(errorUser())
  }
 }

//-----
export const deleteUser = async (id,dispatch)=>{
 dispatch(startUser());
 try{
    const res = await axios({
     method:"delete",
     url:`${process.env.REACT_APP_URL_SERVER}/api/v1/user/${id}`,
     withCredentials:true
    });
       getAllUser(dispatch)

 }catch(err){
   dispatch(errorUser())
 }
}

//-----------

export const updateUser = async (id,newPassword,dispatch)=>{
  dispatch(startUser());
  try{
     const res = await axios({
      method:"put",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/user/${id}`,
      withCredentials:true,
      data:{
        newPassword
      }
    })
    
    toast.success("Success Change Password");
    getOneUser(id)
     
  }catch(err){
    dispatch(errorUser())
    toast.error("Error in Change Password");
  }
 }

