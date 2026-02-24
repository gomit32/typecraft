const easyWords = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "her", "she", "or",
  "an", "will", "my", "one", "all", "would", "there", "their", "what", "so",
  "up", "out", "if", "about", "who", "get", "which", "go", "me", "when",
  "make", "can", "like", "time", "no", "just", "him", "know", "take", "people",
  "into", "year", "your", "good", "some", "could", "them", "see", "other", "than",
  "then", "now", "look", "only", "come", "its", "over", "think", "also", "back",
  "after", "use", "two", "how", "our", "work", "first", "well", "way", "even",
  "new", "want", "day", "most", "us", "big", "small", "long", "little", "own",
  "old", "right", "same", "give", "few", "open", "run", "let", "play", "home",
  "read", "hand", "high", "far", "call", "keep", "help", "line", "turn", "move",
  "live", "real", "left", "late", "hard", "much", "set", "top", "food", "name",
  "car", "city", "tree", "eye", "dog", "cat", "fish", "bird", "book", "pen",
  "desk", "sun", "moon", "star", "rain", "wind", "fire", "ice", "rock", "sand",
  "house", "door", "wall", "road", "park", "lake", "hill", "farm", "shop", "bed",
  "cup", "box", "bag", "hat", "red", "blue", "green", "white", "dark", "light"
];

export const getEasyText = (wordCount = 50) => {
  const shuffled = [...easyWords].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, wordCount).join(' ');
};

export default easyWords;