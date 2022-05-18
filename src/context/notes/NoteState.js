import { useState } from "react";
import NotesContext from "./NoteContext";

const NotesState = (props) => {
  const host = "http://localhost:4000/api/";
  const intialNotes = [];

  const [notes, setNotes] = useState(intialNotes);

  // NOTES CRUD
  // READING ALL NOTES - DONE
  const readallnotes = async () => {
    let responce = await fetch(`${host}notes/getallnotes`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
        Authorization:
          localStorage.getItem("authToken")
      },
    });
    const json = await responce.json();
    setNotes(json);
  };

  // READING A NOTE - DONE
  const readaNote = async (id) => {
    let responce = await fetch(`${host}notes/getanote/${id}`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
        Authorization:
          localStorage.getItem("authToken")
      },
    });
    const note = await responce.json();
    return note;
  };

  // ADDING A NOTE
  const addNote = async (title, description, tag) => {
    
    const response = await fetch(`${host}notes/addnote`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization:
          localStorage.getItem("authToken")
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // DELETING A NOTE
  const deleteNote = async (id) => {
    await fetch(`${host}notes/deletenote/${id}`, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        Authorization:
          localStorage.getItem("authToken")
      },
    });


    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // EDIT A NOTE
  const editNote = async (id, title, desc, tag) => {
    const updatenote = {
      title,
      desc,
      tag,
    };

    const response = await fetch(`${host}notes/updatenote/${id}`, {
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization:
          localStorage.getItem("authToken")
      },
      body: JSON.stringify(updatenote)
    });

    await response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.desc = desc;
        element.tag = tag;
        break;
      }
    }
  };

  return (
    <NotesContext.Provider
      value={{ notes, readallnotes, readaNote, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};

export default NotesState;