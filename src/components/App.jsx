//imports

import Main from "./Main.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ItemModal from "./ItemModal.jsx";
import Api from "../utils/weatherAPI.js";
import React from "react";
import { baseURL, dbApiUrl } from "../utils/constants.js";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./Profile.jsx";
import { CurrentTemperatureContext } from "../contexts/CurrentTemperatureUnitContext.js";
import DeleteModal from "./DeleteModal.jsx";
import DbApi from "../utils/dbAPI.js";
import AuthorizationApi from "../utils/auth.js";
import AddItemModal from "./AddItemModal.jsx";
//new
import RegisterModal from "./RegisterModal.jsx";
import LoginModal from "./LoginModal.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import ChangeProfileModal from "./ChangeProfileModal.jsx";
import RouteProtector from "./RouteProtector.jsx";

//initializations

export default function App() {
  const api = new Api(baseURL);

  const dbApi = new DbApi(dbApiUrl);

  const authApi = new AuthorizationApi(dbApiUrl);

  //hooks

  const [itemModalState, setItemModalState] = React.useState(false);
  const [formModalState, setFormModalState] = React.useState(false);
  const [weatherFeel, setWeatherFeel] = React.useState("");
  const [imageData, setImageData] = React.useState({});
  const [locationData, setLocationData] = React.useState("");
  const [temperature, setTemperature] = React.useState("");
  const [clothingData, setClothingData] = React.useState([]);
  const [weatherConditions, setWeatherConditions] = React.useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    React.useState("F");
  const [celsius, setCelsius] = React.useState(false);
  const [temperatureCelsius, setTemperatureCelsius] = React.useState("");
  const [deleteModalState, setDeleteModalState] = React.useState(false);
  const [deleteData, setDeleteData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [registerModalState, setRegisterModalState] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [loginModalState, setLoginModalState] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [changeProfileState, setChangeProfileState] = React.useState(false);

  //weather api

  const applyWeatherData = () => {
    api
      .request()
      .then((data) => {
        setLocationData(data.name);
        setTemperature(data.main.temp);
        setTemperatureCelsius(Math.round((data.main.temp - 32) * (5 / 9)));
        setWeatherFeel(api.returnFeel(data.main.temp));
        setWeatherConditions(data.weather[0].main);
      })
      .catch(() => {
        alert("Warning! Forecast fetch has failed!");
        setLocationData("Somewhere");
        setTemperature(30);
        setTemperatureCelsius(Math.round((30 - 32) * (5 / 9)));
        setWeatherFeel(api.returnFeel(30));
        setWeatherConditions("sunny");
      });
  };

  //server api

  const loadClothingData = () => {
    dbApi
      .getImages()
      .then((data) => {
        setClothingData(data.data);
      })
      .catch(() => {
        alert(
          "Warning! Loading clothing data has failed; please try again later."
        );
      });
  };

  //this is how the app loads
  React.useEffect(() => {
    applyWeatherData();
    loadClothingData();
  }, []);

  //general modal functions

  const closeModals = () => {
    setFormModalState(false);
    setItemModalState(false);
    setDeleteModalState(false);
    setRegisterModalState(false);
    setLoginModalState(false);
    setChangeProfileState(false);
  };

  const handleEscPress = (evt) => {
    if (evt.key == "Escape") {
      closeModals();
    }
  };

  const handleBoxClick = (evt) => {
    evt.nativeEvent.stopImmediatePropagation();
  };

  const handleModalClick = (evt) => {
    if (evt.target == evt.currentTarget) {
      closeModals();
    }
  };

  //item modal specific functions

  const toggleItemModalState = () => {
    setItemModalState(!itemModalState);
  };

  const storeEventData = (evt) => {
    setImageData({
      src: evt.target.src,
      name: evt.target.alt,
      weather: evt.target.attributes[3].nodeValue,
      id: evt.target.id,
      owner: evt.target.attributes[5].nodeValue,
    });
    setDeleteTarget(evt);
  };

  const handleImageClick = (evt) => {
    if (
      evt.target.classList.contains("itemCard__title") ||
      evt.target.parentNode.classList.contains("itemCard__like-button")
    ) {
      return evt.nativeEvent.stopImmediatePropagation();
    }
    toggleItemModalState();
    storeEventData(evt);
  };

  //form modal specific functions

  const toggleFormModalState = () => {
    setFormModalState(!formModalState);
  };

  const handleAddButtonClick = () => {
    toggleFormModalState();
  };

  const updateClothes = (newItem) => {
    const { name, radio, url } = newItem;
    const newGarment = {
      name: name,
      weather: radio,
      imageUrl: url,
    };

    authApi.setToken(token);
    setIsLoading(true);
    authApi
      .postImage(newGarment)
      .then((item) => {
        //setIsLoading(true);
        setClothingData([item, ...clothingData]);
      })
      .then(() => {
        closeModals();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  //checkbox state handler

  const handleCheckboxClick = () => {
    setCelsius(!celsius);
  };

  React.useEffect(() => {
    if (celsius) {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  }, [celsius]);

  //delete modal stuff

  const setDeleteTarget = (evt) => {
    setDeleteData(evt.target.id);
  };

  const handleDeleteSubmit = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    authApi.setToken(token);
    authApi
      .deleteImage(deleteData)
      .then(() => {
        setClothingData(
          clothingData.filter((item) => {
            return item._id != deleteData;
          })
        );
      })
      .then(() => {
        closeModals();
      })
      .catch(() => {
        alert("Unable to delete image. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggleDeleteModalState = () => {
    setDeleteModalState(!deleteModalState);
  };

  const handleImageModalDelClick = (evt) => {
    toggleDeleteModalState();
  };

  //user registration and login stuff

  const handleLoginClick = () => {
    setLoginModalState(true);
  };

  const handleRegisterClick = () => {
    setRegisterModalState(true);
  };

  const processRegistration = (data) => {
    setIsLoading(true);
    authApi
      .signUp(data)
      .then(() => {
        closeModals();
      })
      .catch((err) => {
        console.log(err);
        alert("Sorry- something went wrong with registration. " + err);
      })
      .finally(() => {
        setIsLoading(false);
        setRegisterModalState(false);
      });
  };

  const toggleRegisterModalState = () => {
    setRegisterModalState(!registerModalState);
  };

  const processSignin = (data) => {
    if (!data.email || !data.password) {
      alert(
        "Missing crucial info like either email or a password- can't proceed!"
      );
      return;
    }
    setIsLoading(true);
    authApi
      .signIn(data)
      .then((res) => {
        if (!res.token) {
          throw new Error("No token found!");
        }
        setUserData(res.approvedData);
        setIsLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        localStorage.setItem("key", data.password);
        localStorage.setItem("moniker", data.email);
        setToken(res.token);
      })
      .then(() => {
        closeModals();
      })
      .catch((err) => {
        console.error;
        alert("Something went wrong and we were unable to log you in. " + err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const processSignout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserData({});
    setToken("");
  };

  const toggleLoginModalState = () => {
    setLoginModalState(!loginModalState);
  };

  //

  const autoLogin = () => {
    const key = {
      email: localStorage.getItem("moniker"),
      password: localStorage.getItem("key"),
    };
    processSignin(key);
  };

  //

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      setToken(localStorage.getItem("jwt"));
      if (localStorage.getItem("key")) {
        autoLogin();
      }
    }
  }, []); //checking tokens and logging in automatically

  //dis/like stuff

  const handleLike = ({ id, isliked }) => {
    authApi.setToken(token);
    !isliked //this variable when camelCased was causing React to complain so in this one instance I have elected to lower case it. This is not a case of negligence- any other instances that aren't camelcased are though, lol.
      ? authApi
          .addLike(id, userData)
          .then((updatedCard) => {
            setClothingData(
              clothingData.map((item) => {
                if (item._id === id) {
                  return updatedCard;
                }
                return item;
              })
            );
          })
          .catch((err) => console.log(err))
      : authApi
          .removeLike(id, userData)
          .then((updatedCard) => {
            setClothingData(
              clothingData.map((item) => {
                if (item._id === id) {
                  return updatedCard;
                }
                return item;
              })
            );
          })
          .catch((err) => console.log(err));
  };

  //changing profile stuff

  const processProfileChange = (data) => {
    authApi.setToken(token);
    setIsLoading(true);
    if (!data.avatar) {
      data.avatar = userData.avatar;
    }
    authApi
      .changeProfile(data)
      .then((updatedUser) => setUserData(updatedUser))
      .then(() => {
        closeModals();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggleChangeProfileModal = () => {
    setChangeProfileState(!changeProfileState);
  };

  return (
    <CurrentUserContext.Provider value={userData}>
      <CurrentTemperatureContext.Provider
        value={{ currentTemperatureUnit, handleCheckboxClick }}
      >
        <div className="app__page" tabIndex={0} onKeyDown={handleEscPress}>
          <Header
            onClick={handleAddButtonClick}
            location={locationData}
            check={celsius}
            handleChange={handleCheckboxClick}
            loginClickHandler={handleLoginClick}
            registerClickHandler={handleRegisterClick}
            loginCheck={isLoggedIn}
            logOut={processSignout}
            changeProfile={toggleChangeProfileModal}
          />
          <Routes>
            {
              <Route
                path="/*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/profile" replace />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              ></Route>
            }
            <Route
              path="/profile"
              element={
                <RouteProtector isLoggedIn={isLoggedIn}>
                  <Profile
                    items={clothingData}
                    addClick={handleAddButtonClick}
                    onClick={handleImageClick}
                    isLoggedIn={isLoggedIn}
                    onCardLike={handleLike}
                    handleChangeProfile={toggleChangeProfileModal}
                    handleLogout={processSignout}
                  />
                </RouteProtector>
              }
            />
            <Route
              path="/"
              element={
                <Main
                  onClick={handleImageClick}
                  items={clothingData.filter(
                    (item) => item.weather === weatherFeel
                  )}
                  Temperature={temperature}
                  tempAlt={temperatureCelsius}
                  weather={weatherConditions}
                  onCardLike={handleLike}
                  addClick={handleAddButtonClick}
                  loggedIn={isLoggedIn}
                />
              }
            />
          </Routes>
          {itemModalState && (
            <ItemModal
              onClick={handleBoxClick}
              onMouseDown={handleModalClick}
              data={imageData}
              closeClick={toggleItemModalState}
              delClick={handleImageModalDelClick}
            />
          )}
          {formModalState && (
            <AddItemModal
              onClick={handleBoxClick}
              onMouseDown={handleModalClick}
              title="New garment"
              buttonText="Add Garment"
              name="add-clothes"
              closeClick={toggleFormModalState}
              submit={updateClothes}
              loading={isLoading}
              loadingText="Adding item..."
            />
          )}
          {deleteModalState && (
            <DeleteModal
              onSubmit={handleDeleteSubmit}
              close={toggleDeleteModalState}
              MouseDown={handleModalClick}
              onClick={handleBoxClick}
              deletingText="Deleting..."
              loading={isLoading}
            />
          )}
          {registerModalState && (
            <RegisterModal
              onClick={handleBoxClick}
              onMousedown={handleModalClick}
              title="New user registration"
              buttonText="Sign up"
              name="signup"
              closeClick={toggleRegisterModalState}
              submit={processRegistration}
              loading={isLoading}
              loadingText="Signing up..."
              handleFormToggle={toggleLoginModalState}
              formBButtonText="Log in"
            />
          )}
          {loginModalState && (
            <LoginModal
              onClick={handleBoxClick}
              onMousedown={handleModalClick}
              title="Log in"
              buttonText="Log in"
              name="signin"
              closeClick={toggleLoginModalState}
              submit={processSignin}
              loading={isLoading}
              loadingText="Logging in..."
              handleFormToggle={toggleRegisterModalState}
              formBButtonText="Sign up"
            />
          )}
          {changeProfileState && isLoggedIn && (
            <ChangeProfileModal
              onClick={handleBoxClick}
              onMousedown={handleModalClick}
              title="Change profile information"
              buttonText="Confirm changes"
              name="change-profile"
              closeClick={toggleChangeProfileModal}
              submit={processProfileChange}
              loading={isLoading}
              loadingText="Submitting changes..."
            />
          )}
          <Footer />
        </div>
      </CurrentTemperatureContext.Provider>
    </CurrentUserContext.Provider>
  );
}
