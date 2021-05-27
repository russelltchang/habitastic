import Hero from "./Hero";
import Features from "./Features";
import Benefits from "./Benefits";
import FAQ from "./FAQ";
import Signup from "./Signup";
import Footer from "./Footer";
import SVG1 from "./SVG1";
import SVG2 from "./SVG2";
import SVG3 from "./SVG3";

const Landing = (props) => {
  let handleSignUp = (name) => {
    props.onSignUp(name);
  };

  return (
    <>
      <Hero />
      <Features />
      <SVG1 />
      <Benefits />
      <SVG2 />
      <FAQ />
      <SVG3 />
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
