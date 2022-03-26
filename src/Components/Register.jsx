import React from "react";
import { useState, useContext } from "react";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
          <div className="text-center m-5 p-5">
            <h1>Register</h1>
            <Form onSubmit={handleRegister}>
              <Form.Control
                placeholder="email"
                className="my-4"
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
                className="p-2 px-4 m-3 btn-search align-items-center"
                type="submit"
              >
                Register
              </Button>
            </Form>
            <p>
              Have an account?{" "}
              <Link to="/signin" className="link">
                Sign in
              </Link>
            </p>
          </div>
        )}
      </Container>
    </>
  );
}
