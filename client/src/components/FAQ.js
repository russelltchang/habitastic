import React, { useState, useEffect } from "react";

const FAQ = (props) => {
  let [Q1Active, setQ1Active] = useState(false);
  let [Q2Active, setQ2Active] = useState(false);
  let [Q3Active, setQ3Active] = useState(false);
  let [Q4Active, setQ4Active] = useState(false);
  let [Q5Active, setQ5Active] = useState(false);

  let handleQuestionClick = (e) => {
    switch (e.currentTarget.id) {
      case "question1":
        setQ1Active((Q1Active) => !Q1Active);
        break;
      case "question2":
        setQ2Active((Q2Active) => !Q2Active);
        break;
      case "question3":
        setQ3Active((Q3Active) => !Q3Active);
        break;
      case "question4":
        setQ4Active((Q4Active) => !Q4Active);
        break;
      case "question5":
        setQ5Active((Q5Active) => !Q5Active);
        break;
    }
  };

  return (
    <div id="FAQ-section">
      <h1 style={{ textAlign: "center", marginBottom: "5rem" }}>
        Frequently Asked Questions
      </h1>
      <div className="question" id="question1" onClick={handleQuestionClick}>
        <div className="header">
          Why track habits?
          {Q1Active ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {Q1Active ? (
          <div className="answer">
            Tracking habits makes you more consistent, productive, and
            successful. It tells you whether you really did the work, or let
            other things take priority. See the benefits section above. Build
            better long-term habits and improve your life.
          </div>
        ) : null}
      </div>
      <div className="question" id="question2" onClick={handleQuestionClick}>
        <div className="header">
          How does it work?
          {Q2Active ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {Q2Active ? (
          <div className="answer">
            Simple! Add habits you want to track, and every day, mark a habit as
            done when you complete it. Add notes for your own reference. We
            automatically count streaks to show how many consecutive days you've
            completed a habit.
          </div>
        ) : null}
      </div>
      <div className="question" id="question3" onClick={handleQuestionClick}>
        <div className="header">
          How much does it cost?
          {Q3Active ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>

        {Q3Active ? (
          <div className="answer">
            It's free to track up to three habits and add one note per day. For
            unlimited habits and notes, consider upgrading to Premium for just
            $2.50 monthly, or $20 annually.
          </div>
        ) : null}
      </div>
      <div className="question" id="question4" onClick={handleQuestionClick}>
        <div className="header">
          Is there a mobile app?
          {Q4Active ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {Q4Active ? (
          <div className="answer">
            Habitastic.app is currently only available as a web application.
            However, the app is fully responsive on a mobile browser.
          </div>
        ) : null}
      </div>
      <div className="question" id="question5" onClick={handleQuestionClick}>
        <div className="header">
          How do I contact you with questions or feedback?
          {Q5Active ? (
            <i className="fa fa-angle-up"></i>
          ) : (
            <i className="fa fa-angle-down"></i>
          )}
        </div>
        {Q5Active ? (
          <div className="answer">
            Send me an <a href="mailto: habitastic@protonmail.com">email</a>!
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FAQ;
