import React, { useState } from 'react';
import WordScramble from '../components/games/WordScramble';
import WordRain from '../components/games/WordRain';
import TypeRacer from '../components/games/TypeRacer';
import WordLadder from '../components/games/WordLadder';
import CodeTyping from '../components/games/CodeTyping';
import './Games.css';

const gamesData = [
  { id: 'scramble', label: 'Word Scramble', icon: '🔤', component: WordScramble },
  { id: 'rain', label: 'Word Rain', icon: '🌧️', component: WordRain },
  { id: 'racer', label: 'Type Racer', icon: '🏎️', component: TypeRacer },
  { id: 'ladder', label: 'Word Ladder', icon: '🪜', component: WordLadder },
  { id: 'code', label: 'Code Typing', icon: '💻', component: CodeTyping },
];

const Games = () => {
  const [activeGame, setActiveGame] = useState(null);

  const ActiveComponent = activeGame
    ? gamesData.find(g => g.id === activeGame)?.component
    : null;

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="page-header animate-fadeInDown">
          <h1 className="section-title">🎮 Fun Games</h1>
          <p className="section-subtitle">
            Improve your typing skills while having fun!
          </p>
        </div>

        {!activeGame ? (
          <div className="games-grid">
            {gamesData.map((game, index) => (
              <button
                key={game.id}
                className="game-card animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setActiveGame(game.id)}
              >
                <span className="game-card-icon">{game.icon}</span>
                <h3 className="game-card-title">{game.label}</h3>
                <span className="game-card-play">Play →</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="game-active-area">
            <button
              className="back-btn"
              onClick={() => setActiveGame(null)}
            >
              ← Back to Games
            </button>
            {ActiveComponent && <ActiveComponent />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;