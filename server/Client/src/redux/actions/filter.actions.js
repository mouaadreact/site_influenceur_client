import { errorFilter, startFilter, successAddCentreInteret } from "../reducers/filter.reducer"

export const filterCentreInteret=(data,dispatch)=>{
 dispatch(startFilter());
 dispatch(successAddCentreInteret(data));

}