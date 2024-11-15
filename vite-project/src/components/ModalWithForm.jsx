import close from "../images/union (1).svg";

export default function ModalWithForm(props) {
  return (
    <>
      <div className="modal" onMouseDown={props.onMouseDown}>
        <button className="modal__exit-button" onClick={props.closeClick}>
          <img className="modal__exit-icon" src={close} alt="close" />
        </button>
        <form
          className={`modal__box modalForm_type_${props.name}`}
          name={props.name}
          onSubmit={props.onSubmit}
        >
          <h2 className="modalForm__title">{props.title}</h2>
          {props.children}
          <button className="modalForm__submit" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
    </>
  );
}
