import React, { useEffect, useState, useContext } from "react";
import Logout from "./Logout";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import WelcomePage from "./WelcomePage";
import dog from "../assets/dogIcon.png";
import cat from "../assets/catIcon.png";
import CalculateDistance from "./CalculateDistance";

export default function Home({ services, setServices, location, setLocation }) {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  console.log(user, "<<<logged in user")

  const ownerLocation = location; 
  console.log(ownerLocation, "<<< owner location const")

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
    // console.log("services: ", services);
    // console.log("sitterservices >>>", sitter.services === "Dog Sitting");
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

  console.log(sittersFilteredByServices, "<<< ")

  const sittersWithProximity = sittersFilteredByServices.map((sitter)=> {
    const sitterLocation = sitter.location;
    sitter.proximity = CalculateDistance(ownerLocation, sitterLocation)
    return sitter
  })

  console.log(sittersWithProximity)

  const sittersSortedByProximity = sittersWithProximity.sort((a,b) => {
    return a.proximity - b.proximity;
  })

  console.log(sittersSortedByProximity);

  return (
    <>
      (
        <div className="justify-content-center text-center mt-5">
          <div className="">
            <h2 className=" my-3">Home</h2>

            <Logout />
            <p className="my-2">{user?.email}</p>
          </div>
          <br />
          <div className="my-5">
            <h2>listings</h2>
          <br /><br />
            {sittersSortedByProximity.map((sitter, index) => {
              const sitterLocation = sitter.location;
              console.log(sitterLocation, "<<< sitter location const")
              // console.log("sitter >>", sitter);
              return (
                <div className="sittercard" key={index}>
                  <ul>
                    <li>
                      <h4>Name: {sitter.name} </h4>
                    </li>
                    {/* <li>Pet: {sitter.pet}</li> */}
                    <li>Bio: {sitter.bio}</li>
                    {/* <li>Dogsitter: {sitter.isDogSitter.toString()}</li> */}
                    {sitter.isDogSitter ? (
                      <li>
                        <img src={dog} alt="dog" width="50" />
                      </li>
                    ) : (
                      <p></p>
                    )}
                    {/* <li>Catsitter: {sitter.isCatSitter.toString()}</li> */}
                    {sitter.isCatSitter ? (
                      <li>
                        <img src={cat} alt="cat" width="50" />
                      </li>
                    ) : (
                      <p></p>
                    )}
                    <li>Daily Rate: £{sitter.price}</li>
                    {/* {console.log(sitter.location, "<<< sitter location")} */}
                    {/* <li>Sitter location: {sitter.location} </li> */}
                    <li>
                      {sitter.proximity} miles away</li>
                  </ul>
                  {/* <h1>Location: {user.location}</h1> */}
                </div>
              );
            })}
          </div>
        </div>
      ) 
    </>
  );
}
