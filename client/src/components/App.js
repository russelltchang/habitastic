import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
  browserHistory,
} from "react-router-dom";
import axios from "axios";
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
        : process.env.PRO_API_AUTH;

    axios.get(url).then((res) => {
      if (res.data) {
        setUsername(res.data);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  let handleSignup = () => {
    setIsLoggedIn(true);
  };

  let handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} user={username} />
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
