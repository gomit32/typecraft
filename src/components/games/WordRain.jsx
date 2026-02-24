import React, { useState, useEffect, useCallback, useRef } from 'react';
import { gameWords } from '../../data/gameWords';
import useSound from '../../hooks/useSound';
import './WordRain.css';

const WordRain = () => {
  const [fallingWords, setFallingWords] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(3000);
  const [wordsTyped, setWordsTyped] = useState(0);
  const inputRef = useRef(null);
  const gameRef = useRef(null);
  const { playSound } = useSound();

  const spawnWord = useCallback(() => {
    const words = gameWords.easy;
    const word = words[Math.floor(Math.random() * words.length)];
    const newWord = {
      id: Date.now() + Math.random(),
      text: word,
      left: Math.random() * 80 + 10,
      top: -10,
    };
    setFallingWords(prev => [...prev, newWord]);
  }, []);

  useEffect(() => {
    if (!isPlaying || lives <= 0) return;

    const spawnInterval = setInterval(spawnWord, speed);
    return () => clearInterval(spawnInterval);
  }, [isPlaying, lives, speed, spawnWord]);

  useEffect(() => {
    if (!isPlaying || lives <= 0) return;

    const moveInterval = setInterval(() => {
      setFallingWords(prev => {
        const updated = prev.map(w => ({ ...w, top: w.top + 2 }));
        const fallen = updated.filter(w => w.top >= 100);
        if (fallen.length > 0) {
          setLives(l => Math.max(0, l - fallen.length));
        }
        return updated.filter(w => w.top < 100);
      });
    }, 100);

    return () => clearInterval(moveInterval);
  }, [isPlaying, lives]);

  useEffect(() => {
    if (lives <= 0 && isPlaying) {
      setIsPlaying(false);
      playSound('error');
    }
  }, [lives, isPlaying, playSound]);

  useEffect(() => {
    if (wordsTyped > 0 && wordsTyped % 5 === 0) {
      setSpeed(prev => Math.max(800, prev - 200));
    }
  }, [wordsTyped]);

  const handleInput = (e) => {
    const value = e.target.value.trim().toLowerCase();
    setUserInput(e.target.value);

    const matchIndex = fallingWords.findIndex(
      w => w.text.toLowerCase() === value
    );

    if (matchIndex !== -1) {
      const matched = fallingWords[matchIndex];
      const points = matched.text.length * 10;
      setScore(prev => prev + points);
      setWordsTyped(prev => prev + 1);
      setFallingWords(prev => prev.filter((_, i) => i !== matchIndex));
      setUserInput('');
      playSound('keypress');
    }
  };

  const startGame = () => {
    setFallingWords([]);
    setScore(0);
    setLives(5);
    setSpeed(3000);
    setWordsTyped(0);
    setUserInput('');
    setIsPlaying(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="word-rain">
      <div className="game-header">
        <h2 className="game-title">🌧️ Word Rain</h2>
        <p className="game-desc">Type the falling words before they reach the bottom!</p>
      </div>

      {!isPlaying && lives > 0 && (
        <div className="game-setup">
          <button className="btn-primary" onClick={startGame}>
            🎮 Start Game
          </button>
        </div>
      )}

      {isPlaying && (
        <>
          <div className="game-stats-bar">
            <div className="game-stat">
              <span className="gs-label">Score</span>
              <span className="gs-value">{score}</span>
            </div>
            <div className="game-stat">
              <span className="gs-label">Lives</span>
              <span className="gs-value">{'❤️'.repeat(lives)}</span>
            </div>
            <div className="game-stat">
              <span className="gs-label">Words</span>
              <span className="gs-value">{wordsTyped}</span>
            </div>
          </div>

          <div className="rain-area" ref={gameRef}>
            {fallingWords.map(word => (
              <div
                key={word.id}
                className="rain-word"
                style={{
                  left: `${word.left}%`,
                  top: `${word.top}%`,
                }}
              >
                {word.text}
              </div>
            ))}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInput}
            className="rain-input"
            placeholder="Type the words..."
            autoFocus
          />
        </>
      )}

      {!isPlaying && lives <= 0 && (
        <div className="game-over">
          <h3>💀 Game Over!</h3>
          <div className="final-stats">
            <div className="final-stat">
              <span className="fs-value">{score}</span>
              <span className="fs-label">Score</span>
            </div>
            <div className="final-stat">
              <span className="fs-value">{wordsTyped}</span>
              <span className="fs-label">Words Typed</span>
            </div>
          </div>
          <button className="btn-primary" onClick={startGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default WordRain;