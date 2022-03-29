import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";
import UserDetailsInput from "./Components/UserDetailsInput";
import { UserContext } from "./contexts/UserContext";
import WelcomePage from "./Components/WelcomePage";
import NavBar from "./Components/NavBar";
import Logout from "./Components/Logout";
import Profile from "./Components/Profile";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import EditProfile from "./Components/EditProfile";
import Reviews from "./Components/Reviews";

function App() {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState(null);
  const [location, setLocation] = useState(null);
  const [users, setUsers] = useState([]);
  const [postcode, setPostcode] = useState(null);
  const [neighbourhood, setNeighbourhood] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  return (
    <>
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
                <WelcomePage
                  services={services}
                  setServices={setServices}
                  location={location}
                  setLocation={setLocation}
                  postcode={postcode}
                  setPostcode={setPostcode}
                  neighbourhood={neighbourhood}
                  setNeighbourhood={setNeighbourhood}
                />
              }
            />
            <Route path="/signin" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/form" element={<UserDetailsInput />} />
            <Route
              path="/me"
              element={<EditProfile users={users} setUsers={setUsers} />}
            />
            <Route
              path="/home"
              element={
                <Home
                  services={services}
                  setServices={setServices}
                  location={location}
                  setLocation={setLocation}
                  users={users}
                  setUsers={setUsers}
                  postcode={postcode}
                  setPostcode={setPostcode}
                  neighbourhood={neighbourhood}
                  setNeighbourhood={setNeighbourhood}
                />
              }
            />
            <Route
              path="/profile/:sitter_id"
              element={<Profile users={users} setUsers={setUsers} />}
            />
            <Route
              path="/profile/:sitter_id/reviews"
              element={<Reviews users={users} setUsers={setUsers} />}
            />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
