import React, { useEffect, useState } from 'react'
import ProfileCard from './ProfileCard'
import ReviewCard from './ReviewCard'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase-config'
import Reviews from './Reviews'


export default function Profile({ users, setUsers, chat, setChat, messages, setMessages }) {
  const { sitter_id } = useParams();


  // useEffect(() => {
  //   const getSitter = async () => {
  //     const sitter = await getDoc(userRef);
  //     const sitterFields = sitter._document.data.value.mapValue.fields;
  //     setProfile(sitterFields);
  //   };
  //   getSitter();
  // }, []);

  // const usersCopy = [...users];
  // const sitter = usersCopy.filter((user) => {
  //   console.log(profile);
  //   return user.id === sitter_id;
  // });
  // setProfile(sitter);
  console.log(sitter_id, '< sitter_id')

  return (
    <>
      <Container>
        <ProfileCard chat={chat} setChat={setChat} messages={messages} setMessages={setMessages} />
        <h2 className="p-2">Reviews</h2>
        
     
        <Reviews users={users} setUsers={setUsers} />
      </Container>
    </>
  )
}
