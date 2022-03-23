import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import fetchLocation from "../api";

export default function WelcomePage() {
  const [postcode, setPostcode] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [location, setLocation] = useState("");

  return (
    <div>
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
              });
            }}
          >
            set postcode
          </button>
        </form>
        <Dropdown />
      </section>
    </div>
  );
}
