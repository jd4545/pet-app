import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { auth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Navigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Form, Button, Container } from "react-bootstrap";

export default function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setRegisterEmail("");
      setRegisterPassword("");
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(user);

  return (
    <>
      <Container className="align-items-center">
        {user ? (
          <Navigate to="/" />
        ) : (
          <div className="text-center my-5">
            <h1>Register</h1>
            <Form.Control
              placeholder="email"
              className="my-2"
              value={registerEmail}
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
            />
            <br />
            <Form.Control
              type="password"
              className="my-2"
              value={registerPassword}
              placeholder="password"
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
            />
            <br />
            <Button
              style={{ color: "white" }}
              variant="light"
              className="p-2 px-4 btn-search align-items-center"
              onClick={handleRegister}
            >
              Register
            </Button>
            <p>
              Have an account? <Link to="/signin">Sign in</Link>
            </p>
          </div>
        )}
      </Container>
    </>
  );
}
