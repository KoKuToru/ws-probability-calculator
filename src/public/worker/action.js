import attack from './actions/attack.js';
import burn from './actions/burn.js';
import create_step, { EMPTY, StepFast } from './step.js';

const EMPTY_STEPS = Object.freeze([ create_step(EMPTY, EMPTY) ]);
const EMPTY_ARRAY = Object.freeze([]);

export default class Action {
  static dummy_func = function* (state) { yield state; };

  #prev;
  #steps;

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

  attack(dmg) {
    return new Action(this, [...attack(dmg)]);
  }

  burn(dmg) {
    return new Action(this, [...burn(dmg)]);
  }

  *execute(state) {
    const dedup = new Map();

    for (let nstate of this.#prev?.execute?.(state) ?? [state]) {
      if (!this.#steps.length) {
        yield nstate;
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
        for (const estate of nstate.next(step)) {
          // search next step
          let queue = [estate];
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

          yield estate;
        }
      }

      // sometimes give wrong results
      //XXX: dedup.set(k, estates);
    }
  }
}
