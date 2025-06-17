import { page } from "./main-objs";
import { format } from "date-fns";

function updateTime() {
  if (page.current) {
    const placeTime = document.querySelector(".place-time");
    const placeDate = document.querySelector(".place-date");
    page.current.progressTime();
    placeTime.textContent = format(page.current.time, "p");
    placeDate.textContent = format(page.current.time, "iiii, MMMM d");
  }
}

export default updateTime;
