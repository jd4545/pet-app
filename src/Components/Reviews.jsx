import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Image,
  Form,
  ProgressBar,
} from "react-bootstrap";
import {
  addDoc,
  doc,
  getDocs,
  where,
  collection,
  query,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import profilePic from "../assets/blank-profile.png";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { db } from "../firebase-config";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import dogIcon from "../assets/dogIcon.png";
import catIcon from "../assets/catIcon.png";
import React from "react";

export default function Reviews({ users, setUsers }) {
  const { user, setUser } = useContext(UserContext);
  const usersCollectionRef = collection(db, "users");

  const { sitter_id } = useParams();
  const reviewsRef = collection(db, "users", sitter_id, "reviews");
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState("");
  const [addReview, setAddReview] = useState(false);
  const [rating, setRating] = useState(null);
  const [beenRatedOne, setBeenRatedOne] = useState(false);
  const [beenRatedTwo, setBeenRatedTwo] = useState(false);
  const [beenRatedThree, setBeenRatedThree] = useState(false);
  const [beenRatedFour, setBeenRatedFour] = useState(false);
  const [beenRatedFive, setBeenRatedFive] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getReviews = async () => {
      const data = await getDocs(reviewsRef);
      setReviews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getReviews();
  }, []);

  const refreshPage = () => {
    window.location.reload(false);
  };

  const usersCopy = [...users];

  const sitters = usersCopy.filter((profile) => {
    return profile.id === sitter_id;
  });

  const username = usersCopy.filter((profile) => {
    console.log("profile: ", profile);
    return profile.uid === user?.uid;
  });

  const sitter = sitters[0];
  const sitterId = sitter?.id;

  const meanPaw =
    Math.round(
      ((sitter?.pawRating[0] * 1 +
        sitter?.pawRating[1] * 2 +
        sitter?.pawRating[2] * 3 +
        sitter?.pawRating[3] * 4 +
        sitter?.pawRating[4] * 5) /
        sitter?.pawRating.reduce((part, a) => part + a, 0)) *
        10
    ) / 10;

  const countOfPaws =
    sitter?.pawRating[0] +
    sitter?.pawRating[1] +
    sitter?.pawRating[2] +
    sitter?.pawRating[3] +
    sitter?.pawRating[4];

  const handleOnePaw = async (e) => {
    e.preventDefault();
    const updatedOnePaws = sitter?.pawRating[0] + 1;
    const updateRef = doc(db, "users", sitterId);
    const updated = await updateDoc(updateRef, {
      pawRating: [
        updatedOnePaws,
        sitter?.pawRating[1],
        sitter?.pawRating[2],
        sitter?.pawRating[3],
        sitter?.pawRating[4],
      ],
    });
    setBeenRatedOne(true);
  };

  const handleTwoPaws = async (e) => {
    e.preventDefault();
    const updatedTwoPaws = sitter?.pawRating[1] + 1;
    const updateRef = doc(db, "users", sitterId);
    const updated = await updateDoc(updateRef, {
      pawRating: [
        sitter?.pawRating[0],
        updatedTwoPaws,
        sitter?.pawRating[2],
        sitter?.pawRating[3],
        sitter?.pawRating[4],
      ],
    });
    setBeenRatedTwo(true);
  };

  const handleThreePaws = async (e) => {
    e.preventDefault();
    const updatedThreePaws = sitter?.pawRating[2] + 1;
    const updateRef = doc(db, "users", sitterId);
    const updated = await updateDoc(updateRef, {
      pawRating: [
        sitter?.pawRating[0],
        sitter?.pawRating[1],
        updatedThreePaws,
        sitter?.pawRating[3],
        sitter?.pawRating[4],
      ],
    });
    setBeenRatedThree(true);
  };

  const handleFourPaws = async (e) => {
    e.preventDefault();
    const updatedFourPaws = sitter?.pawRating[3] + 1;
    const updateRef = doc(db, "users", sitterId);
    const updated = await updateDoc(updateRef, {
      pawRating: [
        sitter?.pawRating[0],
        sitter?.pawRating[1],
        sitter?.pawRating[2],
        updatedFourPaws,
        sitter?.pawRating[4],
      ],
    });
    setBeenRatedFour(true);
  };

  const handleFivePaws = async (e) => {
    e.preventDefault();
    const updatedFivePaws = sitter?.pawRating[4] + 1;
    const updateRef = doc(db, "users", sitterId);
    const updated = await updateDoc(updateRef, {
      pawRating: [
        sitter?.pawRating[0],
        sitter?.pawRating[1],
        sitter?.pawRating[2],
        sitter?.pawRating[3],
        updatedFivePaws,
      ],
    });
    setBeenRatedFive(true);
  };

  const docRef = doc(db, "users", sitter_id);
  const colRef = collection(docRef, "reviews");

  const createReview = async (e) => {
    e.preventDefault();
    await addDoc(colRef, {
      username: username[0].name,
      body: comment,
      timestamp: serverTimestamp(),
    });
    refreshPage();
  };

  return (
    <>
      <Container>
        <Card className="justify-content-center mx-2 shadow-sm" border="light mb-3 p-3">
          <Card.Body>
            <h4>Rate this user:</h4>
            <Button
              style={{ color: "white" }}
              variant="light"
              className="p-2 px-4 btn-search align-items-center"
              onClick={
                // setIsSitter(!isSitter)
                !addReview
                  ? (e) => {
                      e.preventDefault();
                      setAddReview(true);
                    }
                  : (e) => {
                      e.preventDefault();
                      setAddReview(false);
                    }
              }
            >
              {" "}
              {addReview ? "Do this another time" : "Add a Review"}{" "}
            </Button>
            <br /> <br />
            {addReview ? (
              <>
                <br />
                <Button
                  onClick={handleOnePaw}
                  style={beenRatedOne ? { color: "gold" } : null}
                >
                  Rate 1 <i class="fa-solid fa-paw"></i>
                </Button>
                <Button
                  onClick={handleTwoPaws}
                  style={beenRatedTwo ? { color: "gold" } : null}
                >
                  Rate 2 <i class="fa-solid fa-paw"></i>
                </Button>
                <Button
                  onClick={handleThreePaws}
                  style={beenRatedThree ? { color: "gold" } : null}
                >
                  Rate 3 <i class="fa-solid fa-paw"></i>
                </Button>
                <Button
                  onClick={handleFourPaws}
                  style={beenRatedFour ? { color: "gold" } : null}
                >
                  Rate 4 <i class="fa-solid fa-paw"></i>
                </Button>
                <Button
                  onClick={handleFivePaws}
                  style={beenRatedFive ? { color: "gold" } : null}
                >
                  Rate 5 <i class="fa-solid fa-paw"></i>
                </Button>
                <br />
                <br />
                <Form>
                  <Form.Control
                    placeholder="Leave a review..."
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                    required="required"
                  />
                </Form>
                <br />
                <button
                  style={{ color: "white" }}
                  variant="light"
                  className="p-2 px-4 btn-search align-items-center"
                  onClick={createReview}
                >
                  Submit review
                </button>
              </>
            ) : null}
          </Card.Body>
        </Card>
      </Container>

      <Container>
        <Card className="justify-content-center mx-2 shadow-sm mb-3 p-3"
            border="light">
          <Card.Body>
            <h4>Rating:</h4>
            <label>
              <input
                type="radio"
                style={{ display: "none" }}
                name="rating"
                value={1}
                onClick={() => setRating(1)}
              />
              <h1
                class="fa-solid fa-paw"
                style={
                  1 <= meanPaw
                    ? { color: "gold", margin: "3px" }
                    : { color: "grey", margin: "3px" }
                }
              ></h1>
            </label>
            <label>
              <input
                type="radio"
                style={{ display: "none" }}
                name="rating"
                value={2}
                onClick={() => setRating(2)}
              />
              <h1
                class="fa-solid fa-paw"
                style={
                  2 <= meanPaw
                    ? { color: "gold", margin: "3px" }
                    : { color: "grey", margin: "3px" }
                }
              ></h1>
            </label>
            <label>
              <input
                type="radio"
                style={{ display: "none" }}
                name="rating"
                value={3}
                onClick={() => setRating(3)}
              />
              <h1
                class="fa-solid fa-paw"
                style={
                  3 <= meanPaw
                    ? { color: "gold", margin: "3px" }
                    : { color: "grey", margin: "3px" }
                }
              ></h1>
            </label>
            <label>
              <input
                type="radio"
                style={{ display: "none" }}
                name="rating"
                value={4}
                onClick={() => setRating(4)}
              />
              <h1
                class="fa-solid fa-paw"
                style={
                  4 <= meanPaw
                    ? { color: "gold", margin: "3px" }
                    : { color: "grey", margin: "3px" }
                }
              ></h1>
            </label>
            <label>
              <input
                type="radio"
                style={{ display: "none" }}
                name="rating"
                value={5}
                onClick={() => setRating(5)}
              />
              <h1
                class="fa-solid fa-paw"
                style={
                  5 <= meanPaw
                    ? { color: "gold", margin: "3px" }
                    : { color: "grey", margin: "3px" }
                }
              ></h1>
            </label>
            <h5>
              <i class="fa-solid fa-paw"></i> Average rating: { meanPaw ? `${meanPaw} out of 5` : "no ratings yet"}
            </h5>
            { meanPaw ? <div>
            <Card.Text>
              <i class="fa-solid fa-paw"></i> : {sitter?.pawRating[0]} votes (
              {Math.round((sitter?.pawRating[0] / countOfPaws) * 100)} %){" "}
              <ProgressBar
                width="200"
                now={Math.round((sitter?.pawRating[0] / countOfPaws) * 100)}
              />
            </Card.Text>

            <Card.Text>
              <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i> :{" "}
              {sitter?.pawRating[1]} votes (
              {Math.round((sitter?.pawRating[1] / countOfPaws) * 100)} %){" "}
              <ProgressBar
                now={Math.round((sitter?.pawRating[1] / countOfPaws) * 100)}
              />
            </Card.Text>
            <Card.Text>
              <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i>{" "}
              <i class="fa-solid fa-paw"></i> : {sitter?.pawRating[2]} votes (
              {Math.round((sitter?.pawRating[2] / countOfPaws) * 100)} %){" "}
              <ProgressBar
                now={Math.round((sitter?.pawRating[2] / countOfPaws) * 100)}
              />
            </Card.Text>
            <Card.Text>
              <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i>{" "}
              <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i> :{" "}
              {sitter?.pawRating[3]} votes (
              {Math.round((sitter?.pawRating[3] / countOfPaws) * 100)} %){" "}
              <ProgressBar
                now={Math.round((sitter?.pawRating[3] / countOfPaws) * 100)}
              />
            </Card.Text>
            <Card.Text>
              <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i>{" "}
              <i class="fa-solid fa-paw"></i> <i class="fa-solid fa-paw"></i>{" "}
              <i class="fa-solid fa-paw"></i> : {sitter?.pawRating[4]} votes (
              {Math.round((sitter?.pawRating[4] / countOfPaws) * 100)} %){" "}
              <ProgressBar
                now={Math.round((sitter?.pawRating[4] / countOfPaws) * 100)}
              />
            </Card.Text>
            </div> : null}
            
          </Card.Body>
        </Card>
      </Container>

      <h2 className="p-2">Reviews</h2>
      {reviews
        ? reviews.map((review) => {
            return (
              <>
              {review.body === "" ? null : <div>
                <Container>
                  <Card className="justify-content-center mx-2 shadow-sm mb-3 p-3"
            border="light">
                    <h6>{review.username}</h6>
                    <Card.Text>{review.body}</Card.Text>
                  </Card>
                </Container>
                </div>}
              </>
            );
          })
        : null}
    </>
  );
}
