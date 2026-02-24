import React from 'react';
import Dashboard from '../components/stats/Dashboard';
import './Stats.css';

const Stats = () => {
  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header animate-fadeInDown">
          <h1 className="section-title">📊 Your Statistics</h1>
          <p className="section-subtitle">
            Track your typing journey and see your improvement
          </p>
        </div>
        <Dashboard />
      </div>
    </div>
  );
};

export default Stats;