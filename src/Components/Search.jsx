import { useState, useContext } from "react";
import { Form, Button, Row, Col, Card, Container } from "react-bootstrap";
import fetchLocation from "../api";
import { ServicesContext } from "../contexts/ServicesContext";

export default function Search() {
  const [postcode, setPostcode] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [location, setLocation] = useState("");
  const { services, setServices } = useContext(ServicesContext);

  return (
    <>
      <Container className="align-items-center">
        <Card
          className="justify-content-center mx-2 shadow-sm"
          border="light"
          style={{ width: "40rem" }}
          style={{ color: "gray" }}
        >
          <Card.Body>
            <Card.Text as="h5">Location: {neighbourhood}</Card.Text>
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
                <Col xs="auto" lg="3" className="my-1">
                  <Button
                    href="/home"
                    style={{ color: "white" }}
                    variant="light"
                    className="p-2 px-4 btn-search"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("services>>>", services);
                      fetchLocation(postcode).then((data) => {
                        console.log("data>>>", data);
                        const neighbourhood = data.result.admin_ward;
                        const latitude = data.result.latitude;
                        const longitude = data.result.longitude;
                        const newLocation = [latitude, longitude];
                        setNeighbourhood(neighbourhood);
                        setLocation(newLocation);
                        console.log("button/services >>>", services);
                      });
                      window.location.href = "/home";
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
    </>
  );
}
