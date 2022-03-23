import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card, Container } from "react-bootstrap";
import fetchLocation from "../api";
import Image from "react-bootstrap/Image";

export default function Search() {
  const [postcode, setPostcode] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [location, setLocation] = useState("");
  const [services, setServices] = useState();

  return (
    <>
      <div className="background">
        <br />
        <br />
        <br />

        <Container className="text-center align-items-center">
          <Card
            className="justify-content-center mx-2 shadow-sm"
            border="light"
            style={{ width: "40rem" }}
            style={{ color: "rgba(59, 130, 246, 0.5)" }}
          >
            <Card.Header as="h6">Location: {neighbourhood}</Card.Header>
            <Card.Body>
              <Form action="">
                <Row className="justify-content-center">
                  <Col s="auto" md="auto" className="my-1">
                    <Form.Control
                      aria-label="aria" // << ??
                      type="text"
                      onChange={(e) => setPostcode(e.target.value)}
                      placeholder="Enter Postcode..."
                    />
                  </Col>
                  <Col s="auto" md="auto" className="my-1">
                    <Form.Select
                      className=""
                      value={services}
                      onChange={(e) => {
                        setServices(e.target.value);
                      }}
                    >
                      <option disabled>select a service</option>
                      <option value="Dog Sitting">Dog Sitting</option>
                      <option value="Cat Sitting">Cat Sitting</option>
                      <option value="Rat Catching">Rat Catching</option>
                    </Form.Select>
                  </Col>
                  <Col xs="auto" lg="auto" className="my-1">
                    <Button
                      style={{ color: "rgba(59, 130, 246, 0.5)" }}
                      variant="light"
                      onClick={(e) => {
                        e.preventDefault();
                        fetchLocation(postcode).then((data) => {
                          console.log("postcode>>>", postcode);
                          console.log("data>>>", data);
                          const neighbourhood = data.result.admin_ward;
                          const latitude = data.result.latitude;
                          const longitude = data.result.longitude;
                          const newLocation = [latitude, longitude];
                          setNeighbourhood(neighbourhood);
                          setLocation(newLocation);
                          console.log("button/services >>>", services);
                        });
                      }}
                    >
                      Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}
