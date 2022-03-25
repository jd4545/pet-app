import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

export default function ReviewCard({ title, username, rating, body, date }) {
  return (
    <div className="py-1">
      <Container>
        <Card className="justify-content-center mx-2 shadow-sm" border="light">
          <Card.Body>
            <Card.Title className="p-1">
              {username ? username : "Name Here"}
            </Card.Title>
            <Row>
              <Col md="9" lg="9">
                <Card.Text className="p-2">
                  {body ? body : "awesome comment for review goes here"}
                </Card.Text>
              </Col>
              <Col lg="2" className="p-3">
                <Button className="ms-auto btn-sign">like</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
