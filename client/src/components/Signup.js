import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const Signup = (props) => {
  let history = useHistory();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  let submit = (e) => {
    //prevent default form submit behavior of posting to 8080.  Post to 3000 while developing
    e.preventDefault();

    let url =
      process.env.NODE_ENV === "development"
        ? process.env.DEV_API_SIGNUP
        : process.env.PRO_API_SIGNUP;

    let data = {
      name: name,
      username: email,
      password: password,
    };

    axios.post(url, data).then((res) => {
      console.log(`Signup POST response: ${res.data}`);
      // history.push('/');
      props.onSignup(true);
    });
  };

  return (
    <div id="signUp">
      <h2>Signup</h2>
      {/* <p id="errorMsg">{errorMsg}</p> */}
      <form onSubmit={submit}>
        <label>Name</label>
        <input required type="text" onChange={(e) => setName(e.target.value)} />
        <label>Email</label>
        <input
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="authSubmit" type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default Signup;
