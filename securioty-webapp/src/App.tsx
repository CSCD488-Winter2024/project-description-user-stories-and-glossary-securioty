import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Lab from "./pages/Lab";
import Profile from "./pages/Profile";
import "./App.css";
import InstructorPage from "./pages/Instructor";
import LabCreator from "./pages/LabCreator";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    const localValue = localStorage.getItem("LOGGEDIN");
    if (localValue == null) {
      return false;
    } else {
      return JSON.parse(localValue);
    }
  });

  useEffect(() => {
    localStorage.setItem("LOGGEDIN", JSON.stringify(loggedIn));
  }, [loggedIn]);

  function setLoggedInState(loggedIn: boolean) {
    setLoggedIn(loggedIn);
  }

  return (
    <div className="background-color-dark bg-dark">
      <NavBar loggedIn={loggedIn} onLoginChange={setLoggedInState}></NavBar>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home loggedIn={loggedIn} />} />
          <Route path="/home" element={<Home loggedIn={loggedIn} />} />
          <Route path="/takinglab" element={<Lab />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/instructor" element={<InstructorPage />} />
          <Route path="/creatinglab" element={<LabCreator />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
