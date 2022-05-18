import React,{useState,useEffect,useContext} from "react";
import notesContext from '../../context/notes/NoteContext';
import { useParams } from "react-router-dom";


const EditNoteModel = (props) => {
  const { noteid } = useParams();
  const {readaNote,editNote} = useContext(notesContext);
  const [title,setTitle] = useState('');
  const [desc,setDesc] = useState('');
  const [tag,setTag] = useState('');


    useEffect(()=>{
      (async ()=>{
        const servernote = await readaNote(noteid);
        setTitle(servernote.title);
        setDesc(servernote.desc);
        setTag(servernote.tag);
      })();
    },[])

    const updateNote = async ()=>{
      await editNote(noteid,title,desc,tag);
      props.AddNoteToDom();
      hideModel()
      props.ShowAlert("Note Edited Successfully","success","green-500");
    }

    const hideModel = ()=>{
        const EditNote = document.querySelector("#EditNote");
        EditNote.classList.toggle("hidden");
        EditNote.classList.toggle("opacity-0");
    }

    const onChangetitle = (e)=>{
      setTitle(e.target.value);
    }
    const onChangenote = (e)=>{
      setDesc(e.target.value);
    }
    const onChangetag = (e)=>{
      setTag(e.target.value);
    }

  return (
    <div>
      <div
        id="EditNote"
        tabIndex="-1"
        className="transition-all hidden opacity-0 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full bg-[#00000066]"
      >
        <div className="relative p-4 w-full max-w-7xl h-full md:h-auto mx-auto">
          
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            
            <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Edit Note
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="extralarge-modal"
                onClick={hideModel}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              <form action="">
                <div className="mb-3">
                  <input
                    type="text"
                    className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Enter Title of the Note ..." required value={title} onChange={onChangetitle}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    rows="10"
                    placeholder="Please Enter Your Note ..." required value={desc} onChange={onChangenote}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Enter Tag of the Note ..." required value={tag} onChange={onChangetag}
                  />
                </div>

                <button
                  data-modal-toggle="extralarge-modal"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  disabled = {title.length < 5 || desc.length < 10}
                  onClick={updateNote}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModel;
