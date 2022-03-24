

export default function CalculateDistance(locationOne, locationTwo) {

    const R = 6371e3; // metres
    const φ1 = locationOne[0] * Math.PI/180; // φ, λ in radians
    const φ2 = locationTwo[0] * Math.PI/180;
    const Δφ = (locationTwo[0]-locationOne[0]) * Math.PI/180;
    const Δλ = (locationTwo[1]-locationOne[1]) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = (R * c)/1609; // in miles

    const roundedDistance = Math.round(d*10)/10;

    return roundedDistance;

}

// console.log(CalculateDistance([55.04962,-1.45651],[54.9863247,-1.5926936]))
