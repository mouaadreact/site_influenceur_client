import {createSlice} from '@reduxjs/toolkit'

const filterReducer=createSlice({
 name:'filter',
 initialState:{
   centreInteret:[],
   statusCampagne:[],
   loading:null,
   error:false 
 },
 reducers:{
   startFilter:(state)=>{
     state.loading=true;
   },
   successAddCentreInteret:(state,action)=>{
    state.centreInteret=action.payload;
    state.loading=false
   },
   successAddStatusCampagne:(state,action)=>{
     state.statusCampagne=action.payload;
    
     state.loading=false
   },
   errorFilter:(state)=>{
    state.loading=false;
    state.error=true;
   }
 }

});

export const {
  startFilter,
  errorFilter,
  successAddCentreInteret,
  successAddStatusCampagne
  }=filterReducer.actions;
export default filterReducer.reducer;