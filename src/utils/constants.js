export const TIME_OPTIONS = [
  { label: '30s', value: 30, icon: '⚡' },
  { label: '1 min', value: 60, icon: '⏱️' },
  { label: '2 min', value: 120, icon: '🕐' },
  { label: '5 min', value: 300, icon: '🏋️' }
];

export const DIFFICULTY_LEVELS = [
  {
    id: 'easy',
    label: 'Easy',
    icon: '🌱',
    color: '#2ed573',
    description: 'Common words, short length',
    gradient: 'linear-gradient(135deg, #2ed573, #00b894)'
  },
  {
    id: 'medium',
    label: 'Medium',
    icon: '🔥',
    color: '#ffb347',
    description: 'Longer words, mixed vocabulary',
    gradient: 'linear-gradient(135deg, #ffb347, #ff6348)'
  },
  {
    id: 'hard',
    label: 'Hard',
    icon: '💎',
    color: '#ff6584',
    description: 'Complex words & sentences',
    gradient: 'linear-gradient(135deg, #ff6584, #ee5a24)'
  },
  {
    id: 'expert',
    label: 'Expert',
    icon: '👑',
    color: '#ff4757',
    description: 'Full paragraphs, advanced vocabulary',
    gradient: 'linear-gradient(135deg, #ff4757, #c44569)'
  }
];

export const KEYBOARD_ROWS = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
];

export const WPM_RATINGS = [
  { min: 0, max: 20, label: 'Beginner', emoji: '🐢', color: '#ff4757' },
  { min: 21, max: 35, label: 'Below Average', emoji: '🚶', color: '#ff6348' },
  { min: 36, max: 50, label: 'Average', emoji: '🏃', color: '#ffb347' },
  { min: 51, max: 65, label: 'Above Average', emoji: '🚴', color: '#ffa502' },
  { min: 66, max: 80, label: 'Good', emoji: '🏎️', color: '#2ed573' },
  { min: 81, max: 100, label: 'Great', emoji: '✈️', color: '#00b894' },
  { min: 101, max: 120, label: 'Excellent', emoji: '🚀', color: '#6c63ff' },
  { min: 121, max: Infinity, label: 'Legendary', emoji: '⚡', color: '#ff6584' }
];