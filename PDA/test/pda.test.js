const { PDA, languages, checkString, createPDA } = require("../src");

describe("PDA Class", () => {
  let pda;

  beforeEach(() => {
    pda = new PDA(languages.BALANCED_PARENTHESES);
  });

  test("should instantiate with valid language configuration", () => {
    expect(pda).toBeInstanceOf(PDA);
    expect(pda.states).toEqual(new Set(["q0", "q1", "q2"]));
    expect(pda.acceptStates).toEqual(new Set(["q2"]));
  });

  test("should throw error for invalid configuration", () => {
    expect(() => {
      new PDA({
        ...languages.BALANCED_PARENTHESES,
        startState: "invalid",
      });
    }).toThrow();
  });
});

describe("Balanced Parentheses PDA", () => {
  const balancedParenthesesPDA = createPDA("BALANCED_PARENTHESES");
  test("should accept empty string", () => {
    expect(checkString("BALANCED_PARENTHESES", "")).toBe(true);
  });

  test("should accept simple balanced parentheses", () => {
    expect(balancedParenthesesPDA.process("()")).toBe(true);
    expect(balancedParenthesesPDA.process("(())")).toBe(true);
    expect(balancedParenthesesPDA.process("(()())")).toBe(true);
  });

  test("should reject unbalanced parentheses", () => {
    expect(balancedParenthesesPDA.process("(")).toBe(false);
    expect(balancedParenthesesPDA.process(")")).toBe(false);
    expect(balancedParenthesesPDA.process("())")).toBe(false);
    expect(balancedParenthesesPDA.process("(()")).toBe(false);
  });

  test("should reject strings with other characters", () => {
    expect(balancedParenthesesPDA.process("(a)")).toBe(false);
  });
});

describe("a^n b^n PDA", () => {
  test("should accept empty string", () => {
    expect(checkString("AN_BN", "")).toBe(true);
  });

  test("should accept strings with equal a and b", () => {
    expect(checkString("AN_BN", "ab")).toBe(true);
    expect(checkString("AN_BN", "aabb")).toBe(true);
    expect(checkString("AN_BN", "aaabbb")).toBe(true);
  });

  test("should reject unequal strings", () => {
    expect(checkString("AN_BN", "a")).toBe(false);
    expect(checkString("AN_BN", "b")).toBe(false);
    expect(checkString("AN_BN", "abb")).toBe(false);
    expect(checkString("AN_BN", "aab")).toBe(false);
  });

  test("should reject strings with wrong order", () => {
    expect(checkString("AN_BN", "ba")).toBe(false);
    expect(checkString("AN_BN", "aababb")).toBe(false);
  });
});
