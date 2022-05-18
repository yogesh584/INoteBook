import React, { useContext, useEffect, useState } from "react";
import editImage from "../../images/edit.svg";
import deleteImage from "../../images/delete.svg";
import EditNoteModel from "./EditNoteModel";
import DeleteNoteModel from "./DeleteNoteModel";
import notesContext from '../../context/notes/NoteContext';
import { useParams } from "react-router-dom";
import { Processor } from "postcss";

const NotePage = (props) => {
  const { noteid } = useParams();
  const {readaNote} = useContext(notesContext);
  const [note,setNote] = useState({title:"",description: "",tag: "",date: ""})
  
  const editNoteModal = ()=>{
    const EditNote = document.querySelector("#EditNote");
    EditNote.classList.toggle("hidden");
    EditNote.classList.toggle("opacity-0");
  }
  const deleteNoteModal = ()=>{
    const deleteNote = document.querySelector("#deleteNote");
    deleteNote.classList.toggle("hidden");
  }
  const AddNoteToDom = async ()=>{
    const servernote = await readaNote(noteid);
    setNote(servernote);
  }
  useEffect(()=>{
    AddNoteToDom()
  },[])

  return (
    <>
    <EditNoteModel AddNoteToDom={AddNoteToDom} ShowAlert = {props.ShowAlert} />
    <DeleteNoteModel ShowAlert = {props.ShowAlert}/>
    <div className="w-3/5 mx-auto">
      <div className="border-b-[1px] border-black pb-4 mb-4 ">
        <h2 className="text-3xl font-bold text-gray-700">
          {note.title}
        </h2>
        <div className="flex justify-between">
          <h5 className="flex gap-4">
            <span>{note.tag}</span>
            <span>{note.date}</span>
          </h5>
          <div className="flex gap-4">
            <button
              title="Edit"
              className="block h-[30px] w-[30px] p-2 border-[1px] rounded-md transition hover:shadow-md"
              onClick={editNoteModal}
            >
              <img src={editImage} alt="Edit" />
            </button>
            <button
              title="Delete"
              className="block h-[30px] w-[30px] p-2 border-[1px] rounded-md transition hover:shadow-md"
              onClick={deleteNoteModal}
            >
              <img src={deleteImage} alt="Delete" />
            </button>
          </div>
        </div>
      </div>
      <p className="text-xl text-gray-700">
        {note.desc}
      </p>
    </div>
    </>
  );
};

export default NotePage;
