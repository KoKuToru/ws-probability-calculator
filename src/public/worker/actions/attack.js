import Step, { TRG, NOT_TRG, CX, NOT_CX, WAITINGROOM, STOCK, CLOCK } from '../step.js';
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
        my_target: STOCK,
        op: NOT_CX.repeat(n) + CX,
        op_target: WAITINGROOM
      });
    }
    // not cancel case:
    yield Step.create({
      my: trigger ? TRG : NOT_TRG,
      my_target: STOCK,
      op: NOT_CX.repeat(dmg + trigger),
      op_target: CLOCK,
      dmg: dmg + trigger
    });
  }
}
