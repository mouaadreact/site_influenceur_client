import {createSlice} from '@reduxjs/toolkit'

const galerieCampagneReducer=createSlice({
 name:'galerieCampagne',
 initialState:{
   allGalerieCampagneData:[],
   galerieOneCampagneData:[],
   loading:null,
   error:false
 },
 reducers:{
   startGalerieCampagne:(state)=>{
     state.loading=true;
   },
   successGetAllGalerieCampagne:(state,action)=>{
    state.allGalerieCampagneData=action.payload;
    state.loading=false
   },
   successGetGalerieOneCampagne:(state,action)=>{
    state.galerieOneCampagneData=action.payload;
    state.loading=false
   },
   successGalerieCampagne:(state)=>{
     state.loading=false
   },
   errorGalerieCampagne:(state)=>{
    state.loading=false;
    state.error=true;
   }
 }

});

export const {startGalerieCampagne,errorGalerieCampagne,successGalerieCampagne,successGetAllGalerieCampagne,successGetGalerieOneCampagne}=galerieCampagneReducer.actions;
export default galerieCampagneReducer.reducer;