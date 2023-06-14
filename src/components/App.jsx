import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useState } from "react";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAnimationPopup, setIsAnimationPopup] = useState(false) //Создала стейт, отвечающий за анимацию попапов
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false) //Создала стейт для проверки открытия попапа удаления (не предусмотрено ПР10)
  const [selectedCard, setselectedCard] = useState([])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAnimationPopup(false);
    setIsDeletePopupOpen(false)
  }

  function closeAllPopupsForClickOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups()
    }
  }

  function handleCardClick(card) {
    setselectedCard(card);
    setIsAnimationPopup(true);
  }

  function handleDeletePopupClick() {
    setIsDeletePopupOpen(true)
  }

  return (
    <div className="page__contener">
        <Header />
        <Main
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAddPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        onCardClick = {handleCardClick}
        onDelete = {handleDeletePopupClick}
         />  
        <Footer />
        <PopupWithForm
          name='profile'
          title='Редактировать профиль'
          isOpen = {isEditProfilePopupOpen}
          onClose = {closeAllPopupsForClickOnOverlay}
        >
          <input
            className="popup__input popup__input_user_name"
            id="username"
            name="username"
            type="text"
            placeholder="Имя пользователя"
            minLength={2}
            maxLength={40}
            required=""
          />
          <span id="username-error" className="span span_type_error" />
          <input
            className="popup__input popup__input_user_status"
            id="status"
            name="status"
            type="text"
            placeholder="О себе"
            minLength={2}
            maxLength={200}
            required=""
          />
          <span id="status-error" className="span span_type_error" />
        </PopupWithForm>
        <PopupWithForm
          name='picture'
          title='Новое место'
          buttonText='Создать'
          isOpen = {isAddPlacePopupOpen}
          onClose = {closeAllPopupsForClickOnOverlay}
        >
          <input
            className="popup__input popup__input_place_name"
            id="title"
            name="title"
            type="text"
            placeholder="Название"
            minLength={2}
            maxLength={30}
            required=""
          />
          <span id="title-error" className="span span_type_error" />
          <input
            className="popup__input popup__input_picture_link"
            id="link"
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            required=""
          />
          <span id="link-error" className="span span_type_error" />
        </PopupWithForm>
        <PopupWithForm
          name='avatar'
          title='Обновить аватар'
          isOpen = {isEditAvatarPopupOpen}
          onClose = {closeAllPopupsForClickOnOverlay}
        >
          <input
            className="popup__input popup__input_avatar"
            id="avatar"
            name="avatar"
            type="url"
            placeholder="Ссылка на фото"
            required=""
          />
          <span id="avatar-error" className="span span_type_error" />
        </PopupWithForm>
        <PopupWithForm
          name='deletecard'
          title='Вы уверены?'
          buttonText='Да'
          isOpen={isDeletePopupOpen} //Открываем попап для проверки (не предусмотрено ПР10)
          onClose = {closeAllPopupsForClickOnOverlay}
        />
        <ImagePopup
          onClose={closeAllPopupsForClickOnOverlay}
          card={selectedCard}
          isOpen={isAnimationPopup}
        />
    </div>
  );
}

export default App;
