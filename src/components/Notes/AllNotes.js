import React, { useContext, useEffect }  from 'react'
import Note from './Note';
import notesContext from '../../context/notes/NoteContext';
import { useNavigate } from "react-router-dom";

const AllNotes = () => {
  let navigate = useNavigate();
  
  const notesContextValue = useContext(notesContext);
  const {notes,readallnotes} = notesContextValue;
  
  useEffect(()=>{
    if(!localStorage.getItem("authToken")){
      navigate("/login");
    }
    readallnotes();
  },[]);

  return (
    <div className='flex items-center flex-col'>
        <h2 className="w-4/5 text-2xl mb-4 mt-2 text-gray-900 dark:text-white font-bold tracking-tight">
        All Notes
      </h2>
        <div className="w-4/5 flex flex-wrap gap-3 gap-y-4">
        {notes.length === 0?"No Notes Found. Please Create Some notes to see Here":""}
       {notes.map((note)=>{
         return (<Note title={note.title} note={note.desc.substr(0,150)} noteid = {note._id} key={note._id} />)
       })}
      </div>
    </div>
  )
}

export default AllNotes
