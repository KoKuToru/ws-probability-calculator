import step, { EMPTY, CX, NOT_CX } from '../step.js';
import Action from '../action.js';

export default class Mill extends Action {
  constructor(prev, count) {
    super(prev, mill(count));
  }
}

function *mill(count) {
  // all permutations
  for (let n = 0; n < count; ++n)
  for (let m = n; m < count; ++m) {
    const cards = NOT_CX.repeat(n) + CX.repeat(m);
    for (let p of permute(cards)) {
      yield step(EMPTY, p);
    }
  }
}

function *permute(str) {
  if (str.length <= 1) {
    return str;
  }

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const remainder = str.slice(0, i) + str.slice(i + 1);
    const permutedRemainder = permute(remainder);
    for (const permutation of permutedRemainder) {
      yield `${char}${permutation}`;
    }
  }
};
