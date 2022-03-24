import "./App.css";
import React from "react";
import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";
import UserDetailsInput from "./Components/UserDetailsInput";
import { UserContext } from "./contexts/UserContext";
import { LocationContext } from "./contexts/LocationContext";
import { ServicesContext } from "./contexts/ServicesContext";
import WelcomePage from "./Components/WelcomePage";
import NavBar from "./Components/NavBar";
import Logout from "./Components/Logout";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import Search from "./Components/Search";

function App() {
  const [user, setUser] = useState(UserContext);
  const [services, setServices] = useState(ServicesContext);
  const [location, setLocation] = useState(LocationContext);

  return (
    <>
      <LocationContext.Provider value={{ location, setLocation }}>
        <ServicesContext.Provider value={{ services, setServices }}>
          <UserContext.Provider value={{ user, setUser }}>
            <NavBar />
            <BrowserRouter>
              <ThemeProvider
                breakpoints={[
                  "xxxl",
                  "xxl",
                  "xl",
                  "lg",
                  "md",
                  "sm",
                  "xs",
                  "xxs",
                ]}
              >
                <div className="App"></div>
              </ThemeProvider>

              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/form" element={<UserDetailsInput />} />
                <Route path="/home" element={<Home />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </BrowserRouter>
          </UserContext.Provider>
        </ServicesContext.Provider>
      </LocationContext.Provider>
    </>
  );
}

export default App;
