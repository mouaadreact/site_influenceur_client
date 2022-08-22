import React from 'react'
import Routers from './components/Routers/Routers'
import {UidContext}  from './contexts/AppContext';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { authJwt } from './redux/actions/auth.actions';


function App() {
  const {id}=useSelector(state=>state.auth.userData);
  const {loading}=useSelector(state=>state.auth);

  const dispatch=useDispatch();
 
  useEffect(()=>{
       authJwt(dispatch);
  },[id]);

 
  return (
    <UidContext.Provider value={id}>
        <Routers/>
   </UidContext.Provider>   
  );
}

export default App;
