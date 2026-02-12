import compiler from"./compiler-99b45e37fe35dfe36c0b0315eee60db7.js"
class EngineError extends Error{}class EngineOutOfMemory extends Error{}class Imports{result
setup(t){let e,i,s,n=[],r=[]
Object.defineProperties(this,{memory:{get:()=>(e?.buffer.byteLength||(e=t.exports.memory),e)},memory_uint32:{get(){return i?.buffer.byteLength||(i=new Uint32Array(this.memory.buffer)),i}},memory_double:{get(){return s?.buffer.byteLength||(s=new Float64Array(this.memory.buffer)),s}},StoreBigInt:{value:function(t){const e=r.length?r.pop():n.length
return n[e]=t,e}},DestroyBigInt:{value:function(t){r.push(t)}},GetBigInt:{value:function(t){return n[t]}}})}write_uint32(t,e){this.memory_uint32[t>>2]=e}write_double(t,e){this.memory_double[t>>3]=e}constructor(t){this.module=t,this.engine={dump:this.engine_dump.bind(this),assert:this.engine_assert.bind(this),oom:this.engine_oom.bind(this)},this.bigint={create:this.bigint_create.bind(this),copy:this.bigint_copy.bind(this),destroy:this.bigint_destroy.bind(this),add:this.bigint_add.bind(this),sub:this.bigint_sub.bind(this),div:this.bigint_div.bind(this),mul:this.bigint_mul.bind(this),mod:this.bigint_mod.bind(this),gcd:this.bigint_gcd.bind(this),double:this.bigint_double.bind(this),equal:this.bigint_equal.bind(this),greater:this.bigint_greater.bind(this),less:this.bigint_less.bind(this)}}engine_dump(t,e){this.result=[...this.memory_double.subarray(t>>3,(t>>3)+e)]}engine_assert(t,e,i,s,n){const r=new TextDecoder
let o=r.decode(new Uint8Array(this.memory.buffer,t,e)),h=r.decode(new Uint8Array(this.memory.buffer,i,s))
throw new EngineError(`condition \`${o}\` @${h}:${n} failed!`)}engine_oom(t,e,i,s,n){const r=new TextDecoder
let o=r.decode(new Uint8Array(this.memory.buffer,t,e)),h=r.decode(new Uint8Array(this.memory.buffer,i,s))
throw new EngineOutOfMemory(`condition \`${o}\` @${h}:${n} failed!`)}bigint_create(t,e,i){const s=(BigInt(e)<<32n)+BigInt(i)
this.write_uint32(t,this.StoreBigInt(s))}bigint_copy(t,e){this.write_uint32(t,this.StoreBigInt(this.GetBigInt(e)))}bigint_destroy(t){this.DestroyBigInt(t)}bigint_add(t,e,i){const s=this.GetBigInt(e)+this.GetBigInt(i)
this.write_uint32(t,this.StoreBigInt(s))}bigint_sub(t,e,i){const s=this.GetBigInt(e)-this.GetBigInt(i)
this.write_uint32(t,this.StoreBigInt(s))}bigint_div(t,e,i){const s=this.GetBigInt(e)/this.GetBigInt(i)
this.write_uint32(t,this.StoreBigInt(s))}bigint_mul(t,e,i){const s=this.GetBigInt(e)*this.GetBigInt(i)
this.write_uint32(t,this.StoreBigInt(s))}bigint_mod(t,e,i){const s=this.GetBigInt(e)%this.GetBigInt(i)
this.write_uint32(t,this.StoreBigInt(s))}bigint_gcd(t,e,i){const s=this.GetBigInt(e),n=this.GetBigInt(i)
let[r,o]=[s,n]
for(;o;)[r,o]=[o,r%o]
this.write_uint32(t,this.StoreBigInt(r))}bigint_double(t,e){const i=this.GetBigInt(e)
this.write_double(t,Number(i))}bigint_equal(t,e,i){const s=this.GetBigInt(e)===this.GetBigInt(i)
this.write_uint32(t,s)}bigint_greater(t,e,i){const s=this.GetBigInt(e)>this.GetBigInt(i)
this.write_uint32(t,s)}bigint_less(t,e,i){const s=this.GetBigInt(e)<this.GetBigInt(i)
this.write_uint32(t,s)}}let module=WebAssembly.compileStreaming(fetch("engine-8c8c1ba2aaf3d20033f7ce3a6abe8e19.wasm")).then((t=>{module=t}))
function reset(){module.imports=new Imports,module.instance=new WebAssembly.Instance(module,module.imports),module.imports.setup(module.instance)}const pushs=Object.freeze({PUSH_ECX:7,PUSH_ENCX:8,PUSH_ICX:9,PUSH_INCX:10,PUSH_ETRG:20,PUSH_ENTRG:21,PUSH_ITRG:22,PUSH_INTRG:23}),ops=Object.freeze({EQUALS:1,NOT_EQUALS:2,LESS:3,LESS_EQUALS:4,GREATER:5,GREATER_EQUALS:6})
function build_actions(t,e){const i=[]
for(const[s,n]of e)switch(s){case"burn":i.push([t.burn,n[0]])
break
case"attack":i.push([t.attack,n[0]])
break
case"damage":i.push([t.damage,n[0]])
break
case"mill":i.push([t.mill,n[0]])
break
case"pop":i.push([t.pop,n[0]])
break
case"push":if(!(n[0]in pushs))throw new Error(`unknown push ${n[0]}`)
i.push([t.push,pushs[n[0]]])
break
case"check":if(!(n[1]in ops))throw new Error(`unknown op ${n[1]}`)
i.push([t.check,n[0],ops[n[1]],n[2]])
break
case"flush":i.push([t.flush])
break
case"reveal":i.push([t.reveal,n[0]??1,n[1]??0])
break
case"reshuffle":i.push([t.reshuffle])
break
default:throw new EngineError(`Unsupported cmd=${s}`)}return i.push([t.dump]),i.map((([e,...i])=>e.bind(t,...i)))}self.addEventListener("message",(async t=>{module instanceof Promise&&await module
try{var e=t.data,i=compiler(e.code)
reset()
const s=build_actions(module.instance.exports,i)
module.instance.exports.reset(e.op_cx,e.op_size-e.op_cx,e.op_w_cx,e.op_w_size-e.op_w_cx,e.my_trg,e.my_size-e.my_trg,e.my_w_trg,e.my_w_size-e.my_w_trg)
const n=performance.now()
for(const t of s)t()
const r=performance.now()
performance.measure("execute",{start:n,end:r})
const o=module.imports.result,h=o.reduce(((t,e)=>t+e))
let u=o.reduce(((t,e,i)=>t+e*i),0)*h
const c=[]
for(let t=0;t<o.length;++t)c[t]=0!=t?o.slice(t).reduce(((t,e)=>t+e)):o[t]
t.ports[0].postMessage({data:e,code:i,dmg:o,dmg_acc:c,mean:u})}catch(s){throw(s instanceof RangeError||s instanceof EngineOutOfMemory)&&(console.error(s),t.ports[0].postMessage({data:e,outofmemory:!0,error:"Out Of Memory",code:i??[]})),s instanceof EngineError&&(console.error(s),t.ports[0].postMessage({data:e,error:s.message,code:i??[]})),t.ports[0].postMessage({data:e,error:s.message,code:i??[]}),s}}))
