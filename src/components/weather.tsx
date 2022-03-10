import React, { useState, useEffect } from 'react';
import WeatherDataService from "../services/WeatherService";
import IWeatherData from "../types/Weather";
import moment from 'moment';


function Weather() {
  const initialWeatherState:any = []
  const [weatherInfo, setWeatherInfo] = useState<Array<IWeatherData>>(initialWeatherState)
  const [place, setPlace] = useState("")
  const [error, setError] = useState("")
  const [cloud, setCloud] = useState<any>("")
  const [rain, setRain] = useState<any>("")

  const getWeatherInfo = (name: string) => {
    WeatherDataService.get(name)
      .then((response: any) => {
        console.log(222, response.data)
        setWeatherInfo(response.data.list);
        console.log(response.data.list);
      })
      .catch((e: Error) => {
        console.log(e);
        setError(e.message)
        setWeatherInfo([])
      });
  };

  useEffect(() => {
    const cloudData  = weatherInfo && weatherInfo.filter((info) => info.weather[0].main == "Clouds")[0]
    const rainData  = weatherInfo && weatherInfo.filter((info) => info.weather[0].main == "Rain")[0]
    cloudData && setCloud(cloudData)
    rainData && setRain(rainData)
  }, [weatherInfo]);

 
  return (
    <div className="weather-container">
          <input type="text" value={place} onChange={(e) => setPlace(e.target.value)}/>
          <button onClick={() =>getWeatherInfo(place)}>Search</button>
          <p>{ error && error}</p>
          {weatherInfo &&  cloud &&
            <h3 className="weather-msg">Best day to sell an jacket Date: {cloud.dt_txt}</h3>
          }
          {
            weatherInfo && rain &&
            <h3 className="weather-msg">Best day to sell an umbrella Date: {rain.dt_txt}</h3>

          }
          <div className="weather-wrapper">
          { weatherInfo && weatherInfo.map((info, index) =>{
            console.log(3333, moment().diff(info.dt_txt, 'days') )
             return(
               <div key={index} className="weather-list">
                 <p>Date and time: {info.dt_txt}</p>
                 <p>Weather: {info.weather[0].main}</p>
                 <p>Tempratue: {info.main.temp}</p>
                 <p>Humidity: {info.main.humidity}</p>

               </div>
             )
          })}
          </div>
    </div>
  );
}

export default Weather;
