import React, { useContext, useState } from 'react'
import {useFormik} from 'formik'
import { basicSchemaLogin } from '../../schemas'
import './Login.css'
import axios from 'axios'
import {UemailContext}  from '../../contexts/AppContext'
import { useNavigate } from 'react-router-dom'


function Login() {
  const uEmail=useContext(UemailContext);
  let navigate=useNavigate();
  //console.log(uEmail);
  const [erreurs,setError]=useState({passwordError:'',emailError:''});

  //submit
  const onSubmit= async (values,actions)=>{
    const {email,password}=values;
 
    try{
     const res= await axios({
      method:"post",
      url:"http://localhost:5000/api/v1/auth/login",
      data:{
          email,
          password,     
          },
      withCredentials:true
      });
      if(res){
         switch(res.data.role){
          case "admin":
                 navigate('/dashboard')
                 break;
          case "influenceur":
                navigate('/profil')
                break;
          default:
                break;
         }   

      }
    }catch(error){
     console.log(error)
     setError({...erreurs,...error.response.data.err});
    }
       
 
   }

   const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
    initialValues: {
      email:"",
      password:"",
    },
    validationSchema:basicSchemaLogin,
    onSubmit,
   });
     
  

  return (
    <>
      {
        uEmail ? 
         (
          <>
            <div className='bg-primary'>
              Tu es Deja Connect  (ERROR)
            </div>
          </>
         ) 
         :        
         (
          <>
          <div className='m-5'>
          <div className='container w-50 shadow-lg p-3 mb-5 bg-white roundedd'>
          <div className='text-center p-3'>Login</div>
          <form onSubmit={handleSubmit}>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="email">Email address</label>
              <input 
                type="email" 
                id="email" 
                value={values.email}
                onChange={handleChange}   
                onBlur={handleBlur} 
                className={ "form-control "+(errors.email && touched.email ? "border-danger" : "" )}  
              />
                {errors.email && touched.email && <p className='text-danger'>{errors.email}</p>}
           </div>

        
            <div className="form-outline mb-4">  
              <label className="form-label" htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                value={values.password}
                onChange={handleChange}   
                onBlur={handleBlur} 
                className={ "form-control "+(errors.password && touched.password ? "border-danger" : "" )}  
              />
                {errors.password && touched.password && <p className='text-danger'>{errors.password}</p>}
            </div>

              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            </div>
            </div>

          </>
         )
      }
    </>
  )
}

export default Login