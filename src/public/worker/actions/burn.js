import Step, { EMPTY, CX, NOT_CX } from '../step.js';
import Action from '../action.js';

export default class Burn extends Action {
  constructor(prev, dmg) {
    super(prev, burn(dmg));
  }
}

function *burn(dmg) {
  for (let n = 0; n < dmg; ++n) {
    // cancel case:
    yield Step.create(EMPTY, NOT_CX.repeat(n) + CX);
  }
  // not cancel case:
  yield Step.create(EMPTY, NOT_CX.repeat(dmg), dmg);
}
