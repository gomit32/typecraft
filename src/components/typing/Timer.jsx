import React from 'react';
import { formatTime } from '../../utils/helpers';
import './Timer.css';

const Timer = ({ timeLeft, totalTime }) => {
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const isLow = timeLeft <= 10;
  const isCritical = timeLeft <= 5;

  return (
    <div className={`timer ${isLow ? 'low' : ''} ${isCritical ? 'critical' : ''}`}>
      <div className="timer-display">
        <span className="timer-icon">⏱️</span>
        <span className="timer-value">{formatTime(timeLeft)}</span>
      </div>
      <div className="timer-bar">
        <div
          className="timer-bar-fill"
          style={{ width: `${100 - progress}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;