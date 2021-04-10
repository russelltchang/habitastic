import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Toolbar from "@material-ui/core/Toolbar";

const App = () => {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [username, setUsername] = useState("");

  useEffect(() => {
    let url =
      process.env.NODE_ENV === "development"
        ? process.env.DEV_API_AUTH
        : "/auth";

    axios.get(url).then((res) => {
      if (res.data) {
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
        <Toolbar />
        <Route exact path="/" component={Landing} />
        <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
        <Route
          path="/signup"
          render={() => <Signup onSignup={handleSignup} />}
        />
        <Route path="/dashboard" component={Dashboard} />
      </main>
    </Router>
  );
};

export default App;
