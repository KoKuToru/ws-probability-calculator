import Action from './action.js';
import Probability from './probability.js';
import State, {ANTI_GC} from './state.js';

import Attack from './actions/attack.js';
import Burn from './actions/burn.js';
import Mill from './actions/mill.js';
import Damage from './actions/damage.js';
import Push from './actions/push.js';
import Pop from './actions/pop.js';

import compiler from './compiler.js';

const ALLOWED_ACTIONS = new Map([
  ['attack', Attack],
  ['burn', Burn],
  ['mill', Mill],
  ['damage', Damage],
  ['push', Push],
  ['pop', Pop],
]);

function build_action(code, allow_dedup) {
  allow_dedup ??= true;
  let action = new Action();
  for (const [cmd, params, condition, dedup] of code) {
    const cls = ALLOWED_ACTIONS.get(cmd);
    if (cls) {
      action = new cls(action, ...params);
      action.setConditions(condition);
      action.setDedup(allow_dedup && dedup);
    } else {
      console.error(`unknown action ${cmd}`);
    }
  }
  return action;
}

self.addEventListener('message', function(e) {
  const data = e.data;
  const code = compiler(data.code);
  const action = build_action(code);

  // execute
  const istate = new State({
    op_cx: data.op_cx,
    op_not_cx: data.op_size - data.op_cx,
    w_op_cx: 8 - data.op_cx,
    w_op_not_cx: 50 - data.op_size
  });

  const DEBUG = false;

  DEBUG && console.profile();

  DEBUG && console.time('execute');
  const states = [...action.execute(istate)];
  DEBUG && console.timeEnd('execute');

  DEBUG && console.time('probability');
  let dmg = [];
  for (const state of states) {
    // calculate probabilty for state
    const p = state.probability;

    // store dmg probability
    const arr = (dmg[state.dmg] ??= new Map());
    arr.set(p.denominator, (arr.get(p.denominator) ?? 0n) + p.numerator);
  }
  ANTI_GC.splice(0, ANTI_GC.length); // < free memory
  DEBUG && console.timeEnd('probability');

  DEBUG && console.time('accumulate');
  dmg.forEach((v, i) => {
    dmg[i] = [...[...v.entries()].map(([k, v]) => new Probability(v, k))];
  });
  DEBUG && console.timeEnd('accumulate');

  DEBUG && console.profileEnd();

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
    code,
    exact_dmg: dmg.map(x => x.toString()),
    exact_dmg_acc: dmg_acc.map(x => x.toString()),
    dmg: dmg.map(x => x.toNumber()),
    dmg_acc: dmg_acc.map(x => x.toNumber()),
    exact_mean: mean.toString(),
    mean: mean.toNumber()
  });
});
