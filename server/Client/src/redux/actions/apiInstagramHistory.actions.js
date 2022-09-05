import axios from 'axios';
import { errorApiInstagram, startApiInstagram, successGetApiInstagram } from '../reducers/apiInstagramHistory.reducer';

//-------
export const getApiInstagramInfluenceur = async (id,dispatch)=>{
  dispatch(startApiInstagram());
  try{
     const res = await axios({
      method:"get",
      url:`${process.env.REACT_APP_URL_SERVER}/api/v1/apiInstagramHistory/${id}`,
      withCredentials:true
    })

  
    dispatch(successGetApiInstagram(res.data))
     
  }catch(err){
    dispatch(errorApiInstagram())
  }
 }
