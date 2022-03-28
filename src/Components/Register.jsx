import React from "react";
import { useState, useContext } from "react";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Form, Button, Container } from "react-bootstrap";

export default function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      navigate("/form");
    } catch (error) {
      console.log(error.message);
      setError(error);
    }
  };

  console.log(user);

  return (
    <>
      <Container className="align-items-center">
        {user ? (
          navigate("/")
        ) : (
          <div className="text-center m-5 p-5">
            <h1>Register</h1>
            <Form onSubmit={handleRegister} className="sign-group">
              <Form.Control
                placeholder="email"
                className="my-1 mt-4"
                value={registerEmail}
                onChange={(event) => {
                  setRegisterEmail(event.target.value);
                }}
              />
              <br />
              <Form.Control
                type="password"
                className="my-1"
                value={registerPassword}
                placeholder="password"
                onChange={(event) => {
                  setRegisterPassword(event.target.value);
                }}
              />
              {error ? (
                <p className="text-center p-1">
                  Please check your email/password and try again
                </p>
              ) : (
                ""
              )}
              <Button
                style={{ color: "white" }}
                variant="light"
                className="p-2 px-4 mt-3 btn-search align-items-center"
                type="submit"
              >
                Register
              </Button>
            </Form>
            <p className="py-3">
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
