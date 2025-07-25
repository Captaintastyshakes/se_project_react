import "../blocks/ToggleSwitch.css";
import { currentTemperatureContext } from "../contexts/CurrentTemperatureUnitContext.js";
import React from "react";

export default function ToggleSwitch({ checked, onChange }) {
  const temp = React.useContext(currentTemperatureContext);

  return (
    <div className="toggleSwitch__wrapper">
      <input
        className="toggleSwitch__checkbox"
        id="switch"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label
        className="toggleSwitch__label"
        htmlFor="switch"
        style={{ background: checked && "#fff" }}
      >
        {temp.currentTemperatureUnit == "F" && (
          <span className="toggleSwitch__button_type_c">C</span>
        )}
        {
          <span className="toggleSwitch__button">
            {" "}
            <p className="toggleSwitch__button_type_a">
              {temp.currentTemperatureUnit}
            </p>
          </span>
        }
        {temp.currentTemperatureUnit == "C" && (
          <span className="toggleSwitch__button_type_f">F</span>
        )}
      </label>
    </div>
  );
}
