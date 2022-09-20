import axios from 'axios';

import {startEtatPaiment,errorEtatPaiment,successEtatPaiment,successGetAllEtatPaiment,successGetOneEtatPaiment} from '../reducers/etatPaiment.reducer'
//!--------------------------------------
export const addEtatPaiment = async (data,dispatch)=>{
  dispatch(startEtatPaiment());
  try{ 
     const res = await axios({ 
      method:"post",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/etatPaiment`,
      withCredentials:true,
      data
    })
    window.location.href="/dashboard/etatPaiment";
     
  }catch(err){
    dispatch(errorEtatPaiment())
  }
 }

//!---------------------------------
export const getAllEtatPaiment = async (CampagneId,dispatch)=>{
 dispatch(startEtatPaiment());
   try{
    const res = await axios({
     method:"get",
     url:`${process.env.REACT_APP_URL_SERVER}/api/v1/etatPaiment/campagne/${CampagneId}`,
     withCredentials:true
   })
    dispatch(successGetAllEtatPaiment(res.data));
 }catch(err){
   dispatch(errorEtatPaiment())
 }

}
//!--------------------------------------

export const getOneEtatPaiment = async (CampagneId,InfluenceurId,dispatch)=>{
  dispatch(startEtatPaiment());
  try{
     const res = await axios({
      method:"get",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/etatPaiment/${CampagneId}/${InfluenceurId}`,
      withCredentials:true
    })
     dispatch(successGetOneEtatPaiment(res.data));
  }catch(err){
    dispatch(errorEtatPaiment())
  }
 }


//!-----------------------------------
export const deleteEtatPaiment = async (CampagneId,InfluenceurId,dispatch)=>{
 dispatch(startEtatPaiment());
 try{
    const res = await axios({
     method:"delete",
     url:`${process.env.REACT_APP_URL_SERVER}/api/v1/etatPaiment/${CampagneId}/${InfluenceurId}`,
     withCredentials:true
    });

   //?--> probelem afficher ID
    getAllEtatPaiment("",dispatch)

 }catch(err){
   dispatch(errorEtatPaiment())
 }
}

//!-------------------------------------------

export const updateEtatPaiment = async (CampagneId,InfluenceurId,data,dispatch)=>{
  dispatch(startEtatPaiment());
  try{
     const res = await axios({
      method:"put",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/etatPaiment/${CampagneId}/${InfluenceurId}`,
      withCredentials:true,
      data
    })
    dispatch(successEtatPaiment());
    window.location.href="/dashboard/etatPaiment";
     
  }catch(err){
    dispatch(errorEtatPaiment())
  }
 }

