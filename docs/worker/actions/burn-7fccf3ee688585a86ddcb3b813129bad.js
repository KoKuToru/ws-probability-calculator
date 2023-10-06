import Step,{EMPTY,CX,NOT_CX,WAITINGROOM,CLOCK}from"../step-1248a01770d3952a706eba307cfb66a4.js"
import Action from"../action-3baa581546e81bfd61da2b5de024a151.js"
export default class Burn extends Action{constructor(e,t){super(e,burn(t))}}function*burn(e){for(let t=0;t<e;++t)yield Step.create({op:NOT_CX.repeat(t)+CX,op_target:WAITINGROOM})
yield Step.create({op:NOT_CX.repeat(e),op_target:CLOCK,dmg:e})}