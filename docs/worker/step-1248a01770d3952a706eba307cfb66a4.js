const RESULT_STR_CACHE=new Map,RESULT_CACHE=new Map
export const EMPTY=""
export const TRG="1"
export const NOT_TRG="2"
export const CX="3"
export const NOT_CX="4"
export const WAITINGROOM=Symbol("waitingroom")
export const STOCK=Symbol("stock")
export const CLOCK=Symbol("clock")
export const MEMORY=Symbol("memory")
export default class Step{my
my_trg
my_not_trg
my_target
get my_size(){return this.my_trg+this.my_not_trg}op
op_cx
op_not_cx
op_target
get op_size(){return this.op_cx+this.op_not_cx}dmg
constructor(t,o,e,r,s){if(this.dmg=s,this.my_target=o,this.op_target=r,"string"!=typeof t)throw new Error("`my` must be a string")
if("string"!=typeof e)throw new Error("`my` must be a string")
let _=RESULT_STR_CACHE.get("my_"+t)
if(!_){if(t.split("").some((t=>"1"!==t&&"2"!==t)))throw new Error("`my` can only have TRG and NOT_TRG")
_={my:t,my_trg:t.split("").reduce(((t,o)=>t+("1"===o)),0),my_not_trg:t.split("").reduce(((t,o)=>t+("2"===o)),0)},RESULT_STR_CACHE.set(t,_)}Object.assign(this,_)
let n=RESULT_STR_CACHE.get("op_"+e)
if(!n){if(e.split("").some((t=>t!==CX&&"4"!==t)))throw new Error("`op` can only have CX and NOT_CX")
n={op:e,op_cx:e.split("").reduce(((t,o)=>t+(o===CX)),0),op_not_cx:e.split("").reduce(((t,o)=>t+("4"===o)),0)},RESULT_STR_CACHE.set(e,n)}Object.assign(this,n),Object.freeze(this)}static create({my:t,my_target:o,op:e,op_target:r,dmg:s}){t??="",o??=STOCK,e??="",r??=WAITINGROOM,s??=0
const _=[t,o,e,r,s].map((t=>t.toString())).join()
let n=RESULT_CACHE.get(_)
return n||(n=new Step(t,o,e,r,s),RESULT_CACHE.set(_,n),n)}}