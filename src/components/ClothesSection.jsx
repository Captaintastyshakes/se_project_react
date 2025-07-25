import ItemCard from "./ItemCard.jsx";

import React from "react";
import { currentUserContext } from "../contexts/CurrentUserContext.js";

export default function ClothesSection({
  addClick,
  items,
  onClick,
  isLoggedIn,
  onCardLike,
}) {
  const user = React.useContext(currentUserContext);

  const ownedItems = items.filter((item) => item.owner === user._id);

  const unownedItems = items.filter((item) => item.owner !== user._id);

  return (
    <div className="clothesSection__wrapper">
      <h2 className="clothesSection__title">
        {isLoggedIn ? "Your items" : "Login to see your items."}
      </h2>
      {isLoggedIn && (
        <button
          className="header__clothes-button"
          type="button"
          onClick={addClick}
        >
          +Add new
        </button>
      )}
      <ul className="clothesSection__cardList-wrapper">
        {ownedItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              name={item.name}
              link={item.imageUrl}
              onClick={onClick}
              badge={item._id}
              weather={item.weather}
              owner={item.owner}
              onCardLike={onCardLike}
              loggedIn={true} //can't see the clothes section unless logged in anyways
              likeData={item.likes}
            />
          );
        })}
      </ul>
    </div>
  );
}
