import Step from './step.js';

export default class StepFast {
  slow;
  next;

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
    this.next = StepFast.create(this.next);
    Object.freeze(this);
    Object.freeze(this.slow);
  }

  static create(steps, limit) {
    const fast = new Map();
    for (const step of steps) {
      let kstep = step;
      let nstep;
      if (limit) {
        kstep = Step.create({
          my: step.my.slice(0, limit),
          my_into_w: step.my_into_w, //<- not very correct
          op: step.op.slice(0, limit),
          op_into_w: step.op_into_w, //<- not very correct
        });
        // the following might generate a EMPTY step
        // but .. i have no better idea yet
        nstep = Step.create({
          my: step.my.slice(limit),
          my_into_w: step.my_into_w,
          op: step.op.slice(limit),
          op_into_w: step.op_into_w,
          dmg: step.dmg
        });
      }
      const key = [
        kstep.my_trg,
        kstep.my_not_trg,
        kstep.my_into_w,
        kstep.op_cx,
        kstep.op_not_cx,
        kstep.op_into_w,
        kstep.dmg
      ].join();
      let tmp = fast.get(key);
      if (!tmp) {
        tmp = {
          slow: [],
          next: [],
          my_trg: kstep.my_trg,
          my_not_trg: kstep.my_not_trg,
          my_into_w: kstep.my_into_w,
          op_cx: kstep.op_cx,
          op_not_cx: kstep.op_not_cx,
          op_into_w: kstep.op_into_w,
          dmg: kstep.dmg
        };
        fast.set(key, tmp);
      }
      tmp.slow.push(kstep);
      if (nstep) {
        tmp.next.push(nstep);
      }
    }
    return Object.freeze([...fast.values()].map(x => new StepFast(x)));
  }
}
