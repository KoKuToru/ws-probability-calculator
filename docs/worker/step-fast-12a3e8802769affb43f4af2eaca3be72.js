import Step from"./step-1248a01770d3952a706eba307cfb66a4.js"
const EMPTY_STEP=Step.create({})
export default class StepFast{slow
next
my_trg
my_not_trg
my_target
get my_size(){return this.my_trg+this.my_not_trg}op_cx
op_not_cx
op_target
get op_size(){return this.op_cx+this.op_not_cx}constructor(t){Object.assign(this,t),this.next.some((t=>t!==EMPTY_STEP))?this.next=StepFast.create(this.next):this.next=[],Object.freeze(this),Object.freeze(this.slow)}static create(t,e,o){t=[...t],e??=null,o??=null
let _=0
const r=new Map
for(const n of t){let t,s=n
null===e&&null===o||!(n.my_size>e||n.op_size>o)?t=EMPTY_STEP:(s=Step.create({my:n.my.slice(0,e),my_target:n.my_target,op:n.op.slice(0,o),op_target:n.op_target}),t=Step.create({my:n.my.slice(e),my_target:n.my_target,op:n.op.slice(o),op_target:n.op_target,dmg:n.dmg}))
const g=[s.my_trg,s.my_not_trg,s.my_target,s.op_cx,s.op_not_cx,s.op_target,s.dmg,_].map((t=>t.toString())).join()
let p=r.get(g)
p||(p={slow:[],next:[],my_trg:s.my_trg,my_not_trg:s.my_not_trg,my_target:s.my_target,op_cx:s.op_cx,op_not_cx:s.op_not_cx,op_target:s.op_target,dmg:s.dmg,c:_},r.set(g,p)),p.slow.includes(s)||p.slow.push(s),t&&(p.next.includes(t)||p.next.push(t))}const s=Object.freeze([...r.values()].map((t=>new StepFast(t))))
s.reduce(((t,e)=>t+e.slow.length*Math.max(1,e.next.reduce(((t,e)=>t+e.slow.length),0))),0)
return t.length,s}}