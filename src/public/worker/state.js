import Probability from './probability.js';
import StepFast from './step-fast.js';
import Step, { CX, TRG, NOT_CX, NOT_TRG, WAITINGROOM, STOCK, CLOCK, MEMORY } from './step.js';

const EMPTY_STEPS = Object.freeze([ Step.create({}) ]);
const P_ONE = new Probability(1, 1);

export const ANTI_GC = [];

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

  // pending state:
  p_op_cx = 0;
  p_op_not_cx = 0;
  get p_op_size() {
    return this.p_op_cx + this.p_op_not_cx;
  }

  p_my_trg = 0;
  p_my_not_trg = 0;
  get p_my_size() {
    return this.p_my_trg + this.p_my_not_trg;
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
    const steps = this.steps?.length ? this.steps : [{op:'',my:''}];
    const prev = this.prev?.length ? this.prev : [{}];
    for (const s of steps)
    for (const p of prev)
    for (const n of p?.debug_moves?.() ?? ['']) {
      const my = s.my
        .replace(/1/g, 'TRG ')
        .replace(/2/g, 'NOT_TRG ');
      const op = s.op
        .replace(/3/g, 'CX ')
        .replace(/4/g, 'NOT_CX ');

      if (!my?.length && !op?.length) {
        yield n;
        continue;
      }
      yield [n, '( ', my.length ? `my: ${my} ` : null, op.length ? `op: ${op} ` : null, ')'].filter(x => x).join('');
    }
  }


  *debug_moves_raw() {
    const steps = this.steps?.length ? this.steps : [{op:'',my:''}];
    const prev = this.prev?.length ? this.prev : [{}];
    for (const s of steps)
    for (const p of prev)
    for (const n of p?.debug_moves_raw?.() ?? ['']) {
      yield [n, s.my, s.op].filter(x => x).join('');
    }
  }

  *debug_seperated_states() {
    const steps = this.steps?.length ? this.steps : [Step.create({})];
    const prev = this.prev?.length ? this.prev : [{}];
    for (const s of steps)
    for (const p of prev)
    for (const p2 of p?.debug_seperated_states?.() ?? [null]) {
      const o = {
        ...this,
        prev: p2,
        steps: [s],
        osteps: StepFast.create([s])
      };
      yield new State(o);
    }
  }

  #probability;
  get probability() {
    if (!this.prev) {
      return P_ONE;
    }

    let p = this.#probability;
    if (p) {
      return p;
    }

    // calculate probability for each step
    p = null;
    for (const prev of this.prev) {
      let prev_p = prev.probability;
      let steps_p = null;
      for (const step of this.steps) {
        let step_p = P_ONE;
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

    this.#probability = p;
    return p;
  }

  get key() {
    return [
      this.dmg,

      this.op_cx,
      this.op_not_cx,
      this.my_trg,
      this.my_not_trg,

      this.w_op_cx,
      this.w_op_not_cx,
      this.w_my_trg,
      this.w_my_not_trg,

      // pending should be always 0
      this.p_op_cx,
      this.p_op_not_cx,
      this.p_my_trg,
      this.p_my_not_trg,

      ...this.stack
    ].join();
  }

  *next(steps, osteps)  {
    osteps ??= steps;
    for (let state of this.subnext(steps, osteps)) {
      // move pending into target
      if (state.p_my_size) {
        const tmp = {
          prev: state,
          p_my_trg: 0,
          p_my_not_trg: 0,
          w_my_trg: state.w_my_trg,
          w_my_not_trg: state.w_my_not_trg,
          steps: EMPTY_STEPS,
          osteps: osteps
        };
        switch (steps.my_target) {
          case WAITINGROOM:
            tmp.w_my_trg += state.p_my_trg;
            tmp.w_my_not_trg += state.p_my_not_trg;
            break;
          case STOCK:
            // just remove the cards for now..
            break;
          case CLOCK:
            // just remove the cards for now..
            break;
          case MEMORY:
            // just remove the cards for now..
            break;
        }
        state = new State(tmp);
      }
      if (state.p_op_size) {
        const tmp = {
          prev: state,
          p_op_cx: 0,
          p_op_not_cx: 0,
          w_op_cx: state.w_op_cx,
          w_op_not_cx: state.w_op_not_cx,
          steps: EMPTY_STEPS,
          osteps: osteps
        };
        switch (steps.op_target) {
          case WAITINGROOM:
            tmp.w_op_cx += state.p_op_cx;
            tmp.w_op_not_cx += state.p_op_not_cx;
            break;
          case STOCK:
            // just remove the cards for now..
            break;
          case CLOCK:
            // just remove the cards for now..
            break;
          case MEMORY:
            // just remove the cards for now..
            break;
        }
        state = new State(tmp);
      }
      yield state;
    }
  }

  *subnext(steps, osteps, retry) {
    retry ??= false;
    if (
      !steps.op_size &&
      !steps.my_size &&
      !steps.dmg &&
      !steps.next.length
    ) {
      // nothing todo
      yield this;
      return;
    }
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

        p_my_trg: this.p_my_trg + steps.my_trg,
        p_my_not_trg: this.p_my_not_trg + steps.my_not_trg,

        p_op_cx: this.p_op_cx + steps.op_cx,
        p_op_not_cx: this.p_op_not_cx + steps.op_not_cx,

        dmg: this.dmg + steps.dmg,

        steps: steps.slow,
        osteps
      });
      // shuffle dmg
      let rsteps = EMPTY_STEPS;
      if (state.my_reshuffled) {
        rsteps = rsteps.flatMap(x => {
          return [
            Step.create({ ...x, my: TRG    , my_target: CLOCK }),
            Step.create({ ...x, my: NOT_TRG, my_target: CLOCK }),
          ];
        });
      }
      if (state.op_reshuffled) {
        rsteps = rsteps.flatMap(x => {
          return [
            Step.create({ ...x, op: CX,     op_target: CLOCK, dmg: 1 }),
            Step.create({ ...x, op: NOT_CX, op_target: CLOCK, dmg: 1 }),
          ];
        });
      }
      if (rsteps === EMPTY_STEPS) {
        if (steps.next.length) {
          for (const snext of steps.next) {
            for (const fstate of state.subnext(snext, osteps)) {
              yield fstate;
            }
          }
        } else {
          yield state;
        }
        return;
      }
      // store pending
      const p_my_trg     =  state.p_my_trg;
      const p_my_not_trg =  state.p_my_not_trg;
      const p_op_cx      =  state.p_op_cx;
      const p_op_not_cx  =  state.p_op_not_cx;
      const has_pending  = p_my_trg || p_my_not_trg || p_op_cx || p_op_not_cx;
      if (has_pending) {
        // remove pending
        state = new State({
          prev: state,
          p_my_trg: 0,
          p_my_not_trg: 0,
          p_op_cx: 0,
          p_op_not_cx: 0,
          steps: EMPTY_STEPS,
          osteps: osteps
        });
      }
      // do the steps
      const fsteps = StepFast.create(rsteps, null);
      for (const fstep of fsteps) {
        for (let rstate of state.next(fstep, osteps)) {
          if (has_pending) {
            // readd pending
            rstate = new State({
              prev: rstate,
              p_my_trg,
              p_my_not_trg,
              p_op_cx,
              p_op_not_cx,
              steps: EMPTY_STEPS,
              osteps: osteps
            });
          }
          if (steps.next.length) {
            for (const snext of steps.next) {
              for (let fstate of rstate.subnext(snext, osteps)) {
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
    if (retry) {
      // IMPOSSIBLE STATE
      return;
    }
    // do the slow mode:
    const fsteps = StepFast.create(steps.slow, this.my_size, this.op_size);
    for (const fstep of fsteps) {
      for (const rstate of this.subnext(fstep, osteps, true)) {
        yield rstate;
      }
    }
  }

  static #setup;
  constructor(obj) {
    ANTI_GC.push(this);
    if (Array.isArray(obj.prev)) {
      throw new Error('prev must not be array');
    }

    if (!State.#setup) {
      // jit a fast copy function
      State.#setup = new Function("obj", Object.keys(this).map(x => {
        x = JSON.stringify(x);
        return `this[${x}] = obj[${x}] ?? this[${x}];`
      }).join('\n'));
    }
    if (obj.prev) {
      State.#setup.call(this, obj.prev);
    }
    State.#setup.call(this, obj);

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
