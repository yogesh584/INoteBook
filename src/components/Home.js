import React, { useContext, useState, useEffect } from "react";
import Note from "./Notes/Note";
import notesContext from "../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  let navigate = useNavigate();
  const notesContextValue = useContext(notesContext);
  const { notes, addNote, readallnotes } = notesContextValue;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const addaNewNote = async () => {
    if (note.title === "") {
      props.ShowAlert("Please Enter a Vaild title", "Error", "red-500");
      return;
    }
    if (note.description === "") {
      props.ShowAlert("Please Enter a Vaild Note", "Error", "red-500");
      return;
    }
    if (note.tag === "") {
      props.ShowAlert("Please Enter a Vaild Tag", "Error", "red-500");
      return;
    }

    await addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.ShowAlert("Note Added Successfully", "success", "green-500");
  };

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
    readallnotes();
  });

  return (
    <div className="block p-6 bg-white w-4/5 mx-auto">
      <h2 className="text-2xl mb-4 text-gray-900 dark:text-white font-bold tracking-tight">
        Add a Note
      </h2>
      <form>
        <div className="mb-3">
          <input
            type="text"
            className="block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Enter Title of the Note ... (minimum 5 Character)"
            name="title"
            value={note.title}
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            rows="10"
            placeholder="Please Enter Your Note ... (minimum 10 Character)"
            name="description"
            value={note.description}
            required
            onChange={onChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Enter Tag of the Note ... (minimum 3 Character)"
            name="tag"
            value={note.tag}
            required
            onChange={onChange}
          />
        </div>

        <button
          type="button"
          className=" px-6 py-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={addaNewNote}
          disabled={note.title.length < 5 || note.description.length < 10}
        >
          Add New Note
        </button>
      </form>

      {/* 10 Recent Notes */}
      <h2 className="text-2xl mb-4 mt-9 text-gray-900 dark:text-white font-bold tracking-tight">
        Recent Notes
      </h2>
      <div className="flex flex-wrap gap-3 gap-y-4">
        {notes.length === 0
          ? "No Notes Found. Please Create Some notes to see Here"
          : ""}
        {notes.map((note) => {
          return (
            <Note
              title={note.title}
              note={note.desc.substr(0, 150)}
              noteid={note._id}
              key={note._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
