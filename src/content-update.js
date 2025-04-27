import { page } from "./main-objs";
import { format } from "date-fns";

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

    // Update location time
    const placeTime = document.createElement("p");
    const placeDate = document.createElement("p");
    placeTime.classList.add("place-time");
    placeDate.classList.add("place-date");
    placeTime.textContent = format(page.current.time, "p");
    placeDate.textContent = format(page.current.time, "iiii, MMMM d");
    locationTime.replaceChildren(placeTime, placeDate);

    // Update weekly weather
    weeklyWeather.replaceChildren();
    const weeklyWeatherData = page.current.getWeeklyWeather();
    for(let day = 0; day < weeklyWeatherData.length; day++) {
        const dailyWeather = document.createElement("div");
        const dayName = document.createElement("p");
        const dayIcon = document.createElement("img");
        const maxTemperature = document.createElement("p");
        const minTemperature = document.createElement("p");
        dayName.classList.add("day-name");
        dayIcon.classList.add("day-icon");
        maxTemperature.classList.add("temperature-range");
        minTemperature.classList.add("temperature-range");
        dayName.textContent = format(weeklyWeatherData[day].datetime, "iii, MMM d");
        import(`./assets/weather-icon/${weeklyWeatherData[day].icon}.svg`)
            .then(source => dayIcon.src = source);
        maxTemperature.textContent = `${Math.round(weeklyWeatherData[day].tempmax)}\u00B0`;
        minTemperature.textContent = `${Math.round(weeklyWeatherData[day].tempmin)}\u00B0`;
        dailyWeather.append(dayName, dayIcon, maxTemperature, minTemperature);
        weeklyWeather.appendChild(dailyWeather);
    }

    // Update the rest
    const currentWeatherData = page.current.getCurrentWeather();
    let temperatureUnit, speedUnit, precipitationUnit;
    if(page.unit === "metric") {
        temperatureUnit = "C";
        speedUnit = "km/h";
        precipitationUnit = "mm";

    } else {
        temperatureUnit = "F";
        speedUnit = "mph";
        precipitationUnit = "in";
    }
    temperature.textContent = `${Math.round(currentWeatherData.temp)} \u00B0${temperatureUnit}`;
    weatherDescription.textContent = currentWeatherData.conditions;
    feelsLike.textContent = `Feels like ${Math.round(currentWeatherData.feelslike)} \u00B0${temperatureUnit}`;
    uvIndex.textContent = `UV Index: ${currentWeatherData.uvindex}`;
    const sunriseTime = document.createElement("p");
    const sunsetTime = document.createElement("p");
    sunriseTime.textContent = `Sunrise: ${format(currentWeatherData.sunrise, "p")}`;
    sunsetTime.textContent = `Sunset: ${format(currentWeatherData.sunset, "p")}`;
    sunTime.replaceChildren(sunriseTime, sunsetTime);
    humidity.textContent = `Humidity: ${currentWeatherData.humidity}`;
    wind.textContent = `Wind Velocity: ${currentWeatherData.windspeed} ${speedUnit}` +
        `to ${currentWeatherData.winddir}\u00B0`;
    precipitation.textContent = `Precipitation: ${currentWeatherData.precip} ${precipitationUnit}`;
}

export default updateContent;