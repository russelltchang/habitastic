import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const Navbar = (props) => {
  let handleLogout = () => {
    let url = process.env.DEV_API_LOGOUT;

    axios.get(url).then((res) => {
      //if success, move to home
      if (res.data) {
        props.onLogout(false);
      }
    });
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap>
          Project Name
        </Typography>
        {props.isLoggedIn ? (
          <ul id="navItems">
            <li>
              <a href="/" onClick={handleLogout}>
                Logout
              </a>
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
