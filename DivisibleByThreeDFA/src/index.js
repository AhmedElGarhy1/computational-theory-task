// src/dfa.js
class DivisibleByThreeDFA {
  constructor() {
    // States represent count of 1's modulo 3
    this.transitions = {
      q0: { 0: "q0", 1: "q1" }, // 0 mod 3 (accepting state)
      q1: { 0: "q1", 1: "q2" }, // 1 mod 3
      q2: { 0: "q2", 1: "q0" }, // 2 mod 3
    };
    this.initialState = "q0";
    this.acceptingState = "q0";
  }

  process(input) {
    let currentState = this.initialState;

    for (const char of input) {
      if (char !== "0" && char !== "1") {
        throw new Error(`Invalid binary string character: '${char}'`);
      }
      currentState = this.transitions[currentState][char];
    }

    return currentState === this.acceptingState;
  }
}

module.exports = DivisibleByThreeDFA;
