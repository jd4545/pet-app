import { useState, useEffect, useContext } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import fetchLocation from "../api";
import { Navigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { auth } from "../firebase-config";
import { UserContext } from "../contexts/UserContext";

export default function UserDetailsInput() {

  const { user, setUser } = useContext(UserContext);
  const [newName, setNewName] = useState('')
  const [newPet, setNewPet] = useState('')
  const [postcode, setPostcode] = useState([])
  // const [location, setLocation] = useState([null, null]);
  const [users, setUsers] = useState([])
  const [isSitter, setIsSitter] = useState(false)
  const [bio, setBio] = useState('')

  // const [services, setServices] = useState({dogsitting:false, catsitting:false })
  const [isDogSitter, setIsDogSitter] = useState(false);
  const [isCatSitter, setIsCatSitter] = useState(false);
  const [price, setPrice] = useState(0);
  const usersCollectionRef = collection(db, "users");


  const createUser = async (e) => {
    e.preventDefault();
    const locationInfo = await fetchLocation(postcode);
    // setLocation([locationInfo.result.latitude, locationInfo.result.longitude])
    await addDoc(usersCollectionRef, {
      name: newName,
      postcode: postcode,
      pet: newPet,
      isSitter: isSitter,
      bio: bio,
      isDogSitter: isDogSitter,
      isCatSitter: isCatSitter,
      price: price,
      location: [locationInfo.result.latitude, locationInfo.result.longitude],
      id: user?.uid,
    })
    setNewName('')
    setNewPet('')
    setIsSitter(false)
    setBio('')
    // setServices('')
    setIsDogSitter(false);
    setIsCatSitter(false);
    setPrice(0)
    // setLocation([null, null])
    // <Navigate to="/page" />
  }

  console.log(user, "state");
  
  useEffect(() => {
    // console.log("useEffect invoked")
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <div className="user-form text-center mt-5">
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
        <input
          placeholder="Postcode..."
          onChange={(e) => {
            setPostcode(e.target.value);
          }}
          required="required"
        />
        <br />
        <br />
        <p>Pets you own...</p>
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
              ? (e) => {
                  e.preventDefault();
                  setIsSitter(true);
                }
              : (e) => {
                  e.preventDefault();
                  setIsSitter(false);
                }
          }
        >
          Become a sitter
        </button>
        <br /> <br />
        {/* {console.log(isSitter, "sitter boolean")} */}
        {isSitter ? (
          <div className="sitter-form">
            {/* <form> */}
            <input
              placeholder="Enter bio..."
              id="sitter-form-bio"
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
            <br /> <br />
            <p>Services offered...</p>
            <Form>
              <div key={"dog sitting"} className="mb-3">
                <Form.Check
                  type="checkbox"
                  id={`dog sitting`}
                  label={`Dog Sitting`}
                  onChange={(e) => {
                    setIsDogSitter(!isDogSitter);
                  }}
                />
              </div>
              <div key={"cat sitting"} className="mb-3">
                <Form.Check
                  type="checkbox"
                  id={`cat sitting`}
                  label={`Cat Sitting`}
                  onChange={(e) => {
                    setIsCatSitter(!isCatSitter);
                  }}
                />
              </div>
            </Form>
            <br /> <br />
            <p>Daily rate charged</p>
            <input
              placeholder="£ per day"
              type="number"
              id="sitter-form-bio"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            {/* </form> */}
          </div>
        ) : (
          <br />
        )}
        <br />
        {/* move this to form and have onSubmit */}
        <button 
          onClick={
            createUser
          }
        >
          Submit
        </button>
      </form>
      {users.map((user) => {
        return (
          <div>
            <h1>Name: {user.name} </h1>
            <h1>Pet: {user.pet}</h1>
            {/* <h1>Location: {user.location}</h1> */}
          </div>
        );
      })}
    </div>
  );
}
