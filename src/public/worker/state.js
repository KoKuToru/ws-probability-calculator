import Probability from './probability.js';
import create_step, { EMPTY, CX, TRG } from './step.js';

const PROBABILITY_CACHE = new WeakMap();

export default class State {
  static id = 0;
  #id = ++State.id;

  prev = null;

  // current deck state:
  op_cx = 8;
  op_not_cx = 50 - 8;
  get op_size() {
    return this.op_cx + this.op_not_cx;
  }

  my_trg = 15;
  my_not_trg = 50 - 15;
  get my_size() {
    return this.my_trg + this.my_not_trg;
  }

  // waiting room state:
  w_op_cx = 0;
  w_op_not_cx = 0;
  get w_op_size() {
    return this.w_op_cx + this.w_op_not_cx;
  }

  w_my_trg = 0;
  w_my_not_trg = 0;
  get w_my_size() {
    return this.w_my_trg + this.w_my_not_trg;
  }

  dmg = 0;
  steps = null;

  get probability() {
    if (!this.prev) {
      return new Probability(1, 1);
    }

    let p = PROBABILITY_CACHE.get(this);
    if (p) {
      return p;
    }

    // calculate probability for each step
    p = null;
    for (const prev of this.prev) {
      let prev_p = prev.probability;
      let steps_p = null;
      for (const step of this.steps) {
        let step_p = new Probability(1, 1);
        if (step.my_size) {
          let my_trg = prev.my_trg;
          let my_not_trg = prev.my_not_trg;
          for (const c of step.my) {
            if (c === TRG) {
              step_p = step_p.mul(new Probability(my_trg, my_trg + my_not_trg));
              --my_trg;
            } else {
              step_p = step_p.mul(new Probability(my_not_trg, my_trg + my_not_trg));
              --my_not_trg;
            }
          }
        }
        if (step.op_size) {
          let op_cx = prev.op_cx;
          let op_not_cx = prev.op_not_cx;
          for (const c of step.op) {
            if (c === CX) {
              step_p = step_p.mul(new Probability(op_cx, op_cx + op_not_cx));
              --op_cx;
            } else {
              step_p = step_p.mul(new Probability(op_not_cx, op_cx + op_not_cx));
              --op_not_cx;
            }
          }
        }
        steps_p = steps_p ? steps_p.add(step_p) : step_p;
      }
      if (steps_p) {
        prev_p = prev_p.mul(steps_p);
      }
      p = p ? p.add(prev_p) : prev_p;
    }

    PROBABILITY_CACHE.set(this, p);
    return p;
  }

  get key() {
    return [
      // future state ...
      this.op_cx,
      this.op_not_cx,
      this.my_trg,
      this.my_not_trg,
      // this i need ...
      this.w_op_cx,
      this.w_op_not_cx,
      this.w_my_trg,
      this.w_my_not_trg
    ].join();
  }

  *next(steps) {
    if (
      this.op_cx >= steps.op_cx &&
      this.op_not_cx >= steps.op_not_cx &&
      this.my_trg >= steps.my_trg &&
      this.my_not_trg >= steps.my_not_trg
    ) {
      const state = new State({
        prev: this,

        op_cx: this.op_cx - steps.op_cx,
        op_not_cx: this.op_not_cx - steps.op_not_cx,

        my_trg: this.my_trg - steps.my_trg,
        my_not_trg: this.my_not_trg - steps.my_not_trg,

        w_op_cx: this.w_op_cx + steps.op_cx,
        w_op_not_cx: this.w_op_not_cx + steps.op_not_cx,

        w_my_trg: this.w_my_trg + steps.my_trg,
        w_my_not_trg: this.w_my_not_trg + steps.my_not_trg,

        dmg: this.dmg + steps.dmg,

        steps: steps.slow
      });
      yield state;
      return;
    }
    // do the slow mode
    next_step:
    for (const step of steps.slow) {
      let state = this;

      // do my
      if (step.my_size) {
        if (
          state.my_trg >= step.my_trg &&
          state.my_not_trg >= step.my_not_trg
        ) {
          // do everything
          state = new State({
            prev: state,

            my_trg: state.my_trg - step.my_trg,
            my_not_trg: state.my_not_trg - step.my_not_trg,

            w_my_trg: state.w_my_trg + step.my_trg,
            w_my_not_trg: state.w_my_not_trg + step.my_not_trg,

            steps: [ create_step(step.my, EMPTY) ]
          });
        } else {
          // do 1 after another
          const my = step.my.split('');
          do {
            let idx = my.findIndex((x, _, a) => x !== a[0]);
            if (idx < 0) {
              idx = my.length;
            }
            idx = Math.min(state.my_size, idx);
            const sub_step = create_step(my.splice(0, idx).join(''), EMPTY);
            if (
              state.my_trg < sub_step.my_trg ||
              state.my_not_trg < sub_step.my_not_trg
            ) {
              // impossible state
              continue next_step;
            }
            state = new State({
              prev: state,

              my_trg: state.my_trg - sub_step.my_trg,
              my_not_trg: state.my_not_trg - sub_step.my_not_trg,

              w_my_trg: state.w_my_trg + sub_step.my_trg,
              w_my_not_trg: state.w_my_not_trg + sub_step.my_not_trg,

              steps: [ create_step(sub_step.my, EMPTY) ]
            });
          } while (my.length);
        }
      }

      // do op
      if (step.op_size) {
        if (
          state.op_cx >= step.op_cx &&
          state.op_not_cx >= step.op_not_cx
        ) {
          // do everything
          state = new State({
            prev: state,

            op_cx: state.op_cx - step.op_cx,
            op_not_cx: state.op_not_cx - step.op_not_cx,

            w_op_cx: state.w_op_cx + step.op_cx,
            w_op_not_cx: state.w_op_not_cx + step.op_not_cx,

            steps: [ create_step(EMPTY, step.op) ]
          });
        } else {
          // do 1 after another
          const op = step.op.split('');
          do {
            let idx = op.findIndex((x, _, a) => x !== a[0]);
            if (idx < 0) {
              idx = op.length;
            }
            idx = Math.min(state.op_size, idx);
            const sub_step = create_step(EMPTY, op.splice(0, idx).join(''));
            if (
              state.op_cx < sub_step.op_cx ||
              state.op_not_cx < sub_step.op_not_cx
            ) {
              // impossible state
              continue next_step;
            }
            state = new State({
              prev: state,

              op_cx: state.op_cx - sub_step.op_cx,
              op_not_cx: state.op_not_cx - sub_step.op_not_cx,

              w_op_cx: state.w_op_cx + sub_step.op_cx,
              w_op_not_cx: state.w_op_not_cx + sub_step.op_not_cx,

              steps: [ create_step(EMPTY, sub_step.op) ]
            });
          } while (op.length);
        }
      }

      // do dmg
      if (step.dmg) {
        state = new State({
          prev: state,

          dmg: state.dmg + step.dmg,

          steps: [ create_step(EMPTY, EMPTY, step.dmg) ]
        });
      }

      yield state;
    }
  }

  constructor(obj) {
    if (Array.isArray(obj.prev)) {
      throw new Error('prev must not be array');
    }
    if (obj.prev) {
      for (const k of Object.keys(this)) {
        this[k] = obj.prev[k] ?? this[k];
      }
    }
    for (const k of Object.keys(this)) {
      this[k] = obj[k] ?? this[k];
    }
    if (this.prev) {
      this.prev = [this.prev];
    }

    // check for reshuffle:
    if (this.op_size === 0) {
      this.dmg += 1;
      this.op_cx = this.w_op_cx;
      this.op_not_cx = this.w_op_not_cx;
      this.w_op_cx = 0;
      this.w_op_not_cx = 0;
    }
    if (this.my_size === 0) {
      this.my_trg = this.w_my_trg;
      this.my_not_trg = this.w_my_not_trg;
      this.w_my_trg = 0;
      this.w_my_not_trg = 0;
    }
    Object.freeze(this);
  }

  get id() {
    return this.#id;
  }
}
