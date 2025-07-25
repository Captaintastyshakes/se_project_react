import Sunny from "../images/weathericons/Ellipse 14.png";
import Clouds from "../images/weathericons/Cloudy.png";
import Foggy from "../images/weathericons/Foggy.png";
import Rainy from "../images/weathericons/Rainy.png";
import Snowy from "../images/weathericons/Snowy.png";
import Thunder from "../images/weathericons/Thunderstorm.png";
import React from "react";
import { currentTemperatureContext } from "../contexts/CurrentTemperatureUnitContext.js";

export default function WeatherCard({ Temperature, weather, tempAlt }) {
  const temp = React.useContext(currentTemperatureContext);

  return (
    <div className="weatherCard__wrapper">
      {temp.currentTemperatureUnit === "F" && (
        <p className="weatherCard__temperature">{Temperature} °F</p>
      )}
      {temp.currentTemperatureUnit === "C" && (
        <p className="weatherCard__temperature">{tempAlt} °C</p>
      )}
      {(weather == "Sunny" || weather == "Clear") && (
        <img className="weatherCard__weather-icon" src={Sunny} alt={"Sunny"} />
      )}
      {weather == "Clouds" && (
        <img
          className="weatherCard__weather-icon"
          src={Clouds}
          alt={"Clouds"}
        />
      )}
      {(weather == "Foggy" || weather == "Mist") && (
        <img className="weatherCard__weather-icon" src={Foggy} alt={"Foggy"} />
      )}
      {weather == "Rainy" && (
        <img className="weatherCard__weather-icon" src={Rainy} alt={"Rainy"} />
      )}
      {weather == "Snowy" && (
        <img className="weatherCard__weather-icon" src={Snowy} alt={"Snowy"} />
      )}
      {weather == "Thunder" && (
        <img
          className="weatherCard__weather-icon"
          src={Thunder}
          alt={"Thunder"}
        />
      )}
    </div>
  );
}
