import React, { useState, useEffect } from "react";
import Table from "./Table";
import Notes from "./Notes";
import Modal from "./Modal";
import axios from "axios";

const Dashboard = (props) => {
  let storageNotes = JSON.parse(localStorage.getItem("notes"));
  let storageHabits = JSON.parse(localStorage.getItem("habits"));
  let [habits, setHabits] = useState(storageHabits || []);
  let [notes, setNotes] = useState(storageNotes || []);
  let [modalOpen, setModalOpen] = useState(false);
  let [activeDates, setActiveDates] = useState([]);

  useEffect(() => {
    if (localStorage.habits) {
      return;
    }

    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/habits"
        : "/habits";

    axios.get(url).then((res) => {
      if (res.data) {
        setHabits(res.data.habits);
      }
    });
  }, []);

  useEffect(() => {
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/notes"
        : "/notes";

    axios.get(url).then((res) => {
      if (res.data) {
        setNotes(res.data);
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

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
        ? "http://localhost:3000/add"
        : "/add";

    let data = { habit: newHabit, id: Date.now().toString(), dates: [] };

    axios.post(url, data).then((res) => {
      if (res.data) {
        setHabits(res.data);
        setModalOpen(false);
      }
    });
  };

  let handleEditHabit = (habitName, habitID) => {
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/edit"
        : "/edit";

    let data = { habit: habitName, id: habitID };

    axios.put(url, data).then((res) => {
      if (res.data) {
        setHabits(res.data);
      }
    });
  };

  let handleDeleteHabit = (habitID) => {
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/delete"
        : "/delete";

    let data = { id: habitID };

    axios.put(url, data).then((res) => {
      if (res.data) {
        setHabits(res.data);
      }
    });
  };

  let handleMarkHabit = (habits) => {
    setHabits(habits);
  };

  let handleAddNote = (note) => {
    let url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/addnote"
        : "/addnote";

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
        ? "http://localhost:3000/editnote"
        : "/editnote";

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
        ? "http://localhost:3000/deletenote"
        : "/deletenote";

    let data = {
      id: id,
    };

    axios.put(url, data).then((res) => {
      if (res.data) {
        setNotes(res.data);
      }
    });
  };

  return (
    <>
      {habits.length > 0 ? (
        <>
          <Table
            habits={habits}
            dateChange={handleDateChange}
            markHabit={handleMarkHabit}
            addHabit={handleAddHabit}
            editHabit={handleEditHabit}
            deleteHabit={handleDeleteHabit}
          />
          <Notes
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
