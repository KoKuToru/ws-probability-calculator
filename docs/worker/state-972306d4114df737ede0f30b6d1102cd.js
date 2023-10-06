import Probability from"./probability-e41d770e4a1166819d3f147462a93b55.js"
import StepFast from"./step-fast-12a3e8802769affb43f4af2eaca3be72.js"
import Step,{CX,TRG,NOT_CX,NOT_TRG,WAITINGROOM,STOCK,CLOCK,MEMORY}from"./step-1248a01770d3952a706eba307cfb66a4.js"
const EMPTY_STEPS=Object.freeze([Step.create({})]),P_ONE=new Probability(1,1)
export const ANTI_GC=[]
export default class State{static id=0
#t=++State.id
prev=null
stack=[]
op_cx=8
op_not_cx=42
get op_size(){return this.op_cx+this.op_not_cx}my_trg=15
my_not_trg=35
get my_size(){return this.my_trg+this.my_not_trg}p_op_cx=0
p_op_not_cx=0
get p_op_size(){return this.p_op_cx+this.p_op_not_cx}p_my_trg=0
p_my_not_trg=0
get p_my_size(){return this.p_my_trg+this.p_my_not_trg}w_op_cx=0
w_op_not_cx=0
get w_op_size(){return this.w_op_cx+this.w_op_not_cx}#_=!1
get op_reshuffled(){return this.#_}w_my_trg=0
w_my_not_trg=0
get w_my_size(){return this.w_my_trg+this.w_my_not_trg}#e=!1
get my_reshuffled(){return this.#e}dmg=0
steps=null
osteps=null
get debug_count(){return this.prev?.reduce?.(((t,_)=>t+_.debug_count),0)??1}*debug_moves(){const t=this.steps?.length?this.steps:[{op:"",my:""}],_=this.prev?.length?this.prev:[{}]
for(const e of t)for(const t of _)for(const _ of t?.debug_moves?.()??[""]){const t=e.my.replace(/1/g,"TRG ").replace(/2/g,"NOT_TRG "),o=e.op.replace(/3/g,"CX ").replace(/4/g,"NOT_CX ")
t?.length||o?.length?yield[_,"( ",t.length?`my: ${t} `:null,o.length?`op: ${o} `:null,")"].filter((t=>t)).join(""):yield _}}*debug_moves_raw(){const t=this.steps?.length?this.steps:[{op:"",my:""}],_=this.prev?.length?this.prev:[{}]
for(const e of t)for(const t of _)for(const _ of t?.debug_moves_raw?.()??[""])yield[_,e.my,e.op].filter((t=>t)).join("")}*debug_seperated_states(){const t=this.steps?.length?this.steps:[Step.create({})],_=this.prev?.length?this.prev:[{}]
for(const e of t)for(const t of _)for(const _ of t?.debug_seperated_states?.()??[null]){const t={...this,prev:_,steps:[e],osteps:StepFast.create([e])}
yield new State(t)}}#o
get probability(){if(!this.prev)return P_ONE
let t=this.#o
if(t)return t
t=null
for(const _ of this.prev){let e=_.probability,o=null
for(const t of this.steps){let e=P_ONE
if(t.my_size){let o=_.my_trg,s=_.my_not_trg
for(const _ of t.my)_===TRG?(e=e.mul(new Probability(o,o+s)),--o):(e=e.mul(new Probability(s,o+s)),--s)}if(t.op_size){let o=_.op_cx,s=_.op_not_cx
for(const _ of t.op)_===CX?(e=e.mul(new Probability(o,o+s)),--o):(e=e.mul(new Probability(s,o+s)),--s)}o=o?o.add(e):e}o&&(e=e.mul(o)),t=t?t.add(e):e}return this.#o=t,t}get key(){return[this.dmg,this.op_cx,this.op_not_cx,this.my_trg,this.my_not_trg,this.w_op_cx,this.w_op_not_cx,this.w_my_trg,this.w_my_not_trg,this.p_op_cx,this.p_op_not_cx,this.p_my_trg,this.p_my_not_trg,...this.stack].join()}*next(t,_){_??=t
for(let e of this.subnext(t,_)){if(e.p_my_size){const o={prev:e,p_my_trg:0,p_my_not_trg:0,w_my_trg:e.w_my_trg,w_my_not_trg:e.w_my_not_trg,steps:EMPTY_STEPS,osteps:_}
if(t.my_target===WAITINGROOM)o.w_my_trg+=e.p_my_trg,o.w_my_not_trg+=e.p_my_not_trg
e=new State(o)}if(e.p_op_size){const o={prev:e,p_op_cx:0,p_op_not_cx:0,w_op_cx:e.w_op_cx,w_op_not_cx:e.w_op_not_cx,steps:EMPTY_STEPS,osteps:_}
if(t.op_target===WAITINGROOM)o.w_op_cx+=e.p_op_cx,o.w_op_not_cx+=e.p_op_not_cx
e=new State(o)}yield e}}*subnext(t,_,e){if(e??=!1,!(t.op_size||t.my_size||t.dmg||t.next.length))return void(yield this)
if(this.op_cx>=t.op_cx&&this.op_not_cx>=t.op_not_cx&&this.my_trg>=t.my_trg&&this.my_not_trg>=t.my_not_trg){let e=new State({prev:this,op_cx:this.op_cx-t.op_cx,op_not_cx:this.op_not_cx-t.op_not_cx,my_trg:this.my_trg-t.my_trg,my_not_trg:this.my_not_trg-t.my_not_trg,p_my_trg:this.p_my_trg+t.my_trg,p_my_not_trg:this.p_my_not_trg+t.my_not_trg,p_op_cx:this.p_op_cx+t.op_cx,p_op_not_cx:this.p_op_not_cx+t.op_not_cx,dmg:this.dmg+t.dmg,steps:t.slow,osteps:_}),o=EMPTY_STEPS
if(e.my_reshuffled&&(o=o.flatMap((t=>[Step.create({...t,my:TRG,my_target:CLOCK}),Step.create({...t,my:NOT_TRG,my_target:CLOCK})]))),e.op_reshuffled&&(o=o.flatMap((t=>[Step.create({...t,op:CX,op_target:CLOCK,dmg:1}),Step.create({...t,op:NOT_CX,op_target:CLOCK,dmg:1})]))),o===EMPTY_STEPS){if(t.next.length)for(const o of t.next)for(const t of e.subnext(o,_))yield t
else yield e
return}const s=e.p_my_trg,r=e.p_my_not_trg,p=e.p_op_cx,i=e.p_op_not_cx,n=s||r||p||i
n&&(e=new State({prev:e,p_my_trg:0,p_my_not_trg:0,p_op_cx:0,p_op_not_cx:0,steps:EMPTY_STEPS,osteps:_}))
const c=StepFast.create(o,null)
for(const h of c)for(let o of e.next(h,_))if(n&&(o=new State({prev:o,p_my_trg:s,p_my_not_trg:r,p_op_cx:p,p_op_not_cx:i,steps:EMPTY_STEPS,osteps:_})),t.next.length)for(const e of t.next)for(let t of o.subnext(e,_))yield t
else yield o
return}if(e)return
const o=StepFast.create(t.slow,this.my_size,this.op_size)
for(const s of o)for(const t of this.subnext(s,_,!0))yield t}static#s
constructor(t){if(ANTI_GC.push(this),Array.isArray(t.prev))throw new Error("prev must not be array")
State.#s||(State.#s=new Function("obj",Object.keys(this).map((t=>`this[${t=JSON.stringify(t)}] = obj[${t}] ?? this[${t}];`)).join("\n"))),t.prev&&State.#s.call(this,t.prev),State.#s.call(this,t),this.prev&&(this.prev=[this.prev]),0===this.op_size&&(this.op_cx=this.w_op_cx,this.op_not_cx=this.w_op_not_cx,this.w_op_cx=0,this.w_op_not_cx=0,this.#_=!0),0===this.my_size&&(this.my_trg=this.w_my_trg,this.my_not_trg=this.w_my_not_trg,this.w_my_trg=0,this.w_my_not_trg=0,this.#e=!0),Object.freeze(this),Object.freeze(this.stack),Object.freeze(this.steps)}get id(){return this.#t}}