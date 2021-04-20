import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <div id="hero">
        <div id="heroText">
          <h1>Form new habits with a simple habit tracker.</h1>
          <p>
            Keep track of your habits with a simple, clutter free experience.
          </p>
          <div id="heroBtnWrapper">
            <Link to="/signup" id="heroBtn">
              Try Now
            </Link>
          </div>
        </div>
        <img id="heroImage" src="../client/public/hero.gif" />
      </div>
      <div id="features">
        <h1>Features</h1>
      </div>
    </>
  );
};

export default Landing;
