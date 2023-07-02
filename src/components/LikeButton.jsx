import { useEffect, useState } from "react";
import api from "../utils/api.js";

function LikeButton({ likes, myid, cardid }) {
    const [isLike, setIsLike] = useState(false)
    const [count, setCount] = useState(likes.length)

    useEffect(() => {
        setIsLike(likes.some(element => myid === element._id))
    }, [likes, myid])

    function handleLike() {
        if(isLike) {
            api.deleteLike(cardid)
              .then(res => {
                setIsLike(false)
                setCount(res.likes.length)
              })
              .catch((error) => console.error(`Ошибка при снятии лайка ${error}`))
        } else {
            api.addLike(cardid)
              .then(res => {
                setIsLike(true)
                setCount(res.likes.length)
              })
              .catch((error) => console.error(`Ошибка при добавлении лайка ${error}`))
        }
    }

    return(
        <>
        <button className={`element__heart ${isLike ? 'element__heart_active' : ''}`} type="button" aria-label="Нравиться" onClick={handleLike} />
        <p className="element__number">{count}</p>
        </>
    )
}

export default LikeButton;