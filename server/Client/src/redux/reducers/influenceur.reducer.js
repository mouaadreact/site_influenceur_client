import {createSlice} from '@reduxjs/toolkit'

const influenceurReducer=createSlice({
 name:'influenceur',
 initialState:{
   allInfluenceurData:[],
   oneInfluenceurData:{},
   loading:null,
   error:false
 },
 reducers:{
   startInfluenceur:(state)=>{
     state.loading=true;
   },
   successGetAllInfluenceur:(state,action)=>{
    state.allInfluenceurData=action.payload;
    state.loading=false
   },
   successGetOneInfluenceur:(state,action)=>{
    state.oneInfluenceurData=action.payload;
    state.loading=false
   },
   successInfluenceur:(state)=>{
     state.loading=false
   },
   errorInfluenceur:(state)=>{
    state.loading=false;
    state.error=true;
   }
 }

});

export const {startInfluenceur,errorInfluenceur,successGetAllInfluenceur,successGetOneInfluenceur,successInfluenceur}=influenceurReducer.actions;
export default influenceurReducer.reducer;