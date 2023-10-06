export class Probability{#t
#r
constructor(t,r,n=!0){if(this.#t=BigInt(t),this.#r=BigInt(r),this.#t==this.#r)this.#t=1n,this.#r=1n
else if(n&&1!==r){const t=this.#n(this.#t,this.#r)
t>1&&(this.#t/=t,this.#r/=t)}if(this.#t<0n||this.#r<=0n)throw new Error("something went wrong")
Object.freeze(this)}#n(t,r){for(;0n!==r;){const n=t%r
t=r,r=n}return t}get numerator(){return this.#t}get denominator(){return this.#r}mul(t){if(1n===t.numerator&&1n===t.denominator)return this
const r=new Probability(this.numerator,t.denominator),n=new Probability(t.numerator,this.denominator)
return new Probability(r.numerator*n.numerator,r.denominator*n.denominator)}add(t){return this.denominator===t.denominator?new Probability(this.numerator+t.numerator,this.denominator):new Probability(this.numerator*t.denominator+t.numerator*this.denominator,this.denominator*t.denominator)}toJSON(){return[this.numerator.toString(),this.denominator.toString()].join("/")}toNumber(){let t=this.numerator,r=this.denominator,n=Number(t),i=Number(r)
if(BigInt(n)!==t||BigInt(i)!==r){const o=this.#n(t,r)
n=Number(t/o),i=Number(r/o)}for(;BigInt(n)!==t||BigInt(i)!==r;)t/=10n,r/=10n,n=Number(t),i=Number(r)
return n/i}toString(){const t=this.numerator.toString(),r=this.denominator.toString()
return`${t.split("").map((t=>"⁰¹²³⁴⁵⁶⁷⁸⁹"[parseInt(t)])).join("")}⁄${r.split("").map((t=>"₀₁₂₃₄₅₆₇₈₉"[parseInt(t)])).join("")}`}toDecimalString(){const t=[]
let r=this.numerator
const n=this.denominator,i=new Map
for(;;){const o=r/n
if(t.push(o),0!=o&&(r%=n),0==r)break
if(i.has(r))break
i.set(r,t.length),r*=10n}const o=i.get(r),e=t.map((t=>t.toString()))
o&&(e.splice(o,0," "),e.push("…"))
return`${e[0]}.${e.slice(1).join("")}`}}export class ProbabilityNotExact{#i
constructor(t,r){this.#i=Number(t)/Number(r)}mul(t){return new ProbabilityNotExact(this.#i*t.toNumber(),1)}add(t){return new ProbabilityNotExact(this.#i+t.toNumber(),1)}#n(t,r){for(;0n!==r;){const n=t%r
t=r,r=n}return t}toJSON(){let t=this.numerator,r=this.denominator
const n=this.#n(t,r)
return t/=n,r/=n,[t.toString(),r.toString()].join("/")}toNumber(){return this.#i}toString(){let t=this.numerator,r=this.denominator
const n=this.#n(t,r)
t/=n,r/=n,t=t.toString(),r=r.toString()
return`${t.split("").map((t=>"⁰¹²³⁴⁵⁶⁷⁸⁹"[parseInt(t)])).join("")}⁄${r.split("").map((t=>"₀₁₂₃₄₅₆₇₈₉"[parseInt(t)])).join("")}`}get numerator(){return BigInt(Math.floor(this.#i*Number.MAX_SAFE_INTEGER))}get denominator(){return BigInt(Number.MAX_SAFE_INTEGER)}}export default ProbabilityNotExact
