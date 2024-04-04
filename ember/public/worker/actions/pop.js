import Action from '../action.js';
import State from '../state.js';

export default class Pop extends Action {
  #count;
  constructor(prev, count) {
    super(prev);
    this.#count = count;
    this.setSteps([this]);
  }

  *subExecute(nstate) {
    const estate = new State({
      prev: nstate,

      stack: nstate.stack.slice(0, -this.#count),

      steps: [],
      osteps: []
    });
    yield estate;
  }
}
