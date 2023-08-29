import React, { useState } from 'react'
// import styled from 'styled-components'
import style from '../CSS/signup1.module.css'
import Note_img from '../img/digital_notes.png'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
const Signup = () => { 
  const [error,setError]=useState('')
  const navigate=useNavigate()
  const formik=useFormik({
    initialValues:{username:"",email:"",password:""},
    onSubmit:values=>{
        axios.post("http://localhost:4000/auth/signup",{username:values.username,email:values.email,password:values.password},{headers:{
            'Content-Type':"application/json"
        }}).then(res=>{
            if(res.data.msg==="Success")
            {
                setError('')
                navigate('/')
            }
            else
            {
                setError(res.data)
            }
        }).catch(error=>{
            setError(error)
        })
    },
    validate:values=>{
        const errors={}
        if(!values.username)
        {
            errors.username="Username is required"
        }
        if(!values.email)
        {
            errors.email="Email is required"
        }
        if(!values.password)
        {
            errors.password="Password is required"
        }
        return errors
    }
  })
  return (
        <div className={style.container}>
            <div className={style.imga1}>
                <img src={Note_img} className={style.img1}></img>
            </div>
            
            <div className={style.cont1}>
                <form onSubmit={formik.handleSubmit}>
                    {<span style={{color:"red",fontWeight:"blod",fontSize:"25px",marginLeft:"285px"}}>{error}</span>}
                    <input type="text" name="username" placeholder='Enter Username' value={formik.values.username} className={style.input} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                    {formik.touched.username?<span style={{color:"red",fontWeight:'bold',marginLeft:"70px"}}>{formik.errors.username}</span>:null}
                    <input type="text" name="email" placeholder='Enter Email' value={formik.values.email} className={style.input} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                    {formik.touched.email?<span style={{color:"red",fontWeight:'bold',marginLeft:"70px"}}>{formik.errors.email}</span>:null}
                    <input type="password" name="password" placeholder='Enter Password' value={formik.values.password} className={style.input} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                    {formik.touched.password? <div style={{color:"red",fontWeight:'bold',marginLeft:"70px"}}>{formik.errors.password}</div> : null}
                    <input type='submit' className={style.btn} value="Signup"></input>
                </form>
            </div>
        </div>
  )
}
export default Signup