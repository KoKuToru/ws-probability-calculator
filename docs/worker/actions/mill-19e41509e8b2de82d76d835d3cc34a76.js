import Step,{EMPTY,CX,NOT_CX,WAITINGROOM}from"../step-1248a01770d3952a706eba307cfb66a4.js"
import Action from"../action-3baa581546e81bfd61da2b5de024a151.js"
export default class Mill extends Action{constructor(t,e){super(t,mill(e))}}function*mill(t){for(let e=0;e<=t;++e){const o=NOT_CX.repeat(e)+CX.repeat(t-e)
for(let t of permute(o))yield Step.create({op:t,op_target:WAITINGROOM})}}function*permute(t){t=t.split("")
const e=new Set
for(let o=0;o<t.length;++o)for(let l=0;l<t.length;++l){let r=[...t]
const a=r[o]
r[o]=r[l],r[l]=a,r=r.join(""),e.has(r)||(e.add(r),yield r)}}