import React, { useEffect, useState } from "react";

const Landing = () => {
  return (
    <>
      <div id="hero">
        <div id="heroText">
          <h1>Form new habits with a simple habit tracker.</h1>
          <p>
            Keep track of your habits with a simple, clutter free experience.
          </p>
        </div>
        <img id="heroImage" src="../client/public/hero.png" />
      </div>
    </>
  );
};

export default Landing;
