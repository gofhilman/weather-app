class Page {
    constructor() {
        this.locations = [];
        this.unit = "metric";
    }
    // Fill class methods here
}

class Location {
    constructor(name) {
        this.name = name;
    }
    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/` + 
        `services/timeline/${this.name}/next7days?key=PKZXRF4GNMWKQJKLAJ5S4LCY7&` +
        `unitGroup=${page.unit}`;
}

const page = new Page();