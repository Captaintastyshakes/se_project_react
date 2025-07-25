import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import React from "react";
import { currentTemperatureContext } from "../contexts/CurrentTemperatureUnitContext";
import { currentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  Temperature,
  weather,
  items,
  onClick,
  tempAlt,
  onCardLike,
  loggedIn, //this is a top level component so I'm ok 'drilling down' the properties in this case.
}) {
  const temp = React.useContext(currentTemperatureContext);

  const user = React.useContext(currentUserContext);

  const ownedItems = items.filter((item) => {
    return item.owner === user._id;
  });

  const unownedItems = items.filter((item) => {
    return item.owner !== user._id;
  });

  const noOwnedItems = ownedItems.length === 0;

  return (
    <main className="main__wrapper">
      <WeatherCard
        Temperature={Temperature}
        weather={weather}
        tempAlt={tempAlt}
      />
      {temp.currentTemperatureUnit === "F" && (
        <h2 className="main__cardList-header">
          Today is {Temperature}
          {noOwnedItems
            ? ". Login to see and make your own clothing items!"
            : "°F / You may want to wear:"}
        </h2>
      )}
      {temp.currentTemperatureUnit === "C" && (
        <h2 className="main__cardList-header">
          Today is {tempAlt}
          {noOwnedItems
            ? ". Login to see and make your own clothing items!"
            : "°C / You may want to wear:"}
        </h2>
      )}
      {
        <ul className="main__cardList-wrapper">
          {unownedItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                name={item.name}
                link={item.imageUrl}
                onClick={onClick}
                badge={item._id}
                weather={item.weather}
                onCardLike={onCardLike}
                likeData={item.likes}
                owner={item.owner}
                loggedIn={loggedIn}
              />
            );
          })}
          {ownedItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                name={item.name}
                link={item.imageUrl}
                onClick={onClick}
                badge={item._id}
                weather={item.weather}
                onCardLike={onCardLike}
                owner={item.owner}
                likeData={item.likes}
                loggedIn={loggedIn}
              />
            );
          })}
        </ul>
      }
    </main>
  );
}
