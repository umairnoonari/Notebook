import style from '../CSS/model.module.css'
import {GrClose} from 'react-icons/gr'
import { useFormik } from 'formik'
import axios from 'axios'
import { redirect, useNavigate } from 'react-router-dom'
import { fetchAllNotes } from '../Store/slices/NoteSlice'
import { useDispatch } from 'react-redux'
const Model = (props) => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const formik=useFormik({
    initialValues:{title:"",description:""},
    onSubmit:values=>{
      axios.post('http://localhost:4000/notes/addnote',{title:values.title,description:values.description},{headers:{
        'Content-Type':"application/json",
        'auth-token':localStorage.getItem('token')
      }}).then(res=>{
        props.Closemodel()
        dispatch(fetchAllNotes(res.data))
      })
    },
    validate:values=>{
      const errors={}
      if(!values.title)
      {
         errors.title="Title is required."
      }
      if(!values.description)
      {
        errors.description="Description is required."
      }
      if(values.title.length>=12)
      {
         errors.titleLength="Title should be less than 13 character."
      }
      return errors
    }
  })
  return (
    <>
    <div className={style.MW}></div>
        <div className={style.MC}>
          <form onSubmit={formik.handleSubmit}>
            <h2>Add Note</h2><button onClick={props.Closemodel} className={style.btn}><GrClose/></button>
            <input type='text' name="title" placeholder='Enter Title' className={style.input1} value={formik.values.title} onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
            {formik.touched.title?<div style={{color:'red',fontWeight:"blod",marginLeft:"27px",fontSize:"20px"}}>{formik.errors.title}</div>:null}
            {formik.touched.title?<div style={{color:'red',fontWeight:"blod",marginLeft:"27px",fontSize:"20px"}}>{formik.errors.titleLength}</div>:null}
            <textarea name="description" placeholder='Enter Description' className={style.input2} value={formik.values.description} onBlur={formik.handleBlur} onChange={formik.handleChange}></textarea>
            {formik.touched.description?<div style={{color:'red',fontWeight:"blod",marginLeft:"27px",fontSize:"20px"}}>{formik.errors.description}</div>:null}
            <div>
                <button type='submit' className={style.btn3}>Submit</button>
            </div>
          </form>
        </div>
    </>
  )
}

export default Model
