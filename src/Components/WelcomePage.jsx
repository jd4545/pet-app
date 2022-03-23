import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import fetchLocation from "../api";

export default function WelcomePage() {
  const [postcode, setPostcode] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [location, setLocation] = useState("");
  const [services, setServices] = useState();

  return (
    <div className="text-center mt-5">
      {/* //header below */}
      <header>
        <h1>[WELCOME PAGE]</h1>
        <h2>PetsApp</h2>
        <button>Paw Return button</button>
        <button>Login/Register</button>
      </header>

      {/* //new section below */}
      <section>
        {/* Location input box */}
        <br></br>
        <br></br>
        <p>Location: {neighbourhood}</p>
        <form action="">
          <input
            aria-label="aria" // << ??
            type="text"
            onChange={(e) => setPostcode(e.target.value)}
            placeholder="Enter Postcode..."
          />

          <div>
            <h1>Pet Services</h1>
            {/* <p>{services}</p> */}
            <select
              className="btn btn-primary"
              value={services}
              onChange={(e) => {
                setServices(e.target.value);
              }}
            >
              <option></option>
              <option>Dog Sitting</option>
              <option>Cat Sitting</option>
              <option>Rat Catching</option>
            </select>
          </div>

          {/* Submit button*/}
          <button
            onClick={(e) => {
              e.preventDefault();
              fetchLocation(postcode).then((data) => {
                console.log("postcode>>>", postcode);
                console.log("data>>>", data);
                const neighbourhood = data.result.admin_ward;
                const latitude = data.result.latitude;
                const longitude = data.result.longitude;
                const newLocation = [latitude, longitude];
                setNeighbourhood(neighbourhood);
                setLocation(newLocation);
                console.log("button/services >>>", services);
              });
            }}
          >
            Find your sitter
          </button>
        </form>
      </section>
    </div>
  );
}
