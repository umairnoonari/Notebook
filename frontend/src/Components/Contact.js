import React from 'react'
import { useContext } from "react";
import Context from "../Context/Context";
import style from '../CSS/Contact.module.css'
const Contact = () => {
  const context = useContext(Context);
  const { sidebar } = context;
  console.log("Hello")
  return (
    <div className={!sidebar ? style.container : style.container1}>
        <div className={sidebar ? style.box1 : style.box2}>
        <div className={style.des}>
        <h2>Contact Us</h2>
          <h5>
          <h6>Certainly, here is a sample contact for inquiries related to this project:</h6>
          <h6>For any questions, feedback, or inquiries about our innovative note-taking application built on the MERN stack, please feel free to reach out to our team:
          </h6>
          <h6>Contact Information:</h6>
          <h6>Email: info@projectnotebook.com</h6>
          <h6>Phone: +1 (555) 123-4567</h6>
          <h6>Website: www.projectnotebook.com/contact</h6>
          <h6> We value your input and look forward to assisting you with any queries you may have.
          </h6>
          </h5>
        </div>
        </div>
    </div>
  )
}

export default Contact
