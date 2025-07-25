import React from "react";
import ModalWithForm from "./ModalWithForm.jsx";

export default function AddItemModal({
  onMouseDown,
  title,
  buttonText,
  name,
  closeClick,
  submit,
  loading,
  loadingText,
}) {
  const [value, setValue] = React.useState({ name: "", url: "", radio: "" });

  //submit handler

  const handleSubmit = (evt) => {
    evt.preventDefault();
    submit(value);
  };

  //input handlers

  const handleNameInputChange = (evt) => {
    setValue({ ...value, name: evt.target.value });
  };

  const handleUrlInputChange = (evt) => {
    setValue({ ...value, url: evt.target.value });
  };

  const handleRadioInputChange = (evt) => {
    setValue({ ...value, radio: evt.target.value });
  };

  return (
    <ModalWithForm
      onMouseDown={onMouseDown}
      closeClick={closeClick}
      name={name}
      onSubmit={handleSubmit}
      title={title}
      buttonText={buttonText}
      loading={loading}
      loadingText={loadingText}
    >
      <label className="modalForm__label">
        Name
        <input
          className="modalForm__input"
          onInput={handleNameInputChange}
          value={value.name}
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
          onInput={handleUrlInputChange}
          value={value.url}
          name="url-input"
          type="url"
          placeholder="Image URL"
          required
        />
      </label>
      <div className="modalForm__radio-wrapper">
        Select the weather
        <label className="modalForm__label_type_radio-button">
          <input
            className="modalForm__radio-button"
            type="radio"
            name="temp-radio"
            id="hot-radio"
            value="hot"
            onChange={handleRadioInputChange}
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
            onChange={handleRadioInputChange}
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
            onChange={handleRadioInputChange}
            required
          />
          Cold
        </label>
      </div>
    </ModalWithForm>
  );
}
