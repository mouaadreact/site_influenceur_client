import axios from 'axios';
import {startCampagne,errorCampagne,successCampagne,successGetAllCampagne,successGetOneCampagne} from '../reducers/campagne.reducer';


//-------
export const addCampagne = async (data,interetData,dispatch)=>{
  dispatch(startCampagne());
  try{
    console.log(interetData);
     const res = await axios({
      method:"post",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/campagne`,
      withCredentials:true,
      data });
 
      interetData.forEach(async (ele) => {
         await axios.post(`${process.env.REACT_APP_URL_SERVER}/api/v1/interetCampagne/${ele}/${res.data.id}`)
      });


      getAllCampagne(dispatch);
      window.location.href="/dashboard/campagne";
     
  }catch(err){
    dispatch(errorCampagne())
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
    await addInteretToCampagne(interetData,id);

    dispatch(successCampagne());
    //window.location.href="/dashboard/campagne";
     
  }catch(err){
    dispatch(errorCampagne())
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