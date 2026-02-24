import React, { useState, useEffect, useCallback } from 'react';
import { sentences } from '../../data/sentences';
import useSound from '../../hooks/useSound';
import './TypeRacer.css';

const TypeRacer = () => {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isRacing, setIsRacing] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [progress, setProgress] = useState(0);
  const [botProgress, setBotProgress] = useState(0);
  const [finished, setFinished] = useState(false);
  const [botSpeed] = useState(40 + Math.random() * 30);
  const { playSound } = useSound();

  const startRace = () => {
    const allSentences = sentences.medium;
    const sentence = allSentences[Math.floor(Math.random() * allSentences.length)];
    setText(sentence);
    setUserInput('');
    setProgress(0);
    setBotProgress(0);
    setFinished(false);
    setWpm(0);
    setStartTime(null);
    setIsRacing(true);
  };

  useEffect(() => {
    if (!isRacing || finished) return;

    const botInterval = setInterval(() => {
      setBotProgress(prev => {
        const newProgress = prev + (botSpeed / 60) * 2;
        if (newProgress >= 100) {
          clearInterval(botInterval);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(botInterval);
  }, [isRacing, finished, botSpeed]);

  const handleInput = useCallback((e) => {
    if (finished) return;

    const value = e.target.value;
    setUserInput(value);

    if (!startTime) {
      setStartTime(Date.now());
    }

    const currentProgress = (value.length / text.length) * 100;
    setProgress(Math.min(currentProgress, 100));

    const elapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60;
    if (elapsed > 0) {
      const words = value.trim().split(/\s+/).length;
      setWpm(Math.round(words / elapsed));
    }

    if (value === text) {
      setFinished(true);
      setProgress(100);
      playSound('complete');
    }
  }, [text, startTime, finished, playSound]);

  const playerWon = finished && progress >= botProgress;

  return (
    <div className="type-racer">
      <div className="game-header">
        <h2 className="game-title">🏎️ Type Racer</h2>
        <p className="game-desc">Race against the bot! Type the sentence accurately.</p>
      </div>

      {!isRacing && (
        <div className="game-setup">
          <button className="btn-primary" onClick={startRace}>
            🏁 Start Race
          </button>
        </div>
      )}

      {isRacing && (
        <div className="race-area">
          <div className="race-tracks">
            <div className="race-track">
              <span className="racer-label">You 🚗</span>
              <div className="track-bar">
                <div className="track-fill player" style={{ width: `${progress}%` }}>
                  🚗
                </div>
              </div>
              <span className="racer-wpm">{wpm} WPM</span>
            </div>

            <div className="race-track">
              <span className="racer-label">Bot 🤖</span>
              <div className="track-bar">
                <div className="track-fill bot" style={{ width: `${botProgress}%` }}>
                  🤖
                </div>
              </div>
              <span className="racer-wpm">{Math.round(botSpeed)} WPM</span>
            </div>
          </div>

          <div className="race-text">
            {text.split('').map((char, i) => {
              let className = 'race-char';
              if (i < userInput.length) {
                className += userInput[i] === char ? ' correct' : ' incorrect';
              } else if (i === userInput.length) {
                className += ' current';
              }
              return <span key={i} className={className}>{char}</span>;
            })}
          </div>

          <textarea
            value={userInput}
            onChange={handleInput}
            className="race-input"
            placeholder="Start typing here..."
            autoFocus
            disabled={finished}
          />

          {finished && (
            <div className="race-result">
              <h3>{playerWon ? '🏆 You Won!' : '😢 Bot Won!'}</h3>
              <p>Your speed: {wpm} WPM</p>
              <button className="btn-primary" onClick={startRace}>Race Again</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TypeRacer;