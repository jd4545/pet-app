import React, { useState, useContext } from "react";
import Logout from "./Logout";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function DummyHome() {
  const [pet, setPet] = useState([]);
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      {user ? (
        <div className="justify-content-center text-center mt-5">
          <div>
            <h2 className="my-3">Home</h2>

            <Logout />
            <p className="my-2">{user?.email}</p>
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
      ) : (
        <Navigate to="/signin" />
      )}
    </>
  );
}
