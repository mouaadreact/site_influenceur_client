import {createSlice} from '@reduxjs/toolkit'

const apiInstagramHistoryReducer=createSlice({
 name:'apiInstagram',
 initialState:{
   instagramFilePath:{},
   loading:null,
   error:false
 },
 reducers:{
   startApiInstagram:(state)=>{
     state.loading=true;
   },
   successGetApiInstagram:(state,action)=>{
    state.instagramFilePath=action.payload;
    state.loading=false
   },
   errorApiInstagram:(state)=>{
    state.loading=false;
    state.error=true;
   }
 }

});

export const {
 startApiInstagram,
 errorApiInstagram,
 successGetApiInstagram}=apiInstagramHistoryReducer.actions;

export default apiInstagramHistoryReducer.reducer;