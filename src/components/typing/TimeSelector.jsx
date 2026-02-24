import React from 'react';
import { TIME_OPTIONS } from '../../utils/constants';
import useStore from '../../store/useStore';
import './TimeSelector.css';

const TimeSelector = () => {
  const { timeLimit, setTimeLimit } = useStore();

  return (
    <div className="time-selector">
      <h3 className="selector-label">Duration</h3>
      <div className="time-options">
        {TIME_OPTIONS.map((option) => (
          <button
            key={option.value}
            className={`time-btn ${timeLimit === option.value ? 'active' : ''}`}
            onClick={() => setTimeLimit(option.value)}
          >
            <span className="time-icon">{option.icon}</span>
            <span className="time-label">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSelector;