import React, { useContext, useState } from 'react'
import axios from 'axios'
import {useFormik} from 'formik'
import { basicSchemaLogin } from '../../schemas'
import {UidContext}  from '../../contexts/AppContext' 
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authLogin } from '../../redux/actions/auth.actions'
import { ToastContainer} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'


function Login() {
  const id=useContext(UidContext);
  const dispatch=useDispatch();
  const {userData}=useSelector(state=>state.auth)
  const {userErrorMessageEmail,userErrorMessagePassword}=useSelector(state=>state.auth);

  //submit
  const onSubmit=async (values,actions)=>{
    const {email,password}=values;
    authLogin({email,password},dispatch);
   
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
        id ? 
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
          <ToastContainer autoClose={3000}/>
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
                 {userErrorMessageEmail &&<p className='text-danger'>{userErrorMessageEmail}</p>}
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
                {userErrorMessagePassword && <p className='text-danger'>{userErrorMessagePassword}</p>}
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