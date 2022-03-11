import http from "../http-common";
import IWeatherData from "../types/Weather";



const get = (name: string) => {
  return http.get<IWeatherData>(`onecall?lat=1&lon=1&exclude=minutely,hourly&appid=4e0f017b80d17d597e20041335f62d0e&units=metric`);
};


const WeatherService = {
  get
};

export default WeatherService;