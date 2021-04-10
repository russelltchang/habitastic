import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuth } from "../utils/isAuth.js";

let PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return fakeAuth.isAuthenticated === true ? (
          children
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateRoute;
