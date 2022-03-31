import React from "react";
import { useState, useContext } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

      navigate("/home");
      //add functionality to redirect user to "/" when logged in
    } catch (error) {
      console.log(error.message);
      setError(error);
    }
  };

  console.log(user);

  return (
    <>
      <Container className="align-items-center">
        <div className="text-center p-5">
          <h1>Sign In</h1>
          <Form onSubmit={handleLogin}>
            <Row className="justify-content-center ms-auto p-2">
              <Col lg="5">
                <Form.Control
                  placeholder="email"
                  className="my-1 mt-4 sign-form"
                  value={loginEmail}
                  onChange={(event) => setLoginEmail(event.target.value)}
                />
                <br />
                <Form.Control
                  type="password"
                  className="my-1 sign-form"
                  value={loginPassword}
                  placeholder="password"
                  onChange={(event) => setLoginPassword(event.target.value)}
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
                  Sign In
                </Button>
              </Col>
            </Row>
          </Form>
          <p className="py-3">
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
