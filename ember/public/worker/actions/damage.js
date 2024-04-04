import Step from '../step.js';
import Action from '../action.js';

export default class Damage extends Action {
  constructor(prev, dmg) {
    super(prev, damage(dmg));
  }
}

function *damage(dmg) {
  yield Step.create({
    dmg
  });
}
