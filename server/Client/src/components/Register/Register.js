import React from 'react'
import {useFormik} from 'formik'
import { basicSchemaRegister } from '../../schemas'
import './Register.css'
import axios from 'axios'


function Register() {
  const onSubmit= async (values,actions)=>{

    /*API post data */
    const {email,username,password}=values;
    console.log(email);
  

    axios({
      method:"post",
      url:"http://localhost:5000/api/v1/manager/addAdmin",
      data:{
          username,
          email,
          password,       
      }
     }).then((res)=>{
          console.log(res);
     }).catch((err)=>{
         console.log(err);
     });

    /* after sumbit */
    await new Promise((resolve)=> setTimeout(resolve,1000));
    actions.resetForm();
   }

   const {values,errors,touched,isSubmitting,handleBlur,handleChange,handleSubmit}=useFormik({
    initialValues: {
      username:"",
      email:"",
      password:"",
      confirmPassword:""
    },
    validationSchema:basicSchemaRegister,
    onSubmit,
   });


  return (
    <>
   <div className='m-5'>
   <div className='container w-50 shadow-lg p-3 mb-5 bg-white roundedd'>
   <div className='text-center p-3'>Register</div>
   <form onSubmit={handleSubmit}>
  

   <div className="form-outline mb-4">
      <label className="form-label" htmlFor="username">Username</label>
      <input 
        type="text" 
        id="username" 
        value={values.username}
        onChange={handleChange}  
        onBlur={handleBlur}
        className={ "form-control "+(errors.username && touched.username ? "border-danger" : "" )}  
       />
       {errors.username && touched.username && <p className='text-danger'>{errors.username}</p>}
   </div>

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

    <div className="form-outline mb-4">  
      <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
      <input 
        type="password" 
        id="confirmPassword" 
        value={values.confirmPassword}
        onChange={handleChange}   
        onBlur={handleBlur}
        className={ "form-control "+(errors.confirmPassword && touched.confirmPassword ? "border-danger" : "" )}   
       />
         {errors.confirmPassword && touched.confirmPassword && <p className='text-danger'>{errors.confirmPassword}</p>}
    </div>



    <button disabled={isSubmitting} type="submit" className="btn btn-primary w-100">Register</button>
 </form>
     </div>
   </div>
    </>
  )
}

export default Register