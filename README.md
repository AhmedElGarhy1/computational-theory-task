# Computitional Theory Task

## Info

- Name: Ahmed Mohamed ElGarhy
- Department: CS
- Section: 1

## Task

task 1 & 2 in practical pdf for section 1 implemented by Javascript using NodeJS runtime task consists of 2 subtasks

### Task 1

Dividable by 3 (checks if given string has 1 dibidable by 3)

```js
expect(dfa.process("111")).toBe(true);
expect(dfa.process("1101")).toBe(true);
expect(dfa.process("110")).toBe(false);
```

### Task 2

Implement Push Down Automata (PDA)

```js
expect(pda.process("aaabbb")).toBe(true);
expect(pda.process("((()))")).toBe(true);
expect(pda.process("dddaa")).toBe(false);
expect(pda.process("##ssss")).toBe(false);
```

## Prerequisites

- Node.js 16+
- npm 8+
