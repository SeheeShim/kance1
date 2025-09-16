import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/">KANCE</Link>
      </h1>
      <nav className="nav">
        <ul>
          <li><Link to="/Challenge">Challenge</Link>

          </li>
          <li><Link to="/Learning">Learning</Link></li>
          <li><Link to="/Community">Community</Link></li>
          <li><Link to="/Store">Store</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/MyAccount">My Account</Link></li>
          {/* 필요한 메뉴 더 추가 */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;