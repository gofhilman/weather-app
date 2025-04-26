import { page } from "./main-objs";

const locationName = document.querySelector("#location-name");
const locationTime = document.querySelector("#location-time");
const weeklyWeather = document.querySelector("#weekly-weather");
const temperature = document.querySelector("#temperature");
const weatherDescription = document.querySelector("#weather-description");
const feelsLike = document.querySelector("#feels-like");
const uvIndex = document.querySelector("#uv-index");
const sunTime = document.querySelector("#sun-time");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const precipitation = document.querySelector("#precipitation");

function updateContent() {
    // Update location name
    const locationAddress = page.current.address;
    let separatedAddress;
    if(locationAddress.includes(", ")) {
        const addressParts = locationAddress.split(", ");
        separatedAddress = [addressParts[0], addressParts.slice(1).join(", ")];
    } else {
        separatedAddress = [locationAddress, ""];
    }
    const headAddress = document.createElement("p");
    const subheadAddress = document.createElement("p");
    headAddress.classList.add("head-address");
    subheadAddress.classList.add("subhead-address");
    headAddress.textContent = separatedAddress[0];
    subheadAddress.textContent = separatedAddress[1];
    locationName.replaceChildren(headAddress, subheadAddress);
}