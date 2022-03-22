import React from "react";
import Logout from "./Logout";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

export default function DummyHome() {
  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut(auth);
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleLogout}>SIGN OUT NOW</button>
      <Logout />
    </div>
  );
}
