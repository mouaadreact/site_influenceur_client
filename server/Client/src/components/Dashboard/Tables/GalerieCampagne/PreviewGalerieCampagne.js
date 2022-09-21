import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteImageInGalerieOfOneCampagne,
  getGalerieOneCampagne,
} from "../../../../redux/actions/galerieCampagne.actions";
import "./GalerieCampagne.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PreviewGalerieCampagne({ idCampagne }) {
  console.log(idCampagne);
  const dispatch = useDispatch();
  const { galerieOneCampagneData } = useSelector(
    (state) => state.galerieCampagne
  );

  const [urlDelete,setUrlDelete]=useState("");
  const [idDelete,setIdDelete]=useState("");
  const [show, setShow] = useState(false);

//*fetch data
  useEffect(() => {
    getGalerieOneCampagne(idCampagne, dispatch);
  }, [idCampagne]);


//*handle function
  const handleClose = () => setShow(false);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteImageInGalerieOfOneCampagne(urlDelete,idDelete,dispatch);
    setShow(false);
  };

  const handleShow = (url,id) =>{
    setShow(true);
    setIdDelete(id)
    setUrlDelete(url)
  }


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>Want you delete this image of campagne ?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>handleDelete(e)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row">
        {galerieOneCampagneData?.map((ele, index) => {
          return (
            <div 
            key={index + 1} 
            className="col-lg-4 col-md-12 mb-4 mb-lg-0"
         
            >
              <img
                key={index + 1}
                src={ele?.image}
                className="w-100 shadow-1-strong rounded mb-4"
                alt="Wintry Mountain Landscape"
              />

              <div className="d-flex justify-content-between">
              <p>{ele?.Campagne?.titre}</p>
              <button
                onClick={(e) => handleShow(ele?.image, ele?.CampagneId)}
                className="button-delete"
              >
                Delete
              </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default PreviewGalerieCampagne;
