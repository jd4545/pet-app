import paw from "../assets/paw.png";
import { Navbar, Container, Nav, Offcanvas, Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Logout from "./Logout";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  return (
    <Navbar expand={false}>
      <Container fluid>
        <Navbar.Brand>
          <Nav.Link href="/">
            <img
              src={paw}
              alt="paw image"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />
          </Nav.Link>
        </Navbar.Brand>
        <Button href="/signin" className="ms-auto mx-3 btn-sign">
          Add a listing
        </Button>
        <Navbar.Toggle aria-controls="offcanvasNavbar" id="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              {user?.email}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link className="p-3" href="/home">
                Home
              </Nav.Link>
              <Nav.Link className="p-3" href="/register">
                Register
              </Nav.Link>
              <Nav.Link className="p-3" href="/signin">
                Login
              </Nav.Link>
              <Nav.Link className="p-3" href="/profile">
                Profile
              </Nav.Link>
              <Nav.Link className="p-3" href="/logout">
                Logout
              </Nav.Link>
              {!user ? (
                <Button href="/signin" className="btn-sign m-3">
                  Sign in/Sign up
                </Button>
              ) : (
                <Logout />
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
