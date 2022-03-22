import { auth } from '../firebase-config'
import { useEffect, useState } from 'react'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import React from 'react'

export default function Logout() {
  const [user, setUser] = useState({})

  const handleLogout = async () => {
    await signOut(auth)
    console.log(user)
  }

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  return <button onClick={handleLogout}>Sign Out</button>
}
