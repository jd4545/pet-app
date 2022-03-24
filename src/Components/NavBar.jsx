import paw from "../assets/paw.png";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";

export default function NavBar() {
  return (
    <Navbar bg="light" expand={false}>
      <Container fluid>
        <Navbar.Brand href="#">
          <Nav.Link href="/">
            <img
              src={paw}
              alt="paw image"
              width="50"
              height="50"
              className="d-inline-block align-top"
              to="/"
            />
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
              <Nav.Link href="/signin">Login</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/logout">Logout</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
