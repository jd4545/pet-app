import { useState, useEffect } from "react"
import Dropdown from "./Dropdown"

export default function WelcomePage () {

return (
    <div>
    {/* //header below */}
    <header>
        <h1>PetsApp</h1>
        <button>Paw Return button</button>
        <button>Login/Register</button>
    </header>

    {/* //new section below */}
        <section>
        {/* Location input box */}
        <p>Location: </p>
        <form action="">
        <input type="text" placeholder="Enter Postcode..."/>

        {/* Dropdown Services*/}
        <button>Dropdown</button>
        <Dropdown />

        {/* Submit button*/}
        <button>Submit</button>
        </form>
        </section>
    </div>
    
    )
    
}
