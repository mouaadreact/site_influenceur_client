import React, { useContext } from 'react'
import { UidContext } from '../../../contexts/AppContext';
import Sidebar from '../Sidebar/Sidebar';
import Table from './Table'

function NewOffre() {
 const id = useContext(UidContext);
 const fieldsTable=[
  "Campagne ID",
  "Influenceur ID",
  "Status"
]

  return (
   <div className="d-flex" id="wrapper">
       <Sidebar/>
       <Table name="New Offre" fieldsTable={fieldsTable} id={id}/>
   </div>
  )
}

export default NewOffre