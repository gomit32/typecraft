export const gameWords = {
  easy: [
    "apple", "house", "water", "green", "happy", "dance", "music", "light",
    "dream", "smile", "beach", "cloud", "heart", "tiger", "ocean", "candy",
    "pizza", "sunny", "lucky", "magic", "party", "brain", "fresh", "sweet",
    "queen", "flame", "grape", "lemon", "river", "storm", "piano", "eagle",
    "honey", "frost", "globe", "pearl", "shine", "brave", "crown", "spark"
  ],
  medium: [
    "adventure", "beautiful", "challenge", "dangerous", "elephant", "fantastic",
    "gorgeous", "happiness", "important", "jellyfish", "knowledge", "lightning",
    "wonderful", "marathon", "nightmare", "operation", "pineapple", "questions",
    "raspberry", "secretary", "telephone", "umbrella", "valentine", "waterfall",
    "xylophone", "yesterday", "zookeeper", "birthday", "chocolate", "discovery",
    "education", "furniture", "gardening", "hurricane", "invisible", "jokester"
  ],
  hard: [
    "accomplished", "breakthrough", "catastrophe", "distinguished", "extravagant",
    "flabbergasted", "gravitational", "hypothetical", "inconvenient", "jurisdiction",
    "kaleidoscope", "labyrinthine", "miscellaneous", "nevertheless", "overwhelming",
    "pharmaceutical", "questionnaire", "revolutionary", "sophisticated", "technological",
    "unbelievable", "vulnerability", "weatherproof", "experimental", "abbreviation",
    "bibliography", "choreography", "dramatically", "encyclopedia", "fundamentally"
  ]
};

export const scrambleWord = (word) => {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const scrambled = arr.join('');
  return scrambled === word ? scrambleWord(word) : scrambled;
};

export default gameWords;