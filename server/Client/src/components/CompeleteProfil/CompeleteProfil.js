import React, { useEffect, useState } from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import { basicSchemaCompleteProfil } from '../../schemas'
import './CompeleteProfil.css'
import axios from 'axios'
import { useLocation, useNavigate } from "react-router-dom";
import countries from '../../assets/data/countries.json'
import cities from '../../assets/data/cities.json'

function CompeleteProfil() {
 const location=useLocation();
 const Querys=new URLSearchParams(location.search);
 const queryIds=Querys.get('id');
 let navigate=useNavigate();
 //------------------
 const [optionsLangue,setOptionsLangue]=useState([{
  key:"veuillez entre langue",value:"0"
 }]);
//----
 const [optionsPays,setOptionsPays]=useState([{
  key:"veuillez entre pays",value:""
 }]);
 //---
 const [optionsVille,setOptionsVille]=useState([{
  key:"veuillez entre ville",value:""
 },
{
  key:"tanger",value:"tanger"
}
]);
//---
 const SituationFamilialeOptions=[
  {key:"veuillez entre situation familiale",value:""},
  {key:"célébataire",value:"célébataire"},
  {key:"marié",value:"marié"},
  {key:"divorcé",value:"divorcé"},
  {key:"séparé",value:"séparé"},
  {key:"veuf",value:"veuf"} 
 ]


 //------------------------------------
  const initialValues={
   pays:"",
   ville:"",
   quartier:"",
   situationFamiliale:"",
   nombreEnfant:"",
   niveauEtude:"",
   profession:"",
   LangueId:""
  }

 
   useEffect(() => {

    const fetLangue=async ()=>{
       await axios({
       method:"get",
       url:"http://localhost:5000/api/v1/langue",
       withCredentials:true
       })
      .then((res)=>{
        if(res.status===200){
          res.data.forEach(ele=>{
                      const op={
                      key:ele.langueNom,
                      value:ele.id
                      }
                      setOptionsLangue((options)=>[...options,op])         
                  })
        }
        
      })
      .catch((err)=>{
        console.log(err);
      });
       
    }
     fetLangue();

     //------------------------------
     //fetch countries

     countries.pays.forEach(ele=>{
        const op={
          key:ele.name,
          value:ele.name
          }
        setOptionsPays((options)=>[...options,op])     
  })


   },[]);

  const handleCities= async (e)=>{
    setOptionsVille([{key:"veuillez entre ville",value:""}])
    cities[e.target.value]?.forEach(ele=>{
       const op={
        key:ele,
        value:ele
        }
      setOptionsVille((options)=>[...options,op])

   });
  }

  const onSubmit= async (values,actions)=>{
    console.log(values);
      await axios.put(`http://localhost:5000/api/v1/influenceur/complete/${queryIds}`,{
          ...values
       })
         .then(res=>{
           navigate(`/register/conditionGenrale?id=${queryIds}`);
         })
         .catch((err)=>{
          console.log(err);
         });
    }

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
            as="select"
            name='pays'
            id="pays" 
            className="form-control"
            options={optionsPays}
            onClick={(e)=>{handleCities(e)}}
          >
          {
           optionsPays.map(ele=>{
            return (<option value={ele.value} key={ele.value}>{ele.key}</option>)
             })
          }
          </Field>
          <div className='text-danger'>
            <ErrorMessage name='pays'/>
        </div>
         
      </div>

      <div className="form-outline mb-4">
          <label className="form-label" htmlFor="ville">Ville</label>
          <Field  
            as="select"
            name='ville'
            id="ville" 
            className="form-control"
            options={optionsVille}
          >
          {
           optionsVille.map(ele=>{
            return (<option value={ele.value} key={ele.value}>{ele.key}</option>)
             })
          }
          </Field>
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
          <label className="form-label" htmlFor="situationFamiliale">Situation Familiale</label>
          <Field  
            as="select"
            name='situationFamiliale'
            id="situationFamiliale" 
            className="form-control"
            options={SituationFamilialeOptions}
          >
          {
           SituationFamilialeOptions.map(ele=>{
            return (<option value={ele.value} key={ele.value}>{ele.key}</option>)
             })
          }
          </Field>
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
            options={optionsLangue}
          >
          {
           optionsLangue.map(ele=>{
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