function PopupWithForm({ title, name, buttonText, children, isOpen, onClose }) {
    return(
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={onClose} >
            <div className="popup__contener">
                <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose} />
                <h2 className={`popup__title ${name === 'deletecard' && 'popup__title_type_deletecard'}`}>{title}</h2>
                <form className="popup__content" name="profile" noValidate="">
                    {children}
                    <button className="popup__save-button" type="submit">{buttonText || 'Сохранить'}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;