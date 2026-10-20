import { Link } from 'react-router-dom';
import { navLinks } from './Nav';
import logo from '../assets/logo.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <img src={logo} alt="Little Lemon logo" width="64" height="64" />
        <section aria-labelledby="footer-nav">
          <h2 id="footer-nav">Doormat Navigation</h2>
          <ul>
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="footer-contact">
          <h2 id="footer-contact">Contact</h2>
          <address>
            <p>2395 Maldove Way, Chicago, IL</p>
            <p><a href="tel:+13125550123">(312) 555-0123</a></p>
            <p><a href="mailto:contact@littlelemon.com">contact@littlelemon.com</a></p>
          </address>
        </section>
        <section aria-labelledby="footer-social">
          <h2 id="footer-social">Social Media</h2>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://x.com" target="_blank" rel="noreferrer">X</a></li>
          </ul>
        </section>
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} Little Lemon. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
