import { createSlice } from "@reduxjs/toolkit";

export const registerReducer=createSlice({
 name:'user',
 initialState:{
    instagramData:{},
    userId:0,
    loading:null,
    error:false,
    errorMessage:"",

 },
 reducers:{
  startRegister:(state)=>{
    state.loading=true;
  },
  successRegister:(state,action)=>{
    state.userId=action.payload;
    state.loading=false
  },
  successAfficherCompteInstg:(state,action)=>{
    state.instagramData=action.payload;
    state.loading=false;
  }
  ,
  errorRegister:(state,action)=>{
   state.loading=false;
   state.error=true;
   state.errorMessage=action.payload
  }




 }
});

export const {startRegister,errorRegister,successRegister,successAfficherCompteInstg} =registerReducer.actions;
export default registerReducer.reducer;