import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
       <header className="header page__sizing">
            <img className="header__logo"></img>
        </header> 
        <main className="main">
            <section className="profile page__sizing">
                <button className="profile__avatar-overlay">
                    <img className="profile__avatar"></img>
                </button>
                <div className="profile__info">
                    <h1 className="profile__name"></h1>
                    <p className="profile__status"></p>
                    <button className="profile__edit-button"></button>
                </div>
                <button className="profile__add-button"></button>
            </section>
            <section className="elements">
                <ul className="elements__list page__sizing"></ul>
            </section>
        </main>
        <footer className="footer page__sizing">
            <p className="footer__copyright">© 2023 Mesto Russia</p>
        </footer>
        <div className="popup popup_type_profile">
            <div className="popup__contener">
                <button className="popup__close"></button>
                <h2 className="popup__title">Редактировать профиль</h2>
                <form className="popup__content">
                    <input className="popup__input popup__input_user_name"></input>
                    <span className="span span_type_error"></span>
                    <input className="popup__input popup__input_user_status"></input>
                    <span className="span span_type_error"></span>
                    <button className="popup__save-button">Сохранить</button>
                </form>
            </div>
        </div>
        <div className="popup popup_type_picture"> 
            <div className="popup__contener">
                <button className="popup__close"></button>
                <h2 className="popup__title">Новое место</h2>
                <form className="popup__content">
                    <input className="popup__input popup__input_place_name"></input>
                    <span className="span span_type_error"></span>
                    <input className="popup__input popup__input_picture_link"></input>
                    <span className="span span_type_error"></span>
                    <button className="popup__save-button">Создать</button>
                </form>
            </div>
        </div>
        <div className="popup popup_type_image">
            <div className="popup__contener popup__contener_type_image">
                <button className="popup__close"></button>
                <figure className="popup__figure">
                    <img className="popup__image"></img>
                    <figcaption className="popup__figcaption"></figcaption>
                </figure>
            </div>
        </div>
        <div className="popup popup_type_avatar">
            <div className="popup__contener popup__contener_type_avatar">
                <button className="popup__close"></button>
                <h2 className="popup__title">Обновить аватар</h2>
                <form className="popup__content">
                    <input className="popup__input popup__input_avatar"></input>
                    <span className="span span_type_error"></span>
                    <button className="popup__save-button">Сохранить</button>
                </form>
            </div>
        </div>
        <div className="popup popup_type_deletecard">
            <div className="popup__contener popup__contener_type_deletecard">
                <button className="popup__close"></button>
                <h2 className="popup__title popup__title_type_deletecard">Вы уверены?</h2>
                <form className="popup__content">
                    <button className="popup__save-button popup__save-button_type_deletecard">Да</button>
                </form>
            </div>
        </div>
        <template id="cardsTemplate">
            <li className="element">
                <img className="element__photo"></img>
                <button className="element__trash"></button>
                <div className="element__name-group">
                    <h2 className="element__title"></h2>
                    <button className="element__heart"></button>
                    <p className="element__number"></p>
                </div>
            </li>
        </template>
    </div>
  );
}

export default App;
