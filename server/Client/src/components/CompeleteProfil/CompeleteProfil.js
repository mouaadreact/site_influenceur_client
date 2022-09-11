import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {Formik,Form,Field,ErrorMessage,formik} from 'formik'; 
import { basicSchemaCompleteProfil } from '../../schemas';
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { getAllLangue } from '../../redux/actions/langue.actions';
import {useDispatch, useSelector} from 'react-redux';
import './CompeleteProfil.css';
import { compeleteProfil } from '../../redux/actions/register.actions';
import { getAllInteret } from '../../redux/actions/interet.actions';

import marocVille from '../../assets/data/marocAddress/ville.json'
import marocQuartier from '../../assets/data/marocAddress/quartier.json'


function CompeleteProfil() {

 const [langueMult,setLangueMult]=useState([]);
 const [interetMult,setInteretMult]=useState([]);

 const location=useLocation();
 const Querys=new URLSearchParams(location.search);
 const queryIds=Querys.get('id');
 let navigate=useNavigate();
 const dispatch=useDispatch();
 const {langueData}=useSelector(state=>state.langue);
 const {allInteretData}=useSelector(state=>state.interet);

 //------------------
 const [optionsLangue,setOptionsLangue]=useState([{
  label:"veuillez entre langue",value:0
 }]);

 const [optionsInteret,setOptionsInteret]=useState([{
  label:"veuillez entre Interet",value:0
 }]);
//----
 const [optionsPays,setOptionsPays]=useState([{
  key:"veuillez entre pays",value:""
 }]);
 //---
 const [optionsVille,setOptionsVille]=useState([{
  key:"veuillez entre ville",value:""
 }
]);

const [optionsQuartier,setOptionsQuartier]=useState([{
  key:"veuillez entre quartier",value:""
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
  }

  const fetchDataLangue = useCallback(() => {
      getAllLangue(dispatch);
      langueData.forEach(ele=>{
        const op={
        label:ele.langueNom,
        value:ele.id
        }
      setOptionsLangue((options)=>[...options,op]) 
           
    });
}, [langueData[0]?.id]);

   useEffect(() => {
      fetchDataLangue();
   },[fetchDataLangue]);

   //---------------------------

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
  fetchDataInteret();
},[fetchDataInteret]);


   //--------------------------
   useEffect(()=>{
    setOptionsPays([{
      key:"veuillez entre pays",value:""
     },
     {key:"Maroc",value:"Maroc"}
    ]);
   const villeElements=[]
    marocVille["ville"].forEach(ele=>{
       const op={
        label:ele,
        value:ele
        } 
      villeElements.push(op);

   });
   setOptionsVille(villeElements)

   },[])


  const onSubmit= async (values,actions)=>{

      /*if(values.situationFamiliale==="célébataire" && values.nombreEnfant!=0)  {
        toast.error("erreur célébataire a 0 enfants ");
       }
      else{
           compeleteProfil(queryIds,values,langueMult,interetMult,dispatch);
      }*/
      console.log(values);
    }
//-------------------
const handleLangue =(e)=>{
  setLangueMult(Array.isArray(e)?e.map(x=>x.value):[]);
}
//--------
const handleInteret =(e)=>{
  setInteretMult(Array.isArray(e)?e.map(x=>x.value):[]);
}

//--------

const handleQuartier=  (e)=>{
  console.log(e.value)
  setOptionsQuartier([])
  const quartierElements=[{
    key:"veuillez entre quartier",value:""
   }]
  marocQuartier[e.value]?.forEach(ele=>{
    const op={
     key:ele,
     value:ele
     }
    quartierElements.push(op) 
});
setOptionsQuartier(quartierElements)
}
 //---------------
  return (
    <>
      <ToastContainer autoClose={3000}/>
      
    <Formik
          initialValues={initialValues}
          validationSchema={basicSchemaCompleteProfil}
          onSubmit={onSubmit}
    >
   
    {  formik => (
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
        <Select 
            required={true}  
            options={optionsVille} 
            id='ville' 
            name='ville' 
            onChange={handleQuartier} ></Select>
      </div>

      {/*<div className="form-outline mb-4">
          <label className="form-label" htmlFor="ville">Ville</label>
          <Field  
            as="select"
            name='ville'
            id="ville" 
            className="form-control"
            options={optionsVille}
            value={formik.values.ville}
            onChange={(e)=>{handleQuartier(e)}}
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
    */}

      <div className="form-outline mb-4">
          <label className="form-label" htmlFor="quartier">Quartier</label>
          <Field  
            as="select"
            name='quartier'
            id="quartier" 
            className="form-control"
            options={optionsQuartier}
          >
          {
           optionsQuartier.map(ele=>{
            return (<option value={ele.value} key={ele.value}>{ele.key}</option>)
             })
          }
          </Field>
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
          <label className="form-label" htmlFor="langue">Langue</label>
          
          <Select required={true} isMulti options={optionsLangue} id='langue' name='langue' onChange={handleLangue} ></Select>
          
          
          
          <div className='text-danger'>
            <ErrorMessage name='langue'/>
        </div>
         
      </div>


      <div className="form-outline mb-4">
          <label className="form-label" htmlFor="interet">Centre Interet</label>
          
          <Select 
          required={true} 
          isMulti 
          options={optionsInteret} 
          id='interet' 
          name='interet' 
          onChange={handleInteret} ></Select>
          
          
          
          <div className='text-danger'>
            <ErrorMessage name='interet'/>
        </div>
         
      </div>

          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </Form>
        </div>
     )
    }
   </Formik>
   </>
        
  )

}

export default CompeleteProfil


