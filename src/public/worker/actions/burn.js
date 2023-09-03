import step, { EMPTY, CX, NOT_CX } from '../step.js';

export default function *burn(dmg) {
  for (let n = 0; n < dmg; ++n) {
    // cancel case:
    yield step(EMPTY, NOT_CX.repeat(n) + CX);
  }
  // not cancel case:
  yield step(EMPTY, NOT_CX.repeat(dmg), dmg);
}
