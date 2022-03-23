import React, { useState, useContext } from "react";
import Logout from "./Logout";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function DummyHome() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      {user ? (
        <div className="justify-content-center text-center mt-5">
          <div className="">
            <h2 className=" my-3">Home</h2>

            <Logout />
            <p className="my-2">{user?.email}</p>
          </div>
          <br />
          <div className="my-5">
            <h2>list</h2>
          </div>
        </div>
      ) : (
        <Navigate to="/signin" />
      )}
    </>
  );
}
