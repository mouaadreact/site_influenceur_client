import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteImageInGalerieOfOneCampagne,
  getGalerieOneCampagne,
} from "../../../../redux/actions/galerieCampagne.actions";
import "./GalerieCampagne.css";

function PreviewGalerieCampagne({ idCampagne }) {
  console.log(idCampagne);
  const dispatch = useDispatch();
  const { galerieOneCampagneData } = useSelector(
    (state) => state.galerieCampagne
  );

  const handleDelete = (e, url, id) => {
    deleteImageInGalerieOfOneCampagne(url, id, dispatch);
  };
  console.log(galerieOneCampagneData);

  useEffect(() => {
    getGalerieOneCampagne(idCampagne, dispatch);
  }, [idCampagne]);
  return (
    <>
      <div className="row">
        {galerieOneCampagneData?.map((ele, index) => {
          return (
            <div 
            key={index + 1} 
            className="col-lg-4 col-md-12 mb-4 mb-lg-0"
         
            >
              <img
                key={index + 1}
                src={ele.image}
                className="w-100 shadow-1-strong rounded mb-4"
                alt="Wintry Mountain Landscape"
              />

              <button
                onClick={(e) => handleDelete(e, ele.image, ele.CampagneId)}
                className="button-delete"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default PreviewGalerieCampagne;
