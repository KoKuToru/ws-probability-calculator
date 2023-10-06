import Action from"../action-3baa581546e81bfd61da2b5de024a151.js"
import State from"../state-972306d4114df737ede0f30b6d1102cd.js"
export default class Push extends Action{#t
constructor(t,...e){super(t),this.#t=e,this.setSteps([this])}*subExecute(t){const e={ecx:t.osteps.op_cx,encx:t.osteps.op_not_cx,icx:Number(Boolean(t.osteps.op_cx)),incx:Number(!Boolean(t.osteps.op_cx))},s=new State({prev:t,stack:[...t.stack,...this.#t.map((t=>{if(!(t in e))throw new Error("unknown stack value")
return[t,e[t]]}))],steps:[],osteps:[]})
yield s}}