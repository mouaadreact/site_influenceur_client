import React, { useEffect, useState } from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import { basicSchemaCompleteProfil } from '../../schemas'
import './CompeleteProfil.css'
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom";

function CompeleteProfil() {
 const location=useLocation();
 const Querys=new URLSearchParams(location.search);
 const queryId=Querys.get('id');
 let navigate=useNavigate();
 const [options,setOptions]=useState([{
  key:"veuillez entre langue",value:"0"
 }]);

  const initialValues={
   pays:"",
   ville:"",
   quartier:"",
   codePostal:"",
   situationFamiliale:"",
   nombreEnfant:"",
   niveauEtude:"",
   profession:"",
   LangueId:""
  }

  const onSubmit= async (values,actions)=>{

     await axios.put(`http://localhost:5000/api/v1/influenceur/complete/${queryId}`,{
         ...values
      })
        .then(res=>{
          navigate(`/register/conditionGenrale?id=${queryId}`);
        })
        .catch((err)=>{
         console.log(err);
        });
   }
 
   useEffect(() => {
    const fetLangue=async ()=>{
    try{
      const res=await axios.get("http://localhost:5000/api/v1/langue");
       if(res){
        res.data.forEach(ele=>{
            const op={
             key:ele.langueNom,
             value:ele.id
            }
            setOptions((options)=>[...options,op])
             
        })
      
       }
     }catch(err){
        console.log(err);
     }
    }
     fetLangue();
   }, []);
console.log(options);
 //---------------
  return (
   
    <Formik
          initialValues={initialValues}
          validationSchema={basicSchemaCompleteProfil}
          onSubmit={onSubmit}
    >
      <div className='container w-50 shadow-lg p-3 mb-5 bg-white roundedd ' style={{marginTop:"30px"}}>
      <div className='text-center p-3'>Complete Profil</div>

      <Form> 
      <div className="form-outline mb-4">
          <label className="form-label" htmlFor="pays">Pays</label>
          <Field
            type="text" 
            id="pays"
            name='pays'
            className="form-control"  
          />
          <div className='text-danger'>
            <ErrorMessage name='pays'/>
        </div>
      </div>

      <div className="form-outline mb-4">
          <label className="form-label" htmlFor="ville">Ville</label>
          <Field 
            name='ville'
            type="text" 
            id="ville" 
            className="form-control" 
          />
          <div className='text-danger'>
            <ErrorMessage name='ville'/>
        </div>
      </div>

      <div className="form-outline mb-4">
          <label className="form-label" htmlFor="quartier">Quartier</label>
          <Field 
            name='quartier'
            type="text" 
            id="quartier" 
            className="form-control" 
          />
          <div className='text-danger'>
            <ErrorMessage name='quartier'/>
        </div>
      </div>

      <div className="form-outline mb-4">
          <label className="form-label" htmlFor="ville">Code Postal</label>
          <Field 
            name='codePostal'
            type="text" 
            id="codePostal" 
            className="form-control" 
          />
          <div className='text-danger'>
            <ErrorMessage name='codePostal'/>
        </div>
      </div>
      

      <div className="form-outline mb-4">
          <label className="form-label" htmlFor="situationFamiliale">Situation Familiale</label>
          <Field 
            name='situationFamiliale'
            type="text" 
            id="situationFamiliale" 
            className="form-control" 
          />
          <div className='text-danger'>
            <ErrorMessage name='situationFamiliale'/>
        </div>
      </div>

      <div className="form-outline mb-4">
          <label className="form-label" htmlFor="ville">Nombre des Enfants</label>
          <Field 
            name='nombreEnfant'
            type="number" 
            id="nombreEnfant" 
            className="form-control" 
          />
          <div className='text-danger'>
            <ErrorMessage name='nombreEnfant'/>
        </div>
      </div>

      <div className="form-outline mb-4">
          <label className="form-label" htmlFor="niveauEtude">Niveau des études</label>
          <Field 
            name='niveauEtude'
            type="text" 
            id="niveauEtude" 
            className="form-control" 
          />
          <div className='text-danger'>
            <ErrorMessage name='niveauEtude'/>
        </div>
      </div>
     
      <div className="form-outline mb-4">
          <label className="form-label" htmlFor="profession">Profession</label>
          <Field 
            name='profession'
            type="text" 
            id="profession" 
            className="form-control" 
          />
          <div className='text-danger'>
            <ErrorMessage name='profession'/>
        </div>
      </div>
   
      <div className="form-outline mb-4">
          <label className="form-label" htmlFor="LangueId">Langue</label>
          <Field  
            as="select"
            name='LangueId'
            id="LangueId" 
            className="form-control"
            options={options}
          >
          {
           options.map(ele=>{
            return (<option value={ele.value} key={ele.value}>{ele.key}</option>)
             })
          }
          </Field>
          <div className='text-danger'>
            <ErrorMessage name='LangueId'/>
        </div>
         
      </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </Form>
        </div>
   </Formik>
        
  )

}

export default CompeleteProfil