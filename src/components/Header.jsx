import { NavLink } from "react-router-dom";
import ToggleSwitch from "./ToggleSwitch.jsx";
import wtwr from "../images/wtwr°.png";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Header({
  location,
  check,
  handleChange,
  onClick,
  loginClickHandler,
  registerClickHandler,
  loginCheck,
  logOut,
  changeProfile,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const user = React.useContext(CurrentUserContext);

  const defaultAvatar =
    typeof user.name == "string" && user.avatar.includes("notarealurl")
      ? user.name.slice(0, 1).toUpperCase()
      : "X";

  return (
    <header className="header__wrapper">
      <div className="header__sub-wrapper">
        <NavLink className="header__link" to="/">
          <img className="header__logo" src={wtwr} alt="wtwr" />
        </NavLink>
        <p className="header__time-location">
          {currentDate}, {location}
        </p>
      </div>

      <div className="header__sub-wrapper">
        <ToggleSwitch checked={check} onChange={handleChange} />
        {loginCheck && (
          <button
            className="header__clothes-button"
            onClick={onClick}
            type="button"
          >
            +Add Clothes
          </button>
        )}
        {loginCheck ? (
          <button
            className="header__change-profile-button header__clothes-button"
            onClick={changeProfile}
          >
            {user.name}
          </button>
        ) : (
          <button
            className="header__login-button header__clothes-button"
            onClick={loginClickHandler}
          >
            Log in
          </button>
        )}
        {!loginCheck && (
          <button
            className="header__register-button header__clothes-button"
            onClick={registerClickHandler}
          >
            Sign up
          </button>
        )}
        {loginCheck && (
          <NavLink className="header__link" to={loginCheck ? "/profile" : "/"}>
            {user.avatar && !user.avatar.includes("notarealurl") ? (
              <img
                className="header__avatar"
                src={user.avatar}
                id="avatar"
                alt="Your Avatar"
              />
            ) : (
              <h1 className="header__avatar header__avatar_type_default">
                {defaultAvatar}
              </h1>
            )}
          </NavLink>
        )}
      </div>
    </header>
  );
}
