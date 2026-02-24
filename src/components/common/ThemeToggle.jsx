import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import useStore from '../../store/useStore';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useStore();

  return (
    <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
      <div className={`toggle-track ${theme}`}>
        <div className="toggle-thumb">
          {theme === 'dark' ? <FaMoon /> : <FaSun />}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;