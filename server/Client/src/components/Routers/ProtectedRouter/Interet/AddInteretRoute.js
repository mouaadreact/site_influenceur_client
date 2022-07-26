import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../../../../contexts/AppContext";
import { getOneUser } from "../../../../redux/actions/user.actions";
import AddInteret from "../../../Dashboard/Tables/Interet/AddInteret";
import PageForbidden from "../../../PageNotFound/PageForbidden";

function AddInteretRoute() {
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
      <AddInteret />
    ) : (
      <PageForbidden />
    );
  };

  return <>{Authorization()}</>;
}

export default AddInteretRoute;
