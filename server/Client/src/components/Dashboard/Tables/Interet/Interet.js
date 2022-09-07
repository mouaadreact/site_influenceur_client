import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../Sidebar/Sidebar';
import Table from './Table';

function Interet() {
 const fieldsTable=[
    "Interet"
 ]


  return (
   <div className="d-flex" id="wrapper">
          <Sidebar/>
          <Table name="Interet" fieldsTable={fieldsTable} />
   </div>
  )
}

export default Interet