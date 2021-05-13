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
        <Link className="termsLink" to="/terms">
          <h5 className="footerlink">Terms</h5>
        </Link>
        <Link className="privacyLink" to="/privacy">
          <h5 className="footerlink">Privacy</h5>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
