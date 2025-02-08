export default function compile(e,s,c,t,o){const a=[]
c??=[],t??=[],s??=[],o??=[]
for(const[r,n,p]of e)switch(r){case"repeat":for(let e=0;e<n[0];++e)a.push(...compile(p,s,c,t,o))
break
case"each":{const e=`push_e${n[0]}`.toUpperCase(),r=c.lastIndexOf(e)
if(r<0)throw new Error("stack var not found")
const u=get_limit(o,n[0])
for(let n=0;n<u;++n)a.push(...compile(p,s,c,[...t,[r,"GREATER",n]],o))}break
case"if":{const e="push_icx".toUpperCase(),r=c.lastIndexOf(e)
if(r<0)throw new Error("stack var not found")
switch(n[0]){case"cx":a.push(...compile(p,s,c,[...t,[r,"NOT_EQUALS",0]],o))
break
case"ncx":a.push(...compile(p,s,c,[...t,[r,"EQUALS",0]],o))
break
default:throw new Error("stack var not found")}}break
case"else":{const e="push_icx".toUpperCase(),r=c.lastIndexOf(e)
if(r<0)throw new Error("stack var not found")
switch(n[0]){case"cx":a.push(...compile(p,s,c,[...t,[r,"EQUALS",0]],o))
break
case"ncx":a.push(...compile(p,s,c,[...t,[r,"NOT_EQUALS",0]],o))
break
default:throw new Error("stack var not found")}}break
case"attack":case"burn":case"mill":case"damage":if("cx"===n[0]||"ncx"===n[0]){const e=`push_e${n[0]}`.toUpperCase(),u=c.lastIndexOf(e)
if(u<0)throw new Error("stack var not found")
const h=collect_stack(p),l=get_limit(o,n[0])
for(let s=1;s<=l;++s){const e=[...t,[u,"EQUALS",s]]
for(const s of e)a.push(["check",s])
a.push([r,[s]])
for(const s of h)a.push(["push",[s]])
a.push(["flush"])}const f=[...o,...next_limit(r,l)],i=[...t,[u,"GREATER_EQUALS",1]]
if(a.push(...compile(p,[...s,[r,n]],[...c,...h],i,f)),h.length>0){for(const e of i)a.push(["check",e])
a.push(["pop",[h.length]]),a.push(["flush"])}break}default:{const e=collect_stack(p)
for(const s of t)a.push(["check",s])
a.push([r,n])
for(const s of e)a.push(["push",[s]])
a.push(["flush"])
const u=[...o,...next_limit(r,n[0])]
if(a.push(...compile(p,[...s,[r,n]],[...c,...e],t,u)),e.length>0){for(const e of t)a.push(["check",e])
a.push(["pop",[e.length]]),a.push(["flush"])}}}return Object.freeze(a.map((([e,s])=>Object.freeze([e,Object.freeze(s)]))))}function get_limit(e,s){return e.at(-1)["cx"===s?0:1]}function next_limit(e,s){const c=[]
switch(e){case"attack":c.push([1,s+1])
break
case"burn":c.push([1,s])
break
case"mill":case"damage":case"reveal":c.push([s,s])}return c}function collect_stack(e,s){s??=[]
for(const[c,t,o]of e)switch(c){case"each":{const e=`push_e${t[0]}`.toUpperCase()
s.includes(e)||s.push(e),collect_stack(o,s)}break
case"if":case"else":{const e="push_icx".toUpperCase()
s.includes(e)||s.push(e),collect_stack(o,s)}break
case"repeat":collect_stack(o,s)
break
case"attack":case"burn":case"mill":case"damage":if("cx"===t[0]||"ncx"===t[0]){const e=`push_e${t[0]}`.toUpperCase()
s.includes(e)||s.push(e)
break}}return s}