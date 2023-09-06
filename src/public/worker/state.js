import Probability from './probability.js';
import Step, { CX, TRG, NOT_CX, NOT_TRG } from './step.js';

const PROBABILITY_CACHE = new WeakMap();

export default class State {
  static id = 0;
  #id = ++State.id;

  prev = null;
  stack = [];

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
  #op_reshuffled = false;
  get op_reshuffled() {
    return this.#op_reshuffled;
  }

  w_my_trg = 0;
  w_my_not_trg = 0;
  get w_my_size() {
    return this.w_my_trg + this.w_my_not_trg;
  }
  #my_reshuffled = false;
  get my_reshuffled() {
    return this.#my_reshuffled;
  }

  dmg = 0;
  steps = null;
  osteps = null;

  get debug_count() {
    return this.prev?.reduce?.((p, c) => p + c.debug_count, 0) ?? 1;
  }

  *debug_moves() {
    for (const s of this.steps ?? [{op:'',my:''}])
    for (const p of this.prev ?? [{}])
    for (const n of p?.debug_moves?.() ?? ['']) {
      yield [n, s.my, s.op].filter(x => x).join();
    }
  }

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
      this.dmg,
      this.w_op_cx,
      this.w_op_not_cx,
      this.w_my_trg,
      this.w_my_not_trg,
      // extra stack information
      ...this.stack
    ].join();
  }

  *next_slow_op_reshuffled(steps, step) {
    // reshuffle dmg
    for (const step_c of [ Step.create({ op: CX, dmg: 1 }), Step.create({ op: NOT_CX, dmg: 1 }) ]) {
      for (const state of this.next_slow(steps, step_c)) {
        for (const rstate of state.next_slow(steps, step)) {
          yield rstate;
        }
      }
    }
  }

  *next_slow_my_reshuffled(steps, step) {
    // reshuffle
    for (const step_c of [ Step.create({ my: TRG }), Step.create({ my: NOT_TRG }) ]) {
      for (const state of this.next_slow(steps, step_c)) {
        for (const rstate of state.next_slow(steps, step)) {
          yield rstate;
        }
      }
    }
  }

  *next_slow_reshuffled(steps, step) {
    for (const step_c of [ Step.create({ op: CX, dmg: 1 }), Step.create({ op: NOT_CX, dmg: 1 }) ]) {
      for (const step_d of [ Step.create({ my: TRG }), Step.create({ my: NOT_TRG }) ]) {
        for (const state of this.next_slow(steps, step_c)) {
          for (const rstate of state.next_slow(steps, step_d)) {
            for (const lstate of rstate.next_slow(steps, step)) {
              yield lstate;
            }
          }
        }
      }
    }
  }

  *next_slow(steps, step) {
    // XXX: waiting room is handled wrong !
    if (!step) {
      yield this;
      return;
    }

    let step_a = step;
    let step_b;
    if (
      step.op_size > this.op_size ||
      step.my_size > this.my_size
    ) {
      // split step
      step_a = Step.create({
        my: step.my.slice(0, this.my_size),
        op: step.op.slice(0, this.op_size),
        op_into_w: step.op_into_w,
        my_into_w: step.my_into_w
      });
      step_b = Step.create({
        my: step.my.slice(this.my_size),
        op: step.op.slice(this.op_size),
        op_into_w: step.op_into_w,
        my_into_w: step.my_into_w,
        dmg: step.dmg
      });
    }

    // remove step_a if nothing..
    if (step_a.op_size == 0 && step_a.my_size == 0) {
      step_a = step_b;
      step_b = null;
    }

    if (
      this.op_cx >= step_a.op_cx &&
      this.op_not_cx >= step_a.op_not_cx &&
      this.my_trg >= step_a.my_trg &&
      this.my_not_trg >= step_a.my_not_trg
    ) {
      const state = new State({
        prev: this,

        op_cx: this.op_cx - step_a.op_cx,
        op_not_cx: this.op_not_cx - step_a.op_not_cx,

        my_trg: this.my_trg - step_a.my_trg,
        my_not_trg: this.my_not_trg - step_a.my_not_trg,

        w_op_cx: step_a.op_into_w ? this.w_op_cx + step_a.op_cx : this.w_op_cx,
        w_op_not_cx: step_a.op_into_w ? this.w_op_not_cx + step_a.op_not_cx : this.w_op_not_cx,

        w_my_trg: step_a.my_into_w ? this.w_my_trg + step_a.my_trg : this.w_my_trg,
        w_my_not_trg: step_a.my_into_w ? this.w_my_not_trg + step_a.my_not_trg : this.w_my_not_trg,

        dmg: this.dmg + step_a.dmg,

        steps: [ step_a ],
        osteps: steps
      });
      if (state.op_reshuffled && this.my_reshuffled) {
        for (const rstate of state.next_slow_reshuffled(steps, step_b)) {
          yield rstate;
        }
      } else if (state.op_reshuffled) {
        for (const rstate of state.next_slow_op_reshuffled(steps, step_b)) {
          yield rstate;
        }
      } else if (state.my_reshuffled) {
        for (const rstate of state.next_slow_my_reshuffled(steps, step_b)) {
          yield rstate;
        }
      }
      for (const rstate of state.next_slow(steps, step_b)) {
        yield rstate;
      }
    }
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

        w_op_cx: steps.op_into_w ? this.w_op_cx + steps.op_cx : this.w_op_cx,
        w_op_not_cx: steps.op_into_w ? this.w_op_not_cx + steps.op_not_cx : this.w_op_not_cx,

        w_my_trg: steps.my_into_w ? this.w_my_trg + steps.my_trg : this.w_my_trg,
        w_my_not_trg: steps.my_into_w ? this.w_my_not_trg + steps.my_not_trg : this.w_my_not_trg,

        dmg: this.dmg + steps.dmg,

        steps: steps.slow,
        osteps: steps
      });
      yield state;
      return;
    }
    // do the slow mode:
    for (const step of steps.slow) {
      for (const state of this.next_slow(steps, step)) {
        yield state;
      }
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
      this.op_cx = this.w_op_cx;
      this.op_not_cx = this.w_op_not_cx;
      this.w_op_cx = 0;
      this.w_op_not_cx = 0;
      this.#op_reshuffled = true;
    }
    if (this.my_size === 0) {
      this.my_trg = this.w_my_trg;
      this.my_not_trg = this.w_my_not_trg;
      this.w_my_trg = 0;
      this.w_my_not_trg = 0;
      this.#my_reshuffled = true;
    }
    Object.freeze(this);
    Object.freeze(this.stack);
    Object.freeze(this.steps);
  }

  get id() {
    return this.#id;
  }
}
