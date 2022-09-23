import axios from 'axios';
import { toast } from 'react-toastify';
import {startCampagne,errorCampagne,successCampagne,successGetAllCampagne,successGetOneCampagne, successGetCountCampagne} from '../reducers/campagne.reducer';


//------
export const addInteretToCampagne=async (interetData,idCampagne)=>{
  try{
    interetData.forEach(async (ele) => {
     const res= await axios({
      method:"post",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/interetCampagne/${ele.id}/${idCampagne}`
       });
    window.location.href="/dashboard/campagne";

   });
  }catch(err){
    console.log(err)
  }
}

//------- 
export const addCampagne = async (data,interetData,dispatch)=>{
  dispatch(startCampagne());
  try{
    
     const res = await axios({
      method:"post",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/campagne`,
      withCredentials:true,
      data
    });

    try{
      interetData.forEach(async (ele) => {
       await axios({
        method:"post",
        url:`${process.env.REACT_APP_URL_SERVER}/api/v1/interetCampagne/${ele}/${res.data.id}`
         });
      window.location.href="/dashboard/campagne";
  
     });
    }catch(err){
      console.log(err)
    }
  
      /*interetData.forEach(async (ele) => {
         await axios.post(`${process.env.REACT_APP_URL_SERVER}/api/v1/interetCampagne/${ele}/${res.data.id}`)
      });*/


     //window.location.href="/dashboard/campagne";
    // toast.success("add campagne success")
    
     
  }catch(err){
    dispatch(errorCampagne(err.response.data.errors[0].message))
  }
 }

//---------
export const getAllCampagne = async (dispatch)=>{
 dispatch(startCampagne());
 try{
    const res = await axios({
     method:"get",
     url:`${process.env.REACT_APP_URL_SERVER}/api/v1/campagne`,
     withCredentials:true
   })
    dispatch(successGetAllCampagne(res.data));
 }catch(err){
   dispatch(errorCampagne())
 }
}


//-------
export const getOneCampagne = async (id,dispatch)=>{
  dispatch(startCampagne());
  try{
     const res = await axios({
      method:"get",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/campagne/${id}`,
      withCredentials:true
    })
     dispatch(successGetOneCampagne(res.data));
    
  }catch(err){
    dispatch(errorCampagne())
  }
 }

//-----
export const deleteCampagne = async (id,dispatch)=>{
 dispatch(startCampagne());
 try{
    const res = await axios({
     method:"delete",
     url:`${process.env.REACT_APP_URL_SERVER}/api/v1/campagne/${id}`,
     withCredentials:true
    });
       getAllCampagne(dispatch)

 }catch(err){
   dispatch(errorCampagne())
 }
}

//-----------
export const deleteInteretCampagne=async (id)=>{
  try{
    const res = await axios({
      method:"delete",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/interetCampagne/campagne/${id}`
    })
  
  }catch(err){
    console.log(err);
  }
}


 
//-------
export const updateCampagne = async (id,data,interetData,dispatch)=>{
  dispatch(startCampagne());
  try{
     const res = await axios({
      method:"put",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/campagne/${id}`,
      withCredentials:true,
      data
    })
    await deleteInteretCampagne(id);
    if(interetData.length==0){
      window.location.href="/dashboard/campagne"
    }
    await addInteretToCampagne(interetData,id);

   
   
     
  }catch(err){
    console.log(err)
    dispatch(errorCampagne(err.response.data.errors[0].message))
  }
 }


 //!---------------------------------------------------------

 
export const filterCampagne= async (data,interet,dispatch)=>{
  dispatch(startCampagne());
  try{
     const res = await axios.post(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/campagne/filtrage`,
        {
          ...data,
          interet
        }
      )

    dispatch(successGetAllCampagne(res.data));
    
  }catch(err){
    dispatch(errorCampagne())
  }
}

//!------------------------------------------
 
export const getCountCampagne=async (dispatch)=>{
  dispatch(startCampagne())
  try{
    const res = await axios({
      method:"get",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/campagne/count`,
      withCredentials:true
    })
    dispatch(successGetCountCampagne(res.data))

  }catch(err)
  {
  dispatch(errorCampagne())
  }
 }