import Action from '../action.js';

export default class Pop extends Action {
  #count;
  constructor(prev, count) {
    super(prev);
    this.#count = count;
  }

  *execute(state) {
    throw new Error('not implemented yet');
  }
}
