import { addMinutes } from "date-fns";

const ONE_MINUTE = 60000;

class Page {
    constructor() {
        this.locations = [];
        this.current = null;
        this.unit = "metric";
    }
    // Fill class methods here
}

class Location {
    constructor(name) {
        this.name = name.replace(/ /g, '%20');
        this.data = null;
        this.time = null;
    }

    url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/` +
        `services/timeline/${this.name}/next7days?unitGroup=${page.unit}&` +
        `elements=datetime,tempmax,tempmin,temp,feelslike,humidity,precip,` +
        `windspeed,winddir,uvindex,sunrise,sunset,conditions,icon&include=days,` +
        `current&key=PKZXRF4GNMWKQJKLAJ5S4LCY7`;
    async fetchData() {
        try {
            const response = await fetch(this.url);
            if(!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            this.data = await response.json();
            this.updateTime();
            this.progressTime();
        } catch(error) {
            console.error(error.message);
        }
    }
    updateTime() {
        this.time = new Date(`${this.data.days[0].datetime}T${this.data.currentConditions.datetime}`);
    }
    progressTime() {
        if(this.minuteInterval) {
            clearInterval(this.minuteInterval);
        }
        this.minuteInterval = setInterval(() => {
            this.time = addMinutes(this.time, 1);
        }, ONE_MINUTE);
    }
    getAddress() {
        return this.data.resolvedAddress;
    }
    getCurrentConditions() {
        return this.data.currentConditions;
    }
    getWeekConditions() {
        return this.data.days;
    }
}

const page = new Page();