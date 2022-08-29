import {createSlice} from '@reduxjs/toolkit'

const interetReducer=createSlice({
 name:'client',
 initialState:{
   allInteretData:[],
   loading:null,
   error:false
 },
 reducers:{
   startInteret:(state)=>{
     state.loading=true;
   },
   successGetAllInteret:(state,action)=>{
    state.allInteretData=action.payload;
    state.loading=false
   },
   successGetOneInteret:(state,action)=>{
    state.oneInteretData=action.payload;
    state.loading=false
   },
   successInteret:(state)=>{
     state.loading=false
   },
   errorInteret:(state)=>{
    state.loading=false;
    state.error=true;
   }
 }

});

export const {startInteret,successGetAllInteret,successGetOneInteret,successInteret,errorInteret}=interetReducer.actions;
export default interetReducer.reducer;