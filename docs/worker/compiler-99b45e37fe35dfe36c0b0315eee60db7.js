export default function compile(e,t,c,o,s,r,n){const a=[]
if(c??=[],o??=[],t??=[],s??=[],n??=[],void 0===r){r=new Map
for(const[t,c,o]of e)if("procedure"===t){const[e]=c
if(r.has(e))throw new Error("procedure name not unique")
r.set(e,o)}}for(const[p,h,l]of e)switch(p){case"repeat":for(let e=0;e<h[0];++e)a.push(...compile(l,t,c,o,s,r,n))
break
case"each":{const e=`PUSH_E${h[0].toUpperCase()}`,p=c.lastIndexOf(e)
if(p<0)throw new Error("stack var not found")
const u=get_limit(s,h[0])
for(let h=0;h<u;++h)a.push(...compile(l,t,c,[...o,[p,"GREATER",h]],s,r,n))}break
case"if":case"else":{const e={cx:[{what:"PUSH_ICX",op:"NOT_EQUALS"}],ncx:[{what:"PUSH_ICX",op:"EQUALS"}],trg:[{what:"PUSH_ITRG",op:"NOT_EQUALS"}],ntrg:[{what:"PUSH_ITRG",op:"EQUALS"}],cxtrg:[{what:"PUSH_ICX",op:"NOT_EQUALS"},{what:"PUSH_ITRG",op:"NOT_EQUALS"}],ncxtrg:[{what:"PUSH_ICX",op:"EQUALS"},{what:"PUSH_ITRG",op:"NOT_EQUALS"}],cxntrg:[{what:"PUSH_ICX",op:"NOT_EQUALS"},{what:"PUSH_ITRG",op:"EQUALS"}],ncxntrg:[{what:"PUSH_ICX",op:"EQUALS"},{what:"PUSH_ITRG",op:"EQUALS"}]}[h[0]]
let u=[]
for(let t of e){const e=c.lastIndexOf(t.what)
if(e<0)throw new Error("stack var not found")
let o=t.op
u=[...u,[e,o,0]]}if("else"===p)for(let p=u.length-1;p>=0;--p){let[e,h,f]=u[p]
switch(h){case"EQUALS":h="NOT_EQUALS"
break
case"NOT_EQUALS":h="EQUALS"
break
default:throw new Error(`unknown op ${h}`)}const i=[...u.slice(0,p),[e,h,f]]
a.push(...compile(l,t,c,[...o,...i],s,r,n))}else a.push(...compile(l,t,c,[...o,...u],s,r,n))}break
case"procedure":break
case"execute":{const[e]=h
if(!r.has(e))throw new Error("procedure name not found")
if(n.includes(e))throw new Error("recursive procedure executes are disallowed")
a.push(...compile(r.get(e),t,c,o,s,r,[...n,e]))}break
case"attack":case"burn":case"mill":case"damage":if(["cx","ncx","trg","ntrg"].includes(h[0])){const e=`PUSH_E${h[0].toUpperCase()}`,u=c.lastIndexOf(e)
if(u<0)throw new Error("stack var not found")
const f=collect_stack(l),i=get_limit(s,h[0])
for(let t=1;t<=i;++t){const e=[...o,[u,"EQUALS",t]]
for(const t of e)a.push(["check",t])
a.push([p,[t]])
for(const t of f)a.push(["push",[t]])
a.push(["flush"])}const U=[...s,...next_limit(p,i)],_=[...o,[u,"GREATER_EQUALS",1]]
if(a.push(...compile(l,[...t,[p,h]],[...c,...f],_,U,r,n)),f.length>0){for(const e of _)a.push(["check",e])
a.push(["pop",[f.length]]),a.push(["flush"])}break}default:{const e=collect_stack(l)
for(const t of o)a.push(["check",t])
a.push([p,h])
for(const t of e)a.push(["push",[t]])
a.push(["flush"])
const u=[...s,...next_limit(p,h[0])]
if(a.push(...compile(l,[...t,[p,h]],[...c,...e],o,u,r,n)),e.length>0){for(const e of o)a.push(["check",e])
a.push(["pop",[e.length]]),a.push(["flush"])}}}return Object.freeze(a.map((([e,t])=>Object.freeze([e,Object.freeze(t)]))))}function get_limit(e,t){return e.at(-1)[t]}function next_limit(e,t){const c=[]
switch(e){case"attack":c.push({cx:1,ncx:t+1,trg:1,ntrg:1})
break
case"burn":c.push({cx:1,ncx:t,trg:0,ntrg:0})
break
case"mill":case"reveal":c.push({cx:t,ncx:t,trg:0,ntrg:0})
break
case"damage":c.push({cx:0,ncx:0,trg:0,ntrg:0})}return c}function collect_stack(e,t){t??=[]
for(const[c,o,s]of e)switch(c){case"each":{const e=`PUSH_E${o[0].toUpperCase()}`
t.includes(e)||t.push(e),collect_stack(s,t)}break
case"if":case"else":{const e={cx:["PUSH_ICX"],ncx:["PUSH_ICX"],trg:["PUSH_ITRG"],ntrg:["PUSH_ITRG"],cxtrg:["PUSH_ICX","PUSH_ITRG"],ncxtrg:["PUSH_INCX","PUSH_ITRG"],cxntrg:["PUSH_ICX","PUSH_INTRG"],ncxntrg:["PUSH_INCX","PUSH_INTRG"]}[o[0]]
for(let c of e)t.includes(c)||t.push(c)
collect_stack(s,t)}break
case"repeat":collect_stack(s,t)
break
case"attack":case"burn":case"mill":case"damage":if(["cx","ncx","trg","ntrg"].includes(o[0])){const e=`PUSH_E${o[0].toUpperCase()}`
t.includes(e)||t.push(e)
break}}return t}