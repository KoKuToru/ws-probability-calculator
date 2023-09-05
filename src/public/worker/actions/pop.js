import Action from '../action.js';
import State from '../state.js';

export default class Pop extends Action {
  #prev;
  #count;
  constructor(prev, count) {
    super(prev);
    this.#prev = prev;
    this.#count = count;
  }

  *execute(state) {
    for (let nstate of (this.#prev?? DUMMY_CHILDREN).execute?.(state)) {
      const estate = new State({
        prev: nstate,

        stack: nstate.stack.slice(0, -this.#count),

        steps: [],
        osteps: []
      });
      yield estate;
    }
  }
}
