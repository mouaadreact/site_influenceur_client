import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../Sidebar/Sidebar';
import Table from './Table';

function Offre() {
 const fieldsTable=[
    "Campagne ID",
    "Influenceur ID",
    "Status"
 ]


  return (
   <div className="d-flex" id="wrapper">
          <Sidebar/>
          <Table name="Offre" fieldsTable={fieldsTable} />
   </div>
  )
}

export default Offre