import create_step, { EMPTY, StepFast } from './step.js';

const EMPTY_STEPS = Object.freeze([ create_step(EMPTY, EMPTY) ]);
const EMPTY_ARRAY = Object.freeze([]);

const DUMMY_CHILDREN =
  Object.freeze({
    *execute(state) {
      yield state;
    }
  });

export default class Action {
  static dummy_func = function* (state) { yield state; };

  #prev;
  #steps;
  #children;

  constructor(prev, steps, children) {
    this.#children = children ?? DUMMY_CHILDREN;
    this.#prev = prev;
    steps ??= EMPTY_STEPS;
    if (steps !== EMPTY_STEPS) {
      const fast = new Map();
      for (const step of steps) {
        const key = [
          step.my_trg,
          step.my_not_trg,
          step.op_cx,
          step.op_not_cx,
          step.dmg
        ].join();
        let tmp = fast.get(key);
        if (!tmp) {
          tmp = {
            slow: [],
            my_trg: step.my_trg,
            my_not_trg: step.my_not_trg,
            op_cx: step.op_cx,
            op_not_cx: step.op_not_cx,
            dmg: step.dmg
          };
          fast.set(key, tmp);
        }
        tmp.slow.push(step);
      }
      this.#steps = Object.freeze([...fast.values()].map(x => new StepFast(x)));
    } else {
      this.#steps = EMPTY_ARRAY;
    }
  }

  *execute_children(state) {
    for (const estate of this.#children.execute(state)) {
      yield estate;
    }
  }

  *execute(state) {
    const dedup = new Map();

    for (let nstate of (this.#prev?? DUMMY_CHILDREN).execute?.(state)) {
      if (this.#steps === EMPTY_ARRAY) {
        for (const estate of this.execute_children(nstate)) {
          yield estate;
        }
        continue;
      }

      // try dedup
      const k = nstate.key;
      let estates = dedup.get(k);
      if (estates) {
        for (const estate of estates) {
          estate.prev.push(nstate);
        }
        continue;
      }

      // calculate new estate
      estates = [];
      for (const step of this.#steps) {
        for (const istate of nstate.next(step)) {
          // search next step
          let queue = [istate];
          while (queue.length) {
            let next = queue.pop();
            for (const prev of next.prev ?? EMPTY_ARRAY) {
              if (prev === nstate) {
                estates.push(next);
              } else {
                queue.push(prev);
              }
            }
          }
          // do children
          for (const estate of this.execute_children(istate)) {
            yield estate;
          }
        }
      }

      // sometimes give wrong results
      //XXX: dedup.set(k, estates);
    }
  }
}
