import "./App.css";
import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";
import UserDetailsInput from "./Components/UserDetailsInput";
import { UserContext } from "./contexts/UserContext";
import { LocationContext } from "./contexts/LocationContext";
import WelcomePage from "./Components/WelcomePage";
import NavBar from "./Components/NavBar";
import Logout from "./Components/Logout";
import Profile from "./Components/Profile";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState(null);
  const [location, setLocation] = useState(LocationContext);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser, "currentuser");
      setUser(currentUser);
    });
  });

  console.log(user);

  return (
    <>
      <LocationContext.Provider value={{ location, setLocation }}>
        <UserContext.Provider value={{ user }}>
          <NavBar />
          <BrowserRouter>
            <ThemeProvider
              breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
            >
              <div className="App"></div>
            </ThemeProvider>

            <Routes>
              <Route
                path="/"
                element={
                  <WelcomePage services={services} setServices={setServices} />
                }
              />
              <Route path="/signin" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/form" element={<UserDetailsInput />} />
              <Route
                path="/home"
                element={<Home services={services} setServices={setServices} />}
              />
              <Route path="/profile" element={<Profile />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </LocationContext.Provider>
    </>
  );
}

export default App;
