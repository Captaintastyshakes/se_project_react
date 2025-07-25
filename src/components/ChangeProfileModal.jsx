import React from "react";
import ModalWithForm from "./ModalWithForm.jsx";
import { currentUserContext } from "../contexts/CurrentUserContext.js";

export default function ChangeProfileModal({
  onMousedown,
  title,
  buttonText,
  name,
  closeClick,
  submit,
  loading,
  loadingText,
}) {
  const user = React.useContext(currentUserContext);
  const [value, setValue] = React.useState({
    avatar: `${user.avatar}`,
    name: `${user.name}`,
  });

  //submit handler

  const handleSubmit = (evt) => {
    evt.preventDefault();
    submit(value);
  };

  //input handlers

  const handleAvatarInputChange = (evt) => {
    setValue({ ...value, avatar: evt.target.value });
  };

  const handleNameInputChange = (evt) => {
    setValue({ ...value, name: evt.target.value });
  };

  return (
    <ModalWithForm
      onMouseDown={onMousedown}
      closeClick={closeClick}
      name={name}
      onSubmit={handleSubmit}
      title={title}
      buttonText={buttonText}
      loading={loading}
      loadingText={loadingText}
    >
      <label className="modalForm__label">
        Avatar
        <input
          className="modalForm__input"
          onInput={handleAvatarInputChange}
          value={value.avatar}
          name="avatar-input"
          type="url"
          placeholder="avatar url"
          required
        />
      </label>
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
    </ModalWithForm>
  );
}
