import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Reset from "./Reset";
import axios from "axios";

const Login = (props) => {
  let history = useHistory();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errorMsg, setErrorMsg] = useState("");

  if (props.isLoggedIn) {
    history.push("/dashboard");
  }

  let submit = (e) => {
    //prevents form submitting to 8080.  Post to 3000 while developing
    e.preventDefault();

    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/login"
        : "/login";

    //key "username" needed, as passport takes req.body.username as default "user"
    let data = {
      username: email,
      password: password,
    };

    axios.post(url, data).then((res) => {
      if (res.data.username === data.username) {
        props.onLogin(res.data.name, res.data.isPremium);
        //doesn't really match, no user exists doesn't mean invalid email
      } else if (res.data === "No User Exists") {
        setErrorMsg("Invalid email or password");
      }
    });
  };

  return (
    <div id="logIn">
      <h2>Login</h2>
      <p id="errorMsg">{errorMsg}</p>
      <form onSubmit={submit}>
        <label>Email</label>
        <input
          autoFocus
          required
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link className="forgotPassword" to="/reset">
          <span>Forgot password?</span>
        </Link>
        <input className="authSubmit" type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
