const { createTransitionFunction } = require("./transitions");

const balancedParentheses = {
  states: ["q0", "q1", "q2"],
  alphabet: ["(", ")"],
  stackAlphabet: ["(", "$"],
  startState: "q0",
  startStackSymbol: "$",
  acceptStates: ["q2"],
  transitions: {
    ...createTransitionFunction("q0", "ε", "$", "q1", "$"),
    ...createTransitionFunction("q1", "(", "$", "q1", "($"),
    ...createTransitionFunction("q1", "(", "(", "q1", "(("),
    ...createTransitionFunction("q1", ")", "(", "q1", "ε"),
    ...createTransitionFunction("q1", "ε", "$", "q2", "ε"),
  },
};

const anbn = {
  states: ["q0", "q1", "q2", "q3"],
  alphabet: ["a", "b"],
  stackAlphabet: ["a", "$"],
  startState: "q0",
  startStackSymbol: "$",
  acceptStates: ["q3"],
  transitions: {
    ...createTransitionFunction("q0", "ε", "$", "q1", "$"),
    ...createTransitionFunction("q1", "a", "$", "q1", "a$"),
    ...createTransitionFunction("q1", "a", "a", "q1", "aa"),
    ...createTransitionFunction("q1", "b", "a", "q2", "ε"),
    ...createTransitionFunction("q2", "b", "a", "q2", "ε"),
    ...createTransitionFunction("q2", "ε", "$", "q3", "ε"),
  },
};

const languages = {
  BALANCED_PARENTHESES: balancedParentheses,
  AN_BN: anbn,
};

module.exports = languages;
