import avatar from "../images/ellipse 18.png";

export default function Header(props) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="header__wrapper">
      <div className="header__sub-wrapper">
        <p className="header__logo">WTWR°</p>
        <p className="header__time-location">
          {currentDate}, {props.location}
        </p>
      </div>
      <div className="header__sub-wrapper">
        <button
          className="header__clothes-button"
          onClick={props.onClick}
          type="button"
        >
          +Add Clothes
        </button>
        <p className="header__name">Firstname Lastname</p>
        <img
          className="header__avatar"
          src={avatar}
          id="avatar"
          alt="Your Avatar"
        />
      </div>
    </div>
  );
}
