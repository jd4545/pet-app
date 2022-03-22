import { useState, useEffect } from "react";
import Select from "react-select";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import fetchLocation from "../api";

export default function UserDetailsInput() {
  const [newName, setNewName] = useState("");
  const [newPet, setNewPet] = useState("");
  // const [postcode, setPostcode] = useState([]);
  // const [location, setLocation] = useState([null, null]);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      name: newName,
      // location: location,
      pet: newPet,
    });
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

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
      <form>
        <input
          placeholder="Name..."
          onChange={(e) => {
            setNewName(e.target.value);
          }}
          required="required"
        />
        <br />
        <br />
        <br />
        <select value={newPet} onChange={(e) => setNewPet(e.target.value)}>
          <option></option>
          <option>Dog</option>
          <option>Cat</option>
          <option>Both</option>
        </select>
        <br />
        <br />
        <br />
        <button
          onClick={() => {
            createUser().then(() => {
              refreshPage();
            });
          }}
        >
          Submit
        </button>
        {users.map((user) => {
          return (
            <div>
              <h1>Name: {user.name} </h1>
              <h1>Pet: {user.pet}</h1>
              {/* <h1>Location: {user.location}</h1> */}
            </div>
          );
        })}
      </form>
    </div>
  );
}
