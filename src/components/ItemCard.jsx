import React from "react";
import { currentUserContext } from "../contexts/CurrentUserContext.js";
import heartFull from "../images/heartFull.svg";
import heartEmpty from "../images/heartEmpty.svg";

export default function ItemCard({
  onClick,
  name,
  link,
  badge,
  weather,
  onCardLike,
  owner,
  likeData,
  loggedIn,
}) {
  const user = React.useContext(currentUserContext);

  const [likeBin, setLikeBin] = React.useState(likeData); // is it a sin to set something as a state variable and never take advantage of the hook? //edit: i almost took advantage of it- oh well.
  const [isLikedByUser, setIslikedByUser] = React.useState(false);

  const userLikeCheck = () => {
    Array.isArray(likeBin)
      ? setIslikedByUser(likeBin.includes(user._id))
      : setIslikedByUser(false);
  };

  const handleLike = () => {
    onCardLike({
      id: badge,
      isliked: isLikedByUser,
    });
    setIslikedByUser(!isLikedByUser);
  };

  React.useEffect(() => {
    userLikeCheck();
  }, [user]); //running this anytime the user info gets updated.

  return (
    <li className="itemCard__card" onClick={onClick}>
      <p className="itemCard__title">{name}</p>
      <img
        className="itemCard__image"
        src={link}
        alt={name}
        weather={weather}
        id={`${badge}`}
        owner={owner}
      />
      {loggedIn && (
        <button
          className="itemCard__like-button"
          type="button"
          onClick={handleLike}
        >
          {isLikedByUser ? (
            <img
              className="itemCard__like-button_type_liked"
              src={heartFull}
              alt="Liked!"
            />
          ) : (
            <img
              className="itemCard__like-button_type_unliked"
              src={heartEmpty}
              alt="Unliked!"
            />
          )}
        </button>
      )}
    </li>
  );
}
