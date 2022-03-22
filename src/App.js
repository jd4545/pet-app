import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import DummyHome from "./Components/DummyHome";

function App() {
  return (
    <>
      {/* <UserContext.Provider value={{ user, setUser }}> */}
      <BrowserRouter>
        <div className="App"></div>
        <Routes>
          <Route path="/" element={<DummyHome />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      {/* </UserContext.Provider> */}
    </>
  );
}

export default App;
