#!/usr/bin/env -S node
import Action from"./action-3baa581546e81bfd61da2b5de024a151.js"
import compiler from"./compiler-1f7c5dd78a9df39ed419695e7eec654b.js"
import Attack from"./actions/attack-1532d7228d1f6c6fe469a6a89d38a13f.js"
import Burn from"./actions/burn-7fccf3ee688585a86ddcb3b813129bad.js"
import Mill from"./actions/mill-19e41509e8b2de82d76d835d3cc34a76.js"
import Damage from"./actions/damage-7d275756a8032932e6d44c7d6515f04a.js"
import Push from"./actions/push-1f37cd7da63f13d6fee3904e3510d6da.js"
import Pop from"./actions/pop-f844184aa09161cc97f8930dd691432a.js"
const ALLOWED_ACTIONS=new Map([["attack",Attack],["burn",Burn],["mill",Mill],["damage",Damage],["push",Push],["pop",Pop]])
function build_action(t,o){o??=!0
let e=new Action
for(const[a,s,r,c]of t){const t=ALLOWED_ACTIONS.get(a)
t?(e=new t(e,...s),e.setConditions(r),e.setDedup(o&&c)):console.error(`unknown action ${a}`)}return e}console.log("start testing")
import attack_tests from"./tests/attack-0663a0c09fd5bb4ed51c88062e026b7d.js"
import burn_tests from"./tests/burn-a171fa434ae94423d9aa7e4f36ce68f1.js"
import mill_tests from"./tests/mill-7d4ca29a4f508df0c167b6e6e48c08a5.js"
import{strict as assert}from"node:assert"
import Probability from"./probability-e41d770e4a1166819d3f147462a93b55.js"
for(const{code:t,tests:o}of[...attack_tests,...burn_tests,...mill_tests]){console.log(JSON.stringify(t))
const e=compiler(t)
for(const t of o){const o=[]
for(const a of[!1,!0]){const s=build_action(e,a)
console.log("\t","op:",t.op_cx,t.op_not_cx,"my:",t.my_trg,t.my_not_trg,"dedup:",a)
const r=[...s.execute(t)].flatMap((t=>[...t.debug_seperated_states()])),c=r.map((t=>{const o=t.debug_moves_raw(),e=o?.next?.()?.value,a=o?.next?.()?.done
return assert.equal(a,!0),[e,t.dmg,t.probability.toJSON()]})).sort(SORTER)
c.sort(SORTER)
const n=[],d=[]
let i=new Probability(0,1)
for(const t of r){const o=t.probability
i=i.add(o),n[t.dmg]=(n[t.dmg]??new Probability(0,1)).add(o),d[t.dmg]=(d[t.dmg]??0)+1}assert.equal(i.toNumber()<=1,!0,"must be smaller equal 1"),o.push([c,n,d])}assert.deepStrictEqual(o[0],o[1],"should be same")}}function SORTER(t,o){for(let e=0;e<Math.max(t.length,o.length);++e){if(t[e]<o[e])return-1
if(t[e]>o[e])return 1}return 0}