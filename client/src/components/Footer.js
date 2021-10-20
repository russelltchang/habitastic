import React from "react";
import { Link } from "react-router-dom";
import Logo from "/client/public/logo.png";

const Footer = () => {
  return (
    <footer id="footer">
      <Link className="logo" to="/dashboard">
        <img className="logoImg" src={Logo} />
        <h3>Habitastic</h3>
      </Link>
      <div className="footer-col-1">
        <Link to="/terms">
          <h5 className="footerlink">Terms</h5>
        </Link>
        <Link to="/privacy">
          <h5 className="footerlink">Privacy</h5>
        </Link>
        <a href="mailto: habitastic@protonmail.com">
          <h5 className="footerlink">Contact</h5>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
