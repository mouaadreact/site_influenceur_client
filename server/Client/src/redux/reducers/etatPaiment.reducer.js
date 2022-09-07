import {createSlice} from '@reduxjs/toolkit'

const etatPaimentReducer=createSlice({
 name:'etatPaiment',
 initialState:{
   allEtatPaiment:[],
   oneEtatPaiment:[],
   loading:null,
   error:false
 },
 reducers:{
   startEtatPaiment:(state)=>{
     state.loading=true;
   },
   successGetAllEtatPaiment:(state,action)=>{
    state.allEtatPaiment=action.payload;
    state.loading=false
   },
   successGetOneEtatPaiment:(state,action)=>{
    state.oneEtatPaiment=action.payload;
    state.loading=false
   },
   successEtatPaiment:(state)=>{
     state.loading=false
   },
   errorEtatPaiment:(state)=>{
    state.loading=false;
    state.error=true;
   }
 }

});

export const {
startEtatPaiment,
errorEtatPaiment,
successEtatPaiment,
successGetAllEtatPaiment,
successGetOneEtatPaiment}=etatPaimentReducer.actions;
export default etatPaimentReducer.reducer;