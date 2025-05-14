class PDA {
  constructor({
    states,
    alphabet,
    stackAlphabet,
    transitions,
    startState,
    startStackSymbol,
    acceptStates,
  }) {
    this.states = new Set(states);
    this.alphabet = new Set(alphabet);
    this.stackAlphabet = new Set(stackAlphabet);
    this.transitions = transitions;
    this.startState = startState;
    this.startStackSymbol = startStackSymbol;
    this.acceptStates = new Set(acceptStates);

    this.validate();
  }

  validate() {
    if (!this.states.has(this.startState)) {
      throw new Error(`Start state ${this.startState} not in states`);
    }

    for (const state of this.acceptStates) {
      if (!this.states.has(state)) {
        throw new Error(`Accept state ${state} not in states`);
      }
    }

    if (!this.stackAlphabet.has(this.startStackSymbol)) {
      throw new Error(
        `Start stack symbol ${this.startStackSymbol} not in stack alphabet`
      );
    }
  }

  process(input, { debug = false } = {}) {
    let currentStates = new Set([this.startState]);
    let currentStacks = new Map();
    currentStacks.set(this.startState, [this.startStackSymbol]);

    for (const symbol of input) {
      if (!this.alphabet.has(symbol)) {
        return false;
      }

      const nextStates = new Set();
      const nextStacks = new Map();

      for (const state of currentStates) {
        const stack = currentStacks.get(state);
        const stackTop = stack.length > 0 ? stack[stack.length - 1] : null;

        const transitionKey = `${state},${symbol},${stackTop}`;
        const epsilonTransitionKey = `${state},ε,${stackTop}`;

        const transitions = this.transitions[transitionKey] || [];
        const epsilonTransitions = this.transitions[epsilonTransitionKey] || [];

        for (const transition of [...transitions, ...epsilonTransitions]) {
          const [nextState, stackPush] = transition;

          if (!this.states.has(nextState)) continue;

          nextStates.add(nextState);

          let newStack = stack.slice(0, -1);
          if (stackPush !== "ε") {
            newStack = [...newStack, ...stackPush.split("").reverse()];
          }

          const existingStack = nextStacks.get(nextState);
          if (
            !existingStack ||
            JSON.stringify(existingStack) !== JSON.stringify(newStack)
          ) {
            nextStacks.set(nextState, newStack);
          }
        }
      }

      if (nextStates.size === 0) {
        if (debug) console.log("No transitions available");
        return false;
      }

      currentStates = nextStates;
      currentStacks = nextStacks;

      if (debug) {
        console.log(`Symbol: ${symbol}`);
        console.log("Current states:", Array.from(currentStates));
        console.log("Current stacks:", Object.fromEntries(currentStacks));
      }
    }

    // Check if any of the current states is an accept state
    // and the stack is empty (for empty stack acceptance)
    for (const state of currentStates) {
      if (
        this.acceptStates.has(state) &&
        currentStacks.get(state).length === 0
      ) {
        return true;
      }
    }

    return false;
  }
}

module.exports = PDA;
