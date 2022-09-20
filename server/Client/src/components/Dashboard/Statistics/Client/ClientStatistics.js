import React, { useEffect, useState } from 'react'
import Chart from './Chart'
import {useDispatch,useSelector} from 'react-redux'
import { getNombreCampagneOfClient } from '../../../../redux/actions/client.actions';

function ClientStatistics() {
const dispatch=useDispatch();
const {nombreCampagneOfClient}=useSelector(state=>state.client);

useEffect(() => {
  getNombreCampagneOfClient(dispatch);
}, []);


const userData={
  labels:nombreCampagneOfClient.map((data)=>data.raisonSociale),
  datasets:[{
   label:"nombre campagne of client",
   data:nombreCampagneOfClient.map((data)=>data.nombreCampagne),
   backgroundColor:['#16213E','#D800A6']
}]
}

  return (
    <div style={{width:"700px"}}>
      <Chart chartData={userData}/>
    </div>
  )
}

export default ClientStatistics