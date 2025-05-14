function createTransitionFunction(
  fromState,
  inputSymbol,
  stackTop,
  toState,
  stackPush
) {
  return {
    [`${fromState},${inputSymbol},${stackTop}`]: [[toState, stackPush]],
  };
}

module.exports = {
  createTransitionFunction,
};
