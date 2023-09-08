import Probability from './probability.js';
import StepFast from './step-fast.js';
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

  *next(steps, osteps) {
    osteps ??= steps;
    if (
      this.op_cx >= steps.op_cx &&
      this.op_not_cx >= steps.op_not_cx &&
      this.my_trg >= steps.my_trg &&
      this.my_not_trg >= steps.my_not_trg
    ) {
      let state = new State({
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
        osteps
      });
      // shuffle dmg
      const rsteps = [];
      if (state.my_reshuffled && state.op_reshuffled) {
        rsteps.push(
          Step.create({ my: TRG,     op: CX,     dmg: 1 }),
          Step.create({ my: NOT_TRG, op: CX,     dmg: 1 }),
          Step.create({ my: TRG,     op: NOT_CX, dmg: 1 }),
          Step.create({ my: NOT_TRG, op: NOT_CX, dmg: 1 }),
        );
      } else if (state.my_reshuffled) {
        rsteps.push(
          Step.create({ my: TRG     }),
          Step.create({ my: NOT_TRG }),
        );
      } else if (state.op_reshuffled) {
        rsteps.push(
          Step.create({ op: CX,     dmg: 1 }),
          Step.create({ op: NOT_CX, dmg: 1 }),
        );
      } else if (steps.next.length) {
        for (const fast of steps.next) {
          for (const fstate of state.next(fast, osteps)) {
            yield fstate;
          }
        }
        return;
      } else {
        yield state;
        return;
      }
      const fsteps = StepFast.create(rsteps, null);
      for (const fstep of fsteps) {
        for (const rstate of state.next(fstep, osteps)) {
          if (steps.next.length) {
            for (const fast of steps.next) {
              for (const fstate of rstate.next(fast, osteps)) {
                yield fstate;
              }
            }
          } else {
            yield rstate;
          }
        }
      }
      return;
    }
    if (steps.next.length) {
      // IMPOSSIBLE STATE
      return;
    }
    // do the slow mode:
    const my_steps = StepFast.create(steps.slow.map(x => Step.create({ my: x.my,  my_into_w: x.my_into_w })), this.my_size);
    const op_steps = StepFast.create(steps.slow.map(x => Step.create({ op: x.op,  op_into_w: x.op_into_w, dmg: x.dmg })), this.op_size);
    for (const my_step of my_steps) {
      for (const my_state of this.next(my_step, osteps)) {
        for (const op_step of op_steps) {
          for (const op_state of my_state.next(op_step, osteps)) {
            yield op_state;
          }
        }
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
