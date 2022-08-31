import React, { useCallback, useEffect, useState } from 'react'
import {Formik,Form,Field,ErrorMessage,formik} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {useParams } from 'react-router-dom';
import { addInteretToCampagne, deleteCampagne, deleteInteretCampagne, getOneCampagne, updateCampagne } from '../../../../redux/actions/campagne.actions';
import { getAllClient } from '../../../../redux/actions/client.actions';
import dateformat from 'dateformat'
import Multiselect from 'multiselect-react-dropdown'
import { getAllInteret } from '../../../../redux/actions/interet.actions';


function EditCampagne() {

 const dispatch=useDispatch();
 const params=useParams();
 const {loading,oneCampagneData}=useSelector(state=>state.campagne);
 const {allClientData}=useSelector(state=>state.client);
 const {allInteretData}=useSelector(state=>state.interet);
 const [optionsInteret,setOptionsInteret]=useState([]);
 const [interetMult,setInteretMult]=useState([]);
 const [campagneInputValue,setCampagneInputValue]=useState({
  "titre":"",
  "dateDebut":"",
  "dateFin":"",
  "presence":"",
  "nombreInfluenceur":"", 
  "descriptionOffre":"",
  "hashtags":"",
  "compteTagger":"",
  "ClientId":oneCampagneData.ClientId
 });


  useEffect(() => {
    getOneCampagne(params.id,dispatch);
    getAllClient(dispatch) 
  }, []);


  useEffect(()=>{
   setCampagneInputValue({...oneCampagneData});
  },[oneCampagneData.id]);

  const fetchDataInteret = useCallback(() => {
 
    getAllInteret(dispatch);
    allInteretData.forEach(ele=>{
    const op={
      name: ele.interetNom, id: ele.id
    }
    setOptionsInteret((options)=>[...options,op]) ;
             
  });
  }, [allInteretData[0]?.id]);
  
  useEffect(() => {
    fetchDataInteret();
  },[fetchDataInteret]);
  
  const handleChange=(e)=>{
      e.preventDefault();
      setCampagneInputValue({...campagneInputValue,[e.target.name]:e.target.value})
  }

  

 //------------------------------Submit --------------------------------

  const handleEdit=async (event)=>{
   event.preventDefault();
   console.log(interetMult);
   updateCampagne(params.id,campagneInputValue,interetMult,dispatch);
   
  }


  return (
    <div className="container-fluid px-4">
     <div className="container mt-5 w-75 mb-5">
       <div className="row">
         <div className="col-md-12">
             <div className="card">
                 <div className="card-header">
                     <h4>Client Update
                         <a href="/dashboard/campagne" className="btn btn-danger float-end">BACK</a>
                     </h4>
                 </div>
                 <div className="card-body">
                 <form onSubmit={(e)=>handleEdit(e)}>
                     <div className='mb-3'>
                      <input 
                       name="id"
                       type="text" 
                       disabled={true} 
                       defaultValue={oneCampagneData.id}
                       onChange={(e)=>handleChange(e)}
                      />
                     </div>

                     
                     <div className="mb-3">
                       <label htmlFor="titre">Titre: </label>
                        <input 
                         name="titre"
                         id="titre" 
                         type="text"
                         className="form-control" 
                         defaultValue={oneCampagneData.titre}
                         onChange={(e)=>handleChange(e)}
                        />
                     </div>
                      
                     <div className="mb-3">
                       <label htmlFor="ClientId">Client ID: </label>
                        <select name='presence' className="form-control" >
                           {
                             allClientData.map((ele)=>{
                             
                              return <option value={ele.id} key={ele.id}>{ele.id}</option>
                               })
                           }
                        </select>
                     </div>

                     <div className="mb-3">
                       <label htmlFor="dateDebut">Date Debut: </label>
                        <input 
                         name="dateDebut"
                         id="dateDebut" 
                         type="date"
                         className="form-control" 
                         defaultValue={dateformat(oneCampagneData.dateDebut,"yyyy-mm-dd")}
                         onChange={(e)=>handleChange(e)}
                        />
                     </div>

                     <div className="mb-3">
                       <label htmlFor="dateFin">Date Fin: </label>
                        <input 
                         name="dateFin"
                         id="dateFin" 
                         type="date"
                         className="form-control" 
                         defaultValue={dateformat(oneCampagneData.dateFin,"yyyy-mm-dd")}
                         onChange={(e)=>handleChange(e)}
                        />
                     </div>

                     <div className="mb-3">
                       <label htmlFor="nombreInfluenceur">Nombre Influenceur: </label>
                        <input 
                         name="nombreInfluenceur"
                         id="nombreInfluenceur" 
                         type="number"
                         className="form-control" 
                         defaultValue={oneCampagneData.nombreInfluenceur}
                         onChange={(e)=>handleChange(e)}
                        />
                     </div>

                     <div className="mb-3">
                     <label htmlFor="presence">Presence: </label>
                        <div className="form-check form-check-inline">
                            <input 
                            className="form-check-Field" 
                            type="radio" 
                            name="presence" 
                            id="inlineRadio1" 
                            value={true}
                            checked={oneCampagneData.presence==true?"checked":""}
                            />
                            <label className="form-check-label" htmlFor="inlineRadio1">oui</label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input 
                          className="form-check-Field" 
                          type="radio" 
                          name="presence" 
                          id="inlineRadio2" 
                          value={false}
                          checked={oneCampagneData.presence==false?"checked":""}
                          />
                          <label className="form-check-label" htmlFor="inlineRadio2">non</label>
                        </div>
                        <div className='text-danger'>
                           
                        </div>
                      </div>

                     <div className="mb-3">
                       <label htmlFor="descriptionOffre">Description Offre: </label>
                        <input 
                         name="descriptionOffre"
                         id="descriptionOffre" 
                         type="text"
                         className="form-control" 
                         defaultValue={oneCampagneData.descriptionOffre}
                         onChange={(e)=>handleChange(e)} 
                        />
                     </div>

                     <div className="mb-3">
                       <label htmlFor="hashtags">Hashtages: </label>
                        <input 
                         name="hashtags"
                         id="hashtags" 
                         type="text"
                         className="form-control" 
                         placeholder='#hashtage #hashtage ...'
                         defaultValue={oneCampagneData.hashtags}
                         onChange={(e)=>handleChange(e)}
                        />
                     </div>

                     <div className="mb-3">
                       <label htmlFor="compteTagger">Compte Tagger: </label>
                        <input 
                         name="compteTagger"
                         id="compteTagger" 
                         type="text"
                         className="form-control" 
                         placeholder='@compte @compte ...'
                         defaultValue={oneCampagneData.compteTagger}
                         onChange={(e)=>handleChange(e)}
                        />
                     </div>


                     

                     

                     <div className='mb-3'>
                     <label htmlFor="dateDebut">Centre d'intéret: </label>
                     <Multiselect
                        displayValue="name"
                        onSelect={(selectedList, removedItem)=>{
                          setInteretMult(selectedList);
                          console.log(selectedList)
                                 }}
                         onRemove={(selectedList, removedItem)=>{
                          setInteretMult(selectedList);
                                 }}
                        options={optionsInteret}
                     />
                      </div>

                     <div className="mb-3">         
                       <button type="submit"  className="btn btn-primary">
                         Update Client
                       </button>
                     </div>

                 </form>
                                 
                 </div>
             </div>
         </div>
     </div>
    </div>
  </div>
  )
}

export default EditCampagne