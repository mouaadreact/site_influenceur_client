import React, { useState } from 'react'
import axios from 'axios'

function AddGalerieCampagne({handleAdd,CampagneData}) {

  const [CampagneId,setCampagneId]=useState("");
  const [files,setFiles]=useState([]);

  const handleChangeFiles=(e)=>{
    e.preventDefault();
    setFiles(e.target.files)
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
     const data=new FormData();
     data.append('CampagneId',CampagneId);
     console.log(files.length)
     for(let i=0;i<files.length;i++)
       {data.append('file',files[i])}
     await axios.post(`${process.env.REACT_APP_URL_SERVER}/api/v1/galerieCampagne`,data);
  }
 
  return (
    <>
     <div className="card-header">
     <a 
     onClick={(e)=>handleAdd(e)}
     className="btn btn-success float-end">
     view Galerie</a>
     <h4>Galerie Campagne</h4>
     </div>
     <div className='card-body'>
        <form onSubmit={(e)=>{handleSubmit(e)}}>
        <div className='mb-3'>
            <label style={{marginRight:"10px"}}>Campagne ID:</label>
            <select 
            name="CampagneId" 
            className='w-25'
            onChange={(e)=>{setCampagneId(e.target.value)}}>
            <option value="" hidden={true}>Veuillez select Campagne ID</option>
            {
            CampagneData.map((ele)=>{
            return <option value={ele.id} key={ele.id}>{ele.id}</option>
            })
           }
          </select>

        </div>
        <div className='mb-3'>
            <label htmlFor="image" style={{marginRight:"10px"}}>Choix images:</label>
            <input 
              type="file"
              name="file"
              onChange={(e)=>handleChangeFiles(e)}
              multiple
            />

        </div>
        <div className="mb-3">         
                       <button type="submit"  className="btn btn-primary">
                         upload Galerie
                       </button>
                     </div>
        </form>
     </div>
   </>
  )
}

export default AddGalerieCampagne