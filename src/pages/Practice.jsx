import React from 'react';
import TypingTest from '../components/typing/TypingTest';
import './Practice.css';

const Practice = () => {
  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header animate-fadeInDown">
          <h1 className="section-title">⌨️ Typing Practice</h1>
          <p className="section-subtitle">
            Choose your difficulty and duration, then start typing!
          </p>
        </div>
        <TypingTest />
      </div>
    </div>
  );
};

export default Practice;