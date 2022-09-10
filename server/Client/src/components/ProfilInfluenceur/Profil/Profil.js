import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../../../contexts/AppContext";
import { getOneUser } from "../../../redux/actions/user.actions";
import EditProfil from "../EditProfil/EditProfil";
import ChangePassword from "./ChangePassword";
import ViewProfil from "./ViewProfil";

function Profil() {
  const dispatch = useDispatch();
  const id = useContext(UidContext);
 //* const { oneUserData } = useSelector((state) => state.user);
  const [changeButtonEdit,setChangeButtonEdit]=useState({
    state:true,
    text:"Change Password"
  });



  const handleChangeButton=()=>{
   if(changeButtonEdit.state==true){
     setChangeButtonEdit({
      state:false,
      text:"View profil"
      })
   }else{
    setChangeButtonEdit({
      state:true,
      text:"Change Password"
      })
   }
  }
 
  return (
    <div className="container-fluid px-4 mt-4 mb-4">
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div style={{ float: "right" }}>
            <a 
            className="mb-3 btn btn-primary"
            onClick={handleChangeButton}
            >{changeButtonEdit.text}</a>
          </div>
          <div style={{ clear: "both" }}></div>
 
            {
              changeButtonEdit.state==true
              ? <ViewProfil id={id} />
              : <ChangePassword id={id}/>
            }
        </div>
      </section>
    </div>
  );
}

export default Profil;
