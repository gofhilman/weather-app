import { page } from "./main-objs";
import { format } from "date-fns";
import trashIcon from "./assets/trash-can-outline.svg";

const menuContent = document.querySelector("#menu-content");

function updateMenu() {
    for(let pinNumber = 0; pinNumber < page.locations.length; pinNumber++) {
        const place = document.createElement("div");
        const placeName = document.createElement("p");
        const weatherIcon = document.createElement("img");
        const weatherDesc = document.createElement("p");
        const placeTemp = document.createElement("p");
        const placeRemoval = document.createElement("div");
        const removalIcon = document.createElement("div");

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
            .then(source => weatherIcon.src = source);
    }

}