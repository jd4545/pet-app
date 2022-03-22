import React from "react";
import { useState } from "react";

import { auth } from "../firebase-config";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  const login = async (e) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <>
      {user ? (
        <Navigate to="/register" />
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
  );
}
