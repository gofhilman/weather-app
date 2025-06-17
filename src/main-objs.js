import { addMinutes } from "date-fns";

class Page {
  constructor() {
    this.locations = [];
    this.current = null;
    this.unit = "metric";
  }
  pinLocation(locationObj) {
    if (
      !this.locations.find(
        (location) => location.address === locationObj.address
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
      await this.updateTime();
      page.pinLocation(this);
      page.setCurrentLocation(this);
    } catch (error) {
      console.error(error.message);
    }
  }
  getAddress() {
    this.address = this.data.resolvedAddress;
  }
  async updateTime() {
    let timeData;
    const timeUrl =
      "https://api.api-ninjas.com/v1/worldtime?timezone=" + this.data.timezone;
    try {
      const response = await fetch(timeUrl, {
        mode: "cors",
        headers: { "X-Api-Key": "vbnmoSfEQt2QTmFK9s2mdQ==j1fQdNiY2dFlaakx" },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      timeData = await response.json();
    } catch (error) {
      console.error(error.message);
    }
    this.time = new Date(timeData.datetime.replace(" ", "T"));
  }
  progressTime() {
    this.time = addMinutes(this.time, 1);
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
