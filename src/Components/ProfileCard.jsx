import React, { useState, useEffect } from "react";
import { Card, Image, Container, Row, Col, Button } from "react-bootstrap";
import avatar from "../assets/blank-profile.png";
import dogIcon from "../assets/dogIcon.png";
import catIcon from "../assets/catIcon.png";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

export default function ProfileCard({ img, sitterName, sitterBio }) {
  const { sitter_id } = useParams();
  const userRef = doc(db, "users", sitter_id);
  const [prof, setProf] = useState();

  useEffect(() => {
    const getSitter = async () => {
      const sitter = await getDoc(userRef);
      setProf(sitter.data());
    };
    getSitter();
  }, [sitter_id]);

  // testing doc by id
  console.log(prof, "profile");
  // const { name, bio } = prof;

  //
  return (
    <>
      {prof ? (
        <Container>
          <Card
            className="justify-content-center mx-2 shadow-sm"
            border="light"
          >
            <Card.Body>
              <Row>
                <Col>
                  <Image src={img ? img : avatar} width="160" height="160" />
                </Col>
                <Col md="9" lg="9">
                  <Card.Title className="p-1">
                    {prof ? prof.name : "Name Here"}
                  </Card.Title>
                  <Image src={dogIcon} width="30" className="p-1" />
                  <Card.Text className="p-2">
                    {prof ? prof.bio : "This is the users bio within profile"}
                  </Card.Text>
                </Col>
                <Col lg="2" className="p-3">
                  <Button className="ms-auto btn-sign">message</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      ) : (
        <h2>loading</h2>
      )}
    </>
  );
}
