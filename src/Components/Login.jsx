import React from 'react'
import { useState, useContext, useEffect } from 'react'

import { auth } from '../firebase-config'
import {
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'
import { Navigate } from 'react-router-dom'
import Logout from './Logout'
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

      console.log(luser)
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
      {user ? (
        <Navigate to="/" />
      ) : (
        <div>
          <h1>Sign In</h1>
          <input
            placeholder="email"
            onChange={(event) => setLoginEmail(event.target.value)}
          />
          <br />
          <input
            placeholder="password"
            onChange={(event) => setLoginPassword(event.target.value)}
          />
          <br />
          <button onClick={login}>Sign In</button>
        </div>
      )}
    </>
  )
}
