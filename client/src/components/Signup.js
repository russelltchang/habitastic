import React, { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const Signup = (props) => {
  let history = useHistory();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errorMsg, setErrorMsg] = useState("");

  if (props.isLoggedIn) {
    history.push("/dashboard");
  }

  let submit = (e) => {
    //prevents form submitting twice.  Without this, Mongo E1100 error
    e.preventDefault();

    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/signup"
        : "/signup";

    let data = {
      name: name,
      username: email,
      password: password,
    };

    axios.post(url, data).then((res) => {
      if (res.data.username === data.username) {
        props.onSignup(res.data.name);
        history.push("/dashboard");
      } else if (res.data === "User Exists") {
        setErrorMsg("Email already exists");
      }
    });
  };

  return (
    <div id="signUp">
      {props.CTA ? "" : <h2>Signup</h2>}
      <p id="errorMsg">{errorMsg}</p>
      <form onSubmit={submit}>
        <label>Name</label>
        {props.CTA ? (
          <input
            required
            type="text"
            maxLength="40"
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <input
            autoFocus
            required
            type="text"
            maxLength="40"
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <label>Email</label>
        <input
          required
          type="email"
          maxLength="40"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          required
          type="password"
          minLength="8"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="authSubmit"
          type="submit"
          value={props.CTA ? "Achieve Goals" : "Signup"}
        />
      </form>
    </div>
  );
};

export default Signup;
