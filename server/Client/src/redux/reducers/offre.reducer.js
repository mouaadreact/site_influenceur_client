import {createSlice} from '@reduxjs/toolkit'

const offreReducer=createSlice({
 name:'offre',
 initialState:{
   allOffreData:[],
   newOffreData:[],
   historyOffreData:[], 
   countOffre:0,
   loading:null, 
   error:false
 },
 reducers:{
   startOffre:(state)=>{
     state.loading=true;
   },
   successGetAllOffre:(state,action)=>{
    state.allOffreData=action.payload;
    state.loading=false
   },
   successGetNewOffre:(state,action)=>{
    state.newOffreData=action.payload;
    state.loading=false
   },
   successGetHistoryOffre:(state,action)=>{
    state.historyOffreData=action.payload;
    state.loading=false
   },
   successGetCountOffre:(state,action)=>{
    state.countOffre=action.payload;
    state.loading=false
   },
   successOffre:(state)=>{
     state.loading=false
   },
   errorOffre:(state)=>{
    state.loading=false;
    state.error=true;
   }
 }

});

export const {
startOffre,
errorOffre,
successOffre,
successGetAllOffre,
successGetHistoryOffre,
successGetCountOffre,
successGetNewOffre}=offreReducer.actions;
export default offreReducer.reducer;