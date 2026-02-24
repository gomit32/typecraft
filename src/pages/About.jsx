import React from 'react';
import { FaKeyboard, FaGamepad, FaChartBar, FaHeart, FaCode } from 'react-icons/fa';
import './About.css';

const About = () => {
  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="about-page animate-fadeInUp">
          <div className="about-header">
            <span className="about-emoji">⌨️</span>
            <h1 className="section-title">About TypeCraft</h1>
            <p className="section-subtitle">
              Your personal typing improvement companion
            </p>
          </div>

          <div className="about-content">
            <div className="about-card">
              <h2><FaKeyboard /> What is TypeCraft?</h2>
              <p>
                TypeCraft is a free, beautiful typing practice platform designed to help
                you improve your typing speed and accuracy. Whether you're a beginner
                or an experienced typist, TypeCraft has something for everyone.
              </p>
            </div>

            <div className="about-card">
              <h2><FaGamepad /> Features</h2>
              <ul className="about-list">
                <li>⏱️ Multiple test durations: 30s, 1min, 2min, 5min</li>
                <li>📊 Four difficulty levels: Easy, Medium, Hard, Expert</li>
                <li>🎮 Fun typing games: Word Scramble, Word Rain, Type Racer, Word Ladder, Code Typing</li>
                <li>📈 Detailed statistics and progress tracking</li>
                <li>⭐ XP system with levels and streaks</li>
                <li>🎨 Beautiful dark and light themes</li>
                <li>⌨️ Virtual keyboard with key highlighting</li>
                <li>🔊 Sound effects for immersive experience</li>
              </ul>
            </div>

            <div className="about-card">
              <h2><FaChartBar /> How to Improve</h2>
              <ul className="about-list">
                <li>🎯 Practice consistently every day</li>
                <li>👀 Focus on accuracy first, speed will follow</li>
                <li>🖐️ Use all ten fingers and proper hand placement</li>
                <li>📖 Don't look at the keyboard while typing</li>
                <li>🔄 Gradually increase difficulty as you improve</li>
                <li>🎮 Play games to make practice fun</li>
              </ul>
            </div>

            <div className="about-card">
              <h2><FaCode /> Built With</h2>
              <div className="tech-tags">
                <span className="tech-tag">React</span>
                <span className="tech-tag">Vite</span>
                <span className="tech-tag">Zustand</span>
                <span className="tech-tag">Chart.js</span>
                <span className="tech-tag">React Router</span>
                <span className="tech-tag">React Icons</span>
                <span className="tech-tag">Framer Motion</span>
              </div>
            </div>

            <div className="about-footer">
              <p>
                Made with <FaHeart style={{ color: '#ff6584' }} /> by a passionate developer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;