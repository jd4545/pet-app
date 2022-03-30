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
  const voteImage = (
    <img
      src={paw}
      alt="paw image"
      width="15"
      height="15"
      className="d-inline-block align-top"
    />
  );

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
        const meanPaw =
          Math.round(
            ((user?.pawRating[0] * 1 +
              user?.pawRating[1] * 2 +
              user?.pawRating[2] * 3 +
              user?.pawRating[3] * 4 +
              user?.pawRating[4] * 5) /
              user?.pawRating.reduce((part, a) => part + a, 0)) *
              10
          ) / 10;
        const position = user.location;

        if (services === "Dog Sitting")
          return user.isDogSitter ? (
            <Marker key={user.id} position={position} icon={iconVar}>
              <Tooltip>
                {user.name}
                <br />
                {`${user.proximity} miles away`}
                <br />
                {meanPaw >= 1 ? voteImage : null}
                {meanPaw >= 1.5 ? voteImage : null}
                {meanPaw >= 2.5 ? voteImage : null}
                {meanPaw >= 3.5 ? voteImage : null}
                {meanPaw >= 4.5 ? voteImage : null}
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
                {meanPaw >= 1 ? voteImage : null}
                {meanPaw >= 1.5 ? voteImage : null}
                {meanPaw >= 2.5 ? voteImage : null}
                {meanPaw >= 3.5 ? voteImage : null}
                {meanPaw >= 4.5 ? voteImage : null}
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
                {meanPaw >= 1 ? voteImage : null}
                {meanPaw >= 1.5 ? voteImage : null}
                {meanPaw >= 2.5 ? voteImage : null}
                {meanPaw >= 3.5 ? voteImage : null}
                {meanPaw >= 4.5 ? voteImage : null}
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
