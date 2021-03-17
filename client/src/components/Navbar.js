import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

const Navbar = (props) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap>
          Project Name
        </Typography>
        {props.isLoggedIn ? (
          <ul id="navItems">
            <li>
              <a
                href="/"
                onClick={() => {
                  props.onLogout(false);
                }}
              >
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
