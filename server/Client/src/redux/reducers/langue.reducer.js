import { createSlice } from "@reduxjs/toolkit"; 

export const langueReducer=createSlice({
 name:'user',
 initialState:{
    langueData:[],
    userId:0,
    loading:null,
    error:false,

 },
 reducers:{
  startLangue:(state)=>{
    state.loading=true;
  },
  successGetAllLangue:(state,action)=>{
    state.langueData=action.payload;
    state.loading=false
  }
  ,
  errorLangue:(state)=>{
   state.loading=false;
   state.error=true;
  }


 }
});

export const {errorLangue,startLangue,successGetAllLangue} =langueReducer.actions;
export default langueReducer.reducer;