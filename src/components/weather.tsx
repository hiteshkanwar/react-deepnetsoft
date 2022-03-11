import React, { useState, useEffect } from 'react';
import { useParams,useSearchParams } from "react-router-dom";

import WeatherDataService from "../services/WeatherService";
import IWeatherData from "../types/Weather";
import moment from 'moment';


function Weather() {
  const queryParams = new URLSearchParams(window.location.search)
  const initialWeatherState:any = []
  const [weatherInfo, setWeatherInfo] = useState<Array<IWeatherData>>(initialWeatherState)
  const [place, setPlace] = useState("")
  const [error, setError] = useState("")
  const [cloud, setCloud] = useState<any>("")
  const [rain, setRain] = useState<any>("")
  const city = queryParams.get('city');

  useEffect(() => {
    city && getWeatherInfo(city)
  }, []);


  const getWeatherInfo = (name: string) => {
    WeatherDataService.get(name)
      .then((response: any) => {
        setWeatherInfo(response.data.daily);
      })
      .catch((e: Error) => {
        console.log(e);
        setError(e.message)
        setWeatherInfo([])
      });
  };
  

  useEffect(() => {
    let maxRain= weatherInfo.map(function(o) { return o.rain; })
    maxRain = maxRain.filter(e => e)
    let minTemp =  weatherInfo.map(function(o) { return o.temp.day; })
    minTemp = minTemp.filter(e => e)
    // const cloudData  = weatherInfo && weatherInfo.filter((info) => info.weather[0].main == "Clouds")[0]
    const rainData  = weatherInfo && Math.max.apply(null, maxRain)
    const tempData =  weatherInfo && Math.min.apply(null, minTemp)

     tempData && setCloud(tempData)
     rainData && setRain(rainData)
  }, [weatherInfo]);
  

 
  return (
    <div className="weather-container">
          <input type="text" value={place} onChange={(e) => setPlace(e.target.value)}/>
          <button onClick={() =>getWeatherInfo(place)}>Search</button>
          <p>{ error && error}</p>
          {  cloud && weatherInfo &&
            <div>The best day to buy jacket is {cloud}</div>
          }
          {  rain && weatherInfo &&
            <div>The best day to buy umbrella is {rain}</div>
          }
          <div className="weather-wrapper">
           { weatherInfo && weatherInfo.map((info, index) =>{
             return(
               <div key={index}>
                 <div key={index} className="weather-list">
                 <p>Date and time: {moment.unix(info.dt).format("MM/DD/YYYY") }</p>
                 <p>Weather: {info.weather[0].main}</p>
                 <p>Temprature: {info.temp.day}</p>
               </div>
               </div>
             )
           })}
          </div>
    </div>
  );
}

export default Weather;
