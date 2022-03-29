import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import fetchLocation from "../api";
import dog from "../assets/dogIcon.png";
import cat from "../assets/catIcon.png";
import sidebar from "../assets/side.jpg";
import CalculateDistance from "./CalculateDistance";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Container,
  Image,
  Alert,
  Form,
  Button,
  Nav,
  Badge,
} from "react-bootstrap";
import avatar from "../assets/blank-profile.png";

export default function Home({
  services,
  setServices,
  location,
  setLocation,
  users,
  setUsers,
  postcode,
  setPostcode,
  neighbourhood,
  setNeighbourhood,
}) {
  const { user, setUser } = useContext(UserContext);
  const usersCollectionRef = collection(db, "users");
  //header search bar
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const ownerLocation = location;

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  console.log(users, "<users state");

  const usersCopy = [...users];
  const sitters = usersCopy.filter((profile) => {
    return profile.isSitter === true;
  });

  const sittersFilteredByServices = sitters.filter((sitter) => {
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

  const sittersSortedByProximity = sittersWithProximity.sort((a, b) => {
    return a.proximity - b.proximity;
  });

  console.log(sittersSortedByProximity, "< MAPPED OVER")




  //
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setError(false);
    setValidated(true);
    event.preventDefault();
    console.log("services>>>", services);
    fetchLocation(postcode)
      .then((data) => {
        console.log("data>>>", data);
        const neighbourhood = data.result.admin_ward;
        const latitude = data.result.latitude;
        const longitude = data.result.longitude;
        const newLocation = [latitude, longitude];
        setNeighbourhood(neighbourhood);

        setLocation(newLocation);
        console.log("button/services >>>", services);
      })
      .catch((error) => {
        console.log(error, "<message");
        setError(error);
      });
  };

  return (
    <>
      <>
        <div className="homebar">
          {error ? (
            <p className="text-center">
              Please check your postcode and try again
            </p>
          ) : (
            ""
          )}
          <Nav className=" justify-content-center" style={{ color: "gray" }}>
            <Nav.Item>
              <Form validated={validated} onSubmit={handleSubmit}>
                <Row className="justify-content-center">
                  <Col s="auto" md="auto" lg={4} className="my-1">
                    <Form.Control
                      className="border-0"
                      type="text"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      placeholder="Enter Postcode..."
                    />
                  </Col>
                  <Col s="auto" md="auto" lg={4} className="my-1">
                    <Form.Select
                      className="border-0"
                      value={services}
                      onChange={(e) => {
                        e.preventDefault(); // << necessary?
                        console.log("eTargetValue >>>", e.target.value);
                        setServices(e.target.value);
                      }}
                    >
                      <option readOnly>select a service</option>
                      <option>Dog Sitting</option>
                      <option>Cat Sitting</option>
                    </Form.Select>
                  </Col>
                  <Col xs="auto" lg="3" className="my-1 text-center">
                    <Button
                      type="submit"
                      style={{ color: "white" }}
                      variant="light"
                      className="p-2 px-4 btn-home"
                    >
                      {/* <Link className="search-link" to="/home"> */}
                      Search
                      {/* </Link> */}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Nav.Item>
          </Nav>
        </div>
      </>
      <Container className="justify-content-center">
        <h4 className="text-center p-2">
          Pet care near {neighbourhood ? neighbourhood : "you"}
        </h4>
        <Row>
          <Col lg="7">
            {sittersSortedByProximity.map((sitter, index) => {
              const sitterLocation = sitter.location;
              console.log(sitterLocation, "<<< sitter location const");
              console.log("sitter >>", sitter);
              return (
                <Link
                  key={index}
                  to={`/profile/${sitter.id}`}
                  className="destyle"
                >
                  <Card className="sittercard  my-3 shadow-sm border-0">
                    <Card.Body>
                      <Row>
                        <Col xs="3" sm="3" md="3">
                          <Image src={avatar} width="90" height="90" />
                        </Col>
                        <Col xs="6" sm="6" md="6" className="px-5">
                          <Card.Text>
                            <h4>{sitter.name}</h4>
                            {sitter.proximity} miles away
                          </Card.Text>
                          <Card.Text>🐾 Average rating : 
                          { sitter?.pawRating ? (Math.round((sitter?.pawRating[0]*1 +
                            sitter?.pawRating[1]*2 +
                            sitter?.pawRating[2]*3 +
                            sitter?.pawRating[3]*4 +
                            sitter?.pawRating[4]*5
                            )/(sitter?.pawRating.reduce((part,a)=>part + a, 0))*10)/10)
                            : " no reviews yet"
                          }
                        
                          

                          </Card.Text>
                        </Col>
                        {/* <li>Dogsitter: {sitter.isDogSitter.toString()}</li> */}
                        <Col xs="3" sm="3" md="3" className="py-3">
                          {sitter.isDogSitter ? (
                            <Image src={dog} alt="dog" width="35" />
                          ) : (
                            <p></p>
                          )}
                          {/* <li>Catsitter: {sitter.isCatSitter.toString()}</li> */}
                          {sitter.isCatSitter ? (
                            <Image src={cat} alt="cat" width="35" />
                          ) : (
                            <p></p>
                          )}
                          <Badge pill bg="light" text="dark">
                            £{sitter.price} per day
                          </Badge>
                        </Col>
                      </Row>
                    </Card.Body>
                    {/* <h1>Location: {user.location}</h1> */}
                  </Card>
                </Link>
              );
            })}
          </Col>
          <Col lg="5">
            <Card>
              <h4>Map here?? </h4>
              <Image src={sidebar} height="auto" width="auto" />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
