import React from "react";
import ModalWithForm from "./ModalWithForm.jsx";
export default function RegisterModal({
  onMousedown,
  title,
  buttonText,
  name,
  closeClick,
  submit,
  loading,
  loadingText,
  handleFormToggle,
  formBButtonText,
}) {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
  });

  //submit handler

  const handleSubmit = (evt) => {
    evt.preventDefault();
    submit(value);
  };

  //input handlers

  const handleEmailInputChange = (evt) => {
    setValue({ ...value, email: evt.target.value });
  };

  const handlePasswordInputChange = (evt) => {
    setValue({ ...value, password: evt.target.value });
  };

  const switchToAltForm = () => {
    closeClick();
    handleFormToggle();
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
      hasAltForm={true}
      formBButtonText={formBButtonText}
      switchToAltForm={switchToAltForm}
    >
      <label className="modalForm__label">
        Email
        <input
          className="modalForm__input"
          onInput={handleEmailInputChange}
          value={value.email}
          name="email-input"
          type="email"
          placeholder="User Email"
          required
        />
      </label>
      <label className="modalForm__label">
        Password
        <input
          className="modalForm__input"
          onInput={handlePasswordInputChange}
          value={value.password}
          name="password-input"
          type="password"
          placeholder="User password"
          required
        />
      </label>
    </ModalWithForm>
  );
}
