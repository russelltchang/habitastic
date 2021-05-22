import Hero from "./Hero";
import Features from "./Features";
import Benefits from "./Benefits";
import FAQ from "./FAQ";
import Signup from "./Signup";
import Footer from "./Footer";
import Wave from "./Wave";
import Wave2 from "./Wave2";

const Landing = (props) => {
  let handleSignUp = (name) => {
    props.onSignUp(name);
  };

  return (
    <>
      <Hero />
      <Features />
      <Wave />
      <Benefits />
      <Wave2 />
      <FAQ />
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
