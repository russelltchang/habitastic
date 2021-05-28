import React from "react";
import Signup from "./Signup";

const CTA = (props) => {
  return (
    <div id="CTA-section">
      <h1>
        Take the first step today, for <span id="for-free-bg">free</span>
      </h1>
      <Signup CTA={true} onSignup={props.handleSignUp} />
    </div>
  );
};

export default CTA;
