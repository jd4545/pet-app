import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  // updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import fetchLocation from "../api";

export default function UserDetailsInput () {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [location, setLocation] = useState(null)
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: newAge, location: });
  };

  // const updateUser = async (id, age) => {
  //   const userDoc = doc(db, "users", id);
  //   const newFields = { age: Number(age) + 1 };
  //   await updateDoc(userDoc, newFields);
  // };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  const refreshPage = () => {
    window.location.reload(false)
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);


 return (
  <div className="App">
    {/* <button
        onClick={(e) => {
          fetchLocation()
        }}
      >
      console log location
      </button> */}
    <form>

    <input
      placeholder="Location..."
      onChange={(e) => {
        setLocation(e.target.value);
      }}
      required="required"
    />
      <button onClick={() => {
      console.log(location)
      fetchLocation(location).then((data)=>{
        console.log(data.result.latitude, data.result.longitude)
        const latitude = data.result.latitude
        const longitude = data.result.longitude
        return [data.result.latitude, data.result.longitude]
      })
    }}>set postcode</button>

    <input
      placeholder="Name..."
      onChange={(e) => {
        setNewName(e.target.value);
      }}
      required="required"
    />
    <input
      type="number"
      placeholder="Age..."
      onChange={(e) => {
        setNewAge(e.target.value);
      }}
      required="required"
    />
    <button onClick={() => {
        createUser().then(()=>{
          refreshPage();
        });
      }}>Create User</button>
    {users.map((user) => {
      return (
        <div>
          <h1>Name: {user.name} </h1>
          <h1>Age: {user.age}</h1>
          {/* <h1>Location: {user.location}</h1> */}
          {/* <button
            onClick={() => {
              updateUser(user.id, user.age);
            }}
          >
            Increase Age
          </button> */}
          <button
            onClick={() => {
              deleteUser(user.id, user.age).then(()=>{
                refreshPage();
              });
            }}
          >
            Delete User
          </button>
        </div>
      );
    })}
    </form>
  </div>
);
}
