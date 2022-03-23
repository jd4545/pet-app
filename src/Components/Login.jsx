import React from 'react'
import { useState, useContext, useEffect } from 'react'

import { auth } from '../firebase-config'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { Navigate, Link } from 'react-router-dom'
import Register from './Register'
import { UserContext } from '../contexts/UserContext'

export default function Login() {
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const { user, setUser } = useContext(UserContext)

  const login = async (e) => {
    try {
      const luser = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword,
      )
      window.location.href = '/'
      //add functionality to redirect user to "/" when logged in

      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  // const handleLogout = async () => {
  //   await signOut(auth)
  //   console.log(user)
  // }

  return (
    <>
      <div className="text-center my-5">
        <h1>Sign In</h1>
        <input
          placeholder="email"
          className="my-2"
          onChange={(event) => setLoginEmail(event.target.value)}
        />
        <br />
        <input
          placeholder="password"
          type="password"
          className="my-2"
          onChange={(event) => setLoginPassword(event.target.value)}
        />
        <br />
        <button className="btn btn-primary my-3" onClick={login}>
          Sign In
        </button>
        <p>
          Don't have an account? <Link to="/register">Create an account</Link>
        </p>
      </div>
      )
    </>
  )
}
