import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

const Dashboard = (props) => {
  let handleClick = (e) => {
    axios.get("http://localhost:3000/test").then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div>
      <h3>Oops! Looks like you aren't tracking any habits yet.</h3>
      <Button onClick={handleClick} variant="contained" color="primary">
        Add Habit
      </Button>
    </div>
  );
};

export default Dashboard;
