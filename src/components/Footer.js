import React from 'react';
import { FaInstagram, FaYoutube, FaFacebook, FaTwitter } from 'react-icons/fa';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <ul className="footer-links">
          <li><a href="/terms">이용약관</a></li>
          <li><a href="/privacy">개인정보처리방침</a></li>
        </ul>
      </div>

      <div className="footer-info">
        <p>Company Name: <span>캉스</span> | Owner: <span>케이댄스</span></p>
        <p>Business Number: <span>123-45-67890</span></p>
        <p>Address: <span>서울 강남구 가로수길 83</span></p>
        <p>Business License: <span>2025-캉스-0033</span></p>
        <p>Email: <a href="mailto:kanceofficial@gmail.com">kanceofficial@gmail.com</a></p>
      </div>

      <div className="footer-social">
        <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
      </div>

      <div className="footer-bottom">
        <p>Copyright ⓒ 2025. <span>KANCE</span> All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
