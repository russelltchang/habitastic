import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import axios from "axios";
import "./scss/main.scss";

axios.defaults.withCredentials = true;

ReactDOM.render(<App />, document.getElementById("root"));
