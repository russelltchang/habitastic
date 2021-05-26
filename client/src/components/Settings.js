import React, { useState } from "react";
import SubscribeModal from "./SubscribeModal";
import DeleteAccountModal from "./DeleteAccountModal";
import axios from "axios";

const Settings = (props) => {
  let [modalSubscribe, setModalSubscribe] = useState(false);
  let [modalAccountDelete, setModalAccountDelete] = useState(false);
  let [password1, setPassword1] = useState(null);
  let [password2, setPassword2] = useState(null);
  let [matchError, setMatchError] = useState(false);
  let [changePwSuccess, setChangePwSuccess] = useState(false);

  let handleSubOpen = () => {
    setModalSubscribe(true);
  };

  let handleSubClose = () => {
    setModalSubscribe(false);
  };

  let handleDeleteOpen = () => {
    setModalAccountDelete(true);
  };

  let handleDeleteClose = () => {
    setModalAccountDelete(false);
  };

  let handleChangePassword = (e) => {
    e.preventDefault();

    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/change-password"
        : "/change-password";

    let pwMatch = password1 === password2;

    if (pwMatch) {
      axios.post(url, { password: password1 }).then((res) => {
        setChangePwSuccess(true);
      });
    } else {
      setMatchError(true);
    }
  };

  let handleApprove = () => {
    props.handleApprove();
  };

  let handleLogout = () => {
    props.onLogout();
  };

  return (
    <div id="settings">
      <div className="section">
        <div>Password</div>
        <div>
          <form onSubmit={handleChangePassword}>
            <label>New Password: </label>
            <input
              required
              type="password"
              minLength="8"
              onChange={(e) => setPassword1(e.target.value)}
            ></input>
            <label>Confirm Password: </label>
            <input
              required
              type="password"
              minLength="8"
              onChange={(e) => setPassword2(e.target.value)}
            ></input>
            <button type="submit" value="Save">
              Save
            </button>
            <span className="message">
              {matchError ? "Passwords dont match" : ""}
            </span>
            <span className="message">
              {changePwSuccess ? "Password saved" : ""}
            </span>
          </form>
        </div>
      </div>
      <hr />
      <div className="section">
        <div>Subscription</div>
        <div>
          {props.isPremium ? (
            <p style={{ color: "#777", marginTop: 0 }}>Premium Member</p>
          ) : (
            <>
              <p style={{ color: "#777", marginTop: 0 }}>Free Member</p>{" "}
              <button onClick={handleSubOpen}>Upgrade</button>
            </>
          )}
        </div>
        <SubscribeModal
          open={modalSubscribe}
          close={handleSubClose}
          handleApprove={handleApprove}
        />
      </div>
      <hr />
      <div className="section">
        <div>Support</div>
        <div>
          <a href="mailto:habitastic@protonmail.com">
            <button>Email</button>
          </a>
        </div>
      </div>
      <hr />
      <div className="section">
        <div>Delete Account</div>
        <div>
          <button className="deleteAccountBtn" onClick={handleDeleteOpen}>
            Delete
          </button>
        </div>
        <DeleteAccountModal
          open={modalAccountDelete}
          close={handleDeleteClose}
          onLogout={handleLogout}
        />
      </div>
    </div>
  );
};

export default Settings;
