import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import Logo from "/client/public/logo.png";

const Navbar = (props) => {
  let history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  let handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  let handleLogout = () => {
    localStorage.clear();
    setAnchorEl(null);

    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/logout"
        : "/logout";

    axios.get(url).then((res) => {
      if (res.data === "Logged Out") {
        props.onLogout();
        history.push("/login");
      }
    });
  };

  return (
    <AppBar className="appBar" position="static" elevation={0}>
      <Toolbar disableGutters={true}>
        <div id="navContainer">
          <Link to="/dashboard">
            <img className="logoImg" src={Logo} />
            <h2>Habitastic</h2>
          </Link>

          {props.isLoggedIn ? (
            <ul id="navItems">
              <li>
                <p id="avatar" onClick={handleMenuClick}>
                  <i className="fa fa-user-circle-o"></i>{" "}
                  <i className="fa fa-caret-down"></i>
                </p>
                <Menu
                  id="menu"
                  keepMounted
                  transitionDuration={0}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  getContentAnchorEl={null}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>
                    <Link
                      to="/settings"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Settings
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </li>
            </ul>
          ) : (
            <ul id="navItems">
              <li>
                <Link to="/login" id="loginLink">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" id="signupLink">
                  Signup
                </Link>
              </li>
            </ul>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
