import React, { useEffect, useState, useContext } from "react";
import Logout from "./Logout";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import WelcomePage from "./WelcomePage";
import { ServicesContext } from "../contexts/ServicesContext";
import dog from "../assets/dogIcon.png";
import cat from "../assets/catIcon.png";

export default function Home() {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const { services, setServices } = useContext(ServicesContext);

  useEffect(() => {
    // console.log("useEffect invoked")
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  const usersCopy = [...users];
  const sitters = usersCopy.filter((profile) => {
    return profile.isSitter === true;
  });

  const sittersFilteredByServices = sitters.filter((sitter) => {
    console.log("services: ", services);
    console.log("sitterservices >>>", sitter.services === "Dog Sitting");
    if (services === "Dog Sitting") {
      return sitter.isDogSitter === true;
    }
    if (services === "Cat Sitting") {
      return sitter.isCatSitter === true;
    }
    if (services === "Both") {
      return sitter;
    }
  });

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

            {sittersFilteredByServices.map((sitter, index) => {
              console.log("sitter >>", sitter);
              return (
                <div className="sittercard" key={index}>
                  <ul>
                    <li>
                      <h3>Name: {sitter.name} </h3>
                    </li>
                    <li>Pet: {sitter.pet}</li>
                    <li>Bio: {sitter.bio}</li>
                    <li>Dogsitter: {sitter.isDogSitter.toString()}</li>
                    {sitter.isDogSitter ? (
                      <li>
                        <img src={dog} alt="dog" />
                      </li>
                    ) : (
                      <p></p>
                    )}
                    <li>Catsitter: {sitter.isCatSitter.toString()}</li>
                    <li>Price: {sitter.price}</li>
                  </ul>

                  {/* <h1>Location: {user.location}</h1> */}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <WelcomePage />
      )}
    </>
  );
}
