import { useState, useContext } from "react";
import fetchLocation from "../api";
// import { LocationContext } from "../contexts/LocationContext";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Container,
  Image,
  Alert,
} from "react-bootstrap";
// images
import dogWalking from "../assets/walking-the-dog.png";
import dogSitting from "../assets/dog-sitting.png";
import catSitting from "../assets/cat-sitting.png";

export default function WelcomePage({
  services,
  setServices,
  location,
  setLocation,
  test,
}) {
  const [postcode, setPostcode] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

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
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.log(error, "<message");
        setError(error);
      });
  };

  return (
    <>
      <div className="background">
        <header className="text-center">
          <h1 className="p-5" style={{ color: "white" }}>
            Find pet care near you
          </h1>
        </header>
        <Container className="align-items-center">
          <Card
            className="justify-content-center mx-2 shadow-lg"
            border="light"
            style={{ width: "40rem" }}
            style={{ color: "gray" }}
          >
            <Card.Body>
              <Card.Text as="h5">{neighbourhood}</Card.Text>
              {error ? (
                <Alert variant="warning" className="text-center">
                  Please check your postcode and try again
                </Alert>
              ) : (
                ""
              )}

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
                      className="p-2 px-4 btn-search"
                    >
                      {/* <Link className="search-link" to="/home"> */}
                      Search
                      {/* </Link> */}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>

      <h3 className="text-center pt-5">
        The best home for your pets while you take a break
      </h3>

      <div className="text-center my-3 p-4">
        <Row className="justify-content-center g-5">
          <Col xs="3" s="2" md="2" lg="2">
            <Image roundedCircle src={dogSitting} className="img-fluid " />
          </Col>
          <Col xs="3" s="2" md="2" lg="2">
            <Image roundedCircle src={catSitting} className="img-fluid" />
          </Col>
          <Col xs="3" s="2" md="2" lg="2">
            <Image roundedCircle src={dogWalking} className="img-fluid" />
          </Col>
        </Row>
      </div>
    </>
  );
}
