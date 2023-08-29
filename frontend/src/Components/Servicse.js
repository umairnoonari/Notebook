import React from 'react'
import { useContext } from "react";
import Context from "../Context/Context";
import style from '../CSS/Services.module.css'
const Services = () => {
  const context = useContext(Context);
  const { sidebar } = context;
  console.log("Hello")
  return (
    <div className={!sidebar ? style.container : style.container1}>
        <div className={sidebar ? style.box1 : style.box2}>
        <div className={style.des}>
        <h2>Services</h2>
          <h5>
              Certainly! Here are some key services that our project offers:
              <ol type='1'>
                  <li>
                      Secure User Authentication: We provide a robust and secure user authentication system, ensuring that each user's data and notes remain private and protected.
                  </li>
                  <li>
                      Note Creation and Editing: Users can easily create new notes and edit existing ones. Our user-friendly interface allows for quick content input and modifications.
                  </li>
                  <li>
                      Real-time Updates: Users can see changes to their notes in real time without the need for manual refreshing, enhancing the efficiency of note-taking and collaboration.
                  </li>
                  <li>
                      Search and Filtering: Users can quickly locate specific notes using our search and filtering functionalities, saving time and increasing efficiency.
                  </li>
                  <li>
                      User-Friendly Interface: The intuitive and user-friendly design makes our application accessible to users of all skill levels, promoting widespread adoption.
                  </li>
                  <li>
                  Privacy and Data Security: We prioritize user privacy and implement industry-standard security measures to protect user data and ensure a safe environment.
                  </li>
              </ol> 
          </h5>
        </div>
        </div>
    </div>
  )
}

export default Services