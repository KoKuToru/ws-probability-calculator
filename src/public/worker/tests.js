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
const tests = [
  ...attack_tests,
  ...burn_tests
];

import { strict as assert } from 'node:assert';
import Probability from './probability.js';

for (const { code, outputs } of tests) {
  console.log(code)
  const compiled_code = compiler(code);
  for (const { state, results } of outputs) {
    for (const dedup of [true, false]) {
      const action = build_action(compiled_code, dedup);
      results?.sort?.(SORTER);
      console.log('\t', 'op:', state.op_cx, state.op_not_cx, 'my:', state.my_trg, state.my_not_trg, 'dedup:', dedup)
      const states = [...action.execute(state)];
      const state_results = states.flatMap(x => [...x.debug_moves_raw()].map(y => [y, x])).sort(SORTER);
      const probability = states.reduce((p,c) => p.add(c.probability), new Probability(0, 1)).toString();
      console.log('\t\t', probability)
      if (results) {
        for (let i = 0; i < Math.max(state_results.length, results.length); ++i) {
          console.log('\t\t', state_results[i][0])
          assert.deepStrictEqual(state_results[i][0], results[i][0], 'moves must be same');
          const tmp = Object.fromEntries(Object.entries(state_results[i][1]).filter(([k]) => k in results[i][1]));
          assert.deepStrictEqual(tmp, results[i][1], 'state must be same');
        }
      }
      assert.deepEqual(probability, '¹⁄₁', 'probability should be 1')
    }
  }
}

function SORTER([a], [b]) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

