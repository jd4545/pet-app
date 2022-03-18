export default function fetchLocation(postcode) {
  return fetch(`http://api.postcodes.io/postcodes/${postcode}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("from api==>", data);
      return data;
    });
}
//line 2 retrieves the latitude and longitude of an input postcode
//
