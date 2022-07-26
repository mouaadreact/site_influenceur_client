import {createSlice} from '@reduxjs/toolkit'

const campagneReducer=createSlice({
 name:'campagne',
 initialState:{ 
   allCampagneData:[],
   oneCampagneData:{},
   countCampagne:0,
   loading:null,
   error:"",
   errorStatus:false
 },
 reducers:{
   startCampagne:(state)=>{
     state.loading=true;
   },
   successGetAllCampagne:(state,action)=>{
    state.allCampagneData=action.payload;
    state.loading=false
   },
   successGetOneCampagne:(state,action)=>{
    state.oneCampagneData=action.payload;
    state.loading=false
   },
   successGetCountCampagne:(state,action)=>{
    state.countCampagne=action.payload;
    state.loading=false
   },
   successCampagne:(state)=>{
     state.loading=false
   },
   errorCampagne:(state,action)=>{
    state.loading=false;
    state.error=action.payload;
    state.errorStatus=true;
   }
 }

});

export const {
  startCampagne,
  successCampagne,
  successGetAllCampagne,
  successGetOneCampagne,
  successGetCountCampagne,
  errorCampagne}=campagneReducer.actions;
export default campagneReducer.reducer;