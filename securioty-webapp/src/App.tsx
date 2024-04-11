import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Lab from "./pages/Lab";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  function setLoggedInState(loggedIn: boolean) {
    setLoggedIn(loggedIn);
  }

  return (
    <div className="background-color-dark bg-dark">
      <NavBar loggedIn={loggedIn}
                onLoginChange={setLoggedInState}></NavBar>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
