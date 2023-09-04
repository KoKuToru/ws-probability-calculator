import step, { TRG, NOT_TRG, CX, NOT_CX } from '../step.js';
import Action from '../action.js';

export default class Attack extends Action {
  constructor(prev, dmg, children) {
    super(prev, attack(dmg), children);
  }
}

function *attack(dmg) {
  for (const trigger of [true, false]) {
    for (let n = 0; n < dmg + trigger; ++n) {
      // cancel case:
      yield step(trigger ? TRG : NOT_TRG, NOT_CX.repeat(n) + CX);
    }
    // not cancel case:
    yield step(trigger ? TRG : NOT_TRG, NOT_CX.repeat(dmg + trigger), dmg + trigger);
  }
}
