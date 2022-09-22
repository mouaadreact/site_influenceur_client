import React from "react";
import "./Loading.css";

function Loading() {
  return (
      <div className="centreLoading d-flex" style={{height:"100%"}}>
      <div className="spinner-container">
        <div className="loading-spinner align-item-center"></div>
      </div>
    </div>
  );
}

export default Loading;
