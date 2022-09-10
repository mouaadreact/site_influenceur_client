import {createSlice} from '@reduxjs/toolkit' 

const userReducer=createSlice({
 name:'user',
 initialState:{
   allUserData:[],
   oneUserData:{},
   loading:null,
   error:false
 },
 reducers:{
   startUser:(state)=>{
     state.loading=true;
   },
   successGetAllUser:(state,action)=>{
    state.allUserData=action.payload;
    state.loading=false
   },
   successGetOneUser:(state,action)=>{
    state.oneUserData=action.payload;
    state.loading=false
   },
   successUser:(state)=>{
     state.loading=false
   },
   errorUser:(state)=>{
    state.loading=false;
    state.error=true;
   }
 }

});

export const {startUser,errorUser,successUser,successGetAllUser,successGetOneUser}=userReducer.actions;
export default userReducer.reducer;