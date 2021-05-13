import React, { useState, useEffect } from "react";
import Table from "./Table";
import Notes from "./Notes";
import Modal from "./Modal";
import axios from "axios";
import { io } from "socket.io-client";

let socketURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "/";

const socket = io(socketURL);
socket.on("connect", () => {
  console.log("Connected");
});

const Dashboard = (props) => {
  let storageNotes = JSON.parse(localStorage.getItem("notes"));
  let storageHabits = JSON.parse(localStorage.getItem("habits"));
  let [habits, setHabits] = useState(storageHabits || []);
  let [notes, setNotes] = useState(storageNotes || []);
  let [modalOpen, setModalOpen] = useState(false);
  let [activeDates, setActiveDates] = useState([]);

  socket.on("hello", (arg) => {
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

  let handleDateChange = (dates) => {
    let formattedDates = [];
    for (let i = 0; i < dates.length; i++) {
      formattedDates.push(dates[i].toLocaleString().split(",")[0]);
    }
    setActiveDates(formattedDates);
  };

  let handleOpen = () => {
    setModalOpen(true);
  };

  let handleClose = () => {
    setModalOpen(false);
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
    //need to clone the objects in the array, not just the array
    let updatedHabits = habits.map((h) => Object.assign({}, h));
    if (action === "marked") {
      for (let i = 0; i < updatedHabits.length; i++) {
        if (updatedHabits[i].id === id) {
          updatedHabits[i].dates.push(date);
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
        }
      }
    }
    setHabits(updatedHabits);
  };

  let handleAddNote = (note) => {
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/notes/add"
        : "/notes/add";

    let data = {
      id: Date.now().toString(),
      date: new Date(Date.now()).toLocaleString().split(",")[0],
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

  return (
    <>
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
          />
          <Notes
            isPremium={props.isPremium}
            addNote={handleAddNote}
            editNote={handleEditNote}
            deleteNote={handleDeleteNote}
            notes={notes}
            activeDates={activeDates}
          />
        </>
      ) : (
        <div id="noHabitMsg">
          <h1>Oops! Looks like you aren't tracking any habits yet.</h1>
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
    </>
  );
};

export default Dashboard;
