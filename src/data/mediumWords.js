const mediumWords = [
  "about", "above", "across", "actually", "after", "afternoon", "again", "against",
  "almost", "along", "already", "always", "among", "another", "answer", "anything",
  "around", "because", "become", "before", "began", "behind", "believe", "below",
  "between", "beyond", "brought", "building", "business", "called", "cannot", "certain",
  "change", "children", "close", "company", "complete", "consider", "continue", "control",
  "country", "course", "current", "develop", "different", "during", "early", "enough",
  "evening", "example", "experience", "family", "feeling", "finally", "follow", "foreign",
  "forward", "friend", "further", "general", "getting", "given", "government", "great",
  "group", "growing", "happen", "having", "history", "important", "include", "increase",
  "interest", "itself", "keeping", "known", "large", "later", "learn", "letter",
  "level", "likely", "little", "living", "looking", "making", "matter", "member",
  "military", "million", "minutes", "moment", "money", "morning", "mother", "moving",
  "myself", "national", "nature", "nearly", "necessary", "never", "nothing", "number",
  "office", "often", "order", "others", "outside", "paper", "parent", "particular",
  "people", "perhaps", "period", "person", "picture", "place", "planning", "playing",
  "please", "point", "position", "possible", "power", "present", "president", "problem",
  "program", "provide", "public", "question", "quickly", "rather", "reading", "reason",
  "report", "require", "result", "return", "right", "running", "saying", "school",
  "second", "security", "seemed", "service", "several", "should", "simple", "since",
  "social", "special", "started", "states", "still", "story", "street", "strong"
];

export const getMediumText = (wordCount = 50) => {
  const shuffled = [...mediumWords].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, wordCount).join(' ');
};

export default mediumWords;