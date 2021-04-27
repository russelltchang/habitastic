import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/client/public/logo.png";
import HeroGIF from "/client/public/hero.gif";
import benefit1 from "/client/public/benefit1.svg";
import benefit2 from "/client/public/benefit2.svg";
import benefit3 from "/client/public/benefit3.svg";
import feature1 from "/client/public/feature1.gif";
import feature2 from "/client/public/feature2.gif";
import feature3 from "/client/public/feature3.gif";

const Landing = () => {
  return (
    <>
      <div id="hero-section">
        <div id="heroText">
          <h1 id="header">Keep track of your habits, simply</h1>
          <h3 id="subheader">
            An activity logger to help you move towards your goals, build
            momentum, and hold yourself accountable
          </h3>
          <div className="heroBtnWrapper">
            <Link to="/signup" className="heroBtn">
              Try Now
            </Link>
          </div>
        </div>
        <img id="heroImage" src={HeroGIF} />
      </div>
      <div id="benefits-section">
        {/* <h1 className="section-title">Benefits</h1> */}
        <div className="row">
          <div className="benefits-col-1">
            <img src={benefit1} />
            <h3>Gain Insight</h3>
            <p className="benefits-text">
              Notes add context to what affects your habit building, so you can
              adjust accordingly
            </p>
          </div>
          <div className="benefits-col-2">
            <img src={benefit2} />
            <h3>Immediate Feedback</h3>
            <p className="benefits-text">
              Dashboard indicators "light up" when you reach a record streak
            </p>
          </div>
          <div className="benefits-col-3">
            <img src={benefit3} />
            <h3>Simple and Intuitive</h3>
            <p className="benefits-text">
              Mark habits, undo actions, and add notes all in one centralized
              dashboard
            </p>
          </div>
        </div>
      </div>
      <div id="CTA-section-1">
        <h1>Start tracking your habits for free</h1>
        <div className="heroBtnWrapper">
          <Link to="/signup" className="heroBtn-1">
            Create An Account
          </Link>
        </div>
      </div>
      <div id="features-section">
        <div className="featureHighlight">
          <div className="featureImage">
            <img id="featureImage1" src={feature1} loading="lazy"></img>
          </div>
          <div className="featureText">
            <div className="featureTitle">
              Immediate feedback keeps you engaged
            </div>
            <div className="featureSubtitle">
              Dashboard indicators "light up" when you reach a record streak,
              and "turn off" when your current streak isn't a record streak. Get
              encouraged to do your habits every day.
            </div>
          </div>
        </div>
        <div className="featureHighlight">
          <div className="featureText">
            <div className="featureTitle">Gain insight with notes</div>
            <div className="featureSubtitle">
              Add context to what affects your habit building, so you can adjust
              accordingly. Remind yourself what to avoid and what to keep doing.
            </div>
          </div>
          <div className="featureImage">
            <img id="featureImage2" src={feature2} loading="lazy"></img>
          </div>
        </div>
        <div className="featureHighlight">
          <div className="featureImage3">
            <img id="featureImage3" src={feature3} loading="lazy"></img>
          </div>
          <div className="featureText3">
            <div className="featureTitle">Keep track of long-term results</div>
            <div className="featureSubtitle">
              Mark habits, undo actions, and add notes all in one centralized
              dashboard
            </div>
          </div>
        </div>
      </div>
      <div id="CTA-section">
        <h1>Start tracking your habits for free</h1>
        <div className="heroBtnWrapper">
          <Link to="/signup" className="heroBtn">
            Create An Account
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
          <h5 className="footerlink">Terms</h5>
          <h5 className="footerlink">Privacy</h5>
        </div>
      </footer>
    </>
  );
};

export default Landing;
