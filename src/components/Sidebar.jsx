import React from "react";
import { currentUserContext } from "../contexts/CurrentUserContext.js";

export default function Sidebar() {
  const user = React.useContext(currentUserContext);

  const defaultAvatar =
    typeof user.name == "string" && user.avatar.includes("notarealurl")
      ? user.name.slice(0, 1).toUpperCase()
      : "X";

  return (
    <div className="sidebar__wrapper">
      {user.avatar && !user.avatar.includes("notarealurl") ? (
        <img
          className="sidebar__avatar header__avatar"
          src={user.avatar}
          alt="profile avatar"
        />
      ) : (
        <h1 className="header_avatar_type_default sidebar__avatar ">
          {defaultAvatar}
        </h1>
      )}
      <p className="sidebar__name">
        {user.name ? user.name : "Login to see your info!"}
      </p>
    </div>
  );
}
