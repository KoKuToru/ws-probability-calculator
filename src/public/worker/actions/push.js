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
        ecx: nstate.osteps.op_cx,
        encx: nstate.osteps.op_not_cx,
        iecx: Number(Boolean(nstate.osteps.op_cx)),
        incx: Number(!Boolean(nstate.osteps.op_cx)),
      };
      const estate = new State({
        prev: nstate,

        stack: [...nstate.stack, ...this.#what.map(n => {
          if (!(n in stack_values)) {
            throw new Error('unknown stack value');
          }
          return [n, stack_values[n]]
        })],

        steps: [],
        osteps: []
      });
      yield estate;
    }
  }
}
