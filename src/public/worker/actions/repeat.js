import Action from '../action.js';

export default class Repeat extends Action {
  #repeats;

  constructor(prev, repeats, children) {
    super(prev, null, children);
    this.#repeats = repeats;
  }

  *execute_children(state, count = 0) {
    if (count < this.#repeats) {
      for (const sstate of super.execute_children(state)) {
        for (const estate of this.execute_children(sstate, count + 1)) {
          yield estate;
        }
      }
    } else if (this.#repeats > 0) {
      yield state;
    }
  }
}
