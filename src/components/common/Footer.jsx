import React from 'react';
import { FaHeart } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <span className="footer-logo">⌨️ TypeCraft</span>
          <p className="footer-tagline">Master your typing, one key at a time.</p>
        </div>
        <div className="footer-center">
          <p>
            Made with <FaHeart className="heart-icon" /> for typing enthusiasts
          </p>
        </div>
        <div className="footer-right">
          <p className="footer-copyright">© 2024 TypeCraft</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
