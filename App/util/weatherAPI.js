const apiKey = "?????";

export const weatherAPI = (path, { zipcode, coords }) => {
    let suffix = "";

    if (zipcode) {
        suffix = `zip=${zipcode}`;
    } else if (coords) {
        suffix = `lat=${coords.latitude}&lon=${coords.longitude}`;
    }

    return fetch(`https://api.openweathermap.org/data/2.5${path}?appid=${apiKey}&units=imperial&${suffix}`)
        .then(res => res.json())
}