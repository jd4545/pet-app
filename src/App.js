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
import ErrorPage from "./Components/ErrorPage";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import Inbox from "./Components/Inbox";
import EditProfile from "./Components/EditProfile";
import Reviews from "./Components/Reviews";

function App() {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState("Dog Sitting");
  const [location, setLocation] = useState([53.4721, -2.2382]);
  const [users, setUsers] = useState([]);
  const [postcode, setPostcode] = useState("");
  const [neighbourhood, setNeighbourhood] = useState(null);
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([]);
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

            <Route
              path="/messages"
              element={
                <Inbox
                  chat={chat}
                  setChat={setChat}
                  messages={messages}
                  setMessages={setMessages}
                />
              }
            />
            <Route path="/signin" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/form"
              element={
                <UserDetailsInput
                  postcode={postcode}
                  setPostcode={setPostcode}
                />
              }
            />
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
              element={
                <Profile
                  users={users}
                  setUsers={setUsers}
                  chat={chat}
                  setChat={setChat}
                  messages={messages}
                  setMessages={setMessages}
                />
              }
            />
            <Route
              path="/profile/:sitter_id/reviews"
              element={<Reviews users={users} setUsers={setUsers} />}
            />
            <Route path="/logout" element={<Logout />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
