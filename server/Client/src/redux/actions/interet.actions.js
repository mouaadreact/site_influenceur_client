import axios from 'axios';
import {startInteret,errorInteret,successGetAllInteret, successGetOneInteret, successInteret} from '../reducers/interet.reducer';

//-------
export const addInteret = async (data,dispatch)=>{
  dispatch(startInteret()); 
  try{
     const res = await axios({
      method:"post",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/interet`,
      withCredentials:true,
      data
    })
    getAllInteret(dispatch);
    window.location.href="/dashboard/interet";
     
  }catch(err){
    dispatch(errorInteret())
  }
 }

//---------
export const getAllInteret = async (dispatch)=>{
 dispatch(startInteret());
 try{
    const res = await axios({
     method:"get",
     url:`${process.env.REACT_APP_URL_SERVER}/api/v1/interet`,
     withCredentials:true
   })
    dispatch(successGetAllInteret(res.data));
 }catch(err){
   dispatch(errorInteret())
 }
}

//-------
export const getOneInteret = async (id,dispatch)=>{
  dispatch(startInteret());
  try{
     const res = await axios({
      method:"get",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/interet/${id}`,
      withCredentials:true
    })
     dispatch(successGetOneInteret(res.data));
  }catch(err){
    dispatch(errorInteret())
  }
 }

//-----
export const deleteInteret = async (id,dispatch)=>{
 dispatch(startInteret());
 try{ 
    const res = await axios({
     method:"delete",
     url:`${process.env.REACT_APP_URL_SERVER}/api/v1/interet/${id}`,
     withCredentials:true
    });
       getAllInteret(dispatch)

 }catch(err){
   dispatch(errorInteret())
 }
}

//-----------

export const updateInteret = async (id,data,dispatch)=>{
  dispatch(startInteret());
  try{
     const res = await axios({
      method:"put",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/interet/${id}`,
      withCredentials:true,
      data
    })
    dispatch(successInteret());
    window.location.href="/dashboard/interet";
     
  }catch(err){
    dispatch(errorInteret())
  }
 }

