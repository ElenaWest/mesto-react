import './Header.css'; //Сделала заранее заготовку в соответствии с рекомендованной структурой
import logo from '../../images/logo.svg';

function Header() {
    return(
        <header className="header page__sizing">
            <img 
              className="header__logo" 
              src={logo} 
              alt="Логотип Место"
               />
        </header>
    );
}

export default Header;