import {createSlice} from '@reduxjs/toolkit'

const clientReducer=createSlice({
 name:'client',
 initialState:{
   allClientData:[],
   oneClientData:{},
   loading:null,
   error:false
 },
 reducers:{
   startClient:(state)=>{
     state.loading=true;
   },
   successGetAllClient:(state,action)=>{
    state.allClientData=action.payload;
    state.loading=false
   },
   successGetOneClient:(state,action)=>{
    state.oneClientData=action.payload;
    state.loading=false
   },
   successClient:(state)=>{
     state.loading=false
   },
   errorClient:(state)=>{
    state.loading=false;
    state.error=true;
   }
 }

});

export const {startClient,errorClient,successClient,successGetAllClient,successGetOneClient}=clientReducer.actions;
export default clientReducer.reducer;