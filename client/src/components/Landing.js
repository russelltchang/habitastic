import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/client/public/logo.png";
import Hero from "/client/public/hero.png";
import benefit1 from "/client/public/benefit1.svg";
import benefit2 from "/client/public/benefit2.svg";
import benefit3 from "/client/public/benefit3.svg";
import feature1 from "/client/public/feature1.gif";
import feature2 from "/client/public/feature2.gif";
import feature3 from "/client/public/feature3.gif";
import Signup from "./Signup";

const Landing = () => {
  return (
    <>
      <div id="hero-section">
        <div id="heroText">
          <h1 id="header">Keep track of your habits, simply</h1>
          <h3 id="subheader">
            An activity logger to help you reach your goals
          </h3>
          <div className="heroBtnWrapper">
            <Link to="/signup" className="heroBtn">
              Try For Free
            </Link>
          </div>
        </div>
        <img id="heroImage" src={Hero} />
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
      <div id="features-section">
        <div className="featureHighlight">
          <div className="featureImage">
            <div className="imageContainer1">
              <img id="featureImage1" src={feature1} loading="lazy"></img>
            </div>
          </div>
          <div className="featureText">
            <div className="featureTitle">Immediate feedback</div>
            <div className="featureSubtitle">
              Dashboard indicators "light up" when you're on a record streak,
              and "turn off" when you're not. Get encouraged to do your habits
              every day.
            </div>
          </div>
        </div>
        <div className="featureHighlight">
          <div className="featureText">
            <div className="featureTitle">Write notes</div>
            <div className="featureSubtitle">
              Add context to what affects your habit building, so you can adjust
              your routine accordingly. Remind yourself what to avoid and what
              to keep doing.
            </div>
          </div>
          <div className="featureImage">
            <div className="imageContainer2">
              <img id="featureImage2" src={feature2} loading="lazy"></img>
            </div>
          </div>
        </div>
        <div className="featureHighlight">
          <div className="featureImage3">
            <div className="imageContainer3">
              <img id="featureImage3" src={feature3} loading="lazy"></img>
            </div>
          </div>
          <div className="featureText3">
            <div className="featureTitle">Progress at a glance</div>
            <div className="featureSubtitle">
              Get a bird's eye view of all your habits and previous streaks. See
              your progress over time.
            </div>
          </div>
        </div>
      </div>
      {/* <div id="pricing-section">
        <h1 className="section-title">Pricing</h1>
        <div className="pricingContainer">
          <div className="free">
            <h1>Free</h1>
          </div>
          <div className="premium">
            <h1>Premium</h1>
          </div>
        </div>
      </div> */}
      <div id="CTA-section">
        <h1 style={{ textAlign: "center" }}>
          Start tracking your habits for free
        </h1>
        <Signup CTA={true} />
      </div>
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
