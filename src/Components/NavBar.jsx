import paw from "../assets/paw.png";
import {
  Navbar,
  Container,
  Nav,
  Offcanvas,
  Button,
  Image,
} from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Logout from "./Logout";
import logo from "../assets/tap-logo.png";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  return (
    <Navbar expand={false}>
      <Container>
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
        <Image src={logo} height="35" className="" />
        {/* <Button href="/signin" className="ms-auto mx-3 btn-sign">
          Add a listing
        </Button> */}
        <Navbar.Toggle aria-controls="offcanvasNavbar" id="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              hi, {user?.email}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {user ? (
                <>
                  <Nav.Link className="p-3 link" href="/">
                    search
                  </Nav.Link>
                  <Nav.Link className="p-3 link" href="/me">
                    my profile
                  </Nav.Link>
                  <Nav.Link className="p-3 link" href="/messages">
                    messages
                  </Nav.Link>
                  <Nav.Link className="p-3 link" href="/favourites">
                    favourites
                  </Nav.Link>
                </>
              ) : (
                <>
                  <h5 className="text-center">
                    you are not currently signed in
                  </h5>
                </>
              )}
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
