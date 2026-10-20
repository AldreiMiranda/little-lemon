import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/menu', label: 'Menu' },
  { to: '/booking', label: 'Reservations' },
  { to: '/order', label: 'Order Online' },
  { to: '/login', label: 'Login' },
];

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav" aria-label="Main navigation">
      <button
        type="button"
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="nav-menu"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((o) => !o)}
      >
        <span aria-hidden="true">{open ? '✕' : '☰'}</span>
      </button>
      <ul id="nav-menu" className={`nav__list${open ? ' nav__list--open' : ''}`}>
        {navLinks.map(({ to, label }) => (
          <li key={to}>
            <NavLink to={to} end onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
