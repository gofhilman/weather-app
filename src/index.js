import { handleSearch, handleTempToggle } from "./handlers";
import { page } from "./main-objs";
import "./styles.css";

// new Location("Barcelona").fetchData();

// setTimeout(() => console.log(page), 3000);
// setTimeout(() => console.log(page), 6000);
// setTimeout(() => console.log(page), 100000);

const locationName = document.querySelector("#location-name");
const temperatureToggle = document.querySelector("#temperature-toggle");

locationName.addEventListener("keydown", event => handleSearch(event));
let temperatureUnit = (page.unit === "metric") ? "\u00B0C" : "\u00B0F";
temperatureToggle.textContent = temperatureUnit;
temperatureToggle.addEventListener("click", event => handleTempToggle(event));