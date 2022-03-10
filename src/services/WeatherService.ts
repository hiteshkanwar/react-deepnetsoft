import http from "../http-common";
import IWeatherData from "../types/Weather";



const get = (name: string) => {
  return http.get<IWeatherData>(`forecast?q=${name}&appid=4e0f017b80d17d597e20041335f62d0e`);
};


const WeatherService = {
  get
};

export default WeatherService;