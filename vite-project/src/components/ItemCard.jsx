export default function ItemCard(props) {
  return (
    <>
      <li className="itemCard__card" onClick={props.onClick}>
        <p className="itemCard__title">{props.name}</p>
        <img className="itemCard__image" src={props.link} alt={props.name} />
      </li>
    </>
  );
}
