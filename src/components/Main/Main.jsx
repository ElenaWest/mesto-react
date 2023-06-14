import './Main.css'; //Сделала заранее заготовку в соответствии с рекомендованной структурой
import { useEffect, useState } from 'react';
import api from '../../utils/api.js';
import Card from '../Card/Card.jsx';


function Main({ onEditProfile, onAddPlace , onEditAvatar, onCardClick, onDelete }) {
    const [userName, setUserName] = useState('')
    const [userDescription, setUserDescription] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [cards, setCards] = useState([])

    useEffect(() => {
        Promise.all([api.getInfo(), api.getCards()])
          .then(([dataUser, dataCard]) => {
            setUserName(dataUser.name)
            setUserDescription(dataUser.about)
            setUserAvatar(dataUser.avatar)
            dataCard.forEach(data => data.myid = dataUser._id)
            setCards(dataCard)
          });
    }, [])

    return(
        <main className="main">
            <section className="profile page__sizing">
                <button className="profile__avatar-overlay" type="button" onClick={onEditAvatar}>
                    <img className="profile__avatar" src={userAvatar} alt="Аватар" />
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <p className="profile__status">{userDescription}</p>
                    <button className="profile__edit-button" type="button" aria-label="Редактировать" onClick={onEditProfile} />
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить" onClick={onAddPlace} />
            </section>
            <section className="elements">
                <ul className="elements__list page__sizing">
                    {cards.map(data => {
                        return(
                            <Card key={data._id} card={data} onCardClick={onCardClick} onDelete={onDelete} />
                        )
                    })}
                </ul>
            </section>
        </main>
    );
}

export default Main;