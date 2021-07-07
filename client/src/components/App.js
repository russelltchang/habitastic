import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Terms from "./Terms";
import Privacy from "./Privacy";
import Settings from "./Settings";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [username, setUsername] = useState("");
  let [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/auth"
        : "/auth";

    axios.get(url).then((res) => {
      if (res.data !== "Unauthorized") {
        setUsername(res.data.username);
        setIsPremium(res.data.isPremium);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  let handleSubExpire = () => {
    setIsPremium(false);
  };

  let handleSignup = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  let handleLogin = (user, isPremium) => {
    setIsLoggedIn(true);
    setUsername(user);
    setIsPremium(isPremium);
  };

  let handleLogout = () => {
    setIsLoggedIn(false);
    setIsPremium(false);
    setUsername("");
  };

  let handleApprove = () => {
    setIsPremium(true);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} user={username} onLogout={handleLogout} />
      <main id="container">
        <Route
          exact
          path="/"
          render={() => <Landing onSignUp={handleSignup} />}
        />
        <Route
          path="/login"
          render={() => <Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/signup"
          render={() => (
            <Signup onSignup={handleSignup} isLoggedIn={isLoggedIn} />
          )}
        />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
        <PrivateRoute
          path="/settings"
          component={Settings}
          isLoggedIn={isLoggedIn}
          isPremium={isPremium}
          handleApprove={handleApprove}
          onLogout={handleLogout}
        />
        <PrivateRoute
          path="/dashboard"
          component={Dashboard}
          isLoggedIn={isLoggedIn}
          isPremium={isPremium}
          handleApprove={handleApprove}
          subscriptionExpire={handleSubExpire}
        />
      </main>
    </Router>
  );
};

export default App;
