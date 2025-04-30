import { handleMenuContent, handleMenuIcon, handlePlaceRemoval, handleSearch, handleTempToggle } from "./handlers";
import init from "./init";
import { page } from "./main-objs";
import "./styles.css";

const locationName = document.querySelector("#location-name");
const temperatureToggle = document.querySelector("#temperature-toggle");
const menuContent = document.querySelector("#menu-content");
const menuIcon = document.querySelector("#menu-icon");

init();
locationName.addEventListener("keydown", event => handleSearch(event));
let temperatureUnit = (page.unit === "metric") ? "\u00B0C" : "\u00B0F";
temperatureToggle.textContent = temperatureUnit;
temperatureToggle.addEventListener("click", event => handleTempToggle(event));
menuContent.addEventListener("click", event => handleMenuContent(event));
menuContent.addEventListener("click", event => handlePlaceRemoval(event));
menuIcon.addEventListener("click", () => handleMenuIcon());