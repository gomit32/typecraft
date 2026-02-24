import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaKeyboard, FaGamepad, FaChartBar, FaInfoCircle, FaBars, FaTimes, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import { MdLeaderboard } from 'react-icons/md';
import ThemeToggle from './ThemeToggle';
import useStore from '../../store/useStore';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { soundEnabled, toggleSound, level, xp, streak } = useStore();

  const navLinks = [
    { path: '/', label: 'Home', icon: <FaKeyboard /> },
    { path: '/practice', label: 'Practice', icon: <FaKeyboard /> },
    { path: '/games', label: 'Games', icon: <FaGamepad /> },
    { path: '/stats', label: 'Stats', icon: <FaChartBar /> },
    { path: '/about', label: 'About', icon: <FaInfoCircle /> },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">⌨️</span>
          <span className="logo-text">
            Type<span className="logo-highlight">Craft</span>
          </span>
        </Link>

        <div className="navbar-stats">
          <div className="nav-stat" title="Level">
            <span className="nav-stat-icon">⭐</span>
            <span className="nav-stat-value">Lv.{level}</span>
          </div>
          <div className="nav-stat" title="XP">
            <span className="nav-stat-icon">✨</span>
            <span className="nav-stat-value">{xp} XP</span>
          </div>
          {streak > 0 && (
            <div className="nav-stat streak" title="Streak">
              <span className="nav-stat-icon">🔥</span>
              <span className="nav-stat-value">{streak}</span>
            </div>
          )}
        </div>

        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-link-icon">{link.icon}</span>
              <span className="nav-link-label">{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          <button
            className="nav-action-btn"
            onClick={toggleSound}
            title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
          >
            {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>
          <ThemeToggle />
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;