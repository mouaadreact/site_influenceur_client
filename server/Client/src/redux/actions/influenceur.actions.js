import axios from 'axios';
import { errorInfluenceur, startInfluenceur, successGetAllInfluenceur, successGetOneInfluenceur, successInfluenceur } from '../reducers/influenceur.reducer';



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
     const res = await axios({
      method:"get",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/influenceur/${id}`,
      withCredentials:true
    })
     dispatch(successGetOneInfluenceur(res.data));
    
  }catch(err){
    dispatch(errorInfluenceur())
  }
 }
//--------------------------------------------------------

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