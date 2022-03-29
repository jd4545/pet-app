import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Image,
  Form,
} from "react-bootstrap";
import {
  doc,
  getDocs,
  where,
  collection,
  query,
  updateDoc,
} from "firebase/firestore";
import profilePic from "../assets/blank-profile.png";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { db } from "../firebase-config";
import { UserContext } from "../contexts/UserContext";
import dogIcon from "../assets/dogIcon.png";
import catIcon from "../assets/catIcon.png";

export default function EditProfile({ img, users, setUsers }) {
  const { user, setUser } = useContext(UserContext);
  const [prof, setProf] = useState(null);
  const [newName, setNewName] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [edit, setEdit] = useState(false);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data, "< data");
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  const usersCopy = [...users];
  console.log(usersCopy, "users copy");

  const sitters = usersCopy.filter((profile) => {
    console.log(profile.uid);
    return profile.uid === user?.uid;
  });

  const sitter = sitters[0];
  console.log(sitter, "<<< sitter line 32");
  // console.log(sitter?.uid, "<<<sitter doc id");

  const sitterId = sitter?.id;
  console.log(sitterId, "sitterId variable");

  // console.log(updateRef, "<<< updateRef");

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateRef = doc(db, "users", sitterId);
    // set state
    const updated = await updateDoc(updateRef, {
      name: newName,
      bio: newBio,
      price: newPrice,
    });
    setEdit(false);
  };

  return (
    <Container>
      <Card className="justify-content-center mx-2 shadow-sm" border="light">
        <Card.Body>
          <Row>
            <Col>
              <Image src={img ? img : profilePic} width="160" height="160" />
            </Col>
            <Col md="9" lg="9">
              <Card.Title className="p-1 mt-3">
                {sitter ? sitter.name : "Name Here"}
              </Card.Title>
              <Card.Text className="p-2">
                {sitter ? sitter.bio : "User has not completed bio yet"}
              </Card.Text>
              {sitter && sitter.pet === "Both" ? (
                <>
                  {" "}
                  Pets I own:
                  <Image src={catIcon} width="30" className="p-1" />
                  <Image src={dogIcon} width="30" className="p-1" />{" "}
                </>
              ) : null}
              {sitter && sitter.pet === "Dog" ? (
                <Image src={dogIcon} width="30" className="p-1" />
              ) : null}
              {sitter && sitter.pet === "Cat" ? (
                <Image src={catIcon} width="30" className="p-1" />
              ) : null}
              {/* Sitter section */}
              {sitter && sitter.isSitter ? (
                <>
                  <Card.Text className="p-2">
                    £{sitter ? sitter.price : null} per day
                  </Card.Text>
                  <Card.Text className="p-2">
                    {" "}
                    Dog sitter:
                    {sitter.isDogsitter ? " yes" : "no"}
                  </Card.Text>
                  <Card.Text className="p-2">
                    {" "}
                    Cat sitter:
                    {sitter.isCatSitter ? " yes" : "no"}
                  </Card.Text>
                  <Card.Text className="p-2">
                    Postcode:
                    {sitter ? sitter.postcode : null}
                  </Card.Text>
                </>
              ) : null}
            </Col>
          </Row>
          <Button onClick={() => setEdit(!edit)} className="ms-auto btn-sign">
            edit details
          </Button>
          {edit ? (
            <Form onSubmit={handleUpdate} className="p-3 form-group" width="40">
              <Form.Control
                placeholder="Name"
                className="m-2"
                onChange={(e) => setNewName(e.target.value)}
                value={newName}
              />

              <Form.Control
                placeholder="Bio"
                className="m-2"
                onChange={(e) => setNewBio(e.target.value)}
                value={newBio}
              />

              <Form.Control
                placeholder="Price"
                className="m-2"
                onChange={(e) => setNewPrice(e.target.value)}
                value={newPrice}
              />
              <p>save and return to home</p>
              <Button type="submit" className="ms-auto btn-sign my-3">
                save
              </Button>
            </Form>
          ) : (
            ""
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
