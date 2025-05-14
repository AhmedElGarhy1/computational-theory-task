const DivisibleByThreeDFA = require("../src");

describe("DivisibleByThreeDFA", () => {
  let dfa;

  beforeEach(() => {
    dfa = new DivisibleByThreeDFA();
  });

  test("should accept empty string", () => {
    expect(dfa.process("")).toBe(true);
  });

  test("should accept strings with 0 ones", () => {
    expect(dfa.process("0")).toBe(true);
    expect(dfa.process("0000")).toBe(true);
    expect(dfa.process("000000")).toBe(true);
  });

  test("should accept strings with 3 ones", () => {
    expect(dfa.process("111")).toBe(true);
    expect(dfa.process("10101")).toBe(true);
    expect(dfa.process("11001")).toBe(true);
  });

  test("should reject strings with non-divisible counts", () => {
    expect(dfa.process("1")).toBe(false);
    expect(dfa.process("10")).toBe(false);
    expect(dfa.process("110")).toBe(false);
    expect(dfa.process("1111")).toBe(false);
  });

  test("should throw error for non-binary strings", () => {
    expect(() => dfa.process("102")).toThrow();
    expect(() => dfa.process("abc")).toThrow();
  });
});
