import Sidebar from "./Sidebar.jsx";
import ClothesSection from "./ClothesSection.jsx";

export default function Profile({
  items,
  addClick,
  onClick,
  isLoggedIn,
  onCardLike,
  handleChangeProfile,
  handleLogout,
}) {
  return (
    <div className="profile__wrapper">
      <Sidebar
        handleChangeProfile={handleChangeProfile}
        handleLogout={handleLogout}
      />
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
