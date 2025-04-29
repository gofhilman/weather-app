import { page } from "./main-objs";
import trashIcon from "./assets/trash-can-outline.svg";

const menuContent = document.querySelector("#menu-content");

function updateMenu() {
    menuContent.replaceChildren();
    for(let pinNumber = 0; pinNumber < page.locations.length; pinNumber++) {
        const place = document.createElement("div");
        const placeContainer = document.createElement("div");
        const placeName = document.createElement("p");
        const weatherIcon = document.createElement("img");
        const weatherDesc = document.createElement("p");
        const placeTemp = document.createElement("p");
        const placeRemoval = document.createElement("div");
        const removalIcon = document.createElement("div");

        placeContainer.setAttribute("id", page.locations[pinNumber].id);
        placeContainer.classList.add("place-container");
        placeName.classList.add("place-name");
        weatherIcon.classList.add("day-icon");
        weatherDesc.classList.add("weather-desc");
        placeTemp.classList.add("place-temp");
        placeRemoval.classList.add("place-removal");
        removalIcon.classList.add("removal-icon");

        const locationAddress = page.locations[pinNumber].address;
        let mainAddress;
        if(locationAddress.includes(", ")) {
            const addressParts = locationAddress.split(", ");
            mainAddress = [addressParts[0], addressParts[1]].join(", ");
        } else {
            mainAddress = locationAddress;
        }
        placeName.textContent = mainAddress;
        import(`./assets/weather-icon/${page.locations[pinNumber].getCurrentWeather().icon}.svg`)
            .then(source => weatherIcon.src = source.default)
            .catch(error => console.error('Failed to load icon:', error));
        weatherDesc.textContent = page.locations[pinNumber].getCurrentWeather().conditions;
        let temperatureUnit = (page.unit === "metric") ? "C" : "F";
        placeTemp.textContent = `${Math.round(page.locations[pinNumber].getCurrentWeather().temp)} ` +
            `\u00B0${temperatureUnit}`;
        removalIcon.src = trashIcon;
        
        placeContainer.append(placeName, weatherIcon, weatherDesc, placeTemp);
        placeRemoval.appendChild(removalIcon);
        place.append(placeContainer, placeRemoval);
        menuContent.appendChild(place);
    }
}

export default updateMenu;