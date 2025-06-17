import { Location, page } from "./main-objs";
import updateContent from "./content-update";
import updateMenu from "./menu-update";
import updateBackground from "./background-update";

const menuTitle = document.querySelector("#menu-title");
const menuContent = document.querySelector("#menu-content");

function handleSearch(event) {
  if (event.key === "Enter") {
    const newLocation = new Location(event.target.value);
    newLocation
      .fetchData()
      .then(() => updateContent())
      .then(() => updateMenu())
      .then(() => updateBackground());
    event.target.value = "";
  }
}

function handleTempToggle(event) {
  let newUnit = page.unit === "metric" ? "us" : "metric";
  let temperatureUnit = page.unit === "metric" ? "\u00B0F" : "\u00B0C";
  page.unit = newUnit;
  event.target.textContent = temperatureUnit;
  page.current
    .fetchData()
    .then(() => updateContent())
    .then(() => updateMenu())
    .then(() => updateBackground());
}

function handleMenuContent(event) {
  if (event.target.parentElement.className === "place-container") {
    page.current = page.locations.find((locationObj) => {
      return locationObj.id === event.target.parentElement.id;
    });
    page.current
      .fetchData()
      .then(() => updateContent())
      .then(() => updateBackground());
  }
}

function handlePlaceRemoval(event) {
  if (["place-removal", "removal-icon"].includes(event.target.className)) {
    page.removeLocation(
      page.locations.find((locationObj) => {
        switch (event.target.className) {
          case "place-removal":
            return locationObj.id === event.target.previousElementSibling.id;
          case "removal-icon":
            return (
              locationObj.id ===
              event.target.parentElement.previousElementSibling.id
            );
        }
      })
    );
    updateMenu();
  }
}

function handleMenuIcon() {
  if (menuContent.style.display === "none") {
    menuTitle.style.display = "block";
    menuContent.style.display = "flex";
  } else {
    menuTitle.style.display = "none";
    menuContent.style.display = "none";
  }
}

export {
  handleSearch,
  handleTempToggle,
  handleMenuContent,
  handlePlaceRemoval,
  handleMenuIcon,
};
