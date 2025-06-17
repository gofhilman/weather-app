import { page } from "./main-objs";

const background = document.querySelector("#background");

function updateBackground() {
  const currentBackground = page.current.getCurrentWeather().icon;
  import(`./assets/background/${currentBackground}.webp`)
    .then(
      (source) => (background.style.backgroundImage = `url(${source.default})`)
    )
    .catch((error) => console.error("Failed to load icon:", error));
}

export default updateBackground;
