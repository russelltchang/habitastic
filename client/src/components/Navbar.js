import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const Navbar = (props) => {
  let history = useHistory();

  let handleLogout = () => {
    localStorage.clear();

    let url =
      process.env.NODE_ENV === "development"
        ? process.env.DEV_API_LOGOUT
        : "/logout";

    axios.get(url).then((res) => {
      if (res.data === "Logged Out") {
        props.onLogout();
        history.push("/login");
      }
    });
  };

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Name
        </Typography>
        {props.isLoggedIn ? (
          <ul id="navItems">
            <li>
              <span>{props.user}</span>
            </li>
            <li>
              <p id="logOut" onClick={handleLogout}>
                Logout
              </p>
            </li>
          </ul>
        ) : (
          <ul id="navItems">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
