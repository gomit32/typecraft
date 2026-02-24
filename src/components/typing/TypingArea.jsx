import React, { useRef, useEffect } from 'react';
import './TypingArea.css';

const TypingArea = ({ text, charStatuses, currentIndex, isFinished, onKeyDown }) => {
  const containerRef = useRef(null);
  const activeCharRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (activeCharRef.current) {
      activeCharRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentIndex]);

  return (
    <div
      className={`typing-area ${isFinished ? 'finished' : ''}`}
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="typing-text">
        {text.split('').map((char, index) => {
          let className = 'char';

          if (index < currentIndex) {
            className += charStatuses[index] === 'correct' ? ' correct' : ' incorrect';
          } else if (index === currentIndex) {
            className += ' current';
          } else {
            className += ' upcoming';
          }

          return (
            <span
              key={index}
              className={className}
              ref={index === currentIndex ? activeCharRef : null}
            >
              {char}
            </span>
          );
        })}
      </div>
      {!isFinished && (
        <p className="typing-hint">Click here and start typing...</p>
      )}
    </div>
  );
};

export default TypingArea;