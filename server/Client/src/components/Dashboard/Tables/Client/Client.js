import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../Sidebar/Sidebar';
import Table from './Table';

function Client() {
 const fieldsTable=[
    "Nom societe",
    "Nom directeur",
    "telephone",
    "email"
 ]


  return (
   <div className="d-flex" id="wrapper">
          <Sidebar/>
          <Table name="Client" fieldsTable={fieldsTable} />
   </div>
  )
}

export default Client