#!/usr/bin/env -S node
import Action from './action.js';
import compiler from './compiler.js';

import Attack from './actions/attack.js';
import Burn from './actions/burn.js';
import Mill from './actions/mill.js';
import Damage from './actions/damage.js';
import Push from './actions/push.js';
import Pop from './actions/pop.js';

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

console.log("start testing")

import attack_tests from './tests/attack.js'
import burn_tests from './tests/burn.js'
import mill_tests from './tests/mill.js'

import { strict as assert } from 'node:assert';
import Probability from './probability.js';

for (const { code, tests } of [
  ...attack_tests,
  ...burn_tests,
  ...mill_tests
]) {
  console.log(JSON.stringify(code))
  const compiled_code = compiler(code);

  for (const state of tests) {
    const res = []

    for (const dedup of [false, true]) {
      const action = build_action(compiled_code, dedup);

      console.log('\t', 'op:', state.op_cx, state.op_not_cx, 'my:', state.my_trg, state.my_not_trg, 'dedup:', dedup)

      const states = [...action.execute(state)];
      const states_s = states.flatMap(x => [...x.debug_seperated_states()]);
      const states_mp = states_s.map(x => {
        const t = x.debug_moves_raw();
        const a = t?.next?.()?.value;
        const b = t?.next?.()?.done;
        assert.equal(b, true);
        return [a, x.dmg, x.probability.toJSON()];
      }).sort(SORTER);

      // sort
      states_mp.sort(SORTER);

      // merge
      const dmg_p = [];
      const dmg_c = []
      let p_g = new Probability(0, 1);
      for (const x of states_s) {
        // add probability
        const p = x.probability;
        p_g = p_g.add(p)
        dmg_p[x.dmg] = (dmg_p[x.dmg] ?? new Probability(0, 1)).add(p);
        dmg_c[x.dmg] = (dmg_c[x.dmg] ?? 0) + 1;
      }
      assert.equal(p_g.toNumber(), 1., 'must be 1');

      res.push([states_mp, dmg_p, dmg_c]);
    }

    assert.deepStrictEqual(res[0], res[1], 'should be same')
  }
}

function SORTER(a, b) {
  for (let i = 0; i < Math.max(a.length, b.length); ++i) {
    if (a[i] < b[i]) {
      return -1;
    }
    if (a[i] > b[i]) {
      return 1;
    }
  }
  return 0;
}

