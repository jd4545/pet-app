import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { auth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

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
        <div className="text-center my-5">
          <h1>Register</h1>
          <input
            placeholder="email"
            className="my-2"
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
          <br />
          <input
            type="password"
            className="my-2"
            placeholder="password"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
          <br />
          <button className="btn btn-primary my-3" onClick={handleRegister}>
            Register
          </button>
          <p>
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </div>
      )}
    </>
  );
}
