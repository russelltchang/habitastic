import feature1 from "/client/public/feature1.gif";
import feature2 from "/client/public/feature2.gif";
import feature3 from "/client/public/feature3.gif";
import { Link } from "react-router-dom";

const Features = (props) => {
  return (
    <div id="features-section">
      <div className="feature">
        <div className="featureText">
          <div className="featureTitle">Immediate feedback</div>
          <div className="featureSubtitle">
            Dashboard indicators light up as soon as your current streak beats
            your previous record. Get encouraged to continue your streak.
          </div>
          <div className="heroBtnWrapper">
            <Link to="/signup" className="heroBtn">
              Try For Free
            </Link>
          </div>
        </div>
        <div className="featureImage">
          <img src={feature1} id="feature1" loading="lazy"></img>
        </div>
      </div>
      <div className="feature">
        <div className="featureImage">
          <img src={feature2} id="feature2" loading="lazy"></img>
        </div>
        <div className="featureText">
          <div className="featureTitle">See past performance</div>
          <div className="featureSubtitle">
            Quickly and easily navigate to past dates to see the performance of
            all your habits, including previous streaks.
          </div>
          <div className="heroBtnWrapper">
            <Link to="/signup" className="heroBtn">
              Try For Free
            </Link>
          </div>
        </div>
      </div>
      <div className="feature">
        <div className="featureText">
          <div className="featureTitle">Add notes</div>
          <div className="featureSubtitle">
            Whether it's to remind yourself why you didn't do a habit on a
            certain day, or of what changes to make to improve your daily
            routine, notes can help.
          </div>
          <div className="heroBtnWrapper">
            <Link to="/signup" className="heroBtn">
              Try For Free
            </Link>
          </div>
        </div>
        <div className="featureImage">
          <img src={feature3} id="feature3" loading="lazy"></img>
        </div>
      </div>
    </div>
  );
};

export default Features;
