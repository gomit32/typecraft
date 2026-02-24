import React, { useState, useEffect, useCallback } from 'react';
import { gameWords, scrambleWord } from '../../data/gameWords';
import useSound from '../../hooks/useSound';
import './WordScramble.css';

const WordScramble = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [currentWord, setCurrentWord] = useState('');
  const [scrambled, setScrambled] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState('');
  const [totalWords, setTotalWords] = useState(0);
  const { playSound } = useSound();

  const getNewWord = useCallback(() => {
    const words = gameWords[difficulty] || gameWords.easy;
    const word = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(word);
    setScrambled(scrambleWord(word));
    setUserInput('');
    setMessage('');
  }, [difficulty]);

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setTimeLeft(30);
    setTotalWords(0);
    setIsPlaying(true);
    getNewWord();
  };

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) {
      if (timeLeft <= 0) setIsPlaying(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPlaying) return;

    if (userInput.toLowerCase().trim() === currentWord.toLowerCase()) {
      const points = currentWord.length * 10 * (streak + 1);
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setTotalWords(prev => prev + 1);
      setMessage(`+${points} points!`);
      playSound('keypress');
      getNewWord();
    } else {
      setStreak(0);
      setMessage('Wrong! Try again...');
      playSound('error');
      setUserInput('');
    }
  };

  const handleSkip = () => {
    setStreak(0);
    setMessage(`The word was: ${currentWord}`);
    setTimeout(() => getNewWord(), 1000);
  };

  return (
    <div className="word-scramble">
      <div className="game-header">
        <h2 className="game-title">🔤 Word Scramble</h2>
        <p className="game-desc">Unscramble the word before time runs out!</p>
      </div>

      {!isPlaying && timeLeft > 0 && (
        <div className="game-setup">
          <div className="game-difficulty">
            {['easy', 'medium', 'hard'].map(d => (
              <button
                key={d}
                className={`diff-btn ${difficulty === d ? 'active' : ''}`}
                onClick={() => setDifficulty(d)}
              >
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
          <button className="btn-primary" onClick={startGame}>
            🎮 Start Game
          </button>
        </div>
      )}

      {isPlaying && (
        <div className="game-active">
          <div className="game-stats-bar">
            <div className="game-stat">
              <span className="gs-label">Score</span>
              <span className="gs-value">{score}</span>
            </div>
            <div className="game-stat">
              <span className="gs-label">Time</span>
              <span className="gs-value timer-val">{timeLeft}s</span>
            </div>
            <div className="game-stat">
              <span className="gs-label">Streak</span>
              <span className="gs-value">{streak}🔥</span>
            </div>
          </div>

          <div className="scramble-display">
            {scrambled.split('').map((letter, i) => (
              <span key={i} className="scramble-letter" style={{ animationDelay: `${i * 0.1}s` }}>
                {letter.toUpperCase()}
              </span>
            ))}
          </div>

          {message && (
            <p className={`game-message ${message.includes('+') ? 'success' : 'error'}`}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="scramble-form">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your answer..."
              className="scramble-input"
              autoFocus
            />
            <button type="submit" className="btn-primary">Submit</button>
            <button type="button" className="btn-secondary" onClick={handleSkip}>Skip</button>
          </form>
        </div>
      )}

      {!isPlaying && timeLeft <= 0 && (
        <div className="game-over">
          <h3>⏰ Time's Up!</h3>
          <div className="final-stats">
            <div className="final-stat">
              <span className="fs-value">{score}</span>
              <span className="fs-label">Final Score</span>
            </div>
            <div className="final-stat">
              <span className="fs-value">{totalWords}</span>
              <span className="fs-label">Words Solved</span>
            </div>
          </div>
          <button className="btn-primary" onClick={startGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default WordScramble;