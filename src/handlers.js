import updateContent from "./content-update";
import { Location, page } from "./main-objs";

function handleSearch(event) {
    if(event.key === "Enter") {
        const newLocation = new Location(event.target.value);
        newLocation.fetchData().then(() => updateContent());
    }
}

function handleTempToggle(event) {
    let temperatureUnit = (page.unit === "metric") ? "\u00B0C" : "\u00B0F";
    let newUnit = (page.unit === "metric") ? "us" : "metric";
    page.unit = newUnit;
    event.target.textContent = temperatureUnit;
}



export { handleSearch, handleTempToggle }