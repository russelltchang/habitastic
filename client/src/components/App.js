import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
  browserHistory,
} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Toolbar from "@material-ui/core/Toolbar";

const App = () => {
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  let [username, setUsername] = useState("");

  let handleSignup = (loginStatus) => {
    setIsLoggedIn(loginStatus);
  };

  let handleLogin = (loginStatus, username) => {
    setIsLoggedIn(loginStatus);
    setUsername(username);
  };

  let handleLogout = (loginStatus, username) => {
    setIsLoggedIn(loginStatus);
    setUsername(username);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main id="container">
        <Toolbar />
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
