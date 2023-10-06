import Action from"./action-3baa581546e81bfd61da2b5de024a151.js"
import Probability from"./probability-e41d770e4a1166819d3f147462a93b55.js"
import State,{ANTI_GC}from"./state-972306d4114df737ede0f30b6d1102cd.js"
import Attack from"./actions/attack-1532d7228d1f6c6fe469a6a89d38a13f.js"
import Burn from"./actions/burn-7fccf3ee688585a86ddcb3b813129bad.js"
import Mill from"./actions/mill-19e41509e8b2de82d76d835d3cc34a76.js"
import Damage from"./actions/damage-7d275756a8032932e6d44c7d6515f04a.js"
import Push from"./actions/push-1f37cd7da63f13d6fee3904e3510d6da.js"
import Pop from"./actions/pop-f844184aa09161cc97f8930dd691432a.js"
import compiler from"./compiler-1f7c5dd78a9df39ed419695e7eec654b.js"
const ALLOWED_ACTIONS=new Map([["attack",Attack],["burn",Burn],["mill",Mill],["damage",Damage],["push",Push],["pop",Pop]])
function build_action(o,t){t??=!0
let e=new Action
for(const[a,n,r,c]of o){const o=ALLOWED_ACTIONS.get(a)
o?(e=new o(e,...n),e.setConditions(r),e.setDedup(t&&c)):console.error(`unknown action ${a}`)}return e}self.addEventListener("message",(function(o){const t=o.data,e=compiler(t.code),a=build_action(e),n=new State({op_cx:t.op_cx,op_not_cx:t.op_size-t.op_cx,w_op_cx:8-t.op_cx,w_op_not_cx:50-t.op_size}),r=[...a.execute(n)]
let c=[]
for(const s of r){const o=s.probability,t=c[s.dmg]??=new Map
t.set(o.denominator,(t.get(o.denominator)??0n)+o.numerator)}ANTI_GC.splice(0,ANTI_GC.length),c.forEach(((o,t)=>{c[t]=[...[...o.entries()].map((([o,t])=>new Probability(t,o)))]})),c=Array.from(c)
const d=new Probability(0,1)
for(let s=0;s<c.length;++s)void 0!==c[s]?c[s]=c[s].reduce(((o,t)=>o.add(t))):c[s]=d
let i=new Probability(0,1)
for(let s=0;s<c.length;s++)i=i.add(c[s].mul(new Probability(s,1)))
if(i.numerator>0n){const o=c.reduce(((o,t)=>o.add(t)))
i=i.mul(new Probability(o.denominator,o.numerator))}const m=[]
for(let s=0;s<c.length;++s)m[s]=0!=s?c.slice(s).reduce(((o,t)=>o.add(t))):c[s]
o.ports[0].postMessage({data:t,code:e,exact_dmg:c.map((o=>o.toString())),exact_dmg_acc:m.map((o=>o.toString())),dmg:c.map((o=>o.toNumber())),dmg_acc:m.map((o=>o.toNumber())),exact_mean:i.toString(),mean:i.toNumber()})}))
