export default function compile(e,c,s,t){const o=[]
s??=[],t??=[],c??=[]
for(const[a,n,r]of e)switch(a){case"repeat":for(let e=0;e<n[0];++e)o.push(...compile(r,c,s,t))
break
case"each":{const e=`push_e${n[0]}`.toUpperCase(),a=s.lastIndexOf(e)
if(a<0)throw new Error("stack var not found")
const p=findLimit(c,e)
for(let n=0;n<p;++n)o.push(...compile(r,c,s,[...t,[a,"GREATER",n]]))}break
case"if":{const e=`push_i${n[0]}`.toUpperCase(),a=s.lastIndexOf(e)
if(a<0)throw new Error("stack var not found")
o.push(...compile(r,c,s,[...t,[a,"NOT_EQUALS",0]]))}break
case"attack":case"burn":case"mill":case"damage":if("cx"===n[0]||"ncx"===n[0]){const e=`push_e${n[0]}`.toUpperCase(),p=s.lastIndexOf(e)
if(p<0)throw new Error("stack var not found")
const u=collect_stack(r),l=findLimit(c,e)
for(let c=1;c<=l;++c){const e=[...t,[p,"EQUALS",c]]
for(const c of e)o.push(["check",c])
o.push([a,[c]])
for(const c of u)o.push(["push",[c]])
o.push(["flush"])}const f=[...t,[p,"GREATER_EQUALS",1]]
o.push(...compile(r,[...c,[a,n]],[...s,...u],f)),u.length>0&&(o.push(["pop",[u.length]]),o.push(["flush"]))
break}default:{const e=collect_stack(r)
for(const c of t)o.push(["check",c])
o.push([a,n])
for(const c of e)o.push(["push",[c]])
o.push(["flush"]),o.push(...compile(r,[...c,[a,n]],[...s,...e],t)),e.length>0&&(o.push(["pop",[e.length]]),o.push(["flush"]))}}return Object.freeze(o.map((([e,c])=>Object.freeze([e,Object.freeze(c)]))))}function findLimit(e,c){const s=e.findLast((e=>["attack","burn","mill"].includes(e[0])&&!["cx","ncx"].includes(e[1])))
if(!s)throw new Error("no parent found for limit")
let t=0
switch(s[0]){case"attack":"ecx"!==c&&(t+=1)
case"burn":t+="ecx"!==c?s[1][0]:1
break
case"mill":t+=s[1][0]}return t}function collect_stack(e,c){c??=[]
for(const[s,t,o]of e)switch(s){case"each":{const e=`push_e${t[0]}`.toUpperCase()
c.includes(e)||c.push(e),collect_stack(o,c)}break
case"if":{const e=`push_i${t[0]}`.toUpperCase()
c.includes(e)||c.push(e),collect_stack(o,c)}break
case"repeat":collect_stack(o,c)
break
case"attack":case"burn":case"mill":case"damage":if("cx"===t[0]||"ncx"===t[0]){const e=`push_e${t[0]}`.toUpperCase()
c.includes(e)||c.push(e),collect_stack(o,c)
break}}return c}