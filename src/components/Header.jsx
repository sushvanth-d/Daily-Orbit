import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './Header.css';

const Header = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <header className="header">
      <h1 className="logo">📰 Daily Orbit</h1>
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(prev => !prev)}
      >
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>
    </header>
  );
};

export default Header;
