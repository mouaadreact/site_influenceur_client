import { createSlice } from "@reduxjs/toolkit"; 

export const niveauEtudeReducer=createSlice({
 name:'niveauEtude',
 initialState:{
    allNiveauEtudeData:[],
    loading:null,
    error:false,

 },
 reducers:{
  startNiveauEtude:(state)=>{
    state.loading=true;
  },
  successGetAllNiveauEtude:(state,action)=>{
    state.allNiveauEtudeData=action.payload;
    state.loading=false
  }
  ,
  errorNiveauEtude:(state)=>{
   state.loading=false;
   state.error=true;
  }

 }
});

export const {
 errorNiveauEtude,
startNiveauEtude,
successGetAllNiveauEtude
} =niveauEtudeReducer.actions;
export default niveauEtudeReducer.reducer;