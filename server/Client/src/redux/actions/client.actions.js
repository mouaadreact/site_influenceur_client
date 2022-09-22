import axios from 'axios';
import {startClient,errorClient,successGetAllClient, successGetOneClient, successClient, successGetCountClient, successGetNombreCampagneOfClient} from '../reducers/client.reducer';

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
    window.location.href="/dashboard/client";
     
  }catch(err){
    dispatch(errorClient(err.response.data.errors[0].message))
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

//!---------
export const getAllCompteActiveOfClient = async (dispatch)=>{
  dispatch(startClient());
  try{
     const res = await axios({
      method:"get",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/client/compteActive`,
      withCredentials:true
    })
     dispatch(successGetAllClient(res.data));
  }catch(err){
    dispatch(errorClient())
  }
 }

//!-------
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

//!-----
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
    dispatch(errorClient(err.response.data.errors[0].message))
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

 //!-----------------------------
 export const getNombreCampagneOfClient=async(dispatch)=>{
  dispatch(startClient());
  try{
    const res = await axios({ 
      method:"get",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/client/campagneCountOfClient`,
      withCredentials:true
    })
    dispatch(successGetNombreCampagneOfClient(res.data))
  }catch(err){
      dispatch(errorClient())
  }
 }

 //!------------------------------------------------

 export const changeEtatCompteClient=async(id,status,dispatch)=>{
  dispatch(startClient());
  try{
     const res = await axios({
      method:"put",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/client/changeEtatActiver/${id}`,
      withCredentials:true,
      data:{
        statusActive:!status
      }
    })

    getAllClient(dispatch)
    
  }catch(err){
    dispatch(errorClient())
  }
 }