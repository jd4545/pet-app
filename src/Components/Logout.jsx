import { auth, db } from "../firebase-config";
import { updateDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import React from "react";
import { Button } from "react-bootstrap";

export default function Logout() {
  const handleLogout = async () => {


    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });


    await signOut(auth);
  };

  return (
    <Button className="btn-sign m-3" onClick={handleLogout}>
      Sign Out
    </Button>
  );
}
