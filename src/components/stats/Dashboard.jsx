import React from 'react';
import { FaTrophy, FaKeyboard, FaBullseye, FaFire, FaStar, FaTrash } from 'react-icons/fa';
import useStore from '../../store/useStore';
import ProgressChart from './ProgressChart';
import './Dashboard.css';

const Dashboard = () => {
  const { history, bestWPM, totalTests, streak, level, xp, clearHistory } = useStore();

  const avgWPM = history.length > 0
    ? Math.round(history.reduce((sum, h) => sum + h.wpm, 0) / history.length)
    : 0;

  const avgAccuracy = history.length > 0
    ? Math.round(history.reduce((sum, h) => sum + h.accuracy, 0) / history.length)
    : 0;

  const xpForNextLevel = level * 100;
  const xpProgress = (xp / xpForNextLevel) * 100;

  return (
    <div className="dashboard">
      <div className="level-bar">
        <div className="level-info">
          <span className="level-badge">⭐ Level {level}</span>
          <span className="xp-text">{xp} / {xpForNextLevel} XP</span>
        </div>
        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${xpProgress}%` }} />
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ color: '#6c63ff' }}><FaTrophy /></div>
          <div className="stat-value">{bestWPM}</div>
          <div className="stat-label">Best WPM</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ color: '#2ed573' }}><FaKeyboard /></div>
          <div className="stat-value">{avgWPM}</div>
          <div className="stat-label">Average WPM</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ color: '#ffb347' }}><FaBullseye /></div>
          <div className="stat-value">{avgAccuracy}%</div>
          <div className="stat-label">Avg Accuracy</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ color: '#ff6584' }}><FaFire /></div>
          <div className="stat-value">{streak}</div>
          <div className="stat-label">Day Streak</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ color: '#00d4aa' }}><FaStar /></div>
          <div className="stat-value">{totalTests}</div>
          <div className="stat-label">Tests Taken</div>
        </div>
      </div>

      {history.length > 0 && <ProgressChart history={history} />}

      {history.length > 0 && (
        <div className="history-section">
          <div className="history-header">
            <h3>Recent Tests</h3>
            <button className="clear-btn" onClick={clearHistory}>
              <FaTrash /> Clear
            </button>
          </div>
          <div className="history-list">
            {[...history].reverse().slice(0, 10).map((item, i) => (
              <div key={i} className="history-item">
                <span className="hi-wpm">{item.wpm} WPM</span>
                <span className="hi-accuracy">{item.accuracy}%</span>
                <span className="hi-diff">{item.difficulty}</span>
                <span className="hi-time">{item.timeLimit}s</span>
                <span className="hi-date">{new Date(item.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {history.length === 0 && (
        <div className="no-data">
          <span className="no-data-icon">📊</span>
          <p>No test data yet. Take a typing test to see your stats!</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;