import React from 'react'
// import styled from 'styled-components'
import style from '../CSS/login1.module.css'
import Note_img from '../img/digital_notes2.png'
import {Link,useNavigate} from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import { useState } from 'react'
import { showUser } from '../Store/slices/UserSlice'
import { useDispatch } from 'react-redux'
const Login = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const [error,setError]=useState('')
  const formik=useFormik({
    initialValues:{username:"",password:""},
    onSubmit:values=>{
        axios.post("http://localhost:4000/auth/login",{username:values.username,password:values.password},{headers:{
            'Content-Type':"application/json"
        }}).then(res=>{
            if(res.data==="Please try correct credentials")
            {
                setError("Please try correct credentials")
            }
            else
            {
                localStorage.setItem('token',res.data.token)
                dispatch(showUser(res.data.username))
                navigate('/home')
            }
        }).catch(err=>{
            setError(err)
        })
    },
    validate:values=>{
        const errors={}
        if(!values.username)
        {
            errors.username="Username is required"
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
            <div className={style.imga}>
                <img src={Note_img} className={style.img}></img>
            </div>
            <div className={style.cont1}>
                <form onSubmit={formik.handleSubmit}>
                    {<span style={{color:"red",fontWeight:"blod",fontSize:"25px",marginLeft:"230px"}}>{error}</span>}
                    <input type="text" name="username" placeholder='Enter Username' value={formik.values.username} className={style.input} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                    {formik.touched.username?<span style={{color:"red",fontWeight:'bold',marginLeft:"70px"}}>{formik.errors.username}</span>:null}
                    <input type="password" name="password" placeholder='Enter Password' value={formik.values.password} className={style.input} onBlur={formik.handleBlur} onChange={formik.handleChange}/>
                    {formik.touched.password? <div style={{color:"red",fontWeight:'bold',marginLeft:"70px"}}>{formik.errors.password}</div> : null}
                    <input type='submit' className={style.btn} value="Login"></input>
                    <label>Not a member?<Link to='/signup' className={style.a}>  Signup Now</Link></label>
                </form>
            </div>
        </div>
  )
}
export default Login
