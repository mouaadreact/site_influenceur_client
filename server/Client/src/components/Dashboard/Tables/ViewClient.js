import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOneClient } from '../../../redux/actions/client.actions';
import {useParams } from 'react-router-dom';

function ViewClient() {
 const dispatch=useDispatch();
 const {loading,oneClientData}=useSelector(state=>state.client);
 const params=useParams();

  useEffect(() => {
    getOneClient(params.id,dispatch);
  }, []);

  return (
<div className="container-fluid px-4">
<div className="container mt-5 w-75 mb-5">
<div className="row">
    <div className="col-md-12">
        <div className="card">
            <div className="card-header">
                <h4>Client View Details 
                    <a href="/dashboard/client" className="btn btn-danger float-end">BACK</a>
                </h4>
            </div>
            <div className="card-body">

                            <div className="mb-3">
                                <label>Client ID</label>
                                <p className="form-control">
                                   {oneClientData.id}
                                </p>
                            </div>
                            <div className="mb-3">
                                <label>Client Societe Name </label>
                                <p className="form-control">
                                {oneClientData.nomSociete}
                                </p>
                            </div>
                            <div className="mb-3">
                                <label>Client Country </label>
                                <p className="form-control">
                                {oneClientData.pays}
                                </p>
                            </div>
                            <div className="mb-3">
                                <label>Client City </label>
                                <p className="form-control">
                                {oneClientData.ville}
                                </p>
                            </div>
                            <div className="mb-3">
                                <label>Client Neighborhood </label>
                                <p className="form-control">
                                {oneClientData.quartier}
                                </p>
                            </div>
                            <div className="mb-3">
                                <label>Client Code Postal </label>
                                <p className="form-control">
                                {oneClientData.codePostal}
                                </p>
                            </div>
                            <div className="mb-3">
                                <label>Client Directeur Name </label>
                                <p className="form-control">
                                {oneClientData.nomDirecteur}
                                </p>
                            </div>
                            <div className="mb-3">
                                <label>Client Telephone </label>
                                <p className="form-control">
                                {oneClientData.telephone}
                                </p>
                            </div>
                            <div className="mb-3">
                                <label>Client Email </label>
                                <p className="form-control">
                                {oneClientData.email}
                                </p>
                            </div>
                            

                  
            </div>
        </div>
    </div>
</div>
</div>
   </div>
  )
}

export default ViewClient