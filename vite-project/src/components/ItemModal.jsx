import close from "../images/union (1).svg";

export default function ItemModal(props) {
  return (
    <>
      <div className="modal" onMouseDown={props.onMouseDown}>
        <button
          className="modal__exit-button"
          type="button"
          onClick={props.closeClick}
        >
          <img className="modal__exit-icon" src={close} alt="close" />
        </button>
        <div className="modal__box modal_type_item" onClick={props.onClick}>
          <img
            className="itemModal__image"
            src={props.data.src}
            alt={props.data.name}
          />
          <p className="itemModal__title">{props.data.name}</p>
          <p className="itemModal__feel">Weather: {props.feel}</p>
        </div>
      </div>
    </>
  );
}
