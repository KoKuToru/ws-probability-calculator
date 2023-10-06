import Action from"../action-3baa581546e81bfd61da2b5de024a151.js"
import State from"../state-972306d4114df737ede0f30b6d1102cd.js"
export default class Pop extends Action{#t
constructor(t,s){super(t),this.#t=s,this.setSteps([this])}*subExecute(t){const s=new State({prev:t,stack:t.stack.slice(0,-this.#t),steps:[],osteps:[]})
yield s}}