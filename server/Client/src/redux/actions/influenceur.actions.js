import axios from 'axios';
import { errorInfluenceur, startInfluenceur, successGetAllInfluenceur, successGetCountInfluenceur, successGetOneInfluenceur, successInfluenceur } from '../reducers/influenceur.reducer';



//---------
export const getAllInfluenceur = async (dispatch)=>{
 dispatch(startInfluenceur());
 try{
    const res = await axios({
     method:"get",
     url:`${process.env.REACT_APP_URL_SERVER}/api/v1/influenceur`,
     withCredentials:true
   })
    dispatch(successGetAllInfluenceur(res.data));
 }catch(err){
   dispatch(errorInfluenceur())
 }
}

//--------------------------------------------------------
export const getOneInfluenceur = async (id,dispatch)=>{
  dispatch(startInfluenceur());
  try{
    if(id){
      const res = await axios({
        method:"get",
        url:`${process.env.REACT_APP_URL_SERVER}/api/v1/influenceur/${id}`,
        withCredentials:true
      })
       dispatch(successGetOneInfluenceur(res.data));
    }
    
  }catch(err){
    dispatch(errorInfluenceur())
  }
 }

//--------------------------------------------------------
export const getOneInfluenceurUserId = async (id,dispatch)=>{
  dispatch(startInfluenceur());
  try{
    if(id){
      const res = await axios({
        method:"get",
        url:`${process.env.REACT_APP_URL_SERVER}/api/v1/influenceur/user/${id}`,
        withCredentials:true
      })
       dispatch(successGetOneInfluenceur(res.data));
    }
    
  }catch(err){
    dispatch(errorInfluenceur())
  }
 }


//----------------------------------------------------------
export const changeEtatCompteInfluenceur= async (id,status,dispatch)=>{
  dispatch(startInfluenceur());
  try{
     const res = await axios({
      method:"put",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/influenceur/changeEtatActiver/${id}`,
      withCredentials:true,
      data:{
        statusEtatActiver:!status
      }
    })

    getAllInfluenceur(dispatch)
    
  }catch(err){
    dispatch(errorInfluenceur())
  }
}

//--------------------------------------------------------
///ajouterCommentaire/:id



export const addCommentaire= async (id,commentaire,dispatch)=>{
  dispatch(startInfluenceur());
  try{
     const res = await axios({
      method:"put",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/influenceur/ajouterCommentaire/${id}`,
      withCredentials:true,
      data:{
        commentaire
      }
    })

    dispatch(successInfluenceur());
    window.location.href="/dashboard/influenceur";
    
  }catch(err){
    dispatch(errorInfluenceur())
  }
}
//--------------------------------------------------------



export const filterInfluenceur= async (data,langue,interet,dispatch)=>{
  dispatch(startInfluenceur()); 
  console.log(langue);
  try{
     const res = await axios.post(
      `${process.env.REACT_APP_URL_SERVER}/api/v1/influenceur/filtrage`,
        {
          ...data,
          langue,
          interet
        }
      )

    

    dispatch(successGetAllInfluenceur(res.data));
    
  }catch(err){
    dispatch(errorInfluenceur())
  }
}


//!-------------------------------------------------------


//-----------
export const deleteInteretInfluenceur=async (id)=>{
  try{
    const res = await axios({
      method:"delete",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/interetInfluenceur/influenceur/${id}`
    })
  
  }catch(err){
    console.log(err);
  }
}

//*------------------
export const addInteretToInfluenceur=async (interetData,idInfluenceur)=>{
  try{
    interetData.forEach(async (ele) => {
     const res= await axios({
      method:"post",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/interetInfluenceur/${ele}/${idInfluenceur}`
       });
   

   });
  }catch(err){
    console.log(err)
  }
}


//*==========================================


//-----------
export const deleteLangueInfluenceur=async (id)=>{
  try{
    const res = await axios({
      method:"delete",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/langueInfluenceur/influenceur/${id}`
    })
  
  }catch(err){
    console.log(err);
  }
}

//*------------------
export const addLangueToInfluenceur=async (langueData,idInfluenceur)=>{
  try{
    langueData.forEach(async (ele) => {
     const res= await axios({
      method:"post",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/langueInfluenceur/${ele}/${idInfluenceur}`
       });
   

   });
  }catch(err){
    console.log(err)
  }
}
 
//!------------------------------------
export const updateInfluenceur = async (id,data,langueData,interetData,dispatch)=>{
  dispatch(startInfluenceur());
  try{
     const res = await axios({
      method:"put",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/influenceur/${id}`,
      withCredentials:true,
      data
    })
    
    console.log(interetData)
    if(interetData.length>0){
       await deleteInteretInfluenceur(id);
       await addInteretToInfluenceur(interetData,id);
    }
   
    console.log(langueData)
    if(langueData.length>0){
      await deleteLangueInfluenceur(id);
      await addLangueToInfluenceur(langueData,id);
    }

    window.location.href="/profil/home"
  }catch(err){
    dispatch(errorInfluenceur())
  }
 }

 //!------------------------------------------
 
 export const getCountInfluenceur=async (dispatch)=>{
  dispatch(startInfluenceur())
  try{
    const res = await axios({
      method:"get",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/influenceur/count`,
      withCredentials:true
    }) 
    dispatch(successGetCountInfluenceur(res.data))

  }catch(err)
  {
  dispatch(errorInfluenceur())
  }
 }