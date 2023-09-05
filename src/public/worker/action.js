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
  #dedup = true;
  #conditions = [];

  constructor(prev, steps) {
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
        estates = [];
      }

      // calculate new estate
      for (const step of this.#steps) {
        for (const estate of nstate.next(step)) {
          // search next step
          if (this.#dedup) {
            let queue = [estate];
            while (queue.length) {
              let next = queue.pop();
              for (const prev of next.prev ?? EMPTY_ARRAY) {
                if (prev.id < nstate.id) {
                  // skip
                  continue;
                }
                if (prev === nstate) {
                  estates.push(next);
                } else {
                  queue.push(prev);
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
