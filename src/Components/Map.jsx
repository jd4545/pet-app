import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import * as L from "leaflet";
import paw from "../assets/paw.png";

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
        console.log("services>>", services);

        if (services === "Dog Sitting")
          return user.isDogSitter ? (
            <Marker key={user.id} position={position} icon={iconVar}>
              <Tooltip>
                {user.name}
                <br />
                {`${user.proximity} miles away`}
                <br />
                <img
                  src={paw}
                  alt="paw image"
                  width="15"
                  height="15"
                  className="d-inline-block align-top"
                />
                <img
                  src={paw}
                  alt="paw image"
                  width="15"
                  height="15"
                  className="d-inline-block align-top"
                />
                <img
                  src={paw}
                  alt="paw image"
                  width="15"
                  height="15"
                  className="d-inline-block align-top"
                />
              </Tooltip>
            </Marker>
          ) : null;
        else if (services === "Cat Sitting")
          return user.isCatSitter ? (
            <Marker key={user.id} position={position} icon={iconVar}>
              <Tooltip>
                {user.name}
                <br />
                {`${user.proximity} miles away`}
                <br />
                <img
                  src={paw}
                  alt="paw image"
                  width="15"
                  height="15"
                  className="d-inline-block align-top"
                />
                <img
                  src={paw}
                  alt="paw image"
                  width="15"
                  height="15"
                  className="d-inline-block align-top"
                />
                <img
                  src={paw}
                  alt="paw image"
                  width="15"
                  height="15"
                  className="d-inline-block align-top"
                />
              </Tooltip>
            </Marker>
          ) : null;
        else if (services === "Dog Sitting" && "Cat Sitting")
          return user.isDogSitter ? (
            <Marker key={user.id} position={position} icon={iconVar}>
              <Tooltip>
                {user.name}
                <br />
                {`${user.proximity} miles away`}
                <br />
                <img
                  src={paw}
                  alt="paw image"
                  width="15"
                  height="15"
                  className="d-inline-block align-top"
                />
                <img
                  src={paw}
                  alt="paw image"
                  width="15"
                  height="15"
                  className="d-inline-block align-top"
                />
                <img
                  src={paw}
                  alt="paw image"
                  width="15"
                  height="15"
                  className="d-inline-block align-top"
                />
              </Tooltip>
            </Marker>
          ) : null;
      })}
    </MapContainer>
  );
}

{
  /* <Popup>
  A pretty CSS3 popup. <br /> Easily customizable.
</Popup> */
}
