import Action from '../action.js';

export default class Push extends Action {
  #what;
  constructor(prev, ...what) {
    super(prev);
    this.#what = what;
  }

  *execute(state) {
    throw new Error('not implemented yet');
  }
}
