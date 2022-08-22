import { createSlice } from "@reduxjs/toolkit";

export const authReducer=createSlice({
 name:'user',
 initialState:{
    userData:{},
    loading:null,
    error:false,
    userErrorMessagePassword:'',
    userErrorMessageEmail:''

 },
 reducers:{
  startAuth:(state)=>{
    state.loading=true;
  },
  successLogin:(state,action)=>{
    state.userData=action.payload;
    state.loading=false
  },
  successJwt:(state,action)=>{
   state.userData=action.payload;
   state.loading=false
 },
  errorAuth:(state,action)=>{
   state.userErrorMessagePassword=action.payload?.password;
   state.userErrorMessageEmail=action.payload?.email;
   state.loading=false;
   state.error=true;
  }



 }
});

export const {startAuth,errorAuth,successLogin,successJwt} =authReducer.actions;
export default authReducer.reducer;