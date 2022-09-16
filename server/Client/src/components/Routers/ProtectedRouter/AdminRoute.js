import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../../../contexts/AppContext";
import { getOneUser } from "../../../redux/actions/user.actions";
import Admin from "../../Dashboard/Admin";
import PageForbidden from "../../PageNotFound/PageForbidden";

function AdminRoute() {
  const id = useContext(UidContext);
  const dispatch = useDispatch();
  const { oneUserData } = useSelector((state) => state.user);
  const [uid, setUid] = useState(0);

  useEffect(() => {
    getOneUser(id, dispatch);
    setUid(id);
  }, [id]);

  console.log(id);

  const Authorization = () => {
    return uid && oneUserData?.Role?.roleNom === "admin" ? (
      <Admin />
    ) : (
      <PageForbidden />
    );
  };

  return <>{Authorization()}</>;
}

export default AdminRoute;
