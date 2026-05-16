import axios from "axios";

const API_KEY = "97d66a0925a551dab3680152786bc87f";

export const getWeather = (city) => {
  return axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: {
      q: city.trim(),
      units: "metric",
      appid: API_KEY,
    },
  });
};
