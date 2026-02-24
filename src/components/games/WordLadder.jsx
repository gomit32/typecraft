import React, { useState, useCallback } from 'react';
import useSound from '../../hooks/useSound';
import './WordLadder.css';

const ladders = [
  { start: 'cat', end: 'dog', steps: ['cat', 'cot', 'dot', 'dog'] },
  { start: 'head', end: 'tail', steps: ['head', 'heal', 'teal', 'tall', 'tail'] },
  { start: 'cold', end: 'warm', steps: ['cold', 'cord', 'word', 'worm', 'warm'] },
  { start: 'lead', end: 'gold', steps: ['lead', 'load', 'goad', 'gold'] },
  { start: 'fire', end: 'water', steps: ['fire', 'fine', 'wine', 'wane', 'wane', 'water'] },
  { start: 'hide', end: 'seek', steps: ['hide', 'side', 'site', 'sire', 'sere', 'seek'] },
];

const WordLadder = () => {
  const [currentLadder, setCurrentLadder] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [hint, setHint] = useState('');
  const [message, setMessage] = useState('');
  const { playSound } = useSound();

  const startGame = () => {
    const available = ladders.filter((_, i) => !completed.includes(i));
    if (available.length === 0) {
      setCompleted([]);
      startGame();
      return;
    }
    const randomIndex = Math.floor(Math.random() * ladders.length);
    setCurrentLadder({ ...ladders[randomIndex], index: randomIndex });
    setCurrentStep(1);
    setUserInput('');
    setHint('');
    setMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentLadder) return;

    const expected = currentLadder.steps[currentStep].toLowerCase();
    const answer = userInput.trim().toLowerCase();

    if (answer === expected) {
      playSound('keypress');
      setScore(prev => prev + 25);
      setMessage('Correct! ✅');

      if (currentStep + 1 >= currentLadder.steps.length) {
        setCompleted(prev => [...prev, currentLadder.index]);
        setScore(prev => prev + 100);
        setMessage('🎉 Ladder Complete! +100 bonus!');
        playSound('complete');
        setCurrentLadder(null);
      } else {
        setCurrentStep(prev => prev + 1);
      }
      setUserInput('');
      setHint('');
    } else {
      playSound('error');
      setMessage('Wrong! Try again...');
      setUserInput('');
    }
  };

  const showHint = () => {
    if (!currentLadder) return;
    const word = currentLadder.steps[currentStep];
    const revealed = word.charAt(0) + '_'.repeat(word.length - 2) + word.charAt(word.length - 1);
    setHint(`Hint: ${revealed} (${word.length} letters)`);
    setScore(prev => Math.max(0, prev - 10));
  };

  return (
    <div className="word-ladder">
      <div className="game-header">
        <h2 className="game-title">🪜 Word Ladder</h2>
        <p className="game-desc">Change one letter at a time to get from start to end!</p>
      </div>

      <div className="ladder-score">
        <span>Score: <strong>{score}</strong></span>
        <span>Completed: <strong>{completed.length}/{ladders.length}</strong></span>
      </div>

      {!currentLadder ? (
        <div className="game-setup">
          <button className="btn-primary" onClick={startGame}>
            🪜 Start Ladder
          </button>
        </div>
      ) : (
        <div className="ladder-game">
          <div className="ladder-visual">
            {currentLadder.steps.map((step, i) => (
              <div key={i} className={`ladder-step ${i < currentStep ? 'completed' : ''} ${i === currentStep ? 'current' : ''} ${i > currentStep ? 'upcoming' : ''}`}>
                <span className="step-number">{i + 1}</span>
                <span className="step-word">
                  {i === 0 || i < currentStep ? step.toUpperCase() : i === currentStep ? '????' : '____'}
                </span>
                {i === 0 && <span className="step-tag">START</span>}
                {i === currentLadder.steps.length - 1 && <span className="step-tag end">{currentLadder.end.toUpperCase()}</span>}
              </div>
            ))}
          </div>

          {message && (
            <p className={`game-message ${message.includes('✅') || message.includes('🎉') ? 'success' : 'error'}`}>
              {message}
            </p>
          )}

          {hint && <p className="ladder-hint">{hint}</p>}

          <form onSubmit={handleSubmit} className="ladder-form">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type the next word..."
              className="scramble-input"
              autoFocus
            />
            <button type="submit" className="btn-primary">Submit</button>
            <button type="button" className="btn-secondary" onClick={showHint}>
              💡 Hint (-10)
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default WordLadder;