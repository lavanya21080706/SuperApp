import React, { useState, useEffect } from "react";
import './page.css';
import pressure from './images/pressure.jpg';
import wind from './images/wind.jpg';
import hum from './images/humidity.jpg'

function Weather() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [weatherData, setWeatherData] = useState(null);
    const API_KEY = 'adf502c1e4b0a9eb1d9b2912432ee4ee';
    const latitude = 16.898001;
    const longitude = 81.674698;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    useEffect(() => {
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setWeatherData(data);
            })
            .catch((error) => {
                console.error('There was a problem fetching the weather data:', error);
            });
    }, [apiUrl]);

    const timeOptions = { hour: 'numeric', minute: 'numeric' };
    const formattedTime = currentDateTime.toLocaleTimeString(undefined, timeOptions);

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${month}-${day}-${year}`;
    };

    return (
        <div className="weather">
            <div className="header_weather">
                <p>{formatDate(currentDateTime)}</p>
                <p>{formattedTime}</p>
            </div>
            <div className="body_weather">
                {weatherData && weatherData.weather && (
                    <div>
                        {weatherData.weather.map((item) => (
                            <div key={item.id} className="weather_body">
                                <div className="weather_desc">
                                    <img src={`https://openweathermap.org/img/wn/${item.icon}.png`} alt="Weather icon" className="icon" />
                                    <p>{item.description}</p>
                                </div>
                                <div className="line"></div>
                                <div className="pressure">
                                    <p>{weatherData.main.pressure}</p>
                                    <div>
                                        <img src={pressure} className="pressure_icon" />
                                        <span> 1010 mbar <br /> Pressure</span>
                                    </div>
                                </div>
                                <div className="line"></div>
                                <div className="wind_hum">
                                    <div className="wind">
                                    <img src={wind} />
                                    <p>{weatherData.wind.speed} <br />Wind</p>
                                    </div>
                                    <br />
                                    <div  className="humidity">
                                    <img src={hum} />
                                    <p>{weatherData.main.humidity}<br/> Humidity</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Weather;
