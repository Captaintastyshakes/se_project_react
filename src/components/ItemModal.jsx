import close from "../images/union (1).svg";

import React from "react";
import { currentUserContext } from "../contexts/CurrentUserContext.js";

export default function ItemModal({
  onMouseDown,
  closeClick,
  onClick,
  data,
  delClick,
}) {
  const user = React.useContext(currentUserContext);

  return (
    <div className="modal" onMouseDown={onMouseDown}>
      <button className="modal__exit-button" type="button" onClick={closeClick}>
        <img className="modal__exit-icon" src={close} alt="close" />
      </button>
      <div className="modal__box modal_type_item" onClick={onClick}>
        <img className="itemModal__image" src={data.src} alt={data.name} />
        <div className="itemModal__sub-wrapper">
          <div className="itemModal__descriptor-wrapper">
            <p className="itemModal__title">
              {data.owner === user._id
                ? "You own this item."
                : "You do not own this item."}
            </p>
            <p className="itemModal__feel">Weather: {data.weather}</p>
          </div>
          {data.owner === user._id && (
            <button
              className="deleteModal__button deleteModal_button_type_submit"
              onClick={delClick}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
