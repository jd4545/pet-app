import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import dog from "../assets/dogIcon.png";
import cat from "../assets/catIcon.png";
import CalculateDistance from "./CalculateDistance";
import { Link } from "react-router-dom";
import { Row, Col, Card, Container, Image } from "react-bootstrap";

export default function Home({ services, setServices, location, setLocation }) {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  console.log(user, "<<<logged in user");

  const ownerLocation = location;
  console.log(ownerLocation, "<<< owner location const");

  useEffect(() => {
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

  console.log(sittersFilteredByServices, "<<< ");

  const sittersWithProximity = sittersFilteredByServices.map((sitter) => {
    const sitterLocation = sitter.location;
    sitter.proximity = CalculateDistance(ownerLocation, sitterLocation);
    return sitter;
  });

  console.log(sittersWithProximity);

  const sittersSortedByProximity = sittersWithProximity.sort((a, b) => {
    return a.proximity - b.proximity;
  });

  console.log(sittersSortedByProximity);

  return (
    <>
      <Container className="justify-content-center p-2">
        <h2 className="text-center">listings</h2>
        {sittersSortedByProximity.map((sitter, index) => {
          const sitterLocation = sitter.location;
          console.log(sitterLocation, "<<< sitter location const");
          console.log("sitter >>", sitter);
          return (
            <Link to={`/profile/${sitter.id}`} className="destyle">
              <Card
                className="sittercard p-1 m-2 shadow-sm border-0"
                key={index}
              >
                <Card.Body>
                  <Row>
                    <Col xs="8" sm="9" md="9" className="px-5">
                      <Card.Text>
                        <h4>{sitter.name}</h4>
                        {sitter.proximity} miles away
                      </Card.Text>
                      <Card.Text>Rating here</Card.Text>
                    </Col>
                    {/* <li>Dogsitter: {sitter.isDogSitter.toString()}</li> */}
                    <Col xs="4" sm="3" md="3" className="py-3">
                      {sitter.isDogSitter ? (
                        <Image src={dog} alt="dog" width="40" />
                      ) : (
                        <p></p>
                      )}
                      {/* <li>Catsitter: {sitter.isCatSitter.toString()}</li> */}
                      {sitter.isCatSitter ? (
                        <Image src={cat} alt="cat" width="40" />
                      ) : (
                        <p></p>
                      )}
                      <Card.Text className="py-1">
                        £{sitter.price} per day
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
                {/* <h1>Location: {user.location}</h1> */}
              </Card>
            </Link>
          );
        })}
      </Container>
    </>
  );
}
