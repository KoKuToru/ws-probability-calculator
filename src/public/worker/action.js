import Step from './step.js';
import StepFast from './step-fast.js';

const EMPTY_STEPS = Object.freeze([ Step.create({}) ]);
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
  #dedup = true;
  #conditions = [];

  constructor(prev, steps) {
    this.#prev = prev;
    steps ??= EMPTY_STEPS;
    if (steps !== EMPTY_STEPS) {
      this.#steps = StepFast.create(steps);
    } else {
      this.#steps = EMPTY_ARRAY;
    }
  }

  setDedup(v) {
    this.#dedup = v;
  }
  setConditions(c) {
    this.#conditions = c.map(([idx, op, right]) => [idx, CONDITIONS[op], right]);
  }

  #conditionCheck(state) {
    for (const [idx, op, right] of this.#conditions) {
      const left = state.stack[idx][1];
      if (!op(left, right)) {
        return false;
      }
    }
    return true;
  }

  *execute(state) {
    const dedup = new Map();

    for (let nstate of (this.#prev?? DUMMY_CHILDREN).execute?.(state)) {
      if (this.#steps === EMPTY_ARRAY || !this.#conditionCheck(nstate)) {
        yield nstate;
        continue;
      }

      // try dedup
      let estates;
      if (this.#dedup) {
        const k = nstate.key;
        estates = dedup.get(k);
        if (estates) {
          for (const estate of estates) {
            estate.prev.push(nstate);
          }
          continue;
        }
        estates = new Set();
      }

      // calculate new estate
      for (const step of this.#steps) {
        for (const estate of nstate.next(step)) {
          // validation
          if (
            !estate.my_size ||
            !estate.op_size ||
            estate.p_my_size ||
            estate.p_op_size
          ) {
            throw new Error('something is wrong');
          }

          // search next step
          if (this.#dedup) {
            const queue = new Set([estate]);
            while (queue.size) {
              const next = queue.values().next().value;
              queue.delete(next);
              for (const prev of next.prev ?? EMPTY_ARRAY) {
                if (prev.id < nstate.id) {
                  // skip too old
                  continue;
                }
                if (prev === nstate) {
                  estates.add(next);
                } else {
                  queue.add(prev);
                }
              }
            }
          }

          yield estate;
        }
      }

      if (this.#dedup) {
        const k = nstate.key;
        dedup.set(k, estates);
      }
    }
  }
}

const CONDITIONS = Object.freeze({
  '<':  function(a, b) { return a < b; },
  '<=': function(a, b) { return a <= b; },
  '>':  function(a, b) { return a > b; },
  '>=': function(a, b) { return a >= b; },
  '==': function(a, b) { return a == b; },
  '!=': function(a, b) { return a != b; },
});
