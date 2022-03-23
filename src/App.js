import "./App.css";
import React from "react";
import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import DummyHome from "./Components/DummyHome";
import UserDetailsInput from "./Components/UserDetailsInput";
import { UserContext } from "./contexts/UserContext";

function App() {
  const [user, setUser] = useState(UserContext);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <div className="App"></div>
          <Routes>
            <Route path="/" element={<DummyHome />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/form" element={<UserDetailsInput />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
