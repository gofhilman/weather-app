import { Page, Location, page } from "./main-objs.js"

function init() {
    let savedPage;
    window.onbeforeunload = function() {
        localStorage.setItem("savedPage", JSON.stringify(page));
    };
    savedPage = JSON.parse(localStorage.getItem("savedPage"));

    if(savedPage) {
        Object.assign(page, savedPage);
        page.locations.forEach(location => {
            Object.setPrototypeOf(location, Location.prototype);
        });
        Object.setPrototypeOf(page, Page.prototype);
    }
}

export default init;