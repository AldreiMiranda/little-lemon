import { Link } from 'react-router-dom';
import Nav from './Nav';
import logo from '../assets/logo.svg';

function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__brand" aria-label="Little Lemon home">
          <img src={logo} alt="" width="40" height="40" />
          <span>LITTLE LEMON</span>
        </Link>
        <Nav />
      </div>
    </header>
  );
}

export default Header;
