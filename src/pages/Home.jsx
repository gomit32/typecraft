import React from 'react';
import { Link } from 'react-router-dom';
import { FaKeyboard, FaGamepad, FaChartBar, FaTrophy, FaRocket } from 'react-icons/fa';
import ParticleBackground from '../components/common/ParticleBackground';
import useStore from '../store/useStore';
import './Home.css';

const Home = () => {
  const { bestWPM, totalTests, streak, level } = useStore();

  const features = [
    {
      icon: <FaKeyboard />,
      title: 'Typing Tests',
      desc: '30s, 1min, 2min, 5min tests with 4 difficulty levels',
      color: '#6c63ff',
      link: '/practice'
    },
    {
      icon: <FaGamepad />,
      title: 'Fun Games',
      desc: 'Word Scramble, Word Rain, Type Racer & more',
      color: '#ff6584',
      link: '/games'
    },
    {
      icon: <FaChartBar />,
      title: 'Track Progress',
      desc: 'Detailed stats, charts & personal bests',
      color: '#2ed573',
      link: '/stats'
    },
    {
      icon: <FaTrophy />,
      title: 'XP & Levels',
      desc: 'Earn XP, level up & maintain streaks',
      color: '#ffb347',
      link: '/practice'
    },
  ];

  return (
    <div className="home">
      <ParticleBackground />

      <section className="hero">
        <div className="hero-content animate-fadeInUp">
          <div className="hero-badge">⚡ The Ultimate Typing Experience</div>
          <h1 className="hero-title">
            Master Your
            <span className="hero-highlight"> Typing Speed</span>
          </h1>
          <p className="hero-subtitle">
            Practice with customizable tests, play fun games, track your progress,
            and become a typing champion — all in one beautiful place.
          </p>
          <div className="hero-actions">
            <Link to="/practice" className="btn-primary hero-btn">
              <FaRocket /> Start Typing
            </Link>
            <Link to="/games" className="btn-secondary hero-btn">
              <FaGamepad /> Play Games
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hs-value">{bestWPM || '--'}</span>
              <span className="hs-label">Best WPM</span>
            </div>
            <div className="hero-stat">
              <span className="hs-value">{totalTests}</span>
              <span className="hs-label">Tests Taken</span>
            </div>
            <div className="hero-stat">
              <span className="hs-value">{streak}</span>
              <span className="hs-label">Day Streak</span>
            </div>
            <div className="hero-stat">
              <span className="hs-value">Lv.{level}</span>
              <span className="hs-label">Level</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why TypeCraft?</h2>
          <p className="section-subtitle">Everything you need to become a typing master</p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <Link
                to={feature.link}
                key={index}
                className="feature-card animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-icon" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
                <span className="feature-arrow">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to improve your typing?</h2>
            <p>Start practicing now and see your speed increase day by day!</p>
            <Link to="/practice" className="btn-primary">
              <FaKeyboard /> Begin Practice
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;