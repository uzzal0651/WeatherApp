const WeatherData = {
  city: "",
  country: "",
  API_KEY: "14dc62d694161dc87df0b7de7070e6b9",
  async getWeather() {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&units=metric&appid=${this.API_KEY}`
    );
    const { name, main, weather } = await res.json();
    //console.log(this.city);
    //console.log(name, main, weather);
    return {
      name,
      main,
      weather,
    };
  },
};

export default WeatherData;
