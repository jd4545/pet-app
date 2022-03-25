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

function App() {
  const [user, setUser] = useState(UserContext);
  const [services, setServices] = useState(null);
  const [location, setLocation] = useState(null);

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
                <Route
                  path="/"
                  element={
                    <WelcomePage
                      services={services}
                      setServices={setServices}
                    />
                  }
                />
                <Route path="/signin" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/form" element={<UserDetailsInput />} />
                <Route
                  path="/home"
                  element={
                    <Home
                      services={services}
                      setServices={setServices}
                      location={location}
                      setLocation={setLocation}
                    />
                  }
                />
                <Route path="/logout" element={<Logout />} />
              </Routes>
            </BrowserRouter>
          </UserContext.Provider>
        </ServicesContext.Provider>
      </LocationContext.Provider>
    </>
  );
}

export default App;
