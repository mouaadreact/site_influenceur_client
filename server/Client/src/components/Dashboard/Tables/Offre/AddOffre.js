import React from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import AddOffreForm from './AddOffreForm'
import FilterInfluenceur from './FilterInfluenceur'

function AddOffre() {
  return (
   <div className="d-flex" id="wrapper">
     <Sidebar />
     <AddOffreForm/>
     <FilterInfluenceur/>
   </div>
  )
}

export default AddOffre