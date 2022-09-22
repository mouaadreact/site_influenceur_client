import React from "react";
import { useParams } from "react-router";
import Sidebar from "../Sidebar/Sidebar";
import EditForm from "./EditForm";

function EditProfil() {
  const params = useParams();
  return (
    <div className="d-flex" id="wrapper" 
    style={{
      background:"#EB6E35",
      fontSize:"15px"
      }}>
      <Sidebar />
      <div 
      className="container-fluid px-4 mt-4 mb-4" 
      style={{
      background:"#EB6E35",
      fontSize:"15px"
      }}
      >
        <section style={{ backgroundColor: "#eee" }}>
          <div className="container py-5">
            <EditForm id={params.id} />
          </div>
        </section>
       
      </div>
    </div>
  );
}

export default EditProfil;
