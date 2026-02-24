import { useState, useCallback, useRef } from 'react';
import { calculateWPM, calculateAccuracy } from '../utils/helpers';

const useTypingTest = (text) => {
  const [input, setInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [charStatuses, setCharStatuses] = useState([]);
  const [currentKey, setCurrentKey] = useState('');
  const inputRef = useRef(null);

  const handleKeyDown = useCallback((e) => {
    if (isFinished) return;

    const key = e.key;
    setCurrentKey(key.toLowerCase());

    if (key === 'Backspace') {
      e.preventDefault();
      if (currentIndex > 0) {
        const newIndex = currentIndex - 1;
        const newStatuses = [...charStatuses];
        newStatuses[newIndex] = undefined;
        setCharStatuses(newStatuses);
        setCurrentIndex(newIndex);
        setInput(prev => prev.slice(0, -1));
      }
      return;
    }

    if (key.length !== 1) return;
    e.preventDefault();

    if (!isStarted) {
      setIsStarted(true);
    }

    const expectedChar = text[currentIndex];
    const newStatuses = [...charStatuses];

    if (key === expectedChar) {
      newStatuses[currentIndex] = 'correct';
      setCorrectChars(prev => prev + 1);
    } else {
      newStatuses[currentIndex] = 'incorrect';
      setIncorrectChars(prev => prev + 1);
    }

    setCharStatuses(newStatuses);
    setCurrentIndex(prev => prev + 1);
    setInput(prev => prev + key);

    if (currentIndex + 1 >= text.length) {
      setIsFinished(true);
    }
  }, [currentIndex, text, charStatuses, isStarted, isFinished]);

  const getResults = useCallback((timeInSeconds) => {
    const wpm = calculateWPM(correctChars, timeInSeconds);
    const accuracy = calculateAccuracy(correctChars, correctChars + incorrectChars);
    const rawWPM = Math.round(((correctChars + incorrectChars) / 5) / (timeInSeconds / 60));

    return {
      wpm,
      rawWPM,
      accuracy,
      correctChars,
      incorrectChars,
      totalChars: correctChars + incorrectChars,
      timeInSeconds,
      cpm: Math.round((correctChars / timeInSeconds) * 60)
    };
  }, [correctChars, incorrectChars]);

  const resetTest = useCallback(() => {
    setInput('');
    setCurrentIndex(0);
    setCorrectChars(0);
    setIncorrectChars(0);
    setIsStarted(false);
    setIsFinished(false);
    setCharStatuses([]);
    setCurrentKey('');
  }, []);

  return {
    input,
    currentIndex,
    correctChars,
    incorrectChars,
    isStarted,
    isFinished,
    charStatuses,
    currentKey,
    handleKeyDown,
    getResults,
    resetTest,
    inputRef,
    setIsFinished
  };
};

export default useTypingTest;