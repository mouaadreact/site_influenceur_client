import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../Sidebar/Sidebar';
import Table from './Table';

function Campagne() {
 const fieldsTable=[
    "Titre",
    "Date debut",
    "Date fin",
    "Nombre influenceur",
    "Status"
 ]


  return (
   <div className="d-flex" id="wrapper">
          <Sidebar/>
          <Table name="Campagne" fieldsTable={fieldsTable} />
   </div>
  )
}

export default Campagne