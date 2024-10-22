export default function compile(e,c,s,t,o){const a=[]
s??=[],t??=[],c??=[],o??=[]
for(const[r,n,p]of e)switch(r){case"repeat":for(let e=0;e<n[0];++e)a.push(...compile(p,c,s,t,o))
break
case"each":{const e=`push_e${n[0]}`.toUpperCase(),r=s.lastIndexOf(e)
if(r<0)throw new Error("stack var not found")
const u=get_limit(o,n[0])
for(let n=0;n<u;++n)a.push(...compile(p,c,s,[...t,[r,"GREATER",n]],o))}break
case"if":{const e="push_icx".toUpperCase(),r=s.lastIndexOf(e)
if(r<0)throw new Error("stack var not found")
switch(n[0]){case"cx":a.push(...compile(p,c,s,[...t,[r,"NOT_EQUALS",0]],o))
break
case"ncx":a.push(...compile(p,c,s,[...t,[r,"EQUALS",0]],o))
break
default:throw new Error("stack var not found")}}break
case"attack":case"burn":case"mill":case"damage":if("cx"===n[0]||"ncx"===n[0]){const e=`push_e${n[0]}`.toUpperCase(),u=s.lastIndexOf(e)
if(u<0)throw new Error("stack var not found")
const h=collect_stack(p),l=get_limit(o,n[0])
for(let c=1;c<=l;++c){const e=[...t,[u,"EQUALS",c]]
for(const c of e)a.push(["check",c])
a.push([r,[c]])
for(const c of h)a.push(["push",[c]])
a.push(["flush"])}const f=[...o,...next_limit(r,l)],i=[...t,[u,"GREATER_EQUALS",1]]
if(a.push(...compile(p,[...c,[r,n]],[...s,...h],i,f)),h.length>0){for(const e of i)a.push(["check",e])
a.push(["pop",[h.length]]),a.push(["flush"])}break}default:{const e=collect_stack(p)
for(const c of t)a.push(["check",c])
a.push([r,n])
for(const c of e)a.push(["push",[c]])
a.push(["flush"])
const u=[...o,...next_limit(r,n[0])]
if(a.push(...compile(p,[...c,[r,n]],[...s,...e],t,u)),e.length>0){for(const e of t)a.push(["check",e])
a.push(["pop",[e.length]]),a.push(["flush"])}}}return Object.freeze(a.map((([e,c])=>Object.freeze([e,Object.freeze(c)]))))}function get_limit(e,c){return e.at(-1)["cx"===c?0:1]}function next_limit(e,c){const s=[]
switch(e){case"attack":s.push([1,c+1])
break
case"burn":s.push([1,c])
break
case"mill":case"damage":s.push([c,c])}return s}function collect_stack(e,c){c??=[]
for(const[s,t,o]of e)switch(s){case"each":{const e=`push_e${t[0]}`.toUpperCase()
c.includes(e)||c.push(e),collect_stack(o,c)}break
case"if":{const e="push_icx".toUpperCase()
c.includes(e)||c.push(e),collect_stack(o,c)}break
case"repeat":collect_stack(o,c)
break
case"attack":case"burn":case"mill":case"damage":if("cx"===t[0]||"ncx"===t[0]){const e=`push_e${t[0]}`.toUpperCase()
c.includes(e)||c.push(e)
break}}return c}