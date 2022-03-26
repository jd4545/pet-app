import React from "react";
import { useState, useContext } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Form, Button, Container } from "react-bootstrap";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate("/");
      //add functionality to redirect user to "/" when logged in
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(user);

  return (
    <>
      <Container className="align-items-center">
        <div className="text-center m-5 p-5">
          <h1>Sign In</h1>
          <Form onSubmit={handleLogin}>
            <Form.Control
              placeholder="email"
              className="my-4"
              value={loginEmail}
              onChange={(event) => setLoginEmail(event.target.value)}
            />
            <br />
            <Form.Control
              type="password"
              className="my-2"
              value={loginPassword}
              placeholder="password"
              onChange={(event) => setLoginPassword(event.target.value)}
            />
            <br />
            <Button
              style={{ color: "white" }}
              variant="light"
              className="p-2 px-4 m-3 btn-search align-items-center"
              type="submit"
            >
              Sign In
            </Button>
          </Form>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="link">
              Create an account
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
}
