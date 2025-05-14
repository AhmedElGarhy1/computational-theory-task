class PDA {
  process(input) {
    if (input.length === 0) return true; // empty string is valid

    let stack = [];
    let aChar = null;
    let bChar = null;
    let seenB = false;

    // Determine the two distinct characters
    for (let char of input) {
      if (aChar === null) {
        aChar = char;
      } else if (char !== aChar && bChar === null) {
        bChar = char;
        break;
      }
    }

    // If all characters are the same, invalid
    if (bChar === null) return false;

    for (let char of input) {
      if (!seenB) {
        if (char === aChar) {
          stack.push(char);
        } else if (char === bChar && stack.length > 0) {
          stack.pop();
          seenB = true;
        } else {
          return false;
        }
      } else {
        if (char !== bChar || stack.length === 0) {
          return false;
        }
        stack.pop();
      }
    }

    return stack.length === 0;
  }
}

module.exports = PDA;
