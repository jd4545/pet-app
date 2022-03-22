import { useState } from "react";

export default function Dropdown() {
  const [services, setServices] = useState();

  console.log("services >>>", services);

  return (
    <div>
      <h1>Pet Services</h1>
      <p>{services}</p>
      <select
        className="btn btn-primary"
        value={services}
        onChange={(e) => setServices(e.target.value)}
      >
        <option></option>
        <option>Dog Sitting</option>
        <option>Cat Sitting</option>
        <option>Rat Catching</option>
      </select>
    </div>
  );
}
