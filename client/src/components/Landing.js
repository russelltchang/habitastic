import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/client/public/logo.png";
import HeroGIF from "/client/public/hero.gif";
import Insight from "/client/public/Insight.svg";
import Goals from "/client/public/Goals.svg";
import Progress from "/client/public/Progress.svg";

const Landing = () => {
  return (
    <>
      <div id="hero-section">
        <div id="heroText">
          <h1 id="header">Keep track of your habits, simply</h1>
          <p id="subheader">
            An intuitive daily logger with note taking functionality, all in one
            dashboard
          </p>
          <div className="heroBtnWrapper">
            <Link to="/signup" className="heroBtn">
              Try Now
            </Link>
          </div>
        </div>
        <img id="heroImage" src={HeroGIF} />
      </div>
      <div id="features-section">
        {/* <h1 className="section-title">Benefits</h1> */}
        <div className="row">
          <div className="feature-col-1">
            <img src={Insight} />
            <h3>Gain insight</h3>
            <p className="benefits-text">
              Notes add context to what affects your habit building, so you can
              adjust accordingly
            </p>
          </div>
          <div className="feature-col-2">
            <img src={Goals} />
            <h3>Immediate Feedback</h3>
            <p className="benefits-text">
              Dashboard indicators "light up" when you reach a record streak
            </p>
          </div>
          <div className="feature-col-3">
            <img src={Progress} />
            <h3>Simple and intuitive</h3>
            <p className="benefits-text">
              Mark habits, undo actions, and add notes all in one centralized
              dashboard
            </p>
          </div>
        </div>
      </div>
      <div id="CTA-section">
        <h1>Start tracking your habits for free</h1>
        <div className="heroBtnWrapper">
          <Link to="/signup" className="heroBtn">
            Try Now
          </Link>
        </div>
      </div>
      {/* place footer in App.js as a component? */}
      <footer id="footer">
        <Link className="logo" to="/dashboard">
          <img className="logoImg" src={Logo} />
          <h3>Habitastic</h3>
        </Link>
        <div className="footer-col-1">
          <h3>Company</h3>
        </div>
      </footer>
    </>
  );
};

export default Landing;
