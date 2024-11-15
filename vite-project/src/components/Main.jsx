import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";

export default function Main(props) {
  return (
    <>
      <div className="main__wrapper">
        <WeatherCard Temperature={props.Temperature} weather={props.weather} />
        <h2 className="main__cardList-header">
          Today is {props.Temperature} °F / You may want to wear:
        </h2>
        <ul className="main__cardList-wrapper">
          {props.items.map((item) => {
            return (
              <ItemCard
                key={item._id}
                name={item.name}
                link={item.link}
                onClick={props.onClick}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
}
