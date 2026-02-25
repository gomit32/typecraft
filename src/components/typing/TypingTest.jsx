import React, { useState, useCallback, useEffect, useRef } from 'react';
import Timer from './Timer';
import Results from './Results';
import Keyboard from './Keyboard';
import useStore from '../../store/useStore';
import useSound from '../../hooks/useSound';
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
  const baseCount = Math.ceil(timeLimit * 1.5);
  switch (difficulty) {
    case 'easy': return getEasyText(baseCount);
    case 'medium': return getMediumText(baseCount);
    case 'hard': return getHardText(Math.ceil(baseCount * 0.7));
    case 'expert': return getExpertText(Math.max(4, Math.ceil(baseCount / 15)));
    default: return getEasyText(baseCount);
  }
};

const TypingTest = () => {
  const {
    difficulty, timeLimit, showKeyboard, addToHistory, setDifficulty, setTimeLimit,
    updateBestWPM, incrementTests, addXP, updateStreak
  } = useStore();

  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [wordResults, setWordResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [showSettings, setShowSettings] = useState(true);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [currentKey, setCurrentKey] = useState('');
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);

  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const inputRef = useRef(null);
  const { playSound } = useSound();

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
      ? Math.min((Date.now() - startTimeRef.current) / 1000, timeLimit)
      : timeLimit;

    const minutes = elapsed / 60;
    const correctWords = wordResults.filter(w => w === 'correct').length;
    const totalWordsTyped = wordResults.length;
    const wpm = minutes > 0 ? Math.round(correctWords / minutes) : 0;
    const rawWpm = minutes > 0 ? Math.round(totalWordsTyped / minutes) : 0;
    const accuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 0;
    const cpm = elapsed > 0 ? Math.round((correctKeystrokes / elapsed) * 60) : 0;

    const testResults = {
      wpm,
      rawWPM: rawWpm,
      accuracy,
      correctChars: correctKeystrokes,
      incorrectChars: totalKeystrokes - correctKeystrokes,
      totalChars: totalKeystrokes,
      timeInSeconds: Math.round(elapsed),
      cpm,
      correctWords,
      totalWordsAttempted: totalWordsTyped
    };

    setResults(testResults);
    setShowResults(true);
    playSound('complete');

    addToHistory({ ...testResults, difficulty, timeLimit });
    updateBestWPM(testResults.wpm);
    incrementTests();
    updateStreak();
    addXP(Math.max(Math.round(wpm * (accuracy / 100)), 1));
  }, [stopTimer, timeLimit, wordResults, totalKeystrokes, correctKeystrokes,
    difficulty, addToHistory, updateBestWPM, incrementTests, addXP, updateStreak, playSound]);

  const startTimer = useCallback(() => {
    if (timerRef.current) return;
    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const remaining = Math.max(0, timeLimit - Math.floor(elapsed));
      setTimeLeft(remaining);

      if (remaining <= 0) {
        finishTest();
      }
    }, 200);
  }, [timeLimit, finishTest]);

  const handleInput = useCallback((e) => {
    if (isFinished) return;

    const value = e.target.value;

    if (!isStarted) {
      setIsStarted(true);
      startTimer();
    }

    // Space pressed = submit word
    if (value.endsWith(' ')) {
      const typed = value.trim();
      const expected = words[currentWordIndex];

      if (typed.length === 0) return;

      // Check if word is correct
      const isCorrect = typed === expected;
      setWordResults(prev => [...prev, isCorrect ? 'correct' : 'incorrect']);

      // Count keystrokes
      const wordLen = expected.length;
      setTotalKeystrokes(prev => prev + typed.length);

      if (isCorrect) {
        setCorrectKeystrokes(prev => prev + wordLen);
        playSound('keypress');
      } else {
        // Count correct characters within the word
        let correctCharsInWord = 0;
        for (let i = 0; i < Math.min(typed.length, expected.length); i++) {
          if (typed[i] === expected[i]) correctCharsInWord++;
        }
        setCorrectKeystrokes(prev => prev + correctCharsInWord);
        playSound('error');
      }

      // Move to next word
      setCurrentWordIndex(prev => prev + 1);
      setCurrentInput('');

      // Check if all words done
      if (currentWordIndex + 1 >= words.length) {
        finishTest();
      }
      return;
    }

    setCurrentInput(value);
    setCurrentKey(value.length > 0 ? value[value.length - 1] : '');
  }, [isFinished, isStarted, words, currentWordIndex, startTimer, finishTest, playSound]);

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  const handleStartTest = () => {
    const text = getTextForDifficulty(difficulty, timeLimit);
    setWords(text.split(' '));
    setCurrentWordIndex(0);
    setCurrentInput('');
    setWordResults([]);
    setIsStarted(false);
    setIsFinished(false);
    setCurrentKey('');
    setTotalKeystrokes(0);
    setCorrectKeystrokes(0);
    setTimeLeft(timeLimit);
    setShowResults(false);
    setResults(null);
    setShowSettings(false);
    startTimeRef.current = null;
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleRestart = () => {
    stopTimer();
    setCurrentWordIndex(0);
    setCurrentInput('');
    setWordResults([]);
    setIsStarted(false);
    setIsFinished(false);
    setCurrentKey('');
    setTotalKeystrokes(0);
    setCorrectKeystrokes(0);
    setTimeLeft(timeLimit);
    setShowResults(false);
    setResults(null);
    startTimeRef.current = null;
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleNewTest = () => {
    stopTimer();
    setShowResults(false);
    setResults(null);
    setShowSettings(true);
  };

  if (showResults && results) {
    return <Results results={results} onRestart={handleRestart} onNewTest={handleNewTest} />;
  }

  if (showSettings) {
    return (
      <div className="typing-test">
        <div className="test-settings animate-fadeInUp">
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
            <button className="btn-primary start-btn" onClick={handleStartTest}>⌨️ Start Typing Test</button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate live stats
  const elapsed = startTimeRef.current ? (Date.now() - startTimeRef.current) / 1000 / 60 : 0;
  const liveCorrectWords = wordResults.filter(w => w === 'correct').length;
  const liveWPM = elapsed > 0 ? Math.round(liveCorrectWords / elapsed) : 0;
  const liveAccuracy = totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100;

  return (
    <div className="typing-test">
      <div className="test-active">
        <div className="test-header">
          <span className="test-difficulty-badge" style={{
            background: `${DIFFICULTY_LEVELS.find(d => d.id === difficulty)?.color}22`,
            color: DIFFICULTY_LEVELS.find(d => d.id === difficulty)?.color
          }}>
            {DIFFICULTY_LEVELS.find(d => d.id === difficulty)?.icon}{' '}
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
          <Timer timeLeft={timeLeft} totalTime={timeLimit} />
          <div className="test-actions">
            <button className="btn-icon" onClick={handleNewTest}><FaCog /></button>
            <button className="btn-icon" onClick={handleRestart}><FaRedo /></button>
          </div>
        </div>

        {/* Word Display */}
        <div className="word-display" onClick={() => inputRef.current?.focus()}>
          <div className="words-container">
            {words.map((word, wIndex) => {
              let wordClass = 'word';
              if (wIndex < currentWordIndex) {
                wordClass += wordResults[wIndex] === 'correct' ? ' word-correct' : ' word-incorrect';
              } else if (wIndex === currentWordIndex) {
                wordClass += ' word-active';
              }

              return (
                <span key={wIndex} className={wordClass}>
                  {word.split('').map((char, cIndex) => {
                    let charClass = 'wchar';
                    if (wIndex === currentWordIndex) {
                      if (cIndex < currentInput.length) {
                        charClass += currentInput[cIndex] === char ? ' wc-correct' : ' wc-incorrect';
                      } else if (cIndex === currentInput.length) {
                        charClass += ' wc-current';
                      }
                    }
                    return <span key={cIndex} className={charClass}>{char}</span>;
                  })}
                  {/* Show extra typed characters */}
                  {wIndex === currentWordIndex && currentInput.length > word.length && (
                    <span className="wchar wc-extra">
                      {currentInput.slice(word.length)}
                    </span>
                  )}
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

        {/* Hidden Input */}
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={handleInput}
          className="hidden-input"
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />

        {/* Live Stats */}
        <div className="live-stats-bar">
          <div className="live-stat-item">
            <span className="lsi-value">{liveWPM}</span>
            <span className="lsi-label">WPM</span>
          </div>
          <div className="live-stat-item">
            <span className="lsi-value">{liveCorrectWords}</span>
            <span className="lsi-label">Words</span>
          </div>
          <div className="live-stat-item">
            <span className="lsi-value" style={{ color: liveAccuracy < 90 ? '#ff4757' : '#2ed573' }}>
              {liveAccuracy}%
            </span>
            <span className="lsi-label">Accuracy</span>
          </div>
          <div className="live-stat-item">
            <span className="lsi-value" style={{ color: '#ff4757' }}>
              {wordResults.filter(w => w === 'incorrect').length}
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
