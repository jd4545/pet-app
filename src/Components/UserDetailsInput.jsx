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

export default function UserDetailsInput() {
  const [newName, setNewName] = useState("");
  const [newPet, setNewPet] = useState("");
  const [postcode, setPostcode] = useState([]);
  const [location, setLocation] = useState([null, null]);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      name: newName,
      location: location,
      pet: newPet,
    });
  };

  // const updateUser = async (id, age) => {
  //   const userDoc = doc(db, "users", id);
  //   const newFields = { age: Number(age) + 1 };
  //   await updateDoc(userDoc, newFields);
  // };

  // const deleteUser = async (id) => {
  //   const userDoc = doc(db, "users", id);
  //   await deleteDoc(userDoc);
  // };

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
      {/* <button
        onClick={(e) => {
          fetchLocation()
        }}
      >
      console log location
      </button> */}
      <form>
        {/* <input
          placeholder="Location..."
          onChange={(e) => {
            setPostcode(e.target.value);
          }}
          required="required"
        />
        <button
          onClick={() => {
            console.log(postcode);
            fetchLocation(postcode).then((data) => {
              const latitude = data.result.latitude;
              const longitude = data.result.longitude;
              const newLocation = [latitude, longitude];
              return setLocation(newLocation)
            });
          }}
        >
          set postcode
        </button> */}

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
        <select
          // value={newPet}
          // // defaultValue={"default"}
          onSubmit={(e) => {
            setNewPet(e.target.value);
          }}
        >
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Dog & Cat">Both</option>
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
              <h1>Location: {user.location}</h1>
              {/* <button
            onClick={() => {
              updateUser(user.id, user.age);
            }}
          >
            Increase Age
          </button> */}
              {/* <button
                onClick={() => {
                  deleteUser(user.id).then(() => {
                    refreshPage();
                  });
                }}
              >
                Delete User
              </button> */}
            </div>
          );
        })}
      </form>
    </div>
  );
}
