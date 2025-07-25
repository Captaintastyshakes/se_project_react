import Close from "../images/Union (1).svg";

export default function DeleteModal({
  close,
  onSubmit,
  MouseDown,
  onClick,
  deletingText,
  loading,
}) {
  return (
    <div className="modal" onMouseDown={MouseDown}>
      <button className="modal__exit-button" type="button" onClick={close}>
        <img className="deleteModal__close-icon" src={Close} alt="close icon" />
      </button>
      <form
        className="modal__box modal__type_delete"
        onClick={onClick}
        onSubmit={onSubmit}
      >
        <h2 className="deleteModal__title">
          Are you sure you want to delete this item? This action is
          irreversible.
        </h2>
        <div className="deleteModal__sub-wrapper">
          {!loading && (
            <button
              className="deleteModal__button deleteModal__button_type_submit"
              type="submit"
            >
              Yes, delete item
            </button>
          )}
          {loading && (
            <button
              className="deleteModal__button deleteModal__button_type_submit"
              type="submit"
            >
              {deletingText}
            </button>
          )}
          <button className="deleteModal__button" type="button" onClick={close}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
