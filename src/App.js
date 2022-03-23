import './App.css'
import React from 'react'
import { useState, useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import Home from './Components/Home'
import UserDetailsInput from './Components/UserDetailsInput'
import { UserContext } from './contexts/UserContext'
import WelcomePage from './Components/WelcomePage'
import { ServicesContext } from './contexts/ServicesContext'
import { LocationContext } from './contexts/LocationContext'

function App() {
  const [user, setUser] = useState(UserContext)
  const [services, setServices] = useState(ServicesContext)
  const [location, setLocation] = useState(LocationContext)

  return (
    <>
      <LocationContext.Provider value={{ location, setLocation }}>
        <ServicesContext.Provider value={{ services, setServices }}>
          <UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
              <div className="App"></div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/form" element={<UserDetailsInput />} />
              </Routes>
            </BrowserRouter>
          </UserContext.Provider>
        </ServicesContext.Provider>
      </LocationContext.Provider>
    </>
  )
}

export default App
