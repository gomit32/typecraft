const hardWords = [
  "abundance", "accessible", "accommodate", "accomplish", "acknowledge",
  "acquisition", "administrative", "advertisement", "approximately", "architecture",
  "authentication", "bibliography", "bureaucratic", "calculation", "catastrophe",
  "characteristic", "circumstances", "collaboration", "communication", "comprehensive",
  "concentration", "configuration", "consciousness", "consequences", "considerable",
  "constitutional", "contemporary", "contribution", "controversial", "correspondence",
  "demonstration", "determination", "development", "differentiate", "disadvantage",
  "disappointment", "discrimination", "distinguished", "documentation", "electromagnetic",
  "encyclopedia", "entertainment", "environmental", "establishment", "extraordinary",
  "facilitate", "fundamentally", "globalization", "headquarters", "hospitality",
  "hypothetical", "identification", "illustration", "implementation", "inappropriate",
  "independently", "infrastructure", "investigation", "justification", "knowledgeable",
  "manufacturing", "miscellaneous", "nevertheless", "organizational",
  "participation", "pharmaceutical", "philosophical", "predominantly", "psychological",
  "questionnaire", "recommendation", "rehabilitation", "representative", "responsibility",
  "revolutionary", "simultaneously", "sophisticated", "straightforward", "substantially",
  "technological", "transformation", "understanding", "unfortunately", "vulnerability"
];

export const getHardText = (wordCount = 40) => {
  const shuffled = [...hardWords].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, wordCount).join(' ');
};

export default hardWords;