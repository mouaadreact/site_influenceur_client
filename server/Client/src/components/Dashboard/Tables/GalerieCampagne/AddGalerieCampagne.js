import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { uploadGalerieCampagne } from '../../../../redux/actions/galerieCampagne.actions';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

//-----
function AddGalerieCampagne({handleChangeButton,CampagneData}) {
  const dispatch=useDispatch();
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

     for(let i=0;i<files.length;i++)
       {data.append('images',files[i])}

     uploadGalerieCampagne(data,dispatch);
  }
 
  return (
    <>
      <ToastContainer autoClose={2000}/>

     <div className="card-header">
     <a 
     onClick={(e)=>handleChangeButton(e)}
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