import React from "react";
import { useState, useContext, useEffect } from "react";

import { auth } from "../firebase-config";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Form, Button, Container } from "react-bootstrap";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const login = async (e) => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      window.location.href = "/";
      //add functionality to redirect user to "/" when logged in
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(user);

  return (
    <>
      <Container className="align-items-center">
        <Form className="text-center my-5">
          <h1>Sign In</h1>
          <Form.Control
            placeholder="email"
            className="my-2"
            onChange={(event) => setLoginEmail(event.target.value)}
          />
          <br />
          <Form.Control
            placeholder="password"
            type="password"
            className="my-2"
            onChange={(event) => setLoginPassword(event.target.value)}
          />
          <br />
          <Button
            style={{ color: "white" }}
            variant="light"
            className="p-2 px-4 btn-search align-items-center"
            onClick={login}
          >
            Sign In
          </Button>
          <p>
            Don't have an account? <Link to="/register">Create an account</Link>
          </p>
        </Form>
      </Container>
    </>
  );
}
