import { WPM_RATINGS } from './constants';

export const calculateWPM = (correctChars, timeInSeconds) => {
  if (timeInSeconds === 0) return 0;
  return Math.round((correctChars / 5) / (timeInSeconds / 60));
};

export const calculateAccuracy = (correctChars, totalChars) => {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
};

export const calculateRawWPM = (totalChars, timeInSeconds) => {
  if (timeInSeconds === 0) return 0;
  return Math.round((totalChars / 5) / (timeInSeconds / 60));
};

export const getWPMRating = (wpm) => {
  return WPM_RATINGS.find(r => wpm >= r.min && wpm <= r.max) || WPM_RATINGS[0];
};

export const getWordCountForTime = (seconds, difficulty) => {
  const wordsPerSecond = {
    easy: 1.5,
    medium: 1.2,
    hard: 1,
    expert: 0.8
  };
  return Math.ceil(seconds * (wordsPerSecond[difficulty] || 1));
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getFromLocalStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};