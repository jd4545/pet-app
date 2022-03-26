import React from "react";
import { Card, Image, Container, Row, Col, Button } from "react-bootstrap";
import avatar from "../assets/blank-profile.png";
import dogIcon from "../assets/dogIcon.png";
import catIcon from "../assets/catIcon.png";

export default function ProfileCard({ profile, img, name, cat, dog, bio }) {
  console.log(profile);
  return (
    <div>
      <Container>
        <Card className="justify-content-center mx-2 shadow-sm" border="light">
          <Card.Body>
            <Row>
              <Col>
                <Image src={img ? img : avatar} width="200" height="200" />
              </Col>
              <Col md="9" lg="9">
                <Card.Title className="p-1">
                  {profile.name.stringValue
                    ? profile.name.stringValue
                    : "Name Here"}
                </Card.Title>
                <Image src={dogIcon} width="30" className="p-1" />
                <Card.Text className="p-2">
                  {profile.bio.stringValue
                    ? profile.bio.stringValue
                    : "This is the users bio within profile"}
                </Card.Text>
              </Col>
              <Col lg="2" className="p-3">
                <Button className="ms-auto btn-sign">message</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
