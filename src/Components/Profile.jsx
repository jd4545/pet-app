import React from "react";
import ProfileCard from "./ProfileCard";
import ReviewCard from "./ReviewCard";
import { Container } from "react-bootstrap";

export default function Profile() {
  return (
    <>
      <Container>
        <ProfileCard />
        <h2 className="p-2">Reviews</h2>
        <ReviewCard />
      </Container>
    </>
  );
}
