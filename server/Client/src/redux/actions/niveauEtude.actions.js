import axios from "axios";
import {
  errorNiveauEtude,
  startNiveauEtude,
  successGetAllNiveauEtude,
} from "../reducers/niveauEtude.reducer";

export const getAllNiveauEtude = async (dispatch) => {
  dispatch(startNiveauEtude());
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.REACT_APP_URL_SERVER}/api/v1/niveauEtude`,
      withCredentials: true,
    });

    dispatch(successGetAllNiveauEtude(res.data));
  } catch (err) {
    dispatch(errorNiveauEtude());
  }
};

//*==========================================

export const addNiveauEtude = async (data, dispatch) => {
  dispatch(startNiveauEtude());
  try {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_URL_SERVER}/api/v1/niveauEtude`,
      withCredentials: true,
      data,
    });

  } catch (err) {
    dispatch(errorNiveauEtude());
  }
};

//*=======================================================
export const deleteNiveauEtude = async (id, dispatch) => {
  dispatch(startNiveauEtude());
  try {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_URL_SERVER}/api/v1/niveauEtude/${id}`,
      withCredentials: true,
    });
  } catch (err) {
    dispatch(errorNiveauEtude());
  }
};

//*====================================================

export const updateNiveauEtude = async (id,data,dispatch) => {
 dispatch(startNiveauEtude());
 try {
    await axios({
     method: "put",
     url: `${process.env.REACT_APP_URL_SERVER}/api/v1/niveauEtude/${id}`,
     withCredentials: true,
     data
   });

 } catch (err) {
   dispatch(errorNiveauEtude());
 }
};

