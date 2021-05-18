import { Link } from "react-router-dom";
import Hero from "/client/public/hero.png";
import benefit1 from "/client/public/benefit1.svg";
import benefit2 from "/client/public/benefit2.svg";
import benefit3 from "/client/public/benefit3.svg";
import benefit4 from "/client/public/benefit4.svg";
import benefit5 from "/client/public/benefit5.svg";
import benefit6 from "/client/public/benefit6.svg";
import Signup from "./Signup";
import Footer from "./Footer";

const Landing = (props) => {
  let handleSignUp = (name) => {
    props.onSignUp(name);
  };

  return (
    <>
      <div id="hero-section">
        <div id="heroText">
          <h1 id="header">Keep track of your habits, simply</h1>
          <h3 id="subheader">
            Achieve your goals with a daily activity logger and notes
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
        <div className="row">
          <div className="benefits-col-1">
            <img src={benefit1} />
            <h3>Be likelier to achieve goals</h3>
            <p className="benefits-text">
              By breaking your goals into a series of daily habits, large tasks
              become more manageable
            </p>
          </div>
          <div className="benefits-col-2">
            <img src={benefit2} />
            <h3>Learn what holds you back</h3>
            <p className="benefits-text">
              If you're having trouble keeping a resolution, a habit tracker can
              help your figure out why
            </p>
          </div>
          <div className="benefits-col-3">
            <img src={benefit3} />
            <h3>See progress</h3>
            <p className="benefits-text">
              Be able to visually see the progress of your habits over time
            </p>
          </div>
        </div>
        <div className="row">
          <div className="benefits-col-1">
            <img src={benefit4} />
            <h3>Feel accomplished</h3>
            <p className="benefits-text">
              Like knocking items off your to-do list, finishing your daily
              habits feels satisfying
            </p>
          </div>
          <div className="benefits-col-2">
            <img src={benefit5} />
            <h3>Maintain accountability</h3>
            <p className="benefits-text">
              With a habit tracker, it's clear whether or not you're following
              through on resolutions
            </p>
          </div>
          <div className="benefits-col-3">
            <img src={benefit6} />
            <h3>Get motivated to continue</h3>
            <p className="benefits-text">
              Progress is an effective motivator. By seeing your progress,
              you're likelier to continue
            </p>
          </div>
        </div>
      </div>
      <div id="CTA-section">
        <h1 style={{ textAlign: "center" }}>
          Start tracking your habits for free
        </h1>
        <Signup CTA={true} onSignup={handleSignUp} />
      </div>
      <Footer />
    </>
  );
};

export default Landing;
