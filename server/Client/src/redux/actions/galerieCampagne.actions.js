import axios from 'axios';
import {startGalerieCampagne,errorGalerieCampagne,successGalerieCampagne,successGetAllGalerieCampagne,successGetGalerieOneCampagne} from '../reducers/galerieCampagne.reducer';
import {toast } from 'react-toastify'; 

//-------
export const uploadGalerieCampagne = async (data,dispatch)=>{

  dispatch(startGalerieCampagne());
  try{
     const res = await axios({
      method:"post",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/galerieCampagne`,
      withCredentials:true,
      data
    });    
    if(res){
      toast.success("Upload images Successufly ! ");
    }
     
  }catch(err){
    toast.error("Error in Upload Images ! ");
    dispatch(errorGalerieCampagne())
  }
 }
//----------
export const getAllGalerieCampagne= async (dispatch)=>{
  dispatch(startGalerieCampagne())
  try {
    const res=await axios.get(`${process.env.REACT_APP_URL_SERVER}/api/v1/galerieCampagne`);
    dispatch(successGetAllGalerieCampagne(res.data));
  }catch(err){
  dispatch(errorGalerieCampagne())
  }
}
//---------
export const getGalerieOneCampagne = async (id,dispatch)=>{

 dispatch(startGalerieCampagne());
 try{
  if(id){
  const res=await axios.get(`${process.env.REACT_APP_URL_SERVER}/api/v1/galerieCampagne/${id}`) 
  dispatch(successGetGalerieOneCampagne(res.data));
  }else{
    const res=await axios.get(`${process.env.REACT_APP_URL_SERVER}/api/v1/galerieCampagne`) 
    dispatch(successGetGalerieOneCampagne(res.data));
  }
 }catch(err){
   dispatch(errorGalerieCampagne())
 }
}

//-----
export const deleteImageInGalerieOfOneCampagne=async (url,id,dispatch)=>{
 dispatch(startGalerieCampagne());
 try{
   console.log(url,id);
  const res=await axios({
   method:"delete",
   url:`${process.env.REACT_APP_URL_SERVER}/api/v1/galerieCampagne/${id}?url=${url}`
  }) 
  getGalerieOneCampagne(id,dispatch)
    
 }catch(err){
   dispatch(errorGalerieCampagne())
 }

}