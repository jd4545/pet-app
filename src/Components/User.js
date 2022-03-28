import { onSnapshot, doc } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../firebase-config";
import { UserContext } from "../contexts/UserContext";
import { Container } from "react-bootstrap";

export default function User({ user, selectUser, user1, chat }) {
  const user2 = user?.uid;
  const [data, setData] = useState("");
  //   const [data, setData] = useContext(UserContext);

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    let unsub = onSnapshot(doc(db, "lastMessage", id), (doc) => {
      setData(doc.data());
    });
    //unsubscribing from realtime listener.
    return () => unsub();
  }, []);
  // console.log(data);
  //should log the last message sent.

  return (
    //The chat 3 lines down is the "selected_user". This is the chat highlight functionality.
    <>
      <Container
        className={`user_wrapper ${chat.name === user.name && "selected_user"}`}
        onClick={() => {
          selectUser(user);
        }}
      >
        <div className="user_info p-2">
          <div className="">
            <h6>{user.name}</h6>
            {data?.from !== user1 && data?.unread && (
              <small className="unread">New</small>
            )}
          </div>
          <div
            className={`user_status ${user.isOnline ? "online" : "offline"}`}
          ></div>
        </div>
        {/* Line below shows most recent sent message truncated under the selected user. */}
        {data && (
          <p className="truncate px-4">
            <strong>{data.from === user1 ? "me:" : null}</strong>
            {data.text}
          </p>
        )}
      </Container>
    </>
  );
}
