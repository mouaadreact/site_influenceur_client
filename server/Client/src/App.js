import React from 'react'
import './App.css';
import Routers from './components/Routers/Routers'
import {UemailContext}  from './contexts/AppContext';
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [uEmail,setUemail]=useState(); 
 
  useEffect(()=>{
    const fetchToken =async ()=>{ 
    await axios({
      method:"get",
      url:`http://localhost:5000/jwtid`,
      withCredentials:true
    })
       .then((res)=>{
          console.log(uEmail);
          setUemail(res.data);
       })
       .catch((err)=>console.log("No token"))
  }
  fetchToken();

  },[uEmail]);

  return (
    <UemailContext.Provider value={uEmail}>
        <Routers/>
   </UemailContext.Provider>   
  );
}

export default App;
