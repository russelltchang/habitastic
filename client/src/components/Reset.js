import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";

const Reset = (props) => {
  let history = useHistory();
  let [email, setEmail] = useState("");

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
    };
  };

  return (
    <div id="reset">
      <h2>Reset Password</h2>
      <form onSubmit={submit}>
        <label>Email</label>
        <input
          autoFocus
          required
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className="authSubmit" type="submit" value="Reset" />
      </form>
    </div>
  );
};

export default Reset;
