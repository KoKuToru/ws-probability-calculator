export default function compile(e,c,t,s){const a=[]
t??=[],s??=[],c??=[]
for(const[n,o,r]of e)switch(n){case"repeat":for(let e=0;e<o[0];++e)a.push(...compile(r,c,t,s))
break
case"each":{const e=`e${o[0]}`,n=t.lastIndexOf(e)
if(n<0)throw new Error("stack var not found")
const l=findLimit(c,e)
for(let o=0;o<l;++o)a.push(...compile(r,c,t,[...s,[n,">",o]]))}break
case"if":{const e=`i${o[0]}`,n=t.lastIndexOf(e)
if(n<0)throw new Error("stack var not found")
a.push(...compile(r,c,t,[...s,[n,"!=",0]]))}break
case"attack":case"burn":case"mill":case"damage":if("cx"===o[0]||"ncx"===o[0]){const e=`e${o[0]}`,l=t.lastIndexOf(e)
if(l<0)throw new Error("stack var not found")
const i=collect_stack(r),u=findLimit(c,e)
for(let c=1;c<=u;++c){const e=[...s,[l,"==",c]]
a.push([n,[c],e,!1])}const f=[...s,[l,">=",1]]
i.length>0&&a.push(["push",i,f,!0]),a.push(...compile(r,[...c,[n,o]],[...t,...i],f)),i.length>0&&a.push(["pop",[i.length],f,!0])
break}default:{const e=collect_stack(r)
a.push([n,o,s,0==e.length]),e.length>0&&a.push(["push",e,s,!0]),a.push(...compile(r,[...c,[n,o]],[...t,...e],s)),e.length>0&&a.push(["pop",[e.length],s,!0])}}return Object.freeze(a.map((([e,c,t,s])=>Object.freeze([e,Object.freeze(c),Object.freeze(t.map((e=>Object.freeze(e)))),s]))))}function findLimit(e,c){const t=e.findLast((e=>["attack","burn","mill"].includes(e[0])&&!["cx","ncx"].includes(e[1])))
if(!t)throw new Error("no parent found for limit")
let s=0
switch(t[0]){case"attack":"ecx"!==c&&(s+=1)
case"burn":s+="ecx"!==c?t[1][0]:1
break
case"mill":s+=t[1][0]}return s}function collect_stack(e,c){c??=[]
for(const[t,s,a]of e)switch(t){case"each":{const e=`e${s[0]}`
c.includes(e)||c.push(e),collect_stack(a,c)}break
case"if":{const e=`i${s[0]}`
c.includes(e)||c.push(e),collect_stack(a,c)}break
case"repeat":collect_stack(a,c)
break
case"attack":case"burn":case"mill":case"damage":if("cx"===s[0]||"ncx"===s[0]){const e=`e${s[0]}`
c.includes(e)||c.push(e),collect_stack(a,c)
break}}return c}const res=compile([["mill",[3],[["each",["cx"],[["burn",[1],[]]]]]]])
