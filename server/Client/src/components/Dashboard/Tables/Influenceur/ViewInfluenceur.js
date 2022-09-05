import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useParams } from 'react-router-dom';
import dateformat from 'dateformat'
import { getOneInfluenceur } from '../../../../redux/actions/influenceur.actions';
import { getApiInstagramInfluenceur } from '../../../../redux/actions/apiInstagramHistory.actions';

import axios from 'axios'

function ViewInfluenceur() { 
 const dispatch=useDispatch(); 
 const {loading,oneInfluenceurData}=useSelector(state=>state.influenceur);
 const {instagramFilePath}=useSelector(state=>state.apiInstagram);
 const [compteInstagram,setCompteInstagram]=useState({
    nombrepost:0,
    nombreAbonne:0,
    nombreAbonnement:0,

 });

 const params=useParams();

  useEffect(() => {
    getOneInfluenceur(params.id,dispatch);
    getApiInstagramInfluenceur(params.id,dispatch);
  }, []);

  useEffect(()=>{
   if(instagramFilePath?.path){
    console.log(instagramFilePath?.path)
   axios.get(instagramFilePath?.path)
          .then((res)=>{
            setCompteInstagram({
                nombrepost:res.data.edge_owner_to_timeline_media.count,
                nombreAbonne:res.data.edge_followed_by.count,
                nombreAbonnement:res.data.edge_follow.count,

            })
          })
          .catch((err)=>console.log(err))
   }
  },[instagramFilePath?.path])

 

  return (
<div className="container-fluid px-4">
<div className="container mt-5 w-75 mb-5">
<div className="row">
    <div className="col-md-12">
        <div className="card">
            <div className="card-header"> 
                <h4>Influenceur View Details 
                    <a href="/dashboard/influenceur" className="btn btn-danger float-end">BACK</a>
                </h4>
            </div>
            <div className="card-body">

        
            <div className="mb-3">
               <label>Influenceur ID:</label>
               <p className="form-control primary-bg" 
                  style={{color:"#FFF"}}>
                  {oneInfluenceurData.id}
               </p>
            </div>
            <div className="mb-3">
               <label>Influenceur Username Instagram:</label>
               <p className="form-control" style={{backgroundColor:"#DDD"}}>
                  {oneInfluenceurData.instagramUsernameCompte}
               </p>
            </div>
        
            
            <div className="row g-3 my-2">
                    <div className="col-md-3">
                        <div className="p-3 primary-bg shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">{compteInstagram.nombrepost}</h3>
                                <p className="fs-5">Nombre Post</p>
                            </div>
                        </div>
                    </div>
           
            
                    <div className="col-md-3">
                        <div className="p-3 primary-bg shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">{compteInstagram.nombreAbonne}</h3>
                                <p className="fs-5">Nombre Abonne</p>
                            </div>
                        </div>
                    </div>
               
                
                    <div className="col-md-3">
                        <div className="p-3 primary-bg shadow-sm d-flex justify-content-around align-items-center rounded">
                            <div>
                                <h3 className="fs-2">{compteInstagram.nombreAbonnement}</h3>
                                <p className="fs-5">NombreAbonnement</p>
                            </div>
                        </div>
                    </div>
                </div>

                        

                            <div className="mb-3">
                                <label>Influenceur full name: </label>
                                <p className="form-control primary-bg" 
                                style={{color:"#FFF"}}>
                                {`${oneInfluenceurData.nom} ${oneInfluenceurData.prenom}`}
                                </p>
                            </div>

                            <div className="mb-3">
                                <label>Influenceur Username: </label>
                                <p className="form-control primary-bg" 
                                style={{color:"#FFF"}}>
                                { oneInfluenceurData.User?.username}
                                </p>
                            </div>

                            <div className="mb-3">
                                <label>Influenceur Email : </label>
                                <p className="form-control primary-bg" 
                                style={{color:"#FFF"}}>
                                { oneInfluenceurData.User?.email}
                                </p>
                            </div>
                           
                            <div className="mb-3">
                                <label>Influenceur genre :</label>
                                <p className="form-control" style={{backgroundColor:"#DDD"}}>
                                {oneInfluenceurData.genre}
                                </p>
                            </div>
                            <div className="mb-3">
                                <label>Influenceur dateNaissance: </label>
                                <p className="form-control" style={{backgroundColor:"#DDD"}}>
                                {dateformat(oneInfluenceurData.dateNaissance,"dd/mm/yyyy")}
                                </p>
                            </div>
                           
                            <div className="mb-3">
                                <label>Influenceur pays:</label>
                                <p className="form-control" style={{backgroundColor:"#DDD"}}>
                                {
                                oneInfluenceurData.pays}
                                </p>
                            </div>
                            <div className="mb-3">
                                <label>Influenceur ville: </label>
                                <p className="form-control" style={{backgroundColor:"#DDD"}}>
                                {oneInfluenceurData.ville}
                                </p>
                            </div>
                            <div className="mb-3">
                                <label>Influenceur Quartier:</label>
                                <p className="form-control" style={{backgroundColor:"#DDD"}}>
                                   {oneInfluenceurData.quartier}
                                </p>
                            </div>
                            <div className="mb-3">
                                <label>Influenceur situation familiale:</label>
                                <p className="form-control" style={{backgroundColor:"#DDD"}}>
                                {oneInfluenceurData.situationFamiliale}
                                </p>
                            </div>
                           
                            <div className="mb-3">
                                <label>Influenceur nombre des enfants:</label>
                                <p className="form-control" style={{backgroundColor:"#DDD"}}>
                                {oneInfluenceurData.nombreEnfant}
                                </p>
                            </div>
                            <div className="mb-3">
                                <label>Influenceur niveau d'etude:</label>
                                <p className="form-control" style={{backgroundColor:"#DDD"}}>
                                {oneInfluenceurData.niveauEtude}
                                </p>
                            </div>
                           
                            <div className="mb-3">
                                <label>Influenceur profession:</label>
                                <p className="form-control" style={{backgroundColor:"#DDD"}}>
                                {oneInfluenceurData.profession}
                                </p>
                            </div>
                            <div className="mb-3">
                                <label>Influenceur commentaire:</label>
                                <p className="form-control primary-bg" 
                                style={{color:"#FFF"}}>
                                {oneInfluenceurData.commentaire 
                                ? oneInfluenceurData.commentaire
                                : "------" }
                                </p>
                            </div> 
                            <div className="mb-3">
                                <label>Influenceur Status active/desactive Compte :</label>
                                <p 
                                className={"form-control btn btn-" + (oneInfluenceurData.statusEtatActiver == true ? "success" : "danger")}
                                >
                                    {oneInfluenceurData.statusEtatActiver == true ? "Active" : "Desactive" }
                                </p>
                                
                            </div>

                            <div className="mb-3">
                                <label>Influenceur date de creer le compte : </label>
                                <p className="form-control" style={{backgroundColor:"#DDD"}}>
                                {dateformat(oneInfluenceurData.createdAt,"dd/mm/yyyy")}
                                </p>
                            </div>

                            <div className="mb-3">
                                <label>Influenceur date editer le compte : </label>
                                <p className="form-control primary-bg" 
                                style={{color:"#FFF"}}>
                                {dateformat(oneInfluenceurData.updatedAt,"dd/mm/yyyy")}
                                </p>
                            </div>

                           
                            
                            <div className="mb-3">
                                <label>Influenceur langues : </label>
                                {
                                    oneInfluenceurData.Langues?.map((ele,index)=>{
                                        return (
                                            <p key={index+1} className="form-control" style={{backgroundColor:"#DDD"}}>
                                            {ele.langueNom}
                                            </p>
                                        )
                                    })
                                }
                            </div>

                            <div className="mb-3">
                                <label>Influenceur facebook compte : </label>
                                <p 
                                className="form-control" 
                                style={{backgroundColor:"#DDD"}}>
                                {oneInfluenceurData.facebookUsernameCompte 
                                ? oneInfluenceurData.facebookUsernameCompte 
                                : "-------"
                                }
                                </p>
                            </div>

                            <div className="mb-3">
                                <label>Influenceur youtube compte : </label>
                                <p 
                                className="form-control" 
                                style={{backgroundColor:"#DDD"}}>
                                {oneInfluenceurData.youtubeUsernameCompte
                                ? oneInfluenceurData.youtubeUsernameCompte
                                : "-------"
                                }
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

export default ViewInfluenceur