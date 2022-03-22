import React, { useState } from "react";
import Logout from "./Logout";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

export default function DummyHome() {
  const [pet, setPet] = useState([]);
  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut(auth);
  };

  console.log(pet);

  return (
    <div className="justify-content-center text-center mt-5">
      <div>
        <h1>Home</h1>
        <button onClick={handleLogout}>SIGN OUT NOW</button>
        <Logout />
      </div>
      <br />
      <div className="my-5">
        <label className="my-3" htmlFor="pets">
          Choose a pet:
        </label>
        <br />
        <select
          className="p-2 btn btn-primary"
          onClick={(event) => setPet(event.target.value)}
          id="pets"
          name="cars"
        >
          <option value="dog">dog</option>
          <option value="cat">cat</option>
        </select>
      </div>
    </div>
  );
}
