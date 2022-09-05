import React, { useCallback, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllInteret } from '../../../../redux/actions/interet.actions';
import { filterCentreInteret, filterStatusCampagne } from '../../../../redux/actions/filter.actions';

function FilterSidebar() {
 
  const dispatch=useDispatch();

  const {allInteretData}=useSelector(state=>state.interet);
  const { statusCampagne}=useSelector(state=>state.filter);

  const [centreInteretFilter,setCentreInteretFilter]=useState([]);
  const [statusCampagneFilter,setStatusCampagneFilter]=useState([]);

  const [optionsInteret,setOptionsInteret]=useState([]);

  const fetchDataInteret = useCallback(() => {
 
   getAllInteret(dispatch);
   allInteretData.forEach(ele=>{
   setOptionsInteret((options)=>[...options,ele.interetNom])         
    });
  }, [allInteretData[0]?.id]);
 

  useEffect(()=>{
  fetchDataInteret();
  },[ fetchDataInteret]);

  const handleChangeInteret=(e)=>{
       const data=[...centreInteretFilter]
        if(e.target.checked){
          if(!data.includes(e.target.value)){
             data.push(e.target.value)
          }
         
        }else{
           data.pop(e.target.value)
        }
        setCentreInteretFilter(data);
        filterCentreInteret(data,dispatch);       
    }


    const handleChangeStatusCampagne=(e)=>{
     
      const data=[...statusCampagneFilter]
       if(e.target.checked){
         if(!data.includes(e.target.value)){
            data.push(e.target.value)
         }
        
       }else{
          data.pop(e.target.value)
       }
       setStatusCampagneFilter(data);
       filterStatusCampagne(data,dispatch);       
   }
 
  
  return (
  <div className="bg-white" id="sidebar-wrapper">
    <div className="sidebar-heading primary-bg text-center py-3 text-white fs-4 fw-bold text-uppercase border-bottom"><i
         className="fas fa-user-secret me-2"
            ></i>Filter</div>
    <div className="list-group list-group-flush my-3">
       <div style={{marginLeft:"10px"}} >
          
          <table>
           <thead>
              <tr>
                <th>Centre Interet</th>
              </tr>
            </thead> 
            <tbody>
              {
               optionsInteret && optionsInteret.map((ele,index)=>(
                    <tr key={index+1} >
                       <td >
                       <input 
                      
                       type="checkbox" 
                       id="scales" 
                       name="scales"
                       value={ele}
                       onChange={e=>handleChangeInteret(e)}
                              />
                       <label
                       
                       style={{marginLeft:"10px"}} 
                       htmlFor="scales">{ele}</label>
                      </td> 
                   </tr>
               ))
              }
             </tbody>
          </table>

          
       </div>

    </div>
  </div>

  )
}

export default FilterSidebar