const PDA = require("../src");

describe("SimplePDA", () => {
  const pda = new PDA();

  test("should accept valid patterns", () => {
    expect(pda.process("")).toBe(true); // empty
    expect(pda.process("aaabbb")).toBe(true); // standard
    expect(pda.process("(())")).toBe(true); // parentheses
    expect(pda.process("hhhhjjjj")).toBe(true); // letters
    expect(pda.process("1122")).toBe(true); // numbers
    expect(pda.process("aakk")).toBe(true); // letters
    expect(pda.process("@@##")).toBe(true); // symbols
  });

  test("should reject invalid patterns", () => {
    expect(pda.process("a")).toBe(false); // single a
    expect(pda.process("b")).toBe(false); // single b
    expect(pda.process("abab")).toBe(false); // alternating
    expect(pda.process("aaab")).toBe(false); // unequal
    expect(pda.process("abbb")).toBe(false); // unequal
    expect(pda.process("aaa")).toBe(false); // all a's
    expect(pda.process("abb")).toBe(false); // unequal short
    expect(pda.process("aab")).toBe(false); // unequal short
  });
});
