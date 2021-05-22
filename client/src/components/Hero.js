import hero from "/client/public/hero.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div id="hero-section">
      <div id="heroText">
        <h1 id="header">Keep track of your habits, simply</h1>
        <h3 id="subheader">
          A habit tracker with a note taking feature to help you achieve your
          goals
        </h3>
        <div className="heroBtnWrapper">
          <Link to="/signup" className="heroBtn">
            Try For Free
          </Link>
        </div>
      </div>
      <img id="heroImage" src={hero} />
    </div>
  );
};

export default Hero;
