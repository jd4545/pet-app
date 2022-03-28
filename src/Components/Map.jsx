import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Map({
  services,
  setServices,
  location,
  setLocation,
  users,
  setUsers,
  postcode,
  setPostcode,
  neighbourhood,
  setNeighbourhood,
}) {
  console.log("postcode>>", postcode);
  console.log("location>>", location);
  console.log("users>>", users);

  return (
    //   centre should be user's location
    <MapContainer center={location} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {users.map((user) => {
        <Marker position={[51.505, -0.09]}></Marker>;
      })}
    </MapContainer>
  );
}

{
  /* <Popup>
  A pretty CSS3 popup. <br /> Easily customizable.
</Popup> */
}
