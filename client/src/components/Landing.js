import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroGIF from "/client/public/hero.gif";

const Landing = () => {
  return (
    <>
      <div id="hero">
        <div id="heroText">
          <h1 id="header">Keep track of your habits, simply</h1>
          <p id="subheader">
            An intuitive daily logger with note taking functionality, all in one
            dashboard
          </p>
          <div id="heroBtnWrapper">
            <Link to="/signup" id="heroBtn">
              Try Now
            </Link>
          </div>
        </div>
        <img id="heroImage" src={HeroGIF} />
      </div>
      <div id="features">
        <h1>Features</h1>
      </div>
    </>
  );
};

export default Landing;
