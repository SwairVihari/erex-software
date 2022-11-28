import React from 'react';
import "./Navbar.css";
import img from "./img/LOGO-removebg-preview.png"

const Navbar = () => {
  return <div className='navbar'>
      <div className='img-container'>
     <img src={img}></img>
     </div>
  </div>;
};

export default Navbar;
