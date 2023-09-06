const RESULT_STR_CACHE = new Map();
const RESULT_CACHE = new Map();

export const EMPTY = '';
export const TRG = '1';
export const NOT_TRG = '2';
export const CX = '3';
export const NOT_CX = '4';

export default class Step {
  my;
  my_trg;
  my_not_trg;
  my_into_w;
  get my_size() {
    return this.my_trg + this.my_not_trg;
  }
  op;
  op_cx;
  op_not_cx;
  op_into_w;
  get op_size() {
    return this.op_cx + this.op_not_cx;
  }
  dmg;

  constructor(my, my_into_w, op, op_into_w, dmg) {
    this.dmg = dmg;
    this.my_into_w = my_into_w;
    this.op_into_w = op_into_w;
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

  static create({my, my_into_w, op, op_into_w, dmg}) {
    my ??= EMPTY;
    my_into_w ??= false;
    op ??= EMPTY;
    op_into_w ??= true;
    dmg ??= 0;
    const key = [my, my_into_w, op, op_into_w, dmg].join();
    let res = RESULT_CACHE.get(key);
    if (res) {
      return res;
    }
    res = new Step(my, my_into_w, op, op_into_w, dmg);
    RESULT_CACHE.set(key);
    return res;
  }
}
