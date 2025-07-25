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
        {!loading && (
          <button className="modalForm__submit" type="submit">
            {buttonText}
          </button>
        )}
        {loading && (
          <button className="modalForm__submit" type="submit">
            {loadingText}
          </button>
        )}
      </form>
    </div>
  );
}
