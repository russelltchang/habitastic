import NoteModal from "./NoteModal";
import React, { useState, useEffect } from "react";
import LimitModal from "./LimitModal";
import empty from "/client/public/empty.svg";

const Notes = (props) => {
  let [ID, setID] = useState(null);
  let [noteToEdit, setNoteToEdit] = useState("");
  let [subNotes, setSubNotes] = useState(false);
  let [limitModal, setLimitModal] = useState(false);
  let [noteModal, setNoteModal] = useState(false);
  let [editNote, setEditNote] = useState(false);
  let [deleteNote, setDeleteNote] = useState(false);
  let [activeNotesExist, setActiveNotesExist] = useState(false);

  useEffect(() => {
    let activeNotes = props.notes.filter((note) =>
      props.activeDates.includes(note.date)
    );
    activeNotes.length > 0
      ? setActiveNotesExist(true)
      : setActiveNotesExist(false);
  }, [props.activeDates, props.notes]);

  let openNewNote = () => {
    let today = new Date(Date.now()).toLocaleString().split(",")[0];
    if (props.isPremium) {
      setNoteModal(true);
      return;
    }

    for (let i = 0; i < props.notes.length; i++) {
      if (props.notes[i].date === today) {
        setLimitModal(true);
        setSubNotes(true);
        return;
      }
    }
    setNoteModal(true);
  };

  let closeLimitModal = () => {
    setSubNotes(false);
    setLimitModal(false);
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
        <span className="title">Notes</span>
        <button onClick={openNewNote}>
          <i className="fa fa-plus"></i>
        </button>
      </div>
      <div id="notesContainer">
        {activeNotesExist ? (
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
          <div id="noNotesContainer">
            <div id="noNotesMsg">
              <div>
                <img src={empty} />
              </div>
              <div>
                <p>It's empty here...</p>
              </div>
              <div>
                <button id="openModalBtn" onClick={openNewNote}>
                  Add Note
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
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
      <LimitModal
        open={limitModal}
        fromNotes={subNotes}
        close={closeLimitModal}
      />
    </div>
  );
};

export default Notes;
