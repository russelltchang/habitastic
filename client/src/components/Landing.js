import Hero from "./Hero";
import Features from "./Features";
import Benefits from "./Benefits";
import Footer from "./Footer";
import CTA from "./CTA";
import SVG from "./SVG";

const Landing = (props) => {
  let handleSignUp = (name) => {
    props.onSignUp(name);
  };

  return (
    <>
      <Hero />
      <Features />
      <CTA handleSignUp={handleSignUp} />
      <Footer />
    </>
  );
};

export default Landing;
