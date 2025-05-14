const PDA = require("./pda");
const languages = require("./languages");

function createPDA(language) {
  if (!languages[language]) {
    throw new Error(
      `Unknown language: ${language}. Available languages: ${Object.keys(
        languages
      ).join(", ")}`
    );
  }
  return new PDA(languages[language]);
}

module.exports = {
  PDA,
  languages,
  createPDA,
};
