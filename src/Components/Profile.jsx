import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import ReviewCard from "./ReviewCard";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

export default function Profile() {
  const { sitter_id } = useParams();
  const [profile, setProfile] = useState();

  const userRef = doc(db, "users", sitter_id);

  useEffect(() => {
    const getSitter = async () => {
      const sitter = await getDoc(userRef);
      const sitterFields = sitter._document.data.value.mapValue.fields;
      setProfile(sitterFields);
    };
    getSitter();
  }, []);

  console.log(sitter_id, "< sitter_id");
  console.log(profile);
  return (
    <>
      <Container>
        <ProfileCard profile={profile} />
        <h2 className="p-2">Reviews</h2>
        <ReviewCard />
      </Container>
    </>
  );
}
