import './Card.css'; //Сделала заранее заготовку в соответствии с рекомендованной структурой

function Card({ card, onCardClick, onDelete }) {
    return(
        <li className="element">
            <img className="element__photo" src={card.link ? card.link : '#'} alt={card.name ? `${card.name}` : '#'} onClick={() => onCardClick({link: card.link, name: card.name})} />
            {/*{card.myid === card.owner._id && <button className="element__trash" type="button" aria-label="Удалить" onClick={onDelete} />} Отображение только своих корзин*/} 
            <button className="element__trash" type="button" aria-label="Удалить" onClick={onDelete} />
            <div className="element__name-group">
                <h2 className="element__title">{card.name}</h2>
                <button className="element__heart" type="button" aria-label="Нравиться" />
                <p className="element__number">{card.likes.length}</p>
            </div>
        </li>
    );
}

export default Card;