import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <div className="centreLoading">
      <div className="spinner-container">
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}

export default Loading;
