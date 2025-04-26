import { Location, page } from "./main-objs";
import "./styles.css";

new Location("Barcelona").fetchData();

setTimeout(() => console.log(page), 3000);
setTimeout(() => console.log(page), 6000);
setTimeout(() => console.log(page), 100000);