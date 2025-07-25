import Sidebar from "./Sidebar.jsx";
import ClothesSection from "./ClothesSection.jsx";

export default function Profile({
  items,
  addClick,
  onClick,
  isLoggedIn,
  onCardLike,
}) {
  return (
    <div className="profile__wrapper">
      <Sidebar />
      <ClothesSection
        items={items}
        addClick={addClick}
        onClick={onClick}
        isLoggedIn={isLoggedIn}
        onCardLike={onCardLike}
      />
    </div>
  );
}
