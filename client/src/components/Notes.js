import axios from "axios";
import NoteModal from "./NoteModal";
import React, { useState, useEffect } from "react";

const Notes = (props) => {
  let [ID, setID] = useState(null);
  let [noteToEdit, setNoteToEdit] = useState("");
  let [noteModal, setNoteModal] = useState(false);
  let [editNote, setEditNote] = useState(false);
  let [deleteNote, setDeleteNote] = useState(false);
  let [activeNotesExist, setActiveNotesExist] = useState(false);

  // useEffect(() => {
  //   let activeNotes = props.notes.filter((note) =>
  //     props.activesDates.includes(note.date)
  //   );
  //   setActiveNotes(activeNotes);
  // }, [props.activeDates]);

  let openNewNote = () => {
    setNoteModal(true);
  };

  let handleAddNote = (note) => {
    props.addNote(note);
    handleClose();
  };

  let openEditNote = (note, id) => {
    setNoteToEdit(note);
    setID(id);
    setEditNote(true);
    setNoteModal(true);
  };

  let handleEditNote = (note, id) => {
    props.editNote(note, id);
    handleClose();
  };

  let openDeleteNote = (id) => {
    setID(id);
    setDeleteNote(true);
    setNoteModal(true);
  };

  let handleDeleteNote = (id) => {
    props.deleteNote(id);
    handleClose();
  };

  let handleClose = () => {
    setEditNote(false);
    setDeleteNote(false);
    setNoteModal(false);
  };

  return (
    <div id="notes">
      <div id="buttonContainer">
        <span>Notes</span>
        <button onClick={openNewNote}>
          <i className="fa fa-plus"></i>
          <span> New Note</span>
        </button>
      </div>

      {props.notes.length > 0 ? (
        props.notes
          .sort((a, b) => b.id - a.id)
          .map((noteObj, i) =>
            props.activeDates.includes(noteObj.date) ? (
              <div key={i} className="noteContainer">
                <div className="noteControls">
                  <i
                    className="fa fa-pencil"
                    onClick={() => openEditNote(noteObj.note, noteObj.id)}
                  ></i>
                  <i
                    className="fa fa-trash-o"
                    onClick={() => openDeleteNote(noteObj.id)}
                  ></i>
                </div>
                <div className="noteDate">{noteObj.date}</div>
                <div className="noteContent">{noteObj.note}</div>
              </div>
            ) : (
              ""
            )
          )
      ) : (
        <div id="noNotesMsg">
          <h3>No Notes</h3>
        </div>
      )}
      <NoteModal
        open={noteModal}
        edit={editNote}
        delete={deleteNote}
        ID={ID}
        noteToEdit={noteToEdit}
        close={handleClose}
        addNote={handleAddNote}
        editNote={handleEditNote}
        deleteNote={handleDeleteNote}
      />
    </div>
  );
};

export default Notes;
