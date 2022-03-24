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

        <Container className="align-items-center">
          <Card
            className="justify-content-center mx-2 shadow-sm"
            border="light"
            style={{ width: "40rem" }}
            style={{ color: "gray" }}
          >
            <Card.Body>
              <Card.Text as="h5">Location: {location}</Card.Text>
              <Form action="">
                <Row className="justify-content-center">
                  <Col s="auto" md="auto" lg={4} className="my-1">
                    <Form.Control
                      className="border-0"
                      aria-label="aria" // << ??
                      type="text"
                      onChange={(e) => setPostcode(e.target.value)}
                      placeholder="Enter Postcode..."
                    />
                  </Col>
                  <Col s="auto" md="auto" lg={4} className="my-1">
                    <Form.Select
                      className="border-0"
                      value={services}
                      onChange={(e) => {
                        setServices(e.target.value);
                      }}
                    >
                      <option readonly>select a service</option>
                      <option value="Dog Sitting">Dog Sitting</option>
                      <option value="Cat Sitting">Cat Sitting</option>
                      <option value="Rat Catching">Rat Catching</option>
                    </Form.Select>
                  </Col>
                  <Col xs="auto" lg="3" className="my-1">
                    <Button
                      style={{ color: "white" }}
                      variant="light"
                      className="p-2 px-4 btn-search"
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
