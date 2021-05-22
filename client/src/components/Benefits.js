import benefit1 from "/client/public/benefit1.svg";
import benefit2 from "/client/public/benefit2.svg";
import benefit3 from "/client/public/benefit3.svg";
import benefit4 from "/client/public/benefit4.svg";
import benefit5 from "/client/public/benefit5.svg";
import benefit6 from "/client/public/benefit6.svg";

const Benefits = () => {
  return (
    <div id="benefits-section">
      <h1>Benefits</h1>
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
            Like knocking items off your to-do list, finishing your daily habits
            feels satisfying
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
            Progress is an effective motivator. By seeing your progress, you're
            likelier to continue
          </p>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
