import { errorFilter, startFilter, successAddCentreInteret, successAddStatusCampagne } from "../reducers/filter.reducer"

export const filterCentreInteret=(data,dispatch)=>{
 dispatch(startFilter());
 dispatch(successAddCentreInteret(data));
 
}

export const filterStatusCampagne=(data,dispatch)=>{
 dispatch(startFilter());
 dispatch(successAddStatusCampagne(data));
 
}