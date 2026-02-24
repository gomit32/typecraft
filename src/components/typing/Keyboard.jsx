import React from 'react';
import { KEYBOARD_ROWS } from '../../utils/constants';
import './Keyboard.css';

const Keyboard = ({ activeKey }) => {
  const normalizedKey = activeKey?.toLowerCase();

  return (
    <div className="keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className={`keyboard-row row-${rowIndex}`}>
          {row.map((key) => (
            <div
              key={key}
              className={`key ${normalizedKey === key ? 'active' : ''}`}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
      <div className="keyboard-row row-space">
        <div className={`key space-key ${normalizedKey === ' ' ? 'active' : ''}`}>
          Space
        </div>
      </div>
    </div>
  );
};

export default Keyboard;