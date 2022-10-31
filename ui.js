import WeatherData from "./WeatherData.js";
const UI = {
  loadSelectors() {
    const countryEle = document.querySelector("#country");
    const cityElem = document.querySelector("#city");
    const formElm = document.querySelector("#form");
    const cityInfoElm = document.querySelector("#w-city");
    const temperatureElm = document.querySelector("#w-temp");
    const pressureElm = document.querySelector("#w-pressure");
    const humidityElm = document.querySelector("#w-humidity");
    const feelElm = document.querySelector("#w-feel");
    const iconElm = document.querySelector("#w-icon");
    return {
      countryEle,
      cityElem,
      formElm,
      cityInfoElm,
      temperatureElm,
      pressureElm,
      humidityElm,
      feelElm,
      iconElm,
    };
  },

  getInputValues() {
    const { countryEle, cityElem } = this.loadSelectors();
    //console.log(countryEle.value, cityElem.value);

    return {
      country: countryEle.value,
      city: cityElem.value,
    };
  },

  async handleRemoteData() {
    const data = await WeatherData.getWeather();
    return data;
  },

  populateUI(data) {
    const {
      cityInfoElm,
      temperatureElm,
      pressureElm,
      humidityElm,
      iconElm,
      feelElm,
    } = this.loadSelectors();
    const {
      name,
      main: { temp, pressure, humidity },
      weather,
    } = data;
    cityInfoElm.textContent = name;
    temperatureElm.textContent = temp;
    pressureElm.textContent = pressure;
    humidityElm.textContent = humidity;
    feelElm.textContent = weather[0].description;
    iconElm.setAttribute("src", this.getIcon(weather[0].icon));
  },

  init() {
    const { formElm } = this.loadSelectors();
    formElm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const { country, city } = this.getInputValues();
      WeatherData.country = country;
      WeatherData.city = city;

      const data = await this.handleRemoteData();
      //console.log(data);
      this.populateUI(data);
    });
  },
};

export default UI;
