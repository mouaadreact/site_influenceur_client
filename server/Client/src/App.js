import React from 'react'
import './App.css';
import Routers from './components/Routers/Routers'
import {UidContext}  from './contexts/AppContext';
import { useEffect, useState } from 'react';
import axios from 'axios'; 
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [uid,setUid]=useState(); 
 
  useEffect(()=>{
    const fetchToken =async ()=>{ 
    await axios({
      method:"get",
      url:`http://localhost:5000/jwtid`,
      withCredentials:true
    })
       .then((res)=>{
          setUid(res.data.id);
       })
       .catch((err)=>console.log("No token"))
  }
  fetchToken();

  },[]); //uid
 console.log(uid);
  return (
    <UidContext.Provider value={uid}>
        <Routers/>
   </UidContext.Provider>   
  );
}

export default App;
