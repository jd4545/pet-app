import "./App.css";
import React from "react";
import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import DummyHome from "./Components/DummyHome";
import { UserContext } from "./contexts/UserContext";
import WelcomePage from "./Components/WelcomePage";

function App() {
  const [user, setUser] = useState(UserContext);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <div className="App"></div>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<DummyHome />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
