import axios from 'axios';

import {
  startOffre,
  errorOffre,
  successOffre,
  successGetAllOffre,
  successGetHistoryOffre, 
  successGetNewOffre,
  successGetCountOffre} from '../reducers/offre.reducer'
//!--------------------------------------
export const addOffre = async (data,dispatch)=>{
  dispatch(startOffre());
  try{ 
     const res = await axios({
      method:"post",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/offre`,
      withCredentials:true,
      data
    })
    window.location.href="/dashboard/offre";
     
  }catch(err){
    dispatch(errorOffre())
  }
 }

//!--------------------------------------
export const getAllOffre = async (CampagneId,dispatch)=>{
 dispatch(startOffre());
   try{
    const res = await axios({
     method:"get",
     url:`${process.env.REACT_APP_URL_SERVER}/api/v1/offre/campagne/${CampagneId}`,
     withCredentials:true
   })
    console.log(CampagneId)
    dispatch(successGetAllOffre(res.data));
 }catch(err){
   dispatch(errorOffre())
 }

}

 //!---------------------------------------------

//get new offre of one influenceur 
export const getNewOffre = async (InfluenceurId,dispatch)=>{
  dispatch(startOffre());
  try{
     const res = await axios({
      method:"get",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/offre/newOffre/${InfluenceurId}`,
      withCredentials:true
    })
     dispatch(successGetNewOffre(res.data));
  }catch(err){
    dispatch(errorOffre())
  }
 }

 //!-----------------------------------------------
 //History Offre get offre accepter:

 //!---------------------------------------------

//get new offre of one influenceur 
export const getOffreAccepter = async (InfluenceurId,dispatch)=>{
  dispatch(startOffre());
  try{
     const res = await axios({
      method:"get",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/offre/offreAccepter/${InfluenceurId}`,
      withCredentials:true
    })
     dispatch(successGetHistoryOffre(res.data));
  }catch(err){
    dispatch(errorOffre())
  }
 }
//!----------------------------------------------


export const AccepterOffre = async (CampagneId,InfluenceurId,dispatch)=>{
  dispatch(startOffre());
  try{
     const res = await axios({
      method:"put",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/offre/accepterOffre/${CampagneId}/${InfluenceurId}`,
      withCredentials:true
    })
     getNewOffre(InfluenceurId,dispatch);
     getAllOffre(CampagneId,dispatch)
  }catch(err){
    dispatch(errorOffre())
  }
 }


 //!------------------------------------

 
export const RefuserOffre = async (CampagneId,InfluenceurId,dispatch)=>{
  dispatch(startOffre());
  try{
     const res = await axios({
      method:"put",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/offre/refuserOffre/${CampagneId}/${InfluenceurId}`,
      withCredentials:true
    })
     getNewOffre(InfluenceurId,dispatch);
  }catch(err){
    dispatch(errorOffre())
  }
 }


 //!------------------------------------------
 
 export const getCountOffre=async (dispatch)=>{
  dispatch(startOffre())
  try{
    const res = await axios({
      method:"get",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/offre/count`,
      withCredentials:true
    })
    dispatch(successGetCountOffre(res.data))

  }catch(err)
  {
    dispatch(errorOffre())

  }
 }