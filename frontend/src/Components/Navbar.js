import React from 'react'
import style from '../CSS/navbar.module.css'
import notebook from '../img/notebook.png'
import menu from '../img/menu.png'
import Sidebar from './Sidebar'
import Context from '../Context/Context'
import { useContext } from 'react'
import { useSelector } from 'react-redux'
const Navbar = () => {
  const context=useContext(Context)
  const mystate=useSelector(state=>state.User)
  return (
    <>
      <div className={style.container}>
          <img className={style.img1} src={menu} onClick={context.showSidebar}></img>
          <img className={style.img} src={notebook}></img>
          <h1 className={style.h1}>Notebook</h1>
        <div className={style.logo}><p>{mystate.charAt(0).toUpperCase()}</p></div>
        <div className={style.text}>{mystate}</div>
      </div>
      <nav >
        <Sidebar/>
      </nav>

    </>
  )
}

export default Navbar
