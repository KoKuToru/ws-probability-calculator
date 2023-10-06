import Step,{TRG,NOT_TRG,CX,NOT_CX,WAITINGROOM,STOCK,CLOCK}from"../step-1248a01770d3952a706eba307cfb66a4.js"
import Action from"../action-3baa581546e81bfd61da2b5de024a151.js"
export default class Attack extends Action{constructor(t,e){super(t,attack(e))}}function*attack(t){for(const e of[!0,!1]){for(let a=0;a<t+e;++a)yield Step.create({my:e?TRG:NOT_TRG,my_target:STOCK,op:NOT_CX.repeat(a)+CX,op_target:WAITINGROOM})
yield Step.create({my:e?TRG:NOT_TRG,my_target:STOCK,op:NOT_CX.repeat(t+e),op_target:CLOCK,dmg:t+e})}}