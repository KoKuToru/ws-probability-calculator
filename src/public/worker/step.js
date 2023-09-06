const RESULT_STR_CACHE = new Map();
const RESULT_CACHE = new Map();

export const EMPTY = '';
export const TRG = '1';
export const NOT_TRG = '2';
export const CX = '3';
export const NOT_CX = '4';

export class StepFast {
  slow;
  my_trg;
  my_not_trg;
  get my_size() {
    return this.my_trg + this.my_not_trg;
  }
  op_cx;
  op_not_cx;
  get op_size() {
    return this.op_cx + this.op_not_cx;
  }

  constructor(obj) {
    Object.assign(this, obj);
    Object.freeze(this);
    Object.freeze(this.slow);
  }

  static create(steps) {
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
    return Object.freeze([...fast.values()].map(x => new StepFast(x)));
  }
}

class Step {
  my;
  my_trg;
  my_not_trg;
  get my_size() {
    return this.my_trg + this.my_not_trg;
  }
  op;
  op_cx;
  op_not_cx;
  get op_size() {
    return this.op_cx + this.op_not_cx;
  }
  dmg;

  constructor(my, op, dmg) {
    this.dmg = dmg;
    if (typeof my !== 'string') {
      throw new Error('`my` must be a string');
    }
    if (typeof op !== 'string') {
      throw new Error('`my` must be a string');
    }
    let mys = RESULT_STR_CACHE.get('my_' + my);
    if (!mys) {
      if (my.split('').some(x => x !== TRG && x !== NOT_TRG)) {
        throw new Error('`my` can only have TRG and NOT_TRG');
      }
      mys = {
        my,
        my_trg: my.split('').reduce((p, c) => p + (c === TRG), 0),
        my_not_trg: my.split('').reduce((p, c) => p + (c === NOT_TRG), 0)
      }
      RESULT_STR_CACHE.set(my, mys);
    }
    Object.assign(this, mys);

    let ops = RESULT_STR_CACHE.get('op_' + op);
    if (!ops) {
      if (op.split('').some(x => x !== CX && x !== NOT_CX)) {
        throw new Error('`op` can only have CX and NOT_CX');
      }
      ops = {
        op,
        op_cx: op.split('').reduce((p, c) => p + (c === CX), 0),
        op_not_cx: op.split('').reduce((p, c) => p + (c === NOT_CX), 0)
      }
      RESULT_STR_CACHE.set(op, ops);
    }
    Object.assign(this, ops);

    Object.freeze(this);
  }
}

export default function step(my, op, dmg) {
  dmg ??= 0;
  const key = [my, op, dmg].join();
  let res = RESULT_CACHE.get(key);
  if (res) {
    return res;
  }
  res = new Step(my, op, dmg);
  RESULT_CACHE.set(key);
  return res;
}
