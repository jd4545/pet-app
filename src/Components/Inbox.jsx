import { db, auth } from "../firebase-config";
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
import {
  Row,
  Col,
  Card,
  Container,
  Nav,
  Navbar,
  Offcanvas,
  Button,
} from "react-bootstrap";
//onSnapshot is a realtime listener - checking user online or not.
//whereas getDocs works only once.
import { useEffect, useState, useContext } from "react";
import User from "../Components/User";
import MessageForm from "../Components/MessageForm";
import Message from "../Components/Message";
import { UserContext } from "../contexts/UserContext";

export default function Inbox({ chat, setChat, messages, setMessages }) {
  const [chatters, setChatters] = useState([]);
  const [text, setText] = useState("");
  const { user, setUser } = useContext(UserContext);

  console.log("USER UID==>", user?.uid);
  const user1 = user?.uid;
  // console.log(user1);

  useEffect(() => {
    async function fetchData() {
      const usersRef = await collection(db, "users");
      //create query object----line below queries users db EXCEPT for current logged in user
      const q = await query(usersRef, where("uid", "not-in", [user?.uid]));
      //execute query
      console.log("Q===>", q);
      const unsub = await onSnapshot(q, (querySnapshot) => {
        let users = [];
        console.log("QUERY SNAPSHOT===>", querySnapshot);
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        setChatters(users);
      });
      return () => {
        unsub();
      };
    }
    fetchData();
  }, [user1]);

  console.log("CHATTERS==>>>", chatters);
  console.log(">>>>>> chat state", chat);
  //selecting user from sidebar - when select a user it provides that user to chat State.
  const selectUser = async (user) => {
    setChat(user);
    console.log("USER==>>", user);

    const user2 = user.uid;
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

  const user2 = chat.uid;
  const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    //can't use addDoc on id so had to make subcollection-"chat".
    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      created_at: Timestamp.fromDate(new Date()),
    });
    //setDoc looks for doc id if existant and replaces it.
    //if no doc exists it makes a new one.
    await setDoc(doc(db, "lastMessage", id), {
      text,
      from: user1,
      to: user2,
      unread: true,
    });
    setText("");
  };

  return (
    <Container className="border-top">
      <Navbar expand={false} className="fixed">
        <Navbar.Toggle aria-controls="offcanvasNavbar" id="offcanvasNavbar" />
        <h4 className="text-center me-auto ml-5 ">{chat?.name}</h4>
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              messages
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {chatters.map((user) => (
                <Card
                  style={{ height: "80px" }}
                  className="m-1 border-0 border-bottom border-info shadow-sm"
                >
                  <User
                    key={user.uid}
                    user={user}
                    selectUser={selectUser}
                    user1={user1}
                    chat={chat}
                  />
                </Card>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>

      {/* <Col xs="6" sm="4" md="3" lg="3" className="users_container">
          {chatters.map((user) => (
            <User
              key={user.uid}
              user={user}
              selectUser={selectUser}
              user1={user1}
              chat={chat}
            />
          ))}
        </Col> */}

      {chat ? (
        <>
          {/* <div className="messages_user">
            <h3>{chat.name}</h3>
          </div> */}
          <Container className="messages">
            {messages.length
              ? messages.map((msg, i) => (
                  <Message key={i} msg={msg} user1={user1} />
                ))
              : null}
          </Container>
          <MessageForm
            handleSubmit={handleSubmit}
            text={text}
            setText={setText}
          />
        </>
      ) : (
        <h3 className="no_conv">select a user to start chatting</h3>
      )}
    </Container>
  );
}
