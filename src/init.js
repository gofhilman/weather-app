import { Page, Location, page } from "./main-objs";
import updateContent from "./content-update";
import updateMenu from "./menu-update";
import updateBackground from "./background-update";

const menuTitle = document.querySelector("#menu-title");
const menuContent = document.querySelector("#menu-content");

function init() {
  let savedPage;
  window.onbeforeunload = function () {
    localStorage.setItem("savedPage", JSON.stringify(page));
  };
  savedPage = JSON.parse(localStorage.getItem("savedPage"));

  if (savedPage) {
    Object.assign(page, savedPage);
    page.locations.forEach((location) => {
      Object.setPrototypeOf(location, Location.prototype);
    });
    Object.setPrototypeOf(page, Page.prototype);
  }

  if (page.locations[0]) {
    try {
      page.locations[0]
        .fetchData()
        .then(() => updateContent())
        .then(() => updateMenu())
        .then(() => updateBackground());
    } catch (error) {
      console.error(error.message);
    }
  }

  menuTitle.classList.add("no-display");
  menuContent.classList.add("no-display");
}

export default init;
