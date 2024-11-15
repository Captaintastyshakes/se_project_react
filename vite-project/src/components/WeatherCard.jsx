import Sunny from "../images/weathericons/Ellipse 14.png";
import Clouds from "../images/weathericons/Cloudy.png";
import Foggy from "../images/weathericons/Foggy.png";
import Rainy from "../images/weathericons/Rainy.png";
import Snowy from "../images/weathericons/Snowy.png";
import Thunder from "../images/weathericons/Thunderstorm.png";

export default function WeatherCard(props) {
  return (
    <div className="weatherCard__wrapper">
      <p className="weatherCard__temperature">{props.Temperature} °F</p>
      {(props.weather == "Sunny" || props.weather == "Clear") && (
        <img className="weatherCard__weather-icon" src={Sunny} alt={"Sunny"} />
      )}
      {props.weather == "Clouds" && (
        <img
          className="weatherCard__weather-icon"
          src={Clouds}
          alt={"Clouds"}
        />
      )}
      {(props.weather == "Foggy" || props.weather == "Mist") && (
        <img className="weatherCard__weather-icon" src={Foggy} alt={"Foggy"} />
      )}
      {props.weather == "Rainy" && (
        <img className="weatherCard__weather-icon" src={Rainy} alt={"Rainy"} />
      )}
      {props.weather == "Snowy" && (
        <img className="weatherCard__weather-icon" src={Snowy} alt={"Snowy"} />
      )}
      {props.weather == "Thunder" && (
        <img
          className="weatherCard__weather-icon"
          src={Thunder}
          alt={"Thunder"}
        />
      )}
    </div>
  );
}
