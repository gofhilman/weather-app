import { Location, page } from "./main-objs";
import updateContent from "./content-update";
import updateMenu from "./menu-update";
import updateBackground from "./background-update";

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
  if (
    event.target.parentElement.className === "place-container" ||
    event.target.className === "place-container"
  ) {
    page.current = page.locations.find((locationObj) => {
      return (
        locationObj.id ===
        (event.target.className === "place-container"
          ? event.target.id
          : event.target.parentElement.id)
      );
    });
    page.current
      .fetchData()
      .then(() => updateContent())
      .then(() => updateMenu())
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
  const menuTitle = document.querySelector("#menu-title");
  const menuContent = document.querySelector("#menu-content");
  if (menuContent.classList.contains("no-display")) {
    menuTitle.classList.remove("no-display");
    menuContent.classList.remove("no-display");
  } else {
    menuTitle.classList.add("no-display");
    menuContent.classList.add("no-display");
  }
}

export {
  handleSearch,
  handleTempToggle,
  handleMenuContent,
  handlePlaceRemoval,
  handleMenuIcon,
};
