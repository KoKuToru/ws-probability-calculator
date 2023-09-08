export default class StepFast {
  slow;

  my_trg;
  my_not_trg;
  my_into_w;
  get my_size() {
    return this.my_trg + this.my_not_trg;
  }

  op_cx;
  op_not_cx;
  op_into_w;
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
        step.my_into_w,
        step.op_cx,
        step.op_not_cx,
        step.op_into_w,
        step.dmg
      ].join();
      let tmp = fast.get(key);
      if (!tmp) {
        tmp = {
          slow: [],
          my_trg: step.my_trg,
          my_not_trg: step.my_not_trg,
          my_into_w: step.my_into_w,
          op_cx: step.op_cx,
          op_not_cx: step.op_not_cx,
          op_into_w: step.op_into_w,
          dmg: step.dmg
        };
        fast.set(key, tmp);
      }
      tmp.slow.push(step);
    }
    return Object.freeze([...fast.values()].map(x => new StepFast(x)));
  }
}
