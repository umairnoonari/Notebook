import React from "react";
import { useContext } from "react";
import Context from "../Context/Context";
import style from "../CSS/About.module.css";
const About = () => {
  const context = useContext(Context);
  const { sidebar } = context;
  console.log("Hello");
  return (
    <div className={!sidebar ? style.container : style.container1}>
      <div className={sidebar ? style.box1 : style.box2}>
        <div className={style.des}>
        <h2>About us</h2>
          <h5>
              Welcome to our MERN-based project notebook! Our application offers a
              seamless note-taking experience with secure user authentication.
              Crafted with precision using MongoDB, Express, React, and Node.js,
              along with carefully designed CSS, our platform lets users
              effortlessly create, edit, and manage personalized notes. Join us in
              reimagining digital note-taking through our intuitive interface and
              robust technology stack.
            </h5>
        </div>
      </div>
    </div>
  );
};

export default About;
