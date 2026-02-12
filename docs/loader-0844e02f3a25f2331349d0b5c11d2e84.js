async function load(){const e=await fetch("app-8c746d8abe95434f62a64a3a8b8781fc.html"),t=await e.text(),r=(new DOMParser).parseFromString(t,"text/html")
for(var n of r.querySelectorAll('meta[name$="/environment"]'))document.head.append(n)
n=JSON.parse(decodeURIComponent(n.getAttribute("content")))
for(const o of r.querySelectorAll('link[rel="stylesheet"]'))document.head.append(o)
for(const o of r.querySelectorAll("script")){const e=document.createElement("link")
e.rel="prefetch"
let t=o.getAttribute("src")
t.startsWith("/")||(e.href=t,document.head.append(e))}for(const o of r.querySelectorAll("script"))await new Promise(((e,t)=>{const r=document.createElement("script")
r.addEventListener("load",e),r.addEventListener("error",t)
for(let{name:n,value:a}of o.attributes)r.setAttribute(n,a)
document.body.append(r)}))}