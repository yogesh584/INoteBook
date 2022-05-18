import React,{useState} from "react";
// COMPONENTS IMPORTS
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";
import AllNotes from "./components//Notes/AllNotes";
import NotePage from "./components//Notes/NotePage";
import Contact from "./components/Contact";
import NotesState from "./context/notes/NoteState";
import Alert from "./components/Alert";

// AUTH IMPORTS
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  const [alert, setAlert] = useState({
    msg: "",
    type: "",
    color: "green-500",
  });

  function ShowAlert(givenmsg, giventype, givenColor) {
    setAlert({
      msg: givenmsg,
      type: giventype,
      color: givenColor,
    });
    showNotification();
    setTimeout(() => {
      hideAlert();
    }, 8000);
  }

  function showNotification() {
    let Alert = document.querySelector("#Alert");
    Alert.classList.remove("animate-hidealert");
    Alert.classList.add("animate-showalert");
  }

  function hideAlert() {
    let Alert = document.querySelector("#Alert");
    Alert.classList.remove("animate-showalert");
    Alert.classList.add("animate-hidealert");
  }

  return (
    <>
      <NotesState>
        <Router>
          <Header />
          <Alert alert={alert} hideAlert = {hideAlert}/>
          <Routes>
            <Route exact path="/" element={<Home ShowAlert = {ShowAlert}/>}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/allnotes" element={<AllNotes />}></Route>
            <Route exact path="/allnotes/note/:noteid" element={<NotePage ShowAlert={ShowAlert}/>}></Route>
            <Route exact path="/contact" element={<Contact />}></Route>
            <Route exact path="/signup" element={<Signup ShowAlert={ShowAlert}/>}></Route>
            <Route exact path="/login" element={<Login ShowAlert={ShowAlert}/>}></Route>
          </Routes>
        </Router>
      </NotesState>
    </>
  );
}

export default App;
