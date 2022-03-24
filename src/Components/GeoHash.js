import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
const geofire = require("geofire-common");

export default function GeoHash() {
  //compute geohash for lat/lng point
  const lat = 53.627183;
  const lng = -2.161735;
  const hash = geofire.geohashForLocation([lat, lng]);

  // add hash to lat/lng to document
  //use the hash for queries and lat/lng for distance comparisons

  const usersRef = collection(db, "test-users");

  useEffect(() => {
    console.log(usersRef);
    const getUsers = async () => {
      const data = await getDocs(usersRef);
      data.docs.map((doc) => {
        doc.update({});
      });
    };
  });

  return (
    <div>
      <p>hash: {hash}</p>
    </div>
  );
}
