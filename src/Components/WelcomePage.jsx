import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";

export default function WelcomePage() {
  const [postcode, setPostcode] = useState("");
  console.log("postcode>>>", postcode);

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
        <p>Location: </p>
        <form action="">
          <input
            aria-label="aria" // << ??
            type="text"
            onChange={(e) => setPostcode(e.target.value)} // << FIX
            placeholder="Enter Postcode..."
          />

          {/* Submit button*/}
          <button>Submit</button>
        </form>
        <Dropdown />
      </section>
    </div>
  );
}
