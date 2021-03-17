import React, { useState } from "react";
import axios from "axios";

const Login = (props) => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let submit = (e) => {
    //prevents form submitting to 8080.  Post to 3000 while developing
    e.preventDefault();

    let url =
      process.env.NODE_ENV === "development"
        ? process.env.DEV_API_LOGIN
        : process.env.PRO_API_LOGIN;

    //key "username" needed, as passport takes req.body.username as default "user"
    let data = {
      username: email,
      password: password,
    };

    axios.post(url, data).then((res) => {
      console.log(`Login POST response: ${res.data}`);
      // history.push('/');
    });
  };

  return (
    <div id="logIn">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input
          required
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          required
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
