import {createSlice} from '@reduxjs/toolkit'

const clientReducer=createSlice({
 name:'client',
 initialState:{ 
   allClientData:[],
   oneClientData:{},
   nombreCampagneOfClient:[],
   countClient:0,
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
   successGetCountClient:(state,action)=>{
    state.countClient=action.payload;
    state.loading=false
   },
   successGetNombreCampagneOfClient:(state,action)=>{
   state.nombreCampagneOfClient=action.payload;
   state.loading=false;
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

export const {
  startClient,
  errorClient,
  successClient,
  successGetAllClient,
  successGetCountClient,
  successGetOneClient,
  successGetNombreCampagneOfClient
}=clientReducer.actions;
export default clientReducer.reducer;