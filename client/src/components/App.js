import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [username, setUsername] = useState("");

  useEffect(() => {
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/auth"
        : "/auth";

    axios.get(url).then((res) => {
      if (res.data !== "Unauthorized") {
        setUsername(res.data);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  let handleSignup = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  let handleLogin = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
  };

  let handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} user={username} onLogout={handleLogout} />
      <main id="container">
        <Route exact path="/" component={Landing} />
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
        <PrivateRoute
          path="/dashboard"
          component={Dashboard}
          isLoggedIn={isLoggedIn}
        />
      </main>
    </Router>
  );
};

export default App;
