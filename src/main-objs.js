import { addMinutes } from "date-fns";

const ONE_MINUTE = 60000;

class Page {
  constructor() {
    this.locations = [];
    this.current = null;
    this.unit = "metric";
  }
  pinLocation(locationObj) {
    if (
      !this.locations.find(
        (location) => location.address === locationObj.address,
      )
    ) {
      this.locations.push(locationObj);
    }
  }
  removeLocation(locationObj) {
    return this.locations.splice(this.locations.indexOf(locationObj), 1);
  }
  setCurrentLocation(locationObj) {
    this.current = locationObj;
  }
  setUnit(unit) {
    this.unit = unit;
  }
}

class Location {
  constructor(name) {
    this.name = name;
    this.url = "";
    this.data = null;
    this.address = "";
    this.time = null;
    this.id = name.toLowerCase().replace(/ /g, "-");
  }

  async fetchData() {
    this.url =
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/` +
      `services/timeline/${this.name.replace(/ /g, "%20")}/next7days?unitGroup=${page.unit}&` +
      `elements=datetime,tempmax,tempmin,temp,feelslike,humidity,precip,` +
      `windspeed,winddir,uvindex,sunrise,sunset,conditions,icon&include=days,` +
      `current&key=PKZXRF4GNMWKQJKLAJ5S4LCY7`;
    try {
      const response = await fetch(this.url, { mode: "cors" });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      this.data = await response.json();
      this.getAddress();
      this.updateTime();
      this.progressTime();
      page.pinLocation(this);
      page.setCurrentLocation(this);
    } catch (error) {
      console.error(error.message);
    }
  }
  getAddress() {
    this.address = this.data.resolvedAddress;
  }
  updateTime() {
    this.time = new Date(
      `${this.data.days[0].datetime}T${this.data.currentConditions.datetime}`,
    );
  }
  progressTime() {
    if (this.minuteInterval) {
      clearInterval(this.minuteInterval);
    }
    this.minuteInterval = setInterval(() => {
      this.time = addMinutes(this.time, 1);
    }, ONE_MINUTE);
  }
  getCurrentWeather() {
    return this.data.currentConditions;
  }
  getWeeklyWeather() {
    return this.data.days;
  }
}

const page = new Page();

export { Page, Location, page };
