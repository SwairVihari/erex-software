import React from 'react';
import img from "./img/LOGO-removebg-preview.png"
import "./Footer.css"
const Footer = () => {
  return (<div>
      <footer>
  <div className="footer-erex">
    <img src={img} alt=""/>

    <p>

E-rex is a leader in lithium battery with an extensive product range from 50w to 5MW. 
    </p>
  </div>

  <div className="footer-address">
    <h4>Made With ❤️ in India </h4>

  </div>

  </footer>

<div className="footest">
<div className="copyright">
  © Copyright 2022 | E-Rex All Rights Reserved
</div>
  </div>
  </div>);
};

export default Footer;
