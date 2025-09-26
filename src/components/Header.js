import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/">KANCE</Link>
      </h1>

      {/* PC nav */}
      <nav className="nav">
        <ul>
          <li><Link to="/Challenge">Challenge</Link></li>
          <li><Link to="/Learning">Learning</Link></li>
          <li><Link to="/Community">Community</Link></li>
          <li>
            <Link to="/Store">Store</Link>
            <ul>
              <li><Link to="/Store/dancewear">댄스웨어</Link></li>
              <li><Link to="/Store/stagewear">스테이지웨어</Link></li>
              <li><Link to="/Store/acc">ACC</Link></li>
              <li><Link to="/Store/shoes">SHOES</Link></li>
            </ul>
          </li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/MyAccount">My Account</Link></li>
        </ul>
      </nav>

      {/* 햄버거 버튼 */}
      <div 
        className="hamburger" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* 모바일 nav */}
      <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/Challenge">Challenge</Link>
        <Link to="/Learning">Learning</Link>
        <Link to="/Community">Community</Link>
        <Link to="/Store">Store</Link>
        <Link to="/About">About</Link>
        <Link to="/MyAccount">My Account</Link>
      </nav>
    </header>
  );
};

export default Header;
