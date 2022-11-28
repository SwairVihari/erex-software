import React from 'react';
import img from "./img/LOGO-removebg-preview.png"
import "./WorkIcon.css"
const WorkIcon = (props) => {
  return (
  <>     
   <img id='workiconimg' src={props.img}/>
  </>)

  ;
};

export default WorkIcon;
