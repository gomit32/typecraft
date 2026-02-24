import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { FaTrophy, FaBullseye, FaKeyboard, FaRedo, FaChartLine, FaClock, FaBolt } from 'react-icons/fa';
import './Results.css';

const getWPMRating = (wpm) => {
  if (wpm >= 121) return { label: 'Legendary', emoji: '⚡', color: '#ff6584' };
  if (wpm >= 101) return { label: 'Excellent', emoji: '🚀', color: '#6c63ff' };
  if (wpm >= 81) return { label: 'Great', emoji: '✈️', color: '#00b894' };
  if (wpm >= 66) return { label: 'Good', emoji: '🏎️', color: '#2ed573' };
  if (wpm >= 51) return { label: 'Above Average', emoji: '🚴', color: '#ffa502' };
  if (wpm >= 36) return { label: 'Average', emoji: '🏃', color: '#ffb347' };
  if (wpm >= 21) return { label: 'Below Average', emoji: '🚶', color: '#ff6348' };
  return { label: 'Beginner', emoji: '🐢', color: '#ff4757' };
};

const Results = ({ results, onRestart, onNewTest }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const rating = getWPMRating(results.wpm);

  useEffect(() => {
    if (results.wpm > 40) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [results.wpm]);

  return (
    <div className="results animate-scaleIn">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      <div className="results-header">
        <span className="results-emoji">{rating.emoji}</span>
        <h2 className="results-title" style={{ color: rating.color }}>{rating.label}!</h2>
        <p className="results-subtitle">Here's how you performed</p>
      </div>

      {/* Main WPM Display */}
      <div className="wpm-hero" style={{ borderColor: rating.color }}>
        <div className="wpm-number" style={{ color: rating.color }}>{results.wpm}</div>
        <div className="wpm-unit">WPM</div>
        <div className="wpm-sub">Words Per Minute</div>
      </div>

      <div className="results-grid">
        <div className="result-item">
          <FaBullseye style={{ color: '#2ed573' }} />
          <span className="ri-value">{results.accuracy}%</span>
          <span className="ri-label">Accuracy</span>
        </div>

        <div className="result-item">
          <FaBolt style={{ color: '#ffb347' }} />
          <span className="ri-value">{results.rawWPM}</span>
          <span className="ri-label">Raw WPM</span>
        </div>

        <div className="result-item">
          <FaKeyboard style={{ color: '#6c63ff' }} />
          <span className="ri-value">{results.correctChars}</span>
          <span className="ri-label">Correct Chars</span>
        </div>

        <div className="result-item">
          <FaKeyboard style={{ color: '#ff4757' }} />
          <span className="ri-value">{results.incorrectChars}</span>
          <span className="ri-label">Errors</span>
        </div>

        <div className="result-item">
          <FaClock style={{ color: '#00d4aa' }} />
          <span className="ri-value">{results.timeInSeconds}s</span>
          <span className="ri-label">Time</span>
        </div>

        <div className="result-item">
          <FaChartLine style={{ color: '#ff6584' }} />
          <span className="ri-value">{results.cpm}</span>
          <span className="ri-label">CPM</span>
        </div>
      </div>

      <div className="results-actions">
        <button className="btn-primary" onClick={onRestart}>
          <FaRedo /> Try Again
        </button>
        <button className="btn-secondary" onClick={onNewTest}>
          <FaCog /> New Test
        </button>
      </div>
    </div>
  );
};

const FaCog = () => <span>⚙️</span>;

export default Results;