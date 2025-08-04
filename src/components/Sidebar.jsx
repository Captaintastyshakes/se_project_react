import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Sidebar({ handleChangeProfile, handleLogout }) {
  const user = React.useContext(CurrentUserContext);

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
      <div className="sidebar__button-wrapper">
        <button
          className="sidebar__button sidebar__button_type_profile"
          onClick={handleChangeProfile}
          type="button"
        >
          Change Profile Data
        </button>
        <button
          className="sidebar__button sidebar__button_type_logout"
          onClick={handleLogout}
          type="button"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
