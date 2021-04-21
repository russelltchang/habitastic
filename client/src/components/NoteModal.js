import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const NoteModal = (props) => {
  let [ID, setID] = useState(null);
  let [note, setNote] = useState("");
  let [noteToEdit, setNoteToEdit] = useState("");
  let [errorMsg, setErrorMsg] = useState(false);

  useEffect(() => {
    setNote("");
    setErrorMsg(false);
  }, [props.open]);

  useEffect(() => {
    setErrorMsg(false);
    setNoteToEdit(props.noteToEdit);
  }, [props.edit]);

  useEffect(() => {
    setID(props.ID);
  }, [props.ID]);

  let submitNote = () => {
    if (note.length > 0) {
      props.addNote(note.trim());
    } else {
      setErrorMsg(true);
    }
  };

  let editNote = () => {
    if (noteToEdit.length > 0) {
      props.editNote(noteToEdit.trim(), ID);
    } else {
      setErrorMsg(true);
    }
  };

  let deleteNote = () => {
    props.deleteNote(ID);
  };

  return (
    <>
      <Dialog
        className="dialog"
        onClose={props.close}
        open={props.open}
        transitionDuration={0}
      >
        <div className="titleContainer">
          <h2>
            {props.edit
              ? "Edit Note"
              : props.delete
              ? "Delete Note"
              : "New Note"}
          </h2>
          <i className="fa fa-times fa-1x" onClick={props.close}></i>
        </div>

        <DialogContent dividers>
          {props.edit ? (
            <>
              {errorMsg ? <p className="errorMsg">Please enter a note</p> : ""}
              <textarea
                required
                rows="4"
                value={noteToEdit}
                className="noteInput"
                type="text"
                maxLength="200"
                onChange={(e) => setNoteToEdit(e.target.value)}
                autoFocus
                onFocus={function (e) {
                  var val = e.target.value;
                  e.target.value = "";
                  e.target.value = val;
                }}
              ></textarea>
              <button className="modalAddBtn" onClick={editNote}>
                Edit Note
              </button>
            </>
          ) : props.delete ? (
            <>
              <p>Are you sure you want to delete this note?</p>
              <button className="modalAddBtn" onClick={deleteNote}>
                Delete
              </button>
            </>
          ) : (
            <>
              {errorMsg ? <p className="errorMsg">Please enter a note</p> : ""}
              <textarea
                rows="4"
                required
                className="noteInput"
                type="text"
                maxLength="200"
                autoFocus
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add note here"
              ></textarea>
              <button className="modalAddBtn" onClick={submitNote}>
                Add Note
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NoteModal;
