import Action from './action.js';
import Probability from './probability.js';
import State from './state.js';


self.addEventListener('message', function(e) {
  const data = e.data;
  let action = new Action();

  const allowed_actions = new Set(Object.getOwnPropertyNames(Action.prototype));
  allowed_actions.delete('constructor');
  allowed_actions.delete('execute');

  for (const code of data.code) {
    if (allowed_actions.has(code[0])) {
      action = action[code[0]](...code.slice(1));
    } else {
      console.error(`unknown action ${code[0]}`);
    }
  }
  // execute
  const istate = new State({
    op_cx: data.op_cx,
    op_not_cx: data.op_size - data.op_cx,
    w_op_cx: 8 - data.op_cx,
    w_op_not_cx: 50 - data.op_size
  });


  const states = [...action.execute(istate)];

  let dmg = [];
  for (const state of states) {
    // calculate probabilty for state
    const p = state.probability;
    // store dmg probability
    const arr = (dmg[state.dmg] ??= []);
    const idx = arr.findIndex(x => x.denominator === p.denominator);
    if (idx === -1) {
      arr.push(p);
      continue;
    }
    const tmp = arr[idx].add(p);
    arr[idx] = tmp;
  }

  dmg = Array.from(dmg);
  const ZERO = new Probability(0, 1);
  for (let i = 0; i < dmg.length; ++i) {
    if (dmg[i] === undefined) {
      dmg[i] = ZERO;
      continue;
    }
    dmg[i] = dmg[i].reduce((p, c) => p.add(c));
  }

  let mean = new Probability(0, 1);
  for (let i = 0; i < dmg.length; i++) {
    mean = mean.add(dmg[i].mul(new Probability(i, 1)));
  }
  if (mean.numerator > 0n) {
    const dmg_sum = dmg.reduce((c, p) => c.add(p));
    mean = mean.mul(new Probability(dmg_sum.denominator, dmg_sum.numerator));
  }

  const dmg_acc = [];
  for (let i = 0; i < dmg.length; ++i) {
    if (i == 0) {
      dmg_acc[i] = dmg[i];
      continue;
    }
    dmg_acc[i] = dmg.slice(i).reduce((c, p) => c.add(p));
  }

  e.ports[0].postMessage({
    data,
    exact_dmg: dmg.map(x => x.toString()),
    exact_dmg_acc: dmg_acc.map(x => x.toString()),
    dmg: dmg.map(x => x.toNumber()),
    dmg_acc: dmg_acc.map(x => x.toNumber()),
    exact_mean: mean.toString(),
    mean: mean.toNumber()
  });
});
