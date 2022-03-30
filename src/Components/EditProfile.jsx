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
  const [newPostcode, setNewPostcode] = useState("");
  const [nameEdit, setNameEdit] = useState(false);
  const [bioEdit, setBioEdit] = useState(false);
  const [priceEdit, setPriceEdit] = useState(false);
  const [postcodeEdit, setPostcodeEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    setIsLoading(true);
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data, "< data");
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
    setIsLoading(false);
  }, []);

  const usersCopy = [...users];
  console.log(usersCopy, "users copy");

  const arr = usersCopy.filter((profile) => {
    // console.log(profile.uid);
    return profile.uid === user?.uid;
  });

  const currentUser = arr[0];
  console.log(currentUser, "<<< currentUser line 32");
  // console.log(sitter?.uid, "<<<sitter doc id");

  const userId = currentUser?.id;
  console.log(userId, "sitterId variable");

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    const updateRef = doc(db, "users", userId);
    // set state
    const updated = await updateDoc(updateRef, {
      name: newName,
    });
    setNameEdit(false);
  };

  const handleBioUpdate = async (e) => {
    e.preventDefault();
    const updateRef = doc(db, "users", userId);
    // set state
    const updated = await updateDoc(updateRef, {
      bio: newBio,
    });
    setBioEdit(false);
  };

  const handlePriceUpdate = async (e) => {
    e.preventDefault();
    const updateRef = doc(db, "users", userId);
    // set state
    const updated = await updateDoc(updateRef, {
      price: newPrice,
    });
    setPriceEdit(false);
  };

  const handlePostcodeUpdate = async (e) => {
    e.preventDefault();
    const updateRef = doc(db, "users", userId);
    // set state
    const updated = await updateDoc(updateRef, {
      postcode: newPostcode,
    });
    setPostcodeEdit(false);
  };

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <Container>
      <Card className="justify-content-center mx-2 shadow-sm" border="light">
        <Card.Body>
          <Row>
            <Col md="4" lg="4">
              <Image src={img ? img : profilePic} width="160" height="160" />
              <br />
              <br />
              {currentUser && currentUser.pet === "Both" ? (
                <>
                  {" "}
                  Pets I own:
                  <Image src={catIcon} width="30" className="p-1" />
                  <Image src={dogIcon} width="30" className="p-1" />{" "}
                </>
              ) : null}
              {currentUser && currentUser.pet === "Dog" ? (
                <>
                  Pets I own:
                  <Image src={dogIcon} width="30" className="p-1" />
                </>
              ) : null}
              {currentUser && currentUser.pet === "Cat" ? (
                <>
                  Pets I own:
                  <Image src={catIcon} width="30" className="p-1" />
                </>
              ) : null}
            </Col>

            <Col md="8" lg="8">
              <Row>
                <Col>
                  <Card.Title className="p-1 mt-3">
                    {currentUser ? currentUser.name : "Name Here"}
                  </Card.Title>
                </Col>
                <Col>
                  <Button
                    onClick={() => setNameEdit(!nameEdit)}
                    className="ms-auto btn-light mt-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#9333ea"
                      class="bi bi-pencil-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg>
                  </Button>
                </Col>
              </Row>
              {nameEdit ? (
                <Form
                  onSubmit={handleNameUpdate}
                  className="p-3 form-group"
                  width="40"
                >
                  <Form.Control
                    placeholder="Name"
                    className="m-2"
                    onChange={(e) => setNewName(e.target.value)}
                    value={newName}
                  />
                  <Button type="submit" className="ms-auto btn-sign my-3">
                    save
                  </Button>
                </Form>
              ) : (
                ""
              )}
              <Row>
                <Col>
                  <Card.Text className="p-2">
                    {currentUser
                      ? currentUser.bio
                      : "User has not completed bio yet"}
                  </Card.Text>
                </Col>
                <Col>
                  <Button
                    onClick={() => setBioEdit(!bioEdit)}
                    className="ms-auto btn-light"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#9333ea"
                      class="bi bi-pencil-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg>
                  </Button>
                </Col>
              </Row>
              {bioEdit ? (
                <Form
                  onSubmit={handleBioUpdate}
                  className="p-3 form-group"
                  width="40"
                >
                  <Form.Control
                    placeholder="Bio"
                    className="m-2"
                    onChange={(e) => setNewBio(e.target.value)}
                    value={newBio}
                  />
                  <Button type="submit" className="ms-auto btn-sign my-3">
                    save
                  </Button>
                </Form>
              ) : (
                ""
              )}

              {/* Sitter section */}
              {currentUser && currentUser.isSitter ? (
                <>
                  <Row>
                    <Col>
                      <Card.Text className="p-2">
                        {currentUser.isSitter
                          ? "£ " + currentUser.price + " per day"
                          : null}{" "}
                      </Card.Text>
                    </Col>
                    <Col>
                      <Button
                        onClick={() => setPriceEdit(!priceEdit)}
                        className="ms-auto btn-light"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#9333ea"
                          class="bi bi-pencil-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>
                      </Button>
                    </Col>
                  </Row>
                  {priceEdit ? (
                    <Form
                      onSubmit={handlePriceUpdate}
                      className="p-3 form-group"
                      width="40"
                    >
                      <Form.Control
                        placeholder="Price"
                        className="m-2"
                        onChange={(e) => setNewPrice(e.target.value)}
                        value={newPrice}
                      />
                      <Button type="submit" className="ms-auto btn-sign my-3">
                        save
                      </Button>
                    </Form>
                  ) : (
                    ""
                  )}
                  <Card.Text className="p-2">
                    {" "}
                    Dog sitter:
                    {currentUser.isDogSitter ? " yes" : "no"}
                  </Card.Text>
                  <Card.Text className="p-2">
                    {" "}
                    Cat sitter:
                    {currentUser.isCatSitter ? " yes" : "no"}
                  </Card.Text>
                  <Row>
                    <Col>
                      <Card.Text className="p-2">
                        Postcode: {currentUser ? currentUser.postcode : null}
                      </Card.Text>
                    </Col>
                    <Col>
                      <Button
                        onClick={() => setPostcodeEdit(!postcodeEdit)}
                        className="ms-auto btn-light"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#9333ea"
                          class="bi bi-pencil-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>
                      </Button>
                    </Col>
                  </Row>
                  {postcodeEdit ? (
                    <Form
                      onSubmit={handlePostcodeUpdate}
                      className="p-3 form-group"
                      width="40"
                    >
                      <Form.Control
                        placeholder="Postcode"
                        className="m-2"
                        onChange={(e) => setNewPostcode(e.target.value)}
                        value={newPostcode}
                      />
                      <Button type="submit" className="ms-auto btn-sign my-3">
                        save
                      </Button>
                    </Form>
                  ) : (
                    ""
                  )}
                </>
              ) : null}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
