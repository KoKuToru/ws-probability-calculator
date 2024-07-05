import compiler from"./compiler-4a06921e3b60fd4306463fe24c0f68df.js"
let ENGINE_RESULT=[]
function bigint_view(...e){const t=e.at(-1)
return e.slice(0,-1).map((e=>new Uint32Array(module.instance.exports.memory.buffer,e,t)))}function read_bigint(...e){return e.map((e=>{let t=0n,n=32n*BigInt(e.length)
for(let i=0;i<e.length;++i)n-=32n,t|=BigInt(e[i])<<n
return t}))}function write_bigint(e,t){if(t>2n**(32n*BigInt(e.length)-1n))throw Error("value to big for dest")
const n=e,i=t
let r=32n*BigInt(n.length)
for(let s=0;s<n.length;++s)r-=32n,n[s]=Number(BigInt.asUintN(32,i>>r))}const imports={engine:{dump(e,t){ENGINE_RESULT=[...new Float64Array(module.instance.exports.memory.buffer,e,t)]}},bigint:{add(e,t,n,i){const[r,s,o]=bigint_view(e,t,n,i),[a,c]=read_bigint(s,o)
write_bigint(r,a+c)},sub(e,t,n,i){const[r,s,o]=bigint_view(e,t,n,i),[a,c]=read_bigint(s,o)
write_bigint(r,a-c)},div(e,t,n,i){const[r,s,o]=bigint_view(e,t,n,i),[a,c]=read_bigint(s,o)
write_bigint(r,a/c)},mul(e,t,n,i){const[r,s,o]=bigint_view(e,t,n,i),[a,c]=read_bigint(s,o)
write_bigint(r,a*c)},mod(e,t,n,i){const[r,s,o]=bigint_view(e,t,n,i),[a,c]=read_bigint(s,o)
write_bigint(r,a%c)},gcd(e,t,n,i){const[r,s,o]=bigint_view(e,t,n,i),[a,c]=read_bigint(s,o)
let[b,u]=[a,c]
for(;u;)[b,u]=[u,b%u]
write_bigint(r,b)},double(e,t,n){const[i]=bigint_view(t,n),[r]=read_bigint(i)
new Float64Array(module.instance.exports.memory.buffer,e,1)[0]=Number(r)}}}
let module=WebAssembly.instantiateStreaming(fetch("engine-328b9b7bebab850a8e110c93e6a137fb.wasm"),imports).then((e=>module=e))
const pushs=Object.freeze({PUSH_ECX:7,PUSH_ENCX:8,PUSH_ICX:9,PUSH_INCX:10}),ops=Object.freeze({EQUALS:1,NOT_EQUALS:2,LESS:3,LESS_EQUALS:4,GREATER:5,GREATER_EQUALS:6})
function build_actions(e,t){const n=[]
for(const[i,r]of t)switch(i){case"burn":n.push([e.burn,r[0]])
break
case"attack":n.push([e.attack,r[0]])
break
case"damage":n.push([e.damage,r[0]])
break
case"mill":n.push([e.mill,r[0]])
break
case"pop":n.push([e.pop,r[0]])
break
case"push":n.push([e.push,pushs[r[0]]])
break
case"check":n.push([e.check,r[0],ops[r[1]],r[2]])
break
case"flush":n.push([e.flush])}return n.push([e.dump]),n.map((([t,...n])=>t.bind(e,...n)))}self.addEventListener("message",(async e=>{module instanceof Promise&&await module
const t=e.data,n=compiler(t.code),i=build_actions(module.instance.exports,n),r=t.op_cx,s=t.op_size-r,o=8-r,a=42-s
module.instance.exports.reset(r,s,o,a)
const c=performance.now()
for(const l of i)l()
const b=performance.now()
performance.measure("execute",{start:c,end:b})
const u=ENGINE_RESULT,m=u.reduce(((e,t)=>e+t))
let g=u.reduce(((e,t,n)=>e+t*n),0)*m
const d=[]
for(let l=0;l<u.length;++l)d[l]=0!=l?u.slice(l).reduce(((e,t)=>e+t)):u[l]
e.ports[0].postMessage({data:t,code:n,dmg:u,dmg_acc:d,mean:g})}))
