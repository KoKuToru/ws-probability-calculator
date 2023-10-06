import Step from"./step-1248a01770d3952a706eba307cfb66a4.js"
import StepFast from"./step-fast-12a3e8802769affb43f4af2eaca3be72.js"
const EMPTY_STEPS=Object.freeze([Step.create({})]),EMPTY_ARRAY=Object.freeze([]),DUMMY_CHILDREN=Object.freeze({*execute(e){yield e}})
export default class Action{static dummy_func=function*(e){yield e}
#e
#t
#s=!0
#n=[]
constructor(e,t){this.#e=e,t??=EMPTY_STEPS,this.#t=t!==EMPTY_STEPS?StepFast.create(t):EMPTY_ARRAY}setSteps(e){this.#t=e}setDedup(e){this.#s=e}setConditions(e){this.#n=e.map((([e,t,s])=>[e,CONDITIONS[t],s]))}#o(e){for(const[t,s,n]of this.#n){if(!s(e.stack[t][1],n))return!1}return!0}*execute(e){const t=new Map
for(let s of(this.#e??DUMMY_CHILDREN).execute?.(e)){if(this.#t===EMPTY_ARRAY||!this.#o(s)){yield s
continue}let e
if(this.#s){const n=s.key
if(e=t.get(n),e){for(const t of e)t.prev.push(s)
continue}e=new Set}for(const t of this.#t)for(const n of t instanceof Action?t.subExecute(s):s.next(t)){if(!n.my_size||!n.op_size||n.p_my_size||n.p_op_size)throw new Error("something is wrong")
if(this.#s){const t=new Set([n])
for(;t.size;){const n=t.values().next().value
t.delete(n)
for(const o of n.prev??EMPTY_ARRAY)o.id<s.id||(o===s?e.add(n):t.add(o))}}yield n}if(this.#s){const n=s.key
t.set(n,e)}}}}const CONDITIONS=Object.freeze({"<":function(e,t){return e<t},"<=":function(e,t){return e<=t},">":function(e,t){return e>t},">=":function(e,t){return e>=t},"==":function(e,t){return e==t},"!=":function(e,t){return e!=t}})
