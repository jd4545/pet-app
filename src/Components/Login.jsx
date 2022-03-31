import React from "react";
import { useState, useContext } from "react";
import { auth } from "../firebase-config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Form, Button, Container, Image, Row, Col } from "react-bootstrap";
import google from "../assets/google.png";

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

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
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
                <h4 className="mt-3">or sign in with</h4>
                <Button
                  style={{ color: "white" }}
                  variant=""
                  className="p-2 px-4 mt-3 align-items-center"
                  onClick={signInWithGoogle}
                >
                  <Image src={google} width="50" height="50" />
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
