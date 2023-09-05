import step, { EMPTY, CX, NOT_CX } from '../step.js';
import Action from '../action.js';

export default class Mill extends Action {
  constructor(prev, count) {
    super(prev, mill(count));
  }
}

function *mill(count) {
  // all permutations
  for (let n = 0; n < count; ++n) {
    const cards = NOT_CX.repeat(n) + CX.repeat(count - n);
    for (let p of permute(cards)) {
      yield step(EMPTY, p);
    }
  }
}

function *permute(str) {
  // poors man permutation without repetition
  str = str.split('');
  const used = new Set();
  for (let i = 0; i < str.length; ++i)
  for (let j = 0; j < str.length; ++j) {
    let nstr = [...str];
    const tmp = nstr[i];
    nstr[i] = nstr[j];
    nstr[j] = tmp;
    nstr = nstr.join('');
    if (used.has(nstr)) {
      continue;
    }
    used.add(nstr);
    yield nstr;
  }
};
