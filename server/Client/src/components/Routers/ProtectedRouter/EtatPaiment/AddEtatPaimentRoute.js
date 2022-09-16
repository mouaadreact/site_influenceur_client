import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../../../../contexts/AppContext";
import { getOneUser } from "../../../../redux/actions/user.actions";
import AddEtatPaiment from "../../../Dashboard/Tables/EtatPaiment/AddEtatPaiment";
import PageForbidden from "../../../PageNotFound/PageForbidden";

function AddEtatPaimentRoute() {
  const id = useContext(UidContext);
  const dispatch = useDispatch();
  const { oneUserData } = useSelector((state) => state.user);
  const [uid, setUid] = useState(0);

  useEffect(() => {
    getOneUser(id, dispatch);
    setUid(id);
  }, [id]);

  const Authorization = () => {
    return uid && oneUserData?.Role?.roleNom === "admin" ? (
      <AddEtatPaiment />
    ) : (
      <PageForbidden />
    );
  };

  return <>{Authorization()}</>;
}

export default AddEtatPaimentRoute;
