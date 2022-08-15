import React, { useState } from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import { basicSchemaConfirmInstagram } from '../../schemas'
import './ConfimInstagram.css'
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
 

function ConfirmInstagram({id}) {
  const location=useLocation();
  const Querys=new URLSearchParams(location.search);
  const queryId=Querys.get('id');
  let navigate=useNavigate();
  const [instagramData,setInstagramData]=useState({name:""});

  const initialValues={
    nom:"",
    prenom:"",
    genre:"",
    dateNaissance:"",
    instagramUsernameCompte:""
  }
 //on submit afficher instagram data
  const onSubmit= async (values,actions)=>{
      toast.success("Wait A few Second");
      await axios.put(`http://localhost:5000/api/v1/influenceur/afficherCompte/${queryId}`,{
         ...values
      })
        .then(res=>{
           setInstagramData(res.data);
        })
        .catch((err)=>{
         console.log(err);
        });
   }
 //on cancel et on confirm instagram data
 const handleCancel=async (e)=>{
   e.preventDefault();
   console.log("cancel");
   window.location.reload(false);
  
 }  

 const handleConfirm=async (e)=>{
  e.preventDefault();
  console.log("confirm");

  await axios.put(`http://localhost:5000/api/v1/influenceur/valideCompte/${queryId}`)
   .then(res=>{
      navigate(`/register/completeProfil?id=${queryId}`);
   })
   .catch((err)=>{
    console.log(err);
   });
 }
 //---------------
 console.log(instagramData)
  return (
    <>
      { 
        instagramData.username
        ? 
        <>
        <ToastContainer autoClose={4000}/>
        <form className='container '>
        <div className='col d-flex justify-content-center m-5'>
        <div className="card text-center border border-2" style={{width:"18rem"}}>
          <div className="card-body">
            <p className="card-text">{instagramData.username}</p>
            <p className="card-text">publications : {instagramData.publications}</p>
            <p className="card-text">abonnes : {instagramData.abonnes}</p>
            <p className="card-text">abonnements : {instagramData.abonnements}</p>
            <p className="card-text">{instagramData.full_name}</p>
            <p className="card-text">{instagramData.description}</p>
            <p className="card-text">link : {instagramData.link}</p>
          </div>
          <button 
          className="btn btn-primary w-30 m-1"
          name='confirm'
          onClick={(e) => handleConfirm(e)}
          >Confirm</button>
          <button 
          className="btn btn-danger w-30 m-1"
          name='cancel'
          onClick={(e)=> handleCancel(e)}
          >Cancel</button>
          
        </div>
        </div>
        </form>
        </> 
        : 
    <Formik
          initialValues={initialValues}
          validationSchema={basicSchemaConfirmInstagram}
          onSubmit={onSubmit}
    >
      <div className='container w-50 shadow-lg p-3 mb-5 bg-white roundedd'>
      <div className='text-center p-3'>Confirm Instagram</div>

      <Form> 
      <div className="form-outline mb-4">
          <label className="form-label" htmlFor="nom">Nom</label>
          <Field
            type="text" 
            id="nom"
            name='nom'
            className="form-control"  
          />
          <div className='text-danger'>
            <ErrorMessage name='nom'/>
        </div>
      </div>

      <div className="form-outline mb-4">
          <label className="form-label" htmlFor="prenom">Prenom</label>
          <Field 
            name='prenom'
            type="text" 
            id="prenom" 
            className="form-control" 
          />
          <div className='text-danger'>
            <ErrorMessage name='prenom'/>
        </div>
      </div>

      <div className="form-outline mb-4">
        <div className="form-check form-check-inline">
            <Field 
            className="form-check-Field" 
            type="radio" 
            name="genre" 
            id="inlineRadio1" 
            value="homme"
            />
            <label className="form-check-label" htmlFor="inlineRadio1">homme</label>
        </div>

        <div className="form-check form-check-inline">
          <Field 
          className="form-check-Field" 
          type="radio" 
          name="genre" 
          id="inlineRadio2" 
          value="femme"
          />
          <label className="form-check-label" htmlFor="inlineRadio2">femme</label>
        </div>
        <div className='text-danger'>
            <ErrorMessage name='genre'/>
        </div>
      </div>


      <div className="form-outline mb-4">
      <label className="form-label" htmlFor="dateNaissance">Date de naissance</label>
      <Field
            type="date"
            id="dateNaissance"  
            name='dateNaissance' 
            className="form-control" 
          />
        <div className='text-danger'>
            <ErrorMessage name='dateNaissance'/>
        </div>
      </div>
        
      <div className="form-outline mb-4">
          <label className="form-label" htmlFor="instagramUsernameCompte">Instagram Username</label>
          <Field 
            type="text" 
            id="instagramUsernameCompte" 
            name='instagramUsernameCompte'
            className="form-control"
          />
          <div className='text-danger'>
            <ErrorMessage name='instagramUsernameCompte'/>
        </div>
      </div>

          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </Form>
        </div>
   </Formik>
         }
    </>
  )
}

export default ConfirmInstagram
