import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  browserHistory,
} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Toolbar from "@material-ui/core/Toolbar";

const App = () => {
  //an extra render sets isLoggedIn back to FALSE after signup sets it to TRUE
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  let handleSignup = (loginStatus) => {
    setIsLoggedIn(loginStatus);
  };

  let handleLogout = (loginStatus) => {
    setIsLoggedIn(loginStatus);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main id="container">
        <Toolbar />
        <Route path="/login" component={Login} />
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
