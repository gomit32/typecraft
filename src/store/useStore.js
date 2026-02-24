import { create } from 'zustand';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/helpers';

const useStore = create((set, get) => ({
  // Theme
  theme: getFromLocalStorage('typecraft-theme', 'dark'),
  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    saveToLocalStorage('typecraft-theme', theme);
    set({ theme });
  },
  toggleTheme: () => {
    const newTheme = get().theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    saveToLocalStorage('typecraft-theme', newTheme);
    set({ theme: newTheme });
  },

  // Typing Test State
  difficulty: 'easy',
  setDifficulty: (difficulty) => set({ difficulty }),

  timeLimit: 60,
  setTimeLimit: (timeLimit) => set({ timeLimit }),

  soundEnabled: getFromLocalStorage('typecraft-sound', true),
  toggleSound: () => {
    const newVal = !get().soundEnabled;
    saveToLocalStorage('typecraft-sound', newVal);
    set({ soundEnabled: newVal });
  },

  showKeyboard: getFromLocalStorage('typecraft-keyboard', true),
  toggleKeyboard: () => {
    const newVal = !get().showKeyboard;
    saveToLocalStorage('typecraft-keyboard', newVal);
    set({ showKeyboard: newVal });
  },

  // History & Stats
  history: getFromLocalStorage('typecraft-history', []),
  addToHistory: (result) => {
    const history = [...get().history, { ...result, date: new Date().toISOString() }];
    saveToLocalStorage('typecraft-history', history);
    set({ history });
  },
  clearHistory: () => {
    saveToLocalStorage('typecraft-history', []);
    set({ history: [] });
  },

  // Best scores
  bestWPM: getFromLocalStorage('typecraft-best-wpm', 0),
  updateBestWPM: (wpm) => {
    if (wpm > get().bestWPM) {
      saveToLocalStorage('typecraft-best-wpm', wpm);
      set({ bestWPM: wpm });
    }
  },

  // User Profile
  username: getFromLocalStorage('typecraft-username', 'TypeCrafter'),
  setUsername: (username) => {
    saveToLocalStorage('typecraft-username', username);
    set({ username });
  },

  totalTests: getFromLocalStorage('typecraft-total-tests', 0),
  incrementTests: () => {
    const newVal = get().totalTests + 1;
    saveToLocalStorage('typecraft-total-tests', newVal);
    set({ totalTests: newVal });
  },

  // XP System
  xp: getFromLocalStorage('typecraft-xp', 0),
  level: getFromLocalStorage('typecraft-level', 1),
  addXP: (amount) => {
    let newXP = get().xp + amount;
    let newLevel = get().level;
    const xpPerLevel = newLevel * 100;

    while (newXP >= xpPerLevel) {
      newXP -= xpPerLevel;
      newLevel++;
    }

    saveToLocalStorage('typecraft-xp', newXP);
    saveToLocalStorage('typecraft-level', newLevel);
    set({ xp: newXP, level: newLevel });
  },

  // Streak
  streak: getFromLocalStorage('typecraft-streak', 0),
  lastPracticeDate: getFromLocalStorage('typecraft-last-practice', null),
  updateStreak: () => {
    const today = new Date().toDateString();
    const lastDate = get().lastPracticeDate;

    if (lastDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    let newStreak;
    if (lastDate === yesterday.toDateString()) {
      newStreak = get().streak + 1;
    } else {
      newStreak = 1;
    }

    saveToLocalStorage('typecraft-streak', newStreak);
    saveToLocalStorage('typecraft-last-practice', today);
    set({ streak: newStreak, lastPracticeDate: today });
  }
}));

export default useStore;