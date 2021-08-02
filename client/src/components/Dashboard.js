import React, { useState, useEffect } from "react";
import Table from "./Table";
import Notes from "./Notes";
import Modal from "./Modal";
import axios from "axios";
import empty from "/client/public/empty.svg";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";
import { io } from "socket.io-client";
import { format } from "date-fns";

let socketURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "/";

const socket = io(socketURL);
socket.on("connect", () => {
  console.log("Connected");
});

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const Dashboard = (props) => {
  let storageNotes = JSON.parse(localStorage.getItem("notes"));
  let storageHabits = JSON.parse(localStorage.getItem("habits"));
  let [habits, setHabits] = useState(storageHabits || []);
  let [notes, setNotes] = useState(storageNotes || []);
  let [modalOpen, setModalOpen] = useState(false);
  let [snackbarOpen, setSnackbarOpen] = useState(false);
  let [transition, setTransition] = useState(undefined);
  let [activeDates, setActiveDates] = useState([]);

  socket.on("webhook", (arg) => {
    setHabits(arg);
    props.subscriptionExpire();
  });

  useEffect(() => {
    if (localStorage.habits) {
      return;
    }

    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/habits/"
        : "/habits/";

    axios.get(url).then((res) => {
      if (res.data) {
        setHabits(res.data.habits);
      }
    });
  }, []);

  useEffect(() => {
    if (localStorage.notes) {
      return;
    }

    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/notes/"
        : "/notes/";

    axios.get(url).then((res) => {
      if (res.data) {
        setNotes(res.data);
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  let handleOpen = () => {
    setModalOpen(true);
  };

  let handleClose = () => {
    setModalOpen(false);
  };

  let handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  let handleDateChange = (dates) => {
    let formattedDates = [];
    for (let i = 0; i < dates.length; i++) {
      formattedDates.push(format(dates[i], "M/d/yyyy"));
    }
    setActiveDates(formattedDates);
  };

  let handleAddHabit = (newHabit) => {
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/habits/add"
        : "/habits/add";

    let data = { habit: newHabit, id: Date.now().toString(), dates: [] };

    axios.post(url, data).then((res) => {
      if (res.data) {
        setHabits((habits) => [...habits, data]);
        setModalOpen(false);
        setTransition(() => TransitionUp);
        setSnackbarOpen(true);
      }
    });
  };

  let handleEditHabit = (habitName, habitID) => {
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/habits/edit"
        : "/habits/edit";

    let data = { habit: habitName, id: habitID };

    axios.put(url, data).then((res) => {
      if (res.data) {
        let updatedHabits = habits.map((h) => Object.assign({}, h));
        for (let i = 0; i < updatedHabits.length; i++) {
          if (updatedHabits[i].id === habitID) {
            updatedHabits[i].habit = habitName;
          }
        }
        setHabits(updatedHabits);
      }
    });
  };

  let handleDeleteHabit = (habitID) => {
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/habits/delete"
        : "/habits/delete";

    let data = { id: habitID };

    axios.put(url, data).then((res) => {
      if (res.data) {
        let updatedHabits = habits.map((h) => Object.assign({}, h));
        for (let i = 0; i < updatedHabits.length; i++) {
          if (updatedHabits[i].id === habitID) {
            updatedHabits.splice(updatedHabits.indexOf(updatedHabits[i]), 1);
          }
        }
        setHabits(updatedHabits);
      }
    });
  };

  let handleMarkHabit = (action, id, date) => {
    console.log("handleMarkHabit");
    //need to clone the objects in the array, not just the array
    let updatedHabits = habits.map((h) => Object.assign({}, h));
    if (action === "marked") {
      for (let i = 0; i < updatedHabits.length; i++) {
        if (updatedHabits[i].id === id) {
          updatedHabits[i].dates.push(date);
          break;
        }
      }
    }
    if (action === "unmarked") {
      for (let i = 0; i < updatedHabits.length; i++) {
        if (updatedHabits[i].id === id) {
          updatedHabits[i].dates.splice(
            updatedHabits[i].dates.indexOf(date),
            1
          );
          break;
        }
      }
    }
    console.log("About to set Updated Habits");
    setHabits(updatedHabits);
  };

  let handleAddNote = (note) => {
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/notes/add"
        : "/notes/add";

    let data = {
      id: Date.now().toString(),
      date: format(new Date(Date.now()), "M/d/yyyy"),
      note: note,
    };

    axios.post(url, data).then((res) => {
      if (res.data) {
        setNotes(res.data);
      }
    });
  };

  let handleEditNote = (note, id) => {
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/notes/edit"
        : "/notes/edit";

    let data = {
      id: id,
      note: note,
    };

    axios.put(url, data).then((res) => {
      if (res.data) {
        setNotes(res.data);
      }
    });
  };

  let handleDeleteNote = (id) => {
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/notes/delete"
        : "/notes/delete";

    let data = {
      id: id,
    };

    axios.put(url, data).then((res) => {
      if (res.data) {
        setNotes(res.data);
      }
    });
  };

  let handleApprove = () => {
    props.handleApprove();
  };

  let handleDrop = (sourceIndex, destinationIndex) => {
    const updatedHabits = habits.map((h) => Object.assign({}, h));
    const habit = habits[sourceIndex];
    updatedHabits.splice(sourceIndex, 1);
    updatedHabits.splice(destinationIndex, 0, habit);
    setHabits(updatedHabits);
    //save to DB...
  };

  return (
    <div id="dashboard">
      {habits.length > 0 ? (
        <>
          <Table
            habits={habits}
            isPremium={props.isPremium}
            dateChange={handleDateChange}
            markHabit={handleMarkHabit}
            addHabit={handleAddHabit}
            editHabit={handleEditHabit}
            deleteHabit={handleDeleteHabit}
            handleApprove={handleApprove}
            handleDrop={handleDrop}
          />
          <Notes
            isPremium={props.isPremium}
            addNote={handleAddNote}
            editNote={handleEditNote}
            deleteNote={handleDeleteNote}
            notes={notes}
            activeDates={activeDates}
          />
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={handleSnackbarClose}
            TransitionComponent={transition}
            message="Habit added"
            action={
              <>
                <i
                  className="fa fa-times fa-1x"
                  onClick={handleSnackbarClose}
                ></i>
              </>
            }
          />
        </>
      ) : (
        <div id="noHabitMsg">
          <img src={empty} />
          <h1>Let's start by adding your first habit!</h1>
          <button id="openModalBtn" onClick={handleOpen}>
            Add Habit
          </button>
          <Modal
            open={modalOpen}
            addHabit={handleAddHabit}
            close={handleClose}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
