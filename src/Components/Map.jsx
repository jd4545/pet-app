import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";

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

  const lIcon = L.Icon.extend({
    options: { iconSize: [25, 25] },
  });
  const iconVar = new lIcon({ iconUrl: "assets/mapIcon.png" });

  return (
    //   centre should be user's location
    <MapContainer center={location} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {users.map((user) => {
        const position = user.location;
        console.log("user.location>>>", user.location);
        return (
          <Marker key={user.id} position={position} icon={iconVar}>
            <Popup>{position}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

{
  /* <Popup>
  A pretty CSS3 popup. <br /> Easily customizable.
</Popup> */
}
