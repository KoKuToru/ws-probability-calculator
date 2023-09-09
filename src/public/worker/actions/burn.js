import Step, { EMPTY, CX, NOT_CX, WAITINGROOM, CLOCK } from '../step.js';
import Action from '../action.js';

export default class Burn extends Action {
  constructor(prev, dmg) {
    super(prev, burn(dmg));
  }
}

function *burn(dmg) {
  for (let n = 0; n < dmg; ++n) {
    // cancel case:
    yield Step.create({
      op: NOT_CX.repeat(n) + CX,
      op_target: WAITINGROOM
    });
  }
  // not cancel case:
  yield Step.create({
    op: NOT_CX.repeat(dmg),
    op_target: CLOCK,
    dmg
  });
}
