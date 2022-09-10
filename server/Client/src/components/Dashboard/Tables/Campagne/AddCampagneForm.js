import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { addCampagne } from '../../../../redux/actions/campagne.actions';
import {Formik,Form,Field,ErrorMessage,formik} from 'formik';
import { basicSchemaCampagne } from '../../../../schemas';
import { getAllClient } from '../../../../redux/actions/client.actions';
import { getAllInteret } from '../../../../redux/actions/interet.actions';
import Select from 'react-select';

function AddCampagneForm() {
 const dispatch=useDispatch();
 const {allClientData}=useSelector(state=>state.client);
 const {allInteretData}=useSelector(state=>state.interet);
 const [interetMult,setInteretMult]=useState([]);

 const [optionsClient,setOptionsClient]=useState([{
   key:"veuillez entre client",value:""
  }]);

  const [optionsInteret,setOptionsInteret]=useState([{
    label:"veuillez entre Interet",value:""
   }]);

 const fetchDataClient = useCallback(() => {
 
  getAllClient(dispatch);
  allClientData.forEach(ele=>{
    const op={
    key:ele.id,
    value:ele.id
    }
  setOptionsClient((options)=>[...options,op]) 
           
});
}, [allClientData[0]?.id]);

//---------
const fetchDataInteret = useCallback(() => {
 
  getAllInteret(dispatch);
  allInteretData.forEach(ele=>{
    const op={
    label:ele.interetNom,
    value:ele.id
    }
  setOptionsInteret((options)=>[...options,op]) 
           
});
}, [allInteretData[0]?.id]);

useEffect(() => {
  fetchDataClient();
},[fetchDataClient]);

useEffect(()=>{
  fetchDataInteret();
},[ fetchDataInteret]);

 const initialValues={
  "titre":"",
  "dateDebut":"",
  "dateFin":"",
  "presence":"",
  "nombreInfluenceur":0, 
  "descriptionOffre":"",
  "hashtags":"",
  "compteTagger":"",
  "ClientId":""
 }
 

  const onSubmit=async (values,actions)=>{
  console.log(interetMult)
  addCampagne(values,interetMult,dispatch);
  }
  
  const handleInteret =(e)=>{
     setInteretMult(Array.isArray(e)?e.map(x=>x.value):[]);
  }

  return (

  <div className="container-fluid px-4 w-75">
  <div className="row">
    <div className="col-md-12">
       <div className="card mb-5 mt-5">
          <div className="card-header">
            <h4>Add New Campagne
              <a href="/dashboard/campagne" className="btn btn-danger float-end">BACK</a>
            </h4>
          </div>
       <div className="card-body">
         <Formik
         initialValues={initialValues}
         validationSchema={basicSchemaCampagne}
         onSubmit={onSubmit}
         >
          {  formik => (
            <Form> 
            
            <div className="mb-3">
                <label 
                className="form-label" 
                htmlFor="titre"
                >Titre</label>

                <Field 
                  name='titre'
                  type="text" 
                  id="titre" 
                  className="form-control" 
                />
                <div className='text-danger'>
                  <ErrorMessage name='titre'/>
              </div>
            </div>

            <div className="mb-3">
                <label 
                className="form-label"
                htmlFor="dateDebut"
                >Date Debut</label>

                <Field 
                  name='dateDebut'
                  type="date" 
                  id="dateDebut" 
                  className="form-control" 
                />
                <div className='text-danger'>
                  <ErrorMessage name='dateDebut'/>
              </div>
            </div>

            <div className="mb-3">
                <label 
                className="form-label"
                htmlFor="dateFin"
                >Date Fin</label>

                <Field 
                  name='dateFin'
                  type="date" 
                  id="dateFin" 
                  className="form-control" 
                />
                <div className='text-danger'>
                  <ErrorMessage name='dateFin'/>
              </div>
            </div>

          
        <div className="mb-3">
        <label 
          className="form-label"
          htmlFor="presence"
          >Presence :</label>
        <div className="form-check form-check-inline">
            <Field 
            className="form-check-Field" 
            type="radio" 
            name="presence" 
            id="inlineRadio1" 
            value="true"
            style={{marginRight:"2px"}}
            />
            <label className="form-check-label" htmlFor="inlineRadio1">Oui</label>
        </div>

        <div className="form-check form-check-inline">
          <Field 
          className="form-check-Field" 
          type="radio" 
          name="presence" 
          id="inlineRadio2" 
          value="false"
          style={{marginRight:"2px"}}
          />
          <label className="form-check-label" htmlFor="inlineRadio2">Non</label>
        </div>
        <div className='text-danger'>
            <ErrorMessage name='presence'/>
        </div>
      </div>

            <div className="mb-3">
                <label 
                className="form-label"
                htmlFor="nombreInfluenceur"
                >Nombre des influenceur</label>

                <Field 
                  name='nombreInfluenceur'
                  type="number" 
                  id="nombreInfluenceur" 
                  className="form-control" 
                />
                <div className='text-danger'>
                  <ErrorMessage name='nombreInfluenceur'/>
              </div>
            </div>

         

            <div className="mb-3">
                <label 
                className="form-label"
                htmlFor="descriptionOffre"
                >Description d'offre</label>

                <Field 
                  name='descriptionOffre'
                  type="text" 
                  id="descriptionOffre" 
                  className="form-control" 
                />
                <div className='text-danger'>
                  <ErrorMessage name='descriptionOffre'/>
              </div>
            </div>

           
            <div className="mb-3">
                <label 
                className="form-label"
                htmlFor="hashtags"
                >Hashtages</label>

                <Field 
                  name='hashtags'
                  type="text" 
                  id="hashtags"
                  placeholder="#hashtage #hashtage ..."
                  className="form-control" 
                />
                <div className='text-danger'>
                  <ErrorMessage name='hashtags'/>
              </div>
            </div>
           

            <div className="mb-3">
                <label 
                className="form-label"
                htmlFor="compteTagger"
                >Compte tagger</label>

                <Field 
                  name='compteTagger'
                  type="text" 
                  id="compteTagger" 
                  className="form-control"
                  placeholder="@compte @compte ..." 
                />
                <div className='text-danger'>
                  <ErrorMessage name='compteTagger'/>
              </div>
            </div>

             
            <div className="mb-3">
                <label 
                className="form-label" 
                htmlFor="ClientId">
                Client</label>

                <Field  
                  as="select"
                  name='ClientId'
                  id="ClientId" 
                  className="form-control"
                  options={optionsClient}
                >
                {
                 optionsClient.map(ele=>{
                  return (<option value={ele.value} key={ele.value}>{ele.key}</option>)
                   })
                }
                </Field>
                <div className='text-danger'>
                  <ErrorMessage name='ClientId'/>
              </div>
               
            </div>
            
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="InteretId">Centre Interet</label>
                
                <Select 
                required={true} 
                isMulti 
                options={optionsInteret} 
                id='InteretId' 
                name='InteretId'
                onChange={handleInteret} ></Select>
              
              <div className='text-danger'>
                  <ErrorMessage name='InteretId'/>
              </div>
            </div>
           
            <div className="mb-3"> 
                <button 
                type="submit" 
                className="btn btn-primary"
                >Add Campagne</button>

            </div>  
              </Form>
             )}
         </Formik>
                                 
                 </div>
             </div>
         </div>
     </div>
     </div>
  )
}

export default AddCampagneForm