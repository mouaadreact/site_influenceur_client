import React from 'react'
import './GalerieCampagne.css'

function PreviewGalerieCampagne() {
  return (
   <>
    <div className="row">
      
      <div className="col-lg-4 mb-4 mb-lg-0">
        <div
          className="bg-image hover-overlay ripple shadow-1-strong rounded"
          data-ripple-color="light"
        >
          <img
            src="https://mdbcdn.b-cdn.net/img/screens/yt/screen-video-3.webp"
            className="w-100"
          />
          
          <button className='button-delete'>Delete</button>
          
        </div>
      </div>
    </div>
   </>
  )
}

export default PreviewGalerieCampagne