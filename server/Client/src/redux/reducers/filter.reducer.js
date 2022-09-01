import {createSlice} from '@reduxjs/toolkit'

const filterReducer=createSlice({
 name:'client',
 initialState:{
   centreInteret:[],
   loading:null,
   error:false
 },
 reducers:{
   startFilter:(state)=>{
     state.loading=true;
   },
   successAddCentreInteret:(state,action)=>{
    state.centreInteret=[...action.payload];
    state.loading=false
   },
   errorFilter:(state)=>{
    state.loading=false;
    state.error=true;
   }
 }

});

export const {startFilter,errorFilter,successAddCentreInteret}=filterReducer.actions;
export default filterReducer.reducer;