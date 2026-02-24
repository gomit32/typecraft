import React, { useState, useRef, useEffect } from 'react';
import { codeSnippets } from '../../data/codeSnippets';
import useSound from '../../hooks/useSound';
import './CodeTyping.css';

const CodeTyping = () => {
  const [currentSnippet, setCurrentSnippet] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const textareaRef = useRef(null);
  const { playSound } = useSound();

  const startTyping = () => {
    const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    setCurrentSnippet(snippet);
    setUserInput('');
    setStartTime(null);
    setIsFinished(false);
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const handleInput = (e) => {
    if (isFinished) return;

    const value = e.target.value;
    setUserInput(value);

    if (!startTime) {
      setStartTime(Date.now());
    }

    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentSnippet.code[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);

    const correctChars = value.length - errorCount;
    setAccuracy(value.length > 0 ? Math.round((correctChars / value.length) * 100) : 100);

    const elapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60;
    if (elapsed > 0) {
      setWpm(Math.round((correctChars / 5) / elapsed));
    }

    if (value.length >= currentSnippet.code.length) {
      setIsFinished(true);
      playSound('complete');
    }
  };

  return (
    <div className="code-typing">
      <div className="game-header">
        <h2 className="game-title">💻 Code Typing</h2>
        <p className="game-desc">Practice typing real code snippets!</p>
      </div>

      {!currentSnippet ? (
        <div className="game-setup">
          <button className="btn-primary" onClick={startTyping}>
            💻 Start Coding
          </button>
        </div>
      ) : (
        <div className="code-game">
          <div className="code-stats-bar">
            <span className="code-lang">{currentSnippet.language}</span>
            <span>WPM: <strong>{wpm}</strong></span>
            <span>Accuracy: <strong>{accuracy}%</strong></span>
            <span>Errors: <strong style={{ color: errors > 0 ? 'var(--accent-danger)' : 'var(--accent-success)' }}>{errors}</strong></span>
          </div>

          <div className="code-display">
            <pre className="code-target">
              {currentSnippet.code.split('').map((char, i) => {
                let className = 'code-char';
                if (i < userInput.length) {
                  className += userInput[i] === char ? ' correct' : ' incorrect';
                } else if (i === userInput.length) {
                  className += ' current';
                }
                return <span key={i} className={className}>{char}</span>;
              })}
            </pre>
          </div>

          <textarea
            ref={textareaRef}
            value={userInput}
            onChange={handleInput}
            className="code-input"
            placeholder="Start typing the code..."
            disabled={isFinished}
            spellCheck={false}
          />

          {isFinished && (
            <div className="race-result">
              <h3>✅ Code Complete!</h3>
              <p>{wpm} WPM | {accuracy}% Accuracy</p>
              <button className="btn-primary" onClick={startTyping}>Next Snippet</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeTyping;