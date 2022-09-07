import axios from 'axios';
import {startEtatPaiment,errorEtatPaiment,successGetAllEtatPaiment, successGetOneEtatPaiment, successEtatPaiment} from '../reducers/EtatPaiment.reducer';

//-------
export const addEtatPaiment = async (data,dispatch)=>{
  dispatch(startEtatPaiment());
  try{
     const res = await axios({
      method:"post",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/etatPaiment`,
      withCredentials:true,
      data
    })
    getAllEtatPaiment(dispatch);
    window.location.href="/dashboard/etatPaiment";
     
  }catch(err){
    dispatch(errorEtatPaiment())
  }
 }

//---------
export const getAllEtatPaiment = async (dispatch)=>{
 dispatch(startEtatPaiment());
 try{
    const res = await axios({
     method:"get",
     url:`${process.env.REACT_APP_URL_SERVER}/api/v1/etatPaiment`,
     withCredentials:true
   })
    dispatch(successGetAllEtatPaiment(res.data));
 }catch(err){
   dispatch(errorEtatPaiment())
 }
}

//-------
export const getOneEtatPaiment = async (id,dispatch)=>{
  dispatch(startEtatPaiment());
  try{
     const res = await axios({
      method:"get",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/etatPaiment/${id}`,
      withCredentials:true
    })
     dispatch(successGetOneEtatPaiment(res.data));
  }catch(err){
    dispatch(errorEtatPaiment())
  }
 }

//-----
export const deleteEtatPaiment = async (id,dispatch)=>{
 dispatch(startEtatPaiment());
 try{
    const res = await axios({
     method:"delete",
     url:`${process.env.REACT_APP_URL_SERVER}/api/v1/etatPaiment/${id}`,
     withCredentials:true
    });
       getAllEtatPaiment(dispatch)

 }catch(err){
   dispatch(errorEtatPaiment())
 }
}

//-----------

export const updateEtatPaiment = async (id,data,dispatch)=>{
  dispatch(startEtatPaiment());
  try{
     const res = await axios({
      method:"put",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/etatPaiment/${id}`,
      withCredentials:true,
      data
    })
    dispatch(successEtatPaiment());
    window.location.href="/dashboard/etatPaiment";
     
  }catch(err){
    dispatch(errorEtatPaiment())
  }
 }

