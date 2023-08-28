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
    op_size: data.op_size,
    /*
    my_trg: data.my_trg,
    my_size: data.my_size,
    */

    /*settings: Object.freeze({
      // settings:
      op_refresh_cx: data.op_refresh_cx,
      op_refresh_size: data.op_refresh_size,
      my_refresh_trg: data.my_refresh_trg,
      my_refresh_size: data.my_refresh_size
    })*/
  });

  let dmg = [];
  for (const state of action.execute(istate)) {
    const p = state.probability;
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
  for (let i = 0; i < dmg.length; ++i) {
    if (dmg[i] === undefined) {
      dmg[i] = 0;
      continue;
    }
    dmg[i] = dmg[i].reduce((p, c) => p.add(c)).toNumber();
  }

  let mean = 0;
  for (let i = 0; i < dmg.length; i++) {
    mean += i * dmg[i];
  }
  if (mean > 0) {
    mean /= dmg.reduce((c, p) => c + p);
  }

  e.ports[0].postMessage({
    data,
    dmg,
    mean,
    zero: [...dmg, 0][0] * 100,
    one_or_more: [0, ...dmg.slice(1)].reduce((p, c) => p + c) * 100
  });
});
