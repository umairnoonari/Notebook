import React, { useEffect, useState } from "react";
import style from "../CSS/addnote.module.css";
import { useContext } from "react";
import Context from "../Context/Context";
import { BsSearch } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import {GrClose} from 'react-icons/gr'
import {MdSystemUpdateAlt} from 'react-icons/md'
import Model  from "./Model";
import MyModel from "./MyModel";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNotes} from "../Store/slices/NoteSlice";
const AddNote = () => {
  const mystate=useSelector(state=>state.notes)
  const context = useContext(Context);
  const dispatch=useDispatch()
  const { sidebar } = context;
  const [search1,setSearch1]=useState('')
  const [model,setModel]=useState(false)
  const [myModel,setMyModel]=useState(false);
  const Closemodel=()=>setModel(false)
  const Closemodel1=()=>setMyModel(false)
  const [oneUser,setOneUser]=useState([])
  useEffect(()=>{
      axios.get('http://localhost:4000/notes/fetchallnotes',{headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      }}).then(res=>{
        dispatch(fetchAllNotes(res.data))
      }).catch(error=>{
        console.log(error)
      })
  },[])
  return (
    <div className={!sidebar ? style.container : style.container1}>
      <div className={sidebar ? style.box1 : style.box2}>
        <input type="text" name="search" className={style.input} onChange={(e)=>setSearch1(e.target.value)}></input>
        <BsSearch className={style.input1}></BsSearch>
        <button className={style.btn} onClick={()=>setModel(true)}>
          <AiOutlinePlus className={style.ic_4} /> Add Note{" "}
        </button>
        <div className={style.col}>
        {mystate.length!==0?mystate.filter((itm)=>{
          if(search1=="")
          {
            return itm
          }
          else if (itm.title.includes(search1))
          {
             return itm
          }
        }).map((itm,index)=>{ return <div key={index} className={style.box3}>
            <header className={style.header}>{itm.title.length>=15?itm.title.slice(0,15)+"...":itm.title}</header>
            <button className={style.btnClose} onClick={()=>{
              axios.delete('http://localhost:4000/notes/delete/'+itm._id,{headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
              }}).then(res=>{
                 dispatch(fetchAllNotes(res.data))
              })
            }}><GrClose/></button>
            <button className={style.btnUpdate} onClick={()=>{
              axios.get('http://localhost:4000/notes/fetchOneNote/'+itm._id,{headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
              }}).then(res=>{
                 setOneUser(res.data)
              })
              setMyModel(true)
            }}><MdSystemUpdateAlt/></button>
            <div className={style.des}>
              <p>{itm.description}</p>
            </div>
        </div>}):""}
            {model&&<Model Closemodel={Closemodel}></Model>}
            {myModel&&<MyModel Closemodel1={Closemodel1} oneUser={oneUser}/>}
        </div>
      </div>
    </div>
  );
};

export default AddNote;
