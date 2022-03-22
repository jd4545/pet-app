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
  const [isSitter, setIsSitter] = useState(false);
  const [bio, setBio] = useState("");
  const [services, setServices] = useState("");
  const [petType, setPetType] = useState("");
  const [price, setPrice] = useState(0);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    console.log(newName, newPet);
    await addDoc(usersCollectionRef, {
      name: newName,
      // location: location,
      pet: newPet,
      isSitter: isSitter,
      bio: bio,
      services: services,
      petType: petType,
      price: price
    });
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    // console.log("useEffect invoked")
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <div className="user-form">
      <form>
        <input
          placeholder="Name..."
          onChange={(e) => {
            setNewName(e.target.value);
          }}
          // required="required"
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
          onClick={
            // setIsSitter(!isSitter) 
            !isSitter
              ? () => setIsSitter(true)
              : () => setIsSitter(false)
          }
        >
          Become a sitter
        </button>
        <br />
        {console.log(isSitter, "sitter boolean")}
        {isSitter ? (
          <div className="sitter-form">
            <form>
            <input placeholder="Enter bio..." id="sitter-form-bio" 
            onChange={(e) => {
              setBio(e.target.value);
            }}/>
                      <br />          <br />
            <p>Services offered...</p>
            <select  value={newPet} onChange={(e) => setServices(e.target.value)}>
            <option></option>
            <option>Pet sitting</option>
            <option>Pet walking</option>
            <option>Both</option>
        </select>
        <br />          <br />
        <p>Pets catered for...</p>
        <select  value={newPet} onChange={(e) => setPetType(e.target.value)}>
            <option></option>
            <option>Dog</option>
            <option>Cat</option>
            <option>Both</option>
        </select>
        <br />          <br />
        <p>Hourly rate charged</p>
        <input placeholder="£ per hr" type="number" id="sitter-form-bio" 
            onChange={(e) => {
              setPrice(e.target.value);
            }}/>
            </form>

          </div>
        ) : (
          <br />
        )}
        <br />
        
        <button
          onClick={() => {
            createUser()
              // .then(() => {
              // refreshPage();
            // });
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
