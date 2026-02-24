const expertWords = [
  "The quick brown fox jumps over the lazy dog near the riverbank.",
  "She sells seashells by the seashore while the waves crash rhythmically.",
  "Pack my box with five dozen liquor jugs and ship them immediately.",
  "The pharmaceutical company acknowledged the miscellaneous correspondence.",
  "Constitutional amendments require extraordinary circumstances and overwhelming approval.",
  "Simultaneously the sophisticated telecommunications infrastructure underwent transformation.",
  "Bureaucratic administrative procedures unfortunately create considerable disadvantages.",
  "The environmental investigation predominantly focused on technological sustainability.",
  "Psychological rehabilitation programs fundamentally facilitate independence.",
  "Distinguished representatives from international corporations gathered at the conference."
];

export const getExpertText = (sentenceCount = 3) => {
  const shuffled = [...expertWords].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, sentenceCount).join(' ');
};

export default expertWords;