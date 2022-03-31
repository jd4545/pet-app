import React, { useState, useEffect, useContext } from "react";
import { Card, Image, Container, Row, Col, Button } from "react-bootstrap";
import avatar from "../assets/blank-profile.png";
import dogIcon from "../assets/dogIcon.png";
import catIcon from "../assets/catIcon.png";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";


export default function ProfileCard({
  img,
  sitterName,
  sitterBio,
  chat,
  setChat,
  messages, 
  setMessages
}) {
  const { sitter_id } = useParams();
  const userRef = doc(db, "users", sitter_id);
  const [prof, setProf] = useState();
  const {user, setUser} = useContext(UserContext)

  const navigate = useNavigate();

  useEffect(() => {
    const getSitter = async () => {
      const sitter = await getDoc(userRef);
      setProf(sitter.data());
    };
    getSitter();
  }, [sitter_id]);


//Select User new stuffs:
console.log("THIS IS USER FROM PROFILE-CARD==>",user)
const user1 = user?.uid
const selectUser = async () => {
  setChat(prof);
  console.log("PROF==>>", prof);

  const user2 = prof?.uid;
  console.log(user2);
  const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

  const messagesRef = collection(db, "messages", id, "chat");
  const q = query(messagesRef, orderBy("created_at", "asc"));

  onSnapshot(q, (querySnapshot) => {
    let msgs = [];
    querySnapshot.forEach((doc) => {
      msgs.push(doc.data());
    });
    setMessages(msgs);
  });
  const docSnap = await getDoc(doc(db, "lastMessage", id));
  //If Statement below checks if the data is not equal to the currently logged in user.
  //If the message is sent by the other person then unread is update to false.
  if (docSnap.data() && docSnap.data().from !== user1) {
    await updateDoc(doc(db, "lastMessage", id), {
      unread: false,
    });
  }
};


  // testing doc by id
  console.log(prof, "profile");
  // const { name, bio } = prof;
  const handleMessage = () => {
    selectUser()
    navigate("/messages");
  };

  //End of Select User
  return (
    <>
      {prof ? (
        <Container>
          <Card
            className="justify-content-center mx-2 shadow-sm"
            border="light"
          >
            <Card.Body>
              <Row>
                <Col>
                  <Image src={img ? img : avatar} width="160" height="160" />
                </Col>
                <Col md="9" lg="9">
                  <Card.Title className="p-1">
                    {prof ? prof.name : "Name Here"}
                  </Card.Title>
                  {prof.isDogSitter ? <Image src={dogIcon} width="30" className="p-1" /> : null}
                  {prof.isCatSitter ? <Image src={catIcon} width="30" className="p-1" /> : null}
                  <Card.Text className="p-2">
                    {prof ? prof.bio : "This is the users bio within profile"}
                  </Card.Text>
                  <Card.Text className="p-2">
                    {prof ? `£ ${prof.price} per day` : "The user has not set a price for their service yet"}
                  </Card.Text>
                </Col>
                <Col lg="2" className="p-3">
                  <Button className="ms-auto btn-sign" onClick={handleMessage}>
                    message
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      ) : (
        <h2>loading</h2>
      )}
    </>
  );
}
