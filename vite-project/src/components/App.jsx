//imports

import Main from "./Main.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ItemModal from "./ItemModal.jsx";
import ModalWithForm from "./ModalWithForm.jsx";
import Api from "../utils/weatherAPI.js";
import React from "react";
import { baseURL, defaultClothingItems } from "../utils/constants.js";

//initializations

export default function App() {
  const api = new Api(baseURL);

  //hooks

  const [itemModalState, setItemModalState] = React.useState(false);
  const [formModalState, setFormModalState] = React.useState(false);
  const [value, setValue] = React.useState({ name: "", url: "" });
  const [result, setResult] = React.useState("");
  const [weatherFeel, setWeatherFeel] = React.useState("");
  const [imageData, setImageData] = React.useState({});
  const [locationData, setLocationData] = React.useState("");
  const [temperature, setTemperature] = React.useState("");
  const [newItemIndex, setNewItemIndex] = React.useState(6);
  const [radioValue, setRadioValue] = React.useState("");
  const [submitFired, setSubmitFired] = React.useState(false);
  const [clothingData, setClothingData] = React.useState(defaultClothingItems);
  const [weatherConditions, setWeatherConditions] = React.useState("");

  //weather api

  const applyWeatherData = () => {
    //g2g
    api
      .request()
      .then((data) => {
        setLocationData(data.name);
        setTemperature(data.main.temp);
        setWeatherFeel(api.returnFeel(data.main.temp));
        setWeatherConditions(data.weather[0].main);
      })
      .catch(() => {
        alert("Warning! Forecast fetch has failed!");
      });
  };

  React.useEffect(() => {
    //g2g
    applyWeatherData();
  }, []);

  //general modal functions

  const closeModals = () => {
    //g2g
    setFormModalState(false);
    setItemModalState(false);
  };

  const handleEscPress = (evt) => {
    //g2g
    if (evt.key == "Escape") {
      closeModals();
    }
  };

  const handleBoxClick = (evt) => {
    //g2g
    evt.nativeEvent.stopImmediatePropagation();
  };

  const handleModalClick = (evt) => {
    //g2g
    if (evt.target == evt.currentTarget) {
      closeModals();
    }
  };

  //item modal specific functions

  const toggleItemModalState = () => {
    //g2g
    setItemModalState(!itemModalState);
  };

  const storeEventData = (evt) => {
    //g2g
    setImageData({
      src: evt.target.src,
      name: evt.target.alt,
    });
  };

  const handleImageClick = (evt) => {
    //g2g
    if (!evt.target.classList.contains("itemCard__title")) {
      storeEventData(evt);
      toggleItemModalState();
    }
  };

  //form modal specific functions

  const toggleFormModalState = () => {
    //g2g
    setFormModalState(!formModalState);
  };

  const handleAddButtonClick = () => {
    //g2g
    toggleFormModalState();
  };

  const handleNameInputStateChange = (evt) => {
    //g2g
    setValue({ ...value, name: evt.target.value });
  };

  const handleUrlInputStateChange = (evt) => {
    //g2g
    setValue({ ...value, url: evt.target.value });
  };

  const handleRadioInputStateChange = (evt) => {
    //g2g
    setRadioValue(evt.target.value);
  };

  React.useEffect(() => {
    //g2g
    setValue({ ...value, radioValue });
  }, [radioValue]);

  const handleFormSubmit = (evt) => {
    //g2g
    setSubmitFired(true);
    evt.preventDefault();
    setResult(value);
    toggleFormModalState();
  };

  React.useEffect(() => {
    //g2g
    if (submitFired) {
      updateClothes(result);
    }
  }, [submitFired]);

  const updateClothes = (newItem) => {
    //g2g
    const { name, radioValue, url } = newItem;
    const newGarment = {
      _id: newItemIndex,
      name: name,
      weather: radioValue,
      link: url,
    };
    setNewItemIndex(newItemIndex + 1);
    setClothingData([...clothingData, newGarment]);
    setSubmitFired(false);
  };

  React.useEffect(() => {
    //g2g
  }, [clothingData]);

  

  return (
    <>
      <div className="app__page" tabIndex={0} onKeyDown={handleEscPress}>
        <Header onClick={handleAddButtonClick} location={locationData} />
        {
          <Main
            onClick={handleImageClick}
            items={clothingData.filter((item) => item.weather == weatherFeel)}
            Temperature={temperature}
            weather={weatherConditions}
          />
        }
        {itemModalState && (
          <ItemModal
            onClick={handleBoxClick}
            onMouseDown={handleModalClick}
            data={imageData}
            feel={weatherFeel}
            closeClick={toggleItemModalState}
          />
        )}
        {formModalState && (
          <ModalWithForm
            onClick={handleBoxClick}
            onMouseDown={handleModalClick}
            onSubmit={handleFormSubmit}
            title="New garment"
            buttonText="Add Garment"
            name="add-clothes"
            closeClick={toggleFormModalState}
          >
            <label className="modalForm__label">
              Name
              <input
                className="modalForm__input"
                onChange={handleNameInputStateChange}
                name="name-input"
                type="text"
                placeholder="Name"
                required
              />
            </label>
            <label className="modalForm__label">
              Image
              <input
                className="modalForm__input"
                onChange={handleUrlInputStateChange}
                name="url-input"
                type="url"
                placeholder="Image URL"
                required
              />
            </label>
            <div className="modalForm__radio-wrapper">
              Select the weather type
              <label className="modalForm__label_type_radio-button">
                <input
                  className="modalForm__radio-button"
                  type="radio"
                  name="temp-radio"
                  id="hot-radio"
                  value="hot"
                  onChange={handleRadioInputStateChange}
                  required
                />
                Hot
              </label>
              <label className="modalForm__label_type_radio-button">
                <input
                  className="modalForm__radio-button"
                  type="radio"
                  name="temp-radio"
                  id="warm-radio"
                  value="warm"
                  onChange={handleRadioInputStateChange}
                  required
                />
                Warm
              </label>
              <label className="modalForm__label_type_radio-button">
                <input
                  className="modalForm__radio-button"
                  type="radio"
                  name="temp-radio"
                  id="cold-radio"
                  value="cold"
                  onChange={handleRadioInputStateChange}
                  required
                />
                Cold
              </label>
            </div>
          </ModalWithForm>
        )}
        <Footer />
      </div>
    </>
  );
}
