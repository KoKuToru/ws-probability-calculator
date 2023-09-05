import Action from '../action.js';
import State from '../state.js';

export default class Push extends Action {
  #prev;
  #what;
  constructor(prev, ...what) {
    super(prev);
    this.#prev = prev;
    this.#what = what;
  }

  *execute(state) {
    for (let nstate of (this.#prev?? DUMMY_CHILDREN).execute?.(state)) {
      const stack_values = {
        cx: nstate.osteps.op_cx,
        ncx: nstate.osteps.op_not_cx,
      };
      const estate = new State({
        prev: nstate,

        stack: [...nstate.stack, ...this.#what.map(([f, n]) =>
          [n, f(stack_values[n])]
        )],

        steps: [],
        osteps: []
      });
      yield estate;
    }
  }
}
