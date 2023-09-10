import Step from './step.js';

const EMPTY_STEP = Step.create({});

export default class StepFast {
  slow;
  next;

  my_trg;
  my_not_trg;
  my_target;
  get my_size() {
    return this.my_trg + this.my_not_trg;
  }

  op_cx;
  op_not_cx;
  op_target;
  get op_size() {
    return this.op_cx + this.op_not_cx;
  }

  constructor(obj) {
    Object.assign(this, obj);
    if (this.next.some(x => x != EMPTY_STEP)) {
      this.next = StepFast.create(this.next);
    } else {
      this.next = [];
    }
    Object.freeze(this);
    Object.freeze(this.slow);
  }

  static create(steps, my_limit, op_limit) {
    my_limit ??= null;
    op_limit ??= null;
    const hack = my_limit !== null || op_limit !== null;
    let c = 0;
    const fast = new Map();
    for (const step of steps) {
      let kstep = step;
      let nstep;
      if (
        (
          my_limit !== null ||
          op_limit !== null
        ) && (
          step.my_size > my_limit ||
          step.op_size > op_limit
        )
      ) {
        // only split if something is to split
        kstep = Step.create({
          my: step.my.slice(0, my_limit),
          my_target: step.my_target,
          op: step.op.slice(0, op_limit),
          op_target: step.op_target,
        });
        nstep = Step.create({
          my: step.my.slice(my_limit),
          my_target: step.my_target,
          op: step.op.slice(op_limit),
          op_target: step.op_target,
          dmg: step.dmg
        });
      } else {
        nstep = EMPTY_STEP;
      }
      if (hack) {
        // XXX something is wrong with splitting
        c += 1;
      }
      const key = [
        kstep.my_trg,
        kstep.my_not_trg,
        kstep.my_target,
        kstep.op_cx,
        kstep.op_not_cx,
        kstep.op_target,
        kstep.dmg,
        c
      ].map(x => x.toString()).join();
      let tmp = fast.get(key);
      if (!tmp) {
        tmp = {
          slow: [],
          next: [],
          my_trg: kstep.my_trg,
          my_not_trg: kstep.my_not_trg,
          my_target: kstep.my_target,
          op_cx: kstep.op_cx,
          op_not_cx: kstep.op_not_cx,
          op_target: kstep.op_target,
          dmg: kstep.dmg,
          c
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
