import Step, { TRG, NOT_TRG, CX, NOT_CX } from '../step.js';
import Action from '../action.js';

export default class Attack extends Action {
  constructor(prev, dmg) {
    super(prev, attack(dmg));
  }
}

function *attack(dmg) {
  for (const trigger of [true, false]) {
    for (let n = 0; n < dmg + trigger; ++n) {
      // cancel case:
      yield Step.create({
        my: trigger ? TRG : NOT_TRG,
        op: NOT_CX.repeat(n) + CX,
        op_into_w: true
      });
    }
    // not cancel case:
    yield Step.create({
      my: trigger ? TRG : NOT_TRG,
      op: NOT_CX.repeat(dmg + trigger),
      dmg: dmg + trigger
    });
  }
}
