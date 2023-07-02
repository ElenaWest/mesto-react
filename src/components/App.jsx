import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAnimationPopup, setIsAnimationPopup] = useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [selectedCard, setselectedCard] = useState({})
  const [isSend, setIsSend] = useState(false)

  const setStatesForClosePopups  = useCallback (() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAnimationPopup(false);
    setIsDeletePopupOpen(false)
  },[])

  const [currentUser, setCurrentUser] =  useState({})
  const [cards, setCards] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [deleteCardId, setdeleteCardId] = useState('')

  const closeAllPopupForClickOnEsc = useCallback ((e) => {
    if (e.key === 'Escape') {
      setStatesForClosePopups();
      document.addEventListener('keydown', closeAllPopupForClickOnEsc)}
    },[setStatesForClosePopups])

  function setEventListenerForDocument() {
    document.addEventListener('keydown', closeAllPopupForClickOnEsc)
  }

  const closeAllPopups = useCallback(() => {
    setStatesForClosePopups()
    document.removeEventListener('keydown', closeAllPopupForClickOnEsc)
  },[setStatesForClosePopups, closeAllPopupForClickOnEsc])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEventListenerForDocument();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEventListenerForDocument();
  }
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEventListenerForDocument();
  }

  function handleCardClick(card) {
    setselectedCard(card);
    setIsAnimationPopup(true);
    setEventListenerForDocument();
  }

  function handleDeletePopupClick(cardId) {
    setdeleteCardId(cardId);
    setIsDeletePopupOpen(true);
    setEventListenerForDocument();
  }

  useEffect(() => {
    setIsLoading(true)
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, dataCard]) => {
        setCurrentUser(dataUser)
        setCards(dataCard)
        setIsLoading(false)
      })
      .catch((error) => console.error(`Ошибка при загрузке начальных данных страницы ${error}`))
},[])

  function handleCardDelete(e) {
    e.preventDefault()
    setIsSend(true)
    api.deleteCard(deleteCardId)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deleteCardId
        }))
        closeAllPopups()
      })
      .catch((error) => console.error(`Ошибка при удалении карточки ${error}`))
      .finally(() => setIsSend(false))
  }

  function handleUpdateUser(dataUser, reset) {
    setIsSend(true)
    api.setUserInfo(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка при редактировании данных профиля ${error}`))
      .finally(() => setIsSend(false))
  }

  function handleUpdateAvatar(dataUser, reset) {
    setIsSend(true)
    api.setNewAvatar(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка при редактировании изображения ${error}`))
      .finally(() => setIsSend(false))
  }

  function handleAddPlaceSubmit(dataCard, reset) {
    setIsSend(true)
    api.addCard(dataCard)
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups()
        reset()
      })
      .catch((error) => console.error(`Ошибка при добавлении новой карточки ${error}`))
      .finally(() => setIsSend(false))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__contener">
          <Header />
          <Main
          onEditProfile = {handleEditProfileClick}
          onAddPlace = {handleAddPlaceClick}
          onEditAvatar = {handleEditAvatarClick}
          onCardClick = {handleCardClick}
          onDelete = {handleDeletePopupClick}
          cards = {cards}
          isLoading = {isLoading}
           />  
          <Footer />
          <EditProfilePopup
            onUpdateUser = {handleUpdateUser}
            isOpen = {isEditProfilePopupOpen}
            onClose = {closeAllPopups}
            isSend = {isSend}
           />
          <AddPlacePopup
            onAddPlace = {handleAddPlaceSubmit}
            isOpen = {isAddPlacePopupOpen}
            onClose = {closeAllPopups}
            isSend = {isSend}
           />
          <EditAvatarPopup
            onUpdateAvatar = {handleUpdateAvatar}
            isOpen = {isEditAvatarPopupOpen}
            onClose = {closeAllPopups}
            isSend = {isSend}         
           />
          <PopupWithForm
            name='deletecard'
            title='Вы уверены?'
            buttonText='Да'
            isOpen = {isDeletePopupOpen}
            onClose = {closeAllPopups}
            onYesButton = {handleCardDelete}
            isSend = {isSend}
          />
          <ImagePopup
            onClose = {closeAllPopups}
            card = {selectedCard}
            isOpen = {isAnimationPopup}
          />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
