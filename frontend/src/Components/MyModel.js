import style from '../CSS/model1.module.css'
import {GrClose} from 'react-icons/gr'
import { useFormik } from 'formik'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAllNotes } from '../Store/slices/NoteSlice'
const MyModel = (props) => {
  const dispatch=useDispatch()
  const formik=useFormik({
    initialValues:{title:"",description:""},
    enableReinitialize:true,
    onSubmit:values=>{
      axios.put("http://localhost:4000/notes/update/"+props.oneUser._id,{title:values.title,description:values.description},{headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      }}).then(res=>{
         props.Closemodel1()
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
  useEffect(()=>{
    if(Object.keys(props.oneUser).length!==0)
    {
       console.log(props.oneUser)
       formik.setValues({title:props.oneUser.title,description:props.oneUser.description})
    }
  },[props.oneUser])
  return (
    <>
    <div className={style.MW}></div>
        <div className={style.MC}>
          <form onSubmit={formik.handleSubmit}>
            <h2>Update Note</h2><button onClick={props.Closemodel1} className={style.btn1}><GrClose/></button>
            <input type='text' name="title" placeholder='Enter Title' className={style.input1} value={formik.values.title} onBlur={formik.handleBlur} onChange={formik.handleChange}></input>
            {formik.touched.title&&<div style={{color:'red',fontWeight:"blod",marginLeft:"27px",fontSize:"20px"}}>{formik.errors.title}</div>}
            {formik.touched.title&&<div style={{color:'red',fontWeight:"blod",marginLeft:"27px",fontSize:"20px"}}>{formik.errors.titleLength}</div>}
            <textarea name='description' placeholder='Enter Description' className={style.input2} value={formik.values.description} onBlur={formik.handleBlur} onChange={formik.handleChange}></textarea>
            {formik.touched.description&&<div style={{color:'red',fontWeight:"blod",marginLeft:"27px",fontSize:"20px"}}>{formik.errors.description}</div>}
            <input type='submit' className={style.btn3}value="Submit"></input>
          </form>
        </div>
    </>
  )
}

export default MyModel
