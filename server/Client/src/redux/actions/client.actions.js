import axios from 'axios';
import {startClient,errorClient,successGetAllClient, successGetOneClient, successClient, successGetCountClient} from '../reducers/client.reducer';

//-------
export const addClient = async (data,dispatch)=>{
  dispatch(startClient());
  try{
     const res = await axios({
      method:"post",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/client`,
      withCredentials:true,
      data
    })
    getAllClient(dispatch);
    window.location.href="/dashboard/client";
     
  }catch(err){
    dispatch(errorClient())
  }
 }

//---------
export const getAllClient = async (dispatch)=>{
 dispatch(startClient());
 try{
    const res = await axios({
     method:"get",
     url:`${process.env.REACT_APP_URL_SERVER}/api/v1/client`,
     withCredentials:true
   })
    dispatch(successGetAllClient(res.data));
 }catch(err){
   dispatch(errorClient())
 }
}

//-------
export const getOneClient = async (id,dispatch)=>{
  dispatch(startClient());
  try{
     const res = await axios({
      method:"get",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/client/${id}`,
      withCredentials:true
    })
     dispatch(successGetOneClient(res.data));
  }catch(err){
    dispatch(errorClient())
  } 
 }

//-----
export const deleteClient = async (id,dispatch)=>{
 dispatch(startClient());
 try{
    const res = await axios({
     method:"delete",
     url:`${process.env.REACT_APP_URL_SERVER}/api/v1/client/${id}`,
     withCredentials:true
    });
       getAllClient(dispatch)

 }catch(err){
   dispatch(errorClient())
 }
}

//-----------

export const updateClient = async (id,data,dispatch)=>{
  dispatch(startClient());
  try{
     const res = await axios({
      method:"put",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/client/${id}`,
      withCredentials:true,
      data
    })
    dispatch(successClient());
    window.location.href="/dashboard/client";
     
  }catch(err){
    dispatch(errorClient())
  }
 }



 //!------------------------------------------
 
 export const getCountClient=async (dispatch)=>{
  dispatch(startClient())
  try{
    const res = await axios({ 
      method:"get",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/client/count`,
      withCredentials:true
    })
    dispatch(successGetCountClient(res.data))

  }catch(err)
  {
    dispatch(errorClient())

  }
 }