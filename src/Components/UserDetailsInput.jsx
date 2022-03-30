import { useState, useEffect, useContext } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import fetchLocation from "../api";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { auth } from "../firebase-config";
import { UserContext } from "../contexts/UserContext";

export default function UserDetailsInput({ postcode, setPostcode }) {
  const { user, setUser } = useContext(UserContext);
  const [newName, setNewName] = useState("");
  const [newPet, setNewPet] = useState("");

  // const [location, setLocation] = useState([null, null]);
  const [users, setUsers] = useState([]);
  const [isSitter, setIsSitter] = useState(false);
  const [bio, setBio] = useState("");

  // const [services, setServices] = useState({dogsitting:false, catsitting:false })
  const [isDogSitter, setIsDogSitter] = useState(false);
  const [isCatSitter, setIsCatSitter] = useState(false);
  const [price, setPrice] = useState(0);
  const usersCollectionRef = collection(db, "users");
  const navigate = useNavigate();

  const createUser = async (e) => {
    e.preventDefault();
    const locationInfo = await fetchLocation(postcode);
    await addDoc(usersCollectionRef, {
      name: newName,
      postcode: postcode,
      pet: newPet,
      isSitter: isSitter,
      bio: bio,
      isDogSitter: isDogSitter,
      isCatSitter: isCatSitter,
      price: price,
      location: [locationInfo.result.latitude, locationInfo.result.longitude],
      uid: user?.uid,
      pawRating: [0, 0, 0, 0, 0],
    });
    setNewName("");
    setNewPet("");
    setIsSitter(false);
    setBio("");
    setIsDogSitter(false);
    setIsCatSitter(false);
    setPrice(0);
    navigate("/home");
  };

  console.log(user, "state");

  useEffect(() => {
    // console.log("useEffect invoked")
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <Container className="justify-content-center text-center mx-5 px-5">
      <br />
      <br />
      <h1>Profile Details</h1>
      <Form className="p-3 sign-group">
        <br />
        <br />
        <Form.Control
          placeholder="Name..."
          className="sign-form"
          onChange={(e) => {
            setNewName(e.target.value);
          }}
          required="required"
        />
        <br />
        <br />
        <Form.Control
          placeholder="Postcode..."
          onChange={(e) => {
            setPostcode(e.target.value);
          }}
          required="required"
        />
        <br />
        <br />
        <h4>Pets you own</h4>
        <br />
        <Form.Select value={newPet} onChange={(e) => setNewPet(e.target.value)}>
          <option></option>
          <option>Dog</option>
          <option>Cat</option>
          <option>Both</option>
        </Form.Select>
        <br />
        <br />
        <br />
        <Button
          style={{ color: "white" }}
          variant="light"
          className="p-2 px-4 btn-search align-items-center"
          onClick={
            // setIsSitter(!isSitter)
            !isSitter
              ? (e) => {
                  e.preventDefault();
                  setIsSitter(true);
                }
              : (e) => {
                  e.preventDefault();
                  setIsSitter(false);
                }
          }
        >
          Become a sitter
        </Button>
        <br /> <br />
        {/* {console.log(isSitter, "sitter boolean")} */}
        {isSitter ? (
          <div className="sitter-form">
            {/* <form> */}
            <Form.Control
              placeholder="Enter bio..."
              id="sitter-form-bio"
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
            <br /> <br />
            <h3>Services offered</h3>
            <br />
            <Form.Group>
              <Row>
                <Col xs="4" md="4" lg="4">
                  <div key={"dog sitting"} className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id={`dog sitting`}
                      label={`Dog Sitting`}
                      onChange={(e) => {
                        setIsDogSitter(!isDogSitter);
                      }}
                    />
                  </div>
                  <div key={"cat sitting"} className="mb-3">
                    <Form.Check
                      type="checkbox"
                      id={`cat sitting`}
                      label={`Cat Sitting`}
                      onChange={(e) => {
                        setIsCatSitter(!isCatSitter);
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </Form.Group>
            <br /> <br />
            <p>Daily rate charged</p>
            <Form.Control
              placeholder="£ per day"
              type="number"
              id="sitter-form-bio"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            {/* </form> */}
          </div>
        ) : (
          <br />
        )}
        <br />
        {/* move this to form and have onSubmit */}
        <Button
          style={{ color: "white" }}
          variant="light"
          className="p-2 px-4 btn-search align-items-center"
          onClick={createUser}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}
