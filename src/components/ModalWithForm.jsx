import close from "../images/union (1).svg";

export default function ModalWithForm({
  onMouseDown,
  closeClick,
  name,
  onSubmit,
  title,
  children,
  buttonText,
  loading,
  loadingText,
  hasAltForm,
  formBButtonText,
  switchToAltForm,
}) {
  return (
    <div className="modal" onMouseDown={onMouseDown}>
      <button className="modal__exit-button" onClick={closeClick}>
        <img className="modal__exit-icon" src={close} alt="close" />
      </button>
      <form
        className={`modal__box modalForm_type_${name}`}
        name={name}
        onSubmit={onSubmit}
      >
        <h2 className="modalForm__title">{title}</h2>
        {children}
        <div className="modalForm__submit-button-wrapper">
          <button className="modalForm__submit" type="submit">
            {loading ? loadingText : buttonText}
          </button>
          {hasAltForm ? (
            <button
              className="modalForm__submit modalForm__submit_type_inactive modalForm_submit_type_login-alt"
              type="button"
              onClick={switchToAltForm}
            >
              {formBButtonText}
            </button>
          ) : (
            <></>
          )}
        </div>
      </form>
    </div>
  );
}
