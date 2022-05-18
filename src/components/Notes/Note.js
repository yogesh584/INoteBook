import React from "react";
import { Link } from "react-router-dom";

const Note = (props) => {
  return (
    <Link
      to={`/allnotes/note/${props.noteid}`}    // You Just send your to given note id page
      className="block p-4 w-[32%] bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">
        {props.title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {props.note}
      </p>
    </Link>
  );
};

export default Note;
