import { Link } from "react-router-dom";
import Hero from "/client/public/hero.png";
import benefit1 from "/client/public/benefit1.svg";
import benefit2 from "/client/public/benefit2.svg";
import benefit3 from "/client/public/benefit3.svg";
import benefit4 from "/client/public/benefit4.svg";
import benefit5 from "/client/public/benefit5.svg";
import benefit6 from "/client/public/benefit6.svg";
import feature1 from "/client/public/feature1.gif";
import feature2 from "/client/public/feature2.gif";
import feature3 from "/client/public/feature3.gif";
import feature4 from "/client/public/feature4.gif";
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

      {/* <div id="features-section">
        <div className="featureHighlight">
          <div className="featureImage">
            <div className="imageContainer1">
              <img id="featureImage1" src={feature1} loading="lazy"></img>
            </div>
          </div>
          <div className="featureText">
            <div className="featureTitle">Add habits</div>
            <div className="featureSubtitle">
              Whether it's reading for 30 minutes, learning a new language, or
              practicing guitar, Habitastic helps you move toward your goals.
            </div>
          </div>
        </div>
        <div className="featureHighlight">
          <div className="featureText">
            <div className="featureTitle">Log habits</div>
            <div className="featureSubtitle">
              Keeping track of your habits is the most important part. If you
              forget to log a day, you can go back later to mark it and maintain
              your streak.
            </div>
          </div>
          <div className="featureImage">
            <div className="imageContainer2">
              <img id="featureImage2" src={feature2} loading="lazy"></img>
            </div>
          </div>
        </div>
        <div className="featureHighlight">
          <div className="featureImage">
            <div className="imageContainer3">
              <img id="featureImage3" src={feature3} loading="lazy"></img>
            </div>
          </div>
          <div className="featureText">
            <div className="featureTitle">Write notes</div>
            <div className="featureSubtitle">
              Add context to what affects your habit building, so you can adjust
              your routine accordingly. Remind yourself what to avoid and what
              to keep doing.
            </div>
          </div>
        </div>
        <div className="featureHighlight">
          <div className="featureText">
            <div className="featureTitle">Get immediate feedback</div>
            <div className="featureSubtitle">
              Dashboard indicators "light up" when you're on a record streak,
              and "turn off" when you're not. Get encouraged to do your habits
              every day.
            </div>
          </div>
          <div className="featureImage">
            <div className="imageContainer4">
              <img id="featureImage4" src={feature4} loading="lazy"></img>
            </div>
          </div>
        </div>
      </div> */}
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
            <h3>Gain clarity</h3>
            <p className="benefits-text">
              If you're having trouble keeping a resolution, a habit tracker can
              help your figure out why
            </p>
          </div>
          <div className="benefits-col-3">
            <img src={benefit3} />
            <h3>See long-term progress</h3>
            <p className="benefits-text">
              Be able to visually see the incremental progress of each of your
              habits
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
