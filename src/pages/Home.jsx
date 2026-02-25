import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaKeyboard, FaGamepad, FaChartBar, FaTrophy, FaRocket, FaStar, FaBolt } from 'react-icons/fa';
import useStore from '../store/useStore';
import './Home.css';

const Home = () => {
  const { bestWPM, totalTests, streak, level } = useStore();
  const heroRef = useRef(null);
  const floatingRef = useRef(null);

  // Floating keyboard keys animation
  useEffect(() => {
    const keys = ['A', 'S', 'D', 'F', 'J', 'K', 'L', 'W', 'P', 'M', 'T', 'R', 'E'];
    const container = floatingRef.current;
    if (!container) return;

    const createFloatingKey = () => {
      const key = document.createElement('div');
      key.className = 'floating-key';
      key.textContent = keys[Math.floor(Math.random() * keys.length)];
      key.style.left = Math.random() * 100 + '%';
      key.style.animationDuration = (Math.random() * 8 + 6) + 's';
      key.style.animationDelay = Math.random() * 3 + 's';
      key.style.fontSize = (Math.random() * 16 + 14) + 'px';
      key.style.opacity = Math.random() * 0.3 + 0.1;
      container.appendChild(key);

      setTimeout(() => key.remove(), 15000);
    };

    const interval = setInterval(createFloatingKey, 1500);
    for (let i = 0; i < 8; i++) setTimeout(createFloatingKey, i * 500);

    return () => clearInterval(interval);
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouse = (e) => {
      const hero = heroRef.current;
      if (!hero) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      hero.style.setProperty('--mx', x + 'px');
      hero.style.setProperty('--my', y + 'px');
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const features = [
    { icon: <FaKeyboard />, title: 'Typing Tests', desc: '30s, 1min, 2min, 5min with 4 difficulty levels', color: '#6c63ff', link: '/practice' },
    { icon: <FaGamepad />, title: 'Fun Games', desc: 'Word Scramble, Word Rain, Type Racer & more', color: '#ff6584', link: '/games' },
    { icon: <FaChartBar />, title: 'Track Progress', desc: 'Charts, stats, personal bests & history', color: '#2ed573', link: '/stats' },
    { icon: <FaTrophy />, title: 'XP & Levels', desc: 'Earn XP, level up & maintain streaks', color: '#ffb347', link: '/practice' },
  ];

  return (
    <div className="home">
      {/* Floating Keys Background */}
      <div className="floating-keys-container" ref={floatingRef}></div>

      {/* Glowing Orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-content">
          <div className="hero-badge animate-fadeInDown">
            <FaBolt className="badge-icon" />
            The Ultimate Typing Experience
          </div>

          <h1 className="hero-title animate-fadeInUp">
            <span className="title-line">Master Your</span>
            <span className="title-highlight">
              <span className="gradient-text">Typing Speed</span>
              <span className="title-cursor">|</span>
            </span>
          </h1>

          <p className="hero-subtitle animate-fadeInUp delay-200">
            Practice with customizable tests, play addictive games, track your
            progress, and become a typing champion — all in one beautiful place.
          </p>

          <div className="hero-actions animate-fadeInUp delay-300">
            <Link to="/practice" className="hero-btn-primary">
              <FaRocket />
              <span>Start Typing</span>
              <span className="btn-glow"></span>
            </Link>
            <Link to="/games" className="hero-btn-secondary">
              <FaGamepad />
              <span>Play Games</span>
            </Link>
          </div>

          {/* Animated Stats */}
          <div className="hero-stats animate-fadeInUp delay-400">
            <div className="hero-stat">
              <div className="stat-glow"></div>
              <span className="hs-icon">⚡</span>
              <span className="hs-value">{bestWPM || '--'}</span>
              <span className="hs-label">Best WPM</span>
            </div>
            <div className="hero-stat">
              <div className="stat-glow"></div>
              <span className="hs-icon">🎯</span>
              <span className="hs-value">{totalTests}</span>
              <span className="hs-label">Tests Taken</span>
            </div>
            <div className="hero-stat">
              <div className="stat-glow"></div>
              <span className="hs-icon">🔥</span>
              <span className="hs-value">{streak}</span>
              <span className="hs-label">Day Streak</span>
            </div>
            <div className="hero-stat">
              <div className="stat-glow"></div>
              <span className="hs-icon">⭐</span>
              <span className="hs-value">Lv.{level}</span>
              <span className="hs-label">Level</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-dot"></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="features-title">
            <FaStar className="ft-icon" />
            Why TypeCraft?
          </h2>
          <p className="features-subtitle">Everything you need to become a typing master</p>

          <div className="features-grid">
            {features.map((feature, index) => (
              <Link
                to={feature.link}
                key={index}
                className="feature-card"
                style={{ '--card-color': feature.color, animationDelay: `${index * 0.15}s` }}
              >
                <div className="card-bg"></div>
                <div className="feature-icon-wrap">
                  <div className="feature-icon">{feature.icon}</div>
                </div>
                <h3 className="feature-title-text">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
                <span className="feature-arrow">→</span>
                <div className="card-shine"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-bg-effect"></div>
            <h2>Ready to type faster?</h2>
            <p>Join thousands improving their typing speed every day</p>
            <Link to="/practice" className="hero-btn-primary">
              <FaKeyboard />
              <span>Start Now — It's Free</span>
              <span className="btn-glow"></span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
