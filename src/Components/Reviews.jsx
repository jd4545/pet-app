import { Container, Card, Row, Col, Button, Image, Form } from 'react-bootstrap'
import {
  addDoc,
  doc,
  getDocs,
  where,
  collection,
  query,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore'
import profilePic from '../assets/blank-profile.png'
import { useState } from 'react'
import { useEffect, useContext } from 'react'
import { db } from '../firebase-config'
import { UserContext } from '../contexts/UserContext'
import { useParams } from 'react-router-dom'
import dogIcon from '../assets/dogIcon.png'
import catIcon from '../assets/catIcon.png'
import React from 'react'

export default function Reviews({ users, setUsers }) {
  const { user, setUser } = useContext(UserContext)
  const usersCollectionRef = collection(db, 'users')

  const { sitter_id } = useParams()
  const reviewsRef = collection(db, 'users', sitter_id, 'reviews')
  const [comment, setComment] = useState('')
  const [reviews, setReviews] = useState('')

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers()
  }, [])

  useEffect(() => {
    const getReviews = async () => {
      const data = await getDocs(reviewsRef)
      setReviews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getReviews()
  }, [])

  const usersCopy = [...users]

  const sitters = usersCopy.filter((profile) => {
    return profile.id === sitter_id
  })

  const username = usersCopy.filter((profile) => {
    console.log('profile: ', profile)
    return profile.uid === user.uid
  })

  const sitter = sitters[0]
  const sitterId = sitter?.id

  const meanPaw =
    Math.round(
      ((sitter?.pawRating[0] * 1 +
        sitter?.pawRating[1] * 2 +
        sitter?.pawRating[2] * 3 +
        sitter?.pawRating[3] * 4 +
        sitter?.pawRating[4] * 5) /
        sitter?.pawRating.reduce((part, a) => part + a, 0)) *
        10,
    ) / 10

  const countOfPaws =
    sitter?.pawRating[0] +
    sitter?.pawRating[1] +
    sitter?.pawRating[2] +
    sitter?.pawRating[3] +
    sitter?.pawRating[4]

  //  console.log(countOfPaws)

  const handleOnePaw = async (e) => {
    e.preventDefault()
    const updatedOnePaws = sitter?.pawRating[0] + 1
    const updateRef = doc(db, 'users', sitterId)
    const updated = await updateDoc(updateRef, {
      pawRating: [
        updatedOnePaws,
        sitter?.pawRating[1],
        sitter?.pawRating[2],
        sitter?.pawRating[3],
        sitter?.pawRating[4],
      ],
    })
  }

  const handleTwoPaws = async (e) => {
    e.preventDefault()
    const updatedTwoPaws = sitter?.pawRating[1] + 1
    const updateRef = doc(db, 'users', sitterId)
    const updated = await updateDoc(updateRef, {
      pawRating: [
        sitter?.pawRating[0],
        updatedTwoPaws,
        sitter?.pawRating[2],
        sitter?.pawRating[3],
        sitter?.pawRating[4],
      ],
    })
  }

  const handleThreePaws = async (e) => {
    e.preventDefault()
    const updatedThreePaws = sitter?.pawRating[2] + 1
    const updateRef = doc(db, 'users', sitterId)
    const updated = await updateDoc(updateRef, {
      pawRating: [
        sitter?.pawRating[0],
        sitter?.pawRating[1],
        updatedThreePaws,
        sitter?.pawRating[3],
        sitter?.pawRating[4],
      ],
    })
  }

  const handleFourPaws = async (e) => {
    e.preventDefault()
    const updatedFourPaws = sitter?.pawRating[3] + 1
    const updateRef = doc(db, 'users', sitterId)
    const updated = await updateDoc(updateRef, {
      pawRating: [
        sitter?.pawRating[0],
        sitter?.pawRating[1],
        sitter?.pawRating[2],
        updatedFourPaws,
        sitter?.pawRating[4],
      ],
    })
  }

  const handleFivePaws = async (e) => {
    e.preventDefault()
    const updatedFivePaws = sitter?.pawRating[4] + 1
    const updateRef = doc(db, 'users', sitterId)
    const updated = await updateDoc(updateRef, {
      pawRating: [
        sitter?.pawRating[0],
        sitter?.pawRating[1],
        sitter?.pawRating[2],
        sitter?.pawRating[3],
        updatedFivePaws,
      ],
    })
  }

  const docRef = doc(db, 'users', sitter_id)
  const colRef = collection(docRef, 'reviews')

  const createReview = async (e) => {
    e.preventDefault()
    await addDoc(colRef, {
      username: username[0].name,
      body: comment,
      timestamp: serverTimestamp(),
    })
  }
  console.log(reviews)
  return (
    <>
      <Container>
        <Card>
          <Card.Body>
            <h4>Rate this user:</h4>
            <Card.Text>
              <Button onClick={handleOnePaw}>Award 1</Button>{' '}
              <Button onClick={handleTwoPaws}>Award 2</Button>{' '}
              <Button onClick={handleThreePaws}>Award 3</Button>{' '}
              <Button onClick={handleFourPaws}>Award 4</Button>{' '}
              <Button onClick={handleFivePaws}>Award 5</Button>
            </Card.Text>
            <Card.Text>🐾 Average: {meanPaw}</Card.Text>
            <Card.Text>
              🐾 : {sitter?.pawRating[0]} (
              {Math.round((sitter?.pawRating[0] / countOfPaws) * 100)} %)
            </Card.Text>
            <Card.Text>
              🐾🐾 : {sitter?.pawRating[1]} (
              {Math.round((sitter?.pawRating[1] / countOfPaws) * 100)} %)
            </Card.Text>
            <Card.Text>
              🐾🐾🐾 : {sitter?.pawRating[2]} (
              {Math.round((sitter?.pawRating[2] / countOfPaws) * 100)} %)
            </Card.Text>
            <Card.Text>
              🐾🐾🐾🐾 : {sitter?.pawRating[3]} (
              {Math.round((sitter?.pawRating[3] / countOfPaws) * 100)} %)
            </Card.Text>
            <Card.Text>
              🐾🐾🐾🐾🐾 : {sitter?.pawRating[4]} (
              {Math.round((sitter?.pawRating[4] / countOfPaws) * 100)} %)
            </Card.Text>
            <Form>
              {' '}
              <Form.Control
                placeholder="Leave a comment..."
                onChange={(e) => {
                  setComment(e.target.value)
                }}
                required="required"
              />
            </Form>
            <button onClick={createReview}>Add a review</button>
          </Card.Body>
        </Card>
      </Container>

      <h2 className="p-2">Reviews</h2>
      {reviews
        ? reviews.map((review) => {
            return (
              <>
                <p>{review.username}</p>
                <p>{review.body}</p>
              </>
            )
          })
        : null}
    </>
  )
}
