import React, { useEffect } from "react";
import { useState } from "react";
import { auth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [user, setUser] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setRegisterEmail("");
      setRegisterPassword("");
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
        <Navigate to="/" />
      ) : (
        <div>
          <h1>Register</h1>
          <br />
          <input
            placeholder="email"
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
          <br />
          <button onClick={handleRegister}>Register</button>
          <p>{user?.email}</p>
        </div>
      )}
    </>
  );
}
