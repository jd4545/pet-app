import "./App.css";
import React from "react";
import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import DummyHome from "./Components/DummyHome";
import UserDetailsInput from "./Components/UserDetailsInput";
import { UserContext } from "./contexts/UserContext";
import WelcomePage from "./Components/WelcomePage";
// test search page
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Search from "./Components/Search";
// Geohash
import GeoHash from "./Components/GeoHash";

function App() {
  const [user, setUser] = useState(UserContext);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <ThemeProvider
            breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
          >
            <div className="App"></div>
          </ThemeProvider>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/form" element={<UserDetailsInput />} />
            <Route path="/home" element={<DummyHome />} />
            <Route path="/geo" element={<GeoHash />} />

            <Route path="/search" element={<Search />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
