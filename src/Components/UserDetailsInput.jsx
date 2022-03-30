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
  const [error, setError] = useState(null);

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
    try {
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
    } catch (error) {
      console.log(error.message);
      setError(error);
    }
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
    <Container className="justify-content-center text-center">
      <h4>Profile Details</h4>
      <Form className=" sign-group">
        <Row className="justify-content-center">
          <Col lg="6">
            <Form.Control
              placeholder="Name..."
              className="my-1 mt-4"
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value);
              }}
              required="required"
            />
            <br />
            <Form.Control
              placeholder="Postcode..."
              className="my-1"
              value={postcode}
              onChange={(e) => {
                setPostcode(e.target.value);
              }}
              required="required"
            />
            <br />
            <h4>Pets you own</h4>
            <br />
            <Form.Select
              value={newPet}
              onChange={(e) => setNewPet(e.target.value)}
            >
              <option></option>
              <option>Dog</option>
              <option>Cat</option>
              <option>Both</option>
            </Form.Select>
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
            {isSitter ? (
              <div className="sitter-form">
                {/* <form> */}
                <Form.Control
                  placeholder="Enter bio..."
                  id="sitter-form-bio"
                  className="my-1"
                  value={bio}
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                />
                <h4>Services offered</h4>
                <br />
                <Form.Group>
                  <Row>
                    <Col>
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
                    </Col>
                    <Col>
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
                <br />
                <h4 className="p-2">Daily rate charged</h4>
                <Form.Control
                  placeholder="£ per day"
                  type="number"
                  value={price}
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
            {error ? (
              <p className="text-center p-1">
                Please complete the form and try again
              </p>
            ) : (
              ""
            )}
            <Button
              style={{ color: "white" }}
              variant="light"
              className="p-2 px-4 btn-search align-items-center mb-4"
              onClick={createUser}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
