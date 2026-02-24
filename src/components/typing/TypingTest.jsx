import React, { useState, useCallback, useEffect, useRef } from 'react';
import TypingArea from './TypingArea';
import Timer from './Timer';
import Results from './Results';
import Keyboard from './Keyboard';
import useStore from '../../store/useStore';
import { getEasyText } from '../../data/easyWords';
import { getMediumText } from '../../data/mediumWords';
import { getHardText } from '../../data/hardWords';
import { getExpertText } from '../../data/expertWords';
import { FaRedo, FaCog } from 'react-icons/fa';
import './TypingTest.css';

const TIME_OPTIONS = [
  { label: '30s', value: 30, icon: '⚡' },
  { label: '1 min', value: 60, icon: '⏱️' },
  { label: '2 min', value: 120, icon: '🕐' },
  { label: '5 min', value: 300, icon: '🏋️' }
];

const DIFFICULTY_LEVELS = [
  { id: 'easy', label: 'Easy', icon: '🌱', color: '#2ed573', desc: 'Common short words' },
  { id: 'medium', label: 'Medium', icon: '🔥', color: '#ffb347', desc: 'Longer vocabulary' },
  { id: 'hard', label: 'Hard', icon: '💎', color: '#ff6584', desc: 'Complex words' },
  { id: 'expert', label: 'Expert', icon: '👑', color: '#ff4757', desc: 'Full sentences' }
];

const getTextForDifficulty = (difficulty, timeLimit) => {
  const baseCount = Math.ceil(timeLimit / 2);
  switch (difficulty) {
    case 'easy': return getEasyText(baseCount);
    case 'medium': return getMediumText(baseCount);
    case 'hard': return getHardText(Math.ceil(baseCount * 0.7));
    case 'expert': return getExpertText(Math.max(3, Math.ceil(baseCount / 20)));
    default: return getEasyText(baseCount);
  }
};

const TypingTest = () => {
  const {
    difficulty, timeLimit, showKeyboard, addToHistory, setDifficulty, setTimeLimit,
    updateBestWPM, incrementTests, addXP, updateStreak
  } = useStore();

  const [text, setText] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [showSettings, setShowSettings] = useState(true);

  // Typing state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charStatuses, setCharStatuses] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [currentKey, setCurrentKey] = useState('');
  const [correctWords, setCorrectWords] = useState(0);
  const [totalWordsAttempted, setTotalWordsAttempted] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [totalCharsTyped, setTotalCharsTyped] = useState(0);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const containerRef = useRef(null);

  // Word-based tracking
  const [currentWordStart, setCurrentWordStart] = useState(0);
  const [currentWordHasError, setCurrentWordHasError] = useState(false);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const finishTest = useCallback(() => {
    stopTimer();
    setIsFinished(true);

    const elapsed = startTimeRef.current
      ? (Date.now() - startTimeRef.current) / 1000
      : timeLimit;

    const finalElapsed = Math.min(elapsed, timeLimit);
    const minutes = finalElapsed / 60;

    const wpm = minutes > 0 ? Math.round(correctWords / minutes) : 0;
    const rawWpm = minutes > 0 ? Math.round((totalCharsTyped / 5) / minutes) : 0;
    const accuracy = totalCharsTyped > 0
      ? Math.round((correctChars / totalCharsTyped) * 100)
      : 0;
    const cpm = finalElapsed > 0
      ? Math.round((correctChars / finalElapsed) * 60)
      : 0;

    const testResults = {
      wpm: Math.max(wpm, 0),
      rawWPM: Math.max(rawWpm, 0),
      accuracy,
      correctChars,
      incorrectChars: totalCharsTyped - correctChars,
      totalChars: totalCharsTyped,
      timeInSeconds: Math.round(finalElapsed),
      cpm,
      correctWords,
      totalWordsAttempted
    };

    setResults(testResults);
    setShowResults(true);

    addToHistory({ ...testResults, difficulty, timeLimit });
    updateBestWPM(testResults.wpm);
    incrementTests();
    updateStreak();

    const xpEarned = Math.round(testResults.wpm * (accuracy / 100));
    addXP(Math.max(xpEarned, 1));
  }, [stopTimer, timeLimit, correctWords, totalCharsTyped, correctChars,
    totalWordsAttempted, difficulty, addToHistory, updateBestWPM,
    incrementTests, addXP, updateStreak]);

  const startTimer = useCallback(() => {
    if (timerRef.current) return;
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const remaining = Math.max(0, timeLimit - Math.floor(elapsed));
      setTimeLeft(remaining);
      setElapsedTime(Math.floor(elapsed));

      if (remaining <= 0) {
        finishTest();
      }
    }, 200);
  }, [timeLimit, finishTest]);

  const handleKeyDown = useCallback((e) => {
    if (isFinished || showResults) return;
    if (!text) return;

    const key = e.key;
    setCurrentKey(key.toLowerCase());

    // Start timer on first keypress
    if (!isStarted && key.length === 1) {
      setIsStarted(true);
      startTimer();
    }

    // Handle Backspace - but only within current word
    if (key === 'Backspace') {
      e.preventDefault();
      // Find current word boundaries
      if (currentIndex > currentWordStart) {
        const newIndex = currentIndex - 1;
        const newStatuses = [...charStatuses];
        newStatuses[newIndex] = undefined;
        setCharStatuses(newStatuses);
        setCurrentIndex(newIndex);
      }
      return;
    }

    // Only handle single characters
    if (key.length !== 1) return;
    e.preventDefault();

    const expectedChar = text[currentIndex];
    if (expectedChar === undefined) return;

    const newStatuses = [...charStatuses];
    const isCorrect = key === expectedChar;

    if (isCorrect) {
      newStatuses[currentIndex] = 'correct';
      setCorrectChars(prev => prev + 1);
    } else {
      newStatuses[currentIndex] = 'incorrect';
      setCurrentWordHasError(true);
    }

    setCharStatuses(newStatuses);
    setTotalCharsTyped(prev => prev + 1);
    setCurrentIndex(prev => prev + 1);

    // Check if we just completed a word (next char is space or end of text)
    const nextChar = text[currentIndex + 1];
    if (expectedChar === ' ' || currentIndex + 1 >= text.length) {
      // Word completed
      setTotalWordsAttempted(prev => prev + 1);
      if (!currentWordHasError && isCorrect) {
        setCorrectWords(prev => prev + 1);
      }
      // Reset for next word
      setCurrentWordStart(currentIndex + 1);
      setCurrentWordHasError(false);
    }

    // Check if we reached the end of text
    if (currentIndex + 1 >= text.length) {
      finishTest();
    }
  }, [currentIndex, text, charStatuses, isStarted, isFinished, showResults,
    startTimer, finishTest, currentWordStart, currentWordHasError]);

  // Focus container
  useEffect(() => {
    if (!showSettings && containerRef.current) {
      containerRef.current.focus();
    }
  }, [showSettings]);

  const handleRestart = () => {
    stopTimer();
    setCurrentIndex(0);
    setCharStatuses([]);
    setIsStarted(false);
    setIsFinished(false);
    setCurrentKey('');
    setCorrectWords(0);
    setTotalWordsAttempted(0);
    setCorrectChars(0);
    setTotalCharsTyped(0);
    setTimeLeft(timeLimit);
    setElapsedTime(0);
    setShowResults(false);
    setResults(null);
    setCurrentWordStart(0);
    setCurrentWordHasError(false);
    startTimeRef.current = null;
    setTimeout(() => containerRef.current?.focus(), 100);
  };

  const handleNewTest = () => {
    stopTimer();
    setShowResults(false);
    setResults(null);
    setShowSettings(true);
  };

  const handleStartTest = () => {
    const newText = getTextForDifficulty(difficulty, timeLimit);
    setText(newText);
    setCurrentIndex(0);
    setCharStatuses([]);
    setIsStarted(false);
    setIsFinished(false);
    setCurrentKey('');
    setCorrectWords(0);
    setTotalWordsAttempted(0);
    setCorrectChars(0);
    setTotalCharsTyped(0);
    setTimeLeft(timeLimit);
    setElapsedTime(0);
    setShowResults(false);
    setResults(null);
    setShowSettings(false);
    setCurrentWordStart(0);
    setCurrentWordHasError(false);
    startTimeRef.current = null;
    setTimeout(() => containerRef.current?.focus(), 100);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  if (showResults && results) {
    return (
      <Results
        results={results}
        onRestart={handleRestart}
        onNewTest={handleNewTest}
      />
    );
  }

  if (showSettings) {
    return (
      <div className="typing-test">
        <div className="test-settings animate-fadeInUp">
          {/* Difficulty Selection */}
          <div className="setting-group">
            <h3 className="setting-label">Difficulty</h3>
            <div className="difficulty-grid">
              {DIFFICULTY_LEVELS.map((level) => (
                <button
                  key={level.id}
                  className={`diff-option ${difficulty === level.id ? 'active' : ''}`}
                  onClick={() => setDifficulty(level.id)}
                  style={{ '--diff-color': level.color }}
                >
                  <span className="diff-option-icon">{level.icon}</span>
                  <span className="diff-option-label">{level.label}</span>
                  <span className="diff-option-desc">{level.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="setting-group">
            <h3 className="setting-label">Duration</h3>
            <div className="time-grid">
              {TIME_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  className={`time-option ${timeLimit === option.value ? 'active' : ''}`}
                  onClick={() => setTimeLimit(option.value)}
                >
                  <span className="time-option-icon">{option.icon}</span>
                  <span className="time-option-label">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="test-start-area">
            <button className="btn-primary start-btn" onClick={handleStartTest}>
              ⌨️ Start Typing Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate live WPM
  const liveMinutes = elapsedTime / 60;
  const liveWPM = liveMinutes > 0 ? Math.round(correctWords / liveMinutes) : 0;

  return (
    <div className="typing-test">
      <div className="test-active" ref={containerRef} tabIndex={0} onKeyDown={handleKeyDown}>
        <div className="test-header">
          <div className="test-info">
            <span className="test-difficulty-badge" style={{
              background: `${DIFFICULTY_LEVELS.find(d => d.id === difficulty)?.color}22`,
              color: DIFFICULTY_LEVELS.find(d => d.id === difficulty)?.color
            }}>
              {DIFFICULTY_LEVELS.find(d => d.id === difficulty)?.icon}{' '}
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>

          <div className="timer-section">
            <Timer timeLeft={timeLeft} totalTime={timeLimit} />
          </div>

          <div className="test-actions">
            <button className="btn-icon" onClick={handleNewTest} title="Settings">
              <FaCog />
            </button>
            <button className="btn-icon" onClick={handleRestart} title="Restart">
              <FaRedo />
            </button>
          </div>
        </div>

        {/* Typing Display */}
        <div className={`typing-display ${isFinished ? 'finished' : ''} ${isStarted ? 'focused' : ''}`}>
          <div className="typing-text-content">
            {text.split('').map((char, index) => {
              let className = 'tchar';
              if (index < currentIndex) {
                className += charStatuses[index] === 'correct' ? ' correct' : ' incorrect';
              } else if (index === currentIndex) {
                className += ' current';
              } else {
                className += ' upcoming';
              }
              return (
                <span key={index} className={className}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </div>
          {!isStarted && (
            <div className="typing-overlay">
              <p>👆 Click here and start typing...</p>
            </div>
          )}
        </div>

        {/* Live Stats */}
        <div className="live-stats-bar">
          <div className="live-stat-item">
            <span className="lsi-value">{liveWPM}</span>
            <span className="lsi-label">WPM</span>
          </div>
          <div className="live-stat-item">
            <span className="lsi-value">{correctWords}</span>
            <span className="lsi-label">Words</span>
          </div>
          <div className="live-stat-item">
            <span className="lsi-value" style={{ color: totalCharsTyped - correctChars > 0 ? '#ff4757' : '#2ed573' }}>
              {totalCharsTyped > 0 ? Math.round((correctChars / totalCharsTyped) * 100) : 100}%
            </span>
            <span className="lsi-label">Accuracy</span>
          </div>
          <div className="live-stat-item">
            <span className="lsi-value" style={{ color: '#ff4757' }}>
              {totalCharsTyped - correctChars}
            </span>
            <span className="lsi-label">Errors</span>
          </div>
        </div>

        {showKeyboard && <Keyboard activeKey={currentKey} />}
      </div>
    </div>
  );
};

export default TypingTest;