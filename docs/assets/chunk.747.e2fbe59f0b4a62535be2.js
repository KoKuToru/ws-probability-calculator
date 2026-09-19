"use strict";(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[747],{67:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0})
var r=n(248)
const o=r.Node.create({name:"paragraph",priority:1e3,addOptions:()=>({HTMLAttributes:{}}),group:"block",content:"inline*",parseHTML:()=>[{tag:"p"}],renderHTML({HTMLAttributes:e}){return["p",r.mergeAttributes(this.options.HTMLAttributes,e),0]},addCommands(){return{setParagraph:()=>({commands:e})=>e.setNode(this.name)}},addKeyboardShortcuts(){return{"Mod-Alt-0":()=>this.editor.commands.setParagraph()}}})
t.Paragraph=o,t.default=o},106:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0})
var r,o=n(712)
r=o,Object.keys(r).filter((e=>"default"!==e&&"__esModule"!==e)).forEach((e=>{t.hasOwnProperty(e)||Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:()=>r[e]})}))},136:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0})
var r=n(237),o=n(820),i="undefined"!=typeof navigator&&/Mac|iP(hone|[oa]d)/.test(navigator.platform)
function s(e){var t,n,r,o,s=e.split(/-(?!$)/),a=s[s.length-1]
"Space"==a&&(a=" ")
for(var c=0;c<s.length-1;c++){var l=s[c]
if(/^(cmd|meta|m)$/i.test(l))o=!0
else if(/^a(lt)?$/i.test(l))t=!0
else if(/^(c|ctrl|control)$/i.test(l))n=!0
else if(/^s(hift)?$/i.test(l))r=!0
else{if(!/^mod$/i.test(l))throw new Error("Unrecognized modifier name: "+l)
i?o=!0:n=!0}}return t&&(a="Alt-"+a),n&&(a="Ctrl-"+a),o&&(a="Meta-"+a),r&&(a="Shift-"+a),a}function a(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2]
return t.altKey&&(e="Alt-"+e),t.ctrlKey&&(e="Ctrl-"+e),t.metaKey&&(e="Meta-"+e),n&&t.shiftKey&&(e="Shift-"+e),e}function c(e){var t=function(e){var t=Object.create(null)
for(var n in e)t[s(n)]=e[n]
return t}(e)
return function(e,n){var o,i=r.keyName(n),s=t[a(i,n)]
if(s&&s(e.state,e.dispatch,e))return!0
if(1==i.length&&" "!=i){if(n.shiftKey){var c=t[a(i,n,!1)]
if(c&&c(e.state,e.dispatch,e))return!0}if((n.shiftKey||n.altKey||n.metaKey||i.charCodeAt(0)>127)&&(o=r.base[n.keyCode])&&o!=i){var l=t[a(o,n)]
if(l&&l(e.state,e.dispatch,e))return!0}}return!1}}t.keydownHandler=c,t.keymap=function(e){return new o.Plugin({props:{handleKeyDown:c(e)}})}},175:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0})
var r,o=n(553)
r=o,Object.keys(r).filter((e=>"default"!==e&&"__esModule"!==e)).forEach((e=>{t.hasOwnProperty(e)||Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:()=>r[e]})}))},223:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0})
var r,o=n(669)
r=o,Object.keys(r).filter((e=>"default"!==e&&"__esModule"!==e)).forEach((e=>{t.hasOwnProperty(e)||Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:()=>r[e]})}))},233:e=>{var t=200,n=function(){}
n.prototype.append=function(e){return e.length?(e=n.from(e),!this.length&&e||e.length<t&&this.leafAppend(e)||this.length<t&&e.leafPrepend(this)||this.appendInner(e)):this},n.prototype.prepend=function(e){return e.length?n.from(e).append(this):this},n.prototype.appendInner=function(e){return new o(this,e)},n.prototype.slice=function(e,t){return void 0===e&&(e=0),void 0===t&&(t=this.length),e>=t?n.empty:this.sliceInner(Math.max(0,e),Math.min(this.length,t))},n.prototype.get=function(e){if(!(e<0||e>=this.length))return this.getInner(e)},n.prototype.forEach=function(e,t,n){void 0===t&&(t=0),void 0===n&&(n=this.length),t<=n?this.forEachInner(e,t,n,0):this.forEachInvertedInner(e,t,n,0)},n.prototype.map=function(e,t,n){void 0===t&&(t=0),void 0===n&&(n=this.length)
var r=[]
return this.forEach((function(t,n){return r.push(e(t,n))}),t,n),r},n.from=function(e){return e instanceof n?e:e&&e.length?new r(e):n.empty}
var r=function(e){function n(t){e.call(this),this.values=t}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n
var r={length:{configurable:!0},depth:{configurable:!0}}
return n.prototype.flatten=function(){return this.values},n.prototype.sliceInner=function(e,t){return 0==e&&t==this.length?this:new n(this.values.slice(e,t))},n.prototype.getInner=function(e){return this.values[e]},n.prototype.forEachInner=function(e,t,n,r){for(var o=t;o<n;o++)if(!1===e(this.values[o],r+o))return!1},n.prototype.forEachInvertedInner=function(e,t,n,r){for(var o=t-1;o>=n;o--)if(!1===e(this.values[o],r+o))return!1},n.prototype.leafAppend=function(e){if(this.length+e.length<=t)return new n(this.values.concat(e.flatten()))},n.prototype.leafPrepend=function(e){if(this.length+e.length<=t)return new n(e.flatten().concat(this.values))},r.length.get=function(){return this.values.length},r.depth.get=function(){return 0},Object.defineProperties(n.prototype,r),n}(n)
n.empty=new r([])
var o=function(e){function t(t,n){e.call(this),this.left=t,this.right=n,this.length=t.length+n.length,this.depth=Math.max(t.depth,n.depth)+1}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.flatten=function(){return this.left.flatten().concat(this.right.flatten())},t.prototype.getInner=function(e){return e<this.left.length?this.left.get(e):this.right.get(e-this.left.length)},t.prototype.forEachInner=function(e,t,n,r){var o=this.left.length
return!(t<o&&!1===this.left.forEachInner(e,t,Math.min(n,o),r))&&!(n>o&&!1===this.right.forEachInner(e,Math.max(t-o,0),Math.min(this.length,n)-o,r+o))&&void 0},t.prototype.forEachInvertedInner=function(e,t,n,r){var o=this.left.length
return!(t>o&&!1===this.right.forEachInvertedInner(e,t-o,Math.max(n,o)-o,r+o))&&!(n<o&&!1===this.left.forEachInvertedInner(e,Math.min(t,o),n,r))&&void 0},t.prototype.sliceInner=function(e,t){if(0==e&&t==this.length)return this
var n=this.left.length
return t<=n?this.left.slice(e,t):e>=n?this.right.slice(e-n,t-n):this.left.slice(e,n).append(this.right.slice(0,t-n))},t.prototype.leafAppend=function(e){var n=this.right.leafAppend(e)
if(n)return new t(this.left,n)},t.prototype.leafPrepend=function(e){var n=this.left.leafPrepend(e)
if(n)return new t(n,this.right)},t.prototype.appendInner=function(e){return this.left.depth>=Math.max(this.right.depth,e.depth)+1?new t(this.left,new t(this.right,e)):new t(this,e)},t}(n)
e.exports=n},237:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})
for(var n={8:"Backspace",9:"Tab",10:"Enter",12:"NumLock",13:"Enter",16:"Shift",17:"Control",18:"Alt",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",44:"PrintScreen",45:"Insert",46:"Delete",59:";",61:"=",91:"Meta",92:"Meta",106:"*",107:"+",108:",",109:"-",110:".",111:"/",144:"NumLock",145:"ScrollLock",160:"Shift",161:"Shift",162:"Control",163:"Control",164:"Alt",165:"Alt",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},r={48:")",49:"!",50:"@",51:"#",52:"$",53:"%",54:"^",55:"&",56:"*",57:"(",59:":",61:"+",173:"_",186:":",187:"+",188:"<",189:"_",190:">",191:"?",192:"~",219:"{",220:"|",221:"}",222:'"'},o="undefined"!=typeof navigator&&/Mac/.test(navigator.platform),i="undefined"!=typeof navigator&&/MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent),s=0;s<10;s++)n[48+s]=n[96+s]=String(s)
for(s=1;s<=24;s++)n[s+111]="F"+s
for(s=65;s<=90;s++)n[s]=String.fromCharCode(s+32),r[s]=String.fromCharCode(s)
for(var a in n)r.hasOwnProperty(a)||(r[a]=n[a])
t.base=n,t.keyName=function(e){var t=!(o&&e.metaKey&&e.shiftKey&&!e.ctrlKey&&!e.altKey||i&&e.shiftKey&&e.key&&1==e.key.length||"Unidentified"==e.key)&&e.key||(e.shiftKey?r:n)[e.keyCode]||e.key||"Unidentified"
return"Esc"==t&&(t="Escape"),"Del"==t&&(t="Delete"),"Left"==t&&(t="ArrowLeft"),"Up"==t&&(t="ArrowUp"),"Right"==t&&(t="ArrowRight"),"Down"==t&&(t="ArrowDown"),t},t.shift=r},243:(e,t,n)=>{var r=n(553),o=n(712),i=n(820),s=["ol",0],a=["ul",0],c=["li",0],l={attrs:{order:{default:1,validate:"number"}},parseDOM:[{tag:"ol",getAttrs:function(e){return{order:e.hasAttribute("start")?+e.getAttribute("start"):1}}}],toDOM:function(e){return 1==e.attrs.order?s:["ol",{start:e.attrs.order},0]}},u={parseDOM:[{tag:"ul"}],toDOM:function(){return a}},d={parseDOM:[{tag:"li"}],toDOM:function(){return c},defining:!0}
function f(e,t){var n={}
for(var r in e)n[r]=e[r]
for(var o in t)n[o]=t[o]
return n}function h(e,t){return function(n,s){var a=n.selection,c=a.$from,l=a.$to,u=a.node
if(u&&u.isBlock||c.depth<2||!c.sameParent(l))return!1
var d=c.node(-1)
if(d.type!=e)return!1
if(0==c.parent.content.size&&c.node(-1).childCount==c.indexAfter(-1)){if(3==c.depth||c.node(-3).type!=e||c.index(-2)!=c.node(-2).childCount-1)return!1
if(s){for(var f=o.Fragment.empty,h=c.index(-1)?1:c.index(-2)?2:3,p=c.depth-h;p>=c.depth-3;p--)f=o.Fragment.from(c.node(p).copy(f))
var m=c.indexAfter(-1)<c.node(-2).childCount?1:c.indexAfter(-2)<c.node(-3).childCount?2:3
f=f.append(o.Fragment.from(e.createAndFill()))
var v=c.before(c.depth-(h-1)),y=n.tr.replace(v,c.after(-m),new o.Slice(f,4-h,0)),g=-1
y.doc.nodesBetween(v,y.doc.content.size,(function(e,t){if(g>-1)return!1
e.isTextblock&&0==e.content.size&&(g=t+1)})),g>-1&&y.setSelection(i.Selection.near(y.doc.resolve(g))),s(y.scrollIntoView())}return!0}var k=l.pos==c.end()?d.contentMatchAt(0).defaultType:null,b=n.tr.delete(c.pos,l.pos),w=k?[t?{type:e,attrs:t}:null,{type:k}]:void 0
return!!r.canSplit(b.doc,c.pos,2,w)&&(s&&s(b.split(c.pos,2,w).scrollIntoView()),!0)}}t.addListNodes=function(e,t,n){return e.append({ordered_list:f(l,{content:"list_item+",group:n}),bullet_list:f(u,{content:"list_item+",group:n}),list_item:f(d,{content:t})})},t.bulletList=u,t.liftListItem=function(e){return function(t,n){var i=t.selection,s=i.$from,a=i.$to,c=s.blockRange(a,(function(t){return t.childCount>0&&t.firstChild.type==e}))
return!!c&&(!n||(s.node(c.depth-1).type==e?function(e,t,n,i){var s=e.tr,a=i.end,c=i.$to.end(i.depth)
a<c&&(s.step(new r.ReplaceAroundStep(a-1,c,a,c,new o.Slice(o.Fragment.from(n.create(null,i.parent.copy())),1,0),1,!0)),i=new o.NodeRange(s.doc.resolve(i.$from.pos),s.doc.resolve(c),i.depth))
var l=r.liftTarget(i)
if(null==l)return!1
s.lift(i,l)
var u=s.mapping.map(a,-1)-1
return r.canJoin(s.doc,u)&&s.join(u),t(s.scrollIntoView()),!0}(t,n,e,c):function(e,t,n){for(var i=e.tr,s=n.parent,a=n.end,c=n.endIndex-1,l=n.startIndex;c>l;c--)a-=s.child(c).nodeSize,i.delete(a-1,a+1)
var u=i.doc.resolve(n.start),d=u.nodeAfter
if(i.mapping.map(n.end)!=n.start+u.nodeAfter.nodeSize)return!1
var f=0==n.startIndex,h=n.endIndex==s.childCount,p=u.node(-1),m=u.index(-1)
if(!p.canReplace(m+(f?0:1),m+1,d.content.append(h?o.Fragment.empty:o.Fragment.from(s))))return!1
var v=u.pos,y=v+d.nodeSize
return i.step(new r.ReplaceAroundStep(v-(f?1:0),y+(h?1:0),v+1,y-1,new o.Slice((f?o.Fragment.empty:o.Fragment.from(s.copy(o.Fragment.empty))).append(h?o.Fragment.empty:o.Fragment.from(s.copy(o.Fragment.empty))),f?0:1,h?0:1),f?0:1)),t(i.scrollIntoView()),!0}(t,n,c)))}},t.listItem=d,t.orderedList=l,t.sinkListItem=function(e){return function(t,n){var i=t.selection,s=i.$from,a=i.$to,c=s.blockRange(a,(function(t){return t.childCount>0&&t.firstChild.type==e}))
if(!c)return!1
var l=c.startIndex
if(0==l)return!1
var u=c.parent,d=u.child(l-1)
if(d.type!=e)return!1
if(n){var f=d.lastChild&&d.lastChild.type==u.type,h=o.Fragment.from(f?e.create():null),p=new o.Slice(o.Fragment.from(e.create(null,o.Fragment.from(u.type.create(null,h)))),f?3:1,0),m=c.start,v=c.end
n(t.tr.step(new r.ReplaceAroundStep(m-(f?3:1),v,m,v,p,1,!0)).scrollIntoView())}return!0}},t.splitListItem=h,t.splitListItemKeepMarks=function(e,t){var n=h(e,t)
return function(e,t){return n(e,t&&function(n){var r=e.storedMarks||e.selection.$to.parentOffset&&e.selection.$from.marks()
r&&n.ensureMarks(r),t(n)})}},t.wrapInList=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null
return function(n,i){var s=n.selection,a=s.$from,c=s.$to,l=a.blockRange(c),u=!1,d=l
if(!l)return!1
if(l.depth>=2&&a.node(l.depth-1).type.compatibleContent(e)&&0==l.startIndex){if(0==a.index(l.depth-1))return!1
var f=n.doc.resolve(l.start-2)
d=new o.NodeRange(f,f,l.depth),l.endIndex<l.parent.childCount&&(l=new o.NodeRange(a,n.doc.resolve(c.end(l.depth)),l.depth)),u=!0}var h=r.findWrapping(d,e,t,l)
return!!h&&(i&&i(function(e,t,n,i,s){for(var a=o.Fragment.empty,c=n.length-1;c>=0;c--)a=o.Fragment.from(n[c].type.create(n[c].attrs,a))
e.step(new r.ReplaceAroundStep(t.start-(i?2:0),t.end,t.start,t.end,new o.Slice(a,0,0),n.length,!0))
for(var l=0,u=0;u<n.length;u++)n[u].type==s&&(l=u+1)
for(var d=n.length-l,f=t.start+n.length-(i?2:0),h=t.parent,p=t.startIndex,m=t.endIndex,v=!0;p<m;p++,v=!1)!v&&r.canSplit(e.doc,f,d)&&(e.split(f,d),f+=2*d),f+=h.child(p).nodeSize
return e}(n.tr,l,h,u,e).scrollIntoView()),!0)}}},248:(e,t,n)=>{var r=n(614),o=n(392),i=n(470),s=n(106),a=n(175),c=n(675),l=n(637)
function u(e){const{state:t,transaction:n}=e
let{selection:r}=n,{doc:o}=n,{storedMarks:i}=n
return{...t,apply:t.apply.bind(t),applyTransaction:t.applyTransaction.bind(t),plugins:t.plugins,schema:t.schema,reconfigure:t.reconfigure.bind(t),toJSON:t.toJSON.bind(t),get storedMarks(){return i},get selection(){return r},get doc(){return o},get tr(){return r=n.selection,o=n.doc,i=n.storedMarks,n}}}class d{constructor(e){this.editor=e.editor,this.rawCommands=this.editor.extensionManager.commands,this.customState=e.state}get hasCustomState(){return!!this.customState}get state(){return this.customState||this.editor.state}get commands(){const{rawCommands:e,editor:t,state:n}=this,{view:r}=t,{tr:o}=n,i=this.buildProps(o)
return Object.fromEntries(Object.entries(e).map((([e,t])=>[e,(...e)=>{const n=t(...e)(i)
return o.getMeta("preventDispatch")||this.hasCustomState||r.dispatch(o),n}])))}get chain(){return()=>this.createChain()}get can(){return()=>this.createCan()}createChain(e,t=!0){const{rawCommands:n,editor:r,state:o}=this,{view:i}=r,s=[],a=!!e,c=e||o.tr,l={...Object.fromEntries(Object.entries(n).map((([e,n])=>[e,(...e)=>{const r=this.buildProps(c,t),o=n(...e)(r)
return s.push(o),l}]))),run:()=>(a||!t||c.getMeta("preventDispatch")||this.hasCustomState||i.dispatch(c),s.every((e=>!0===e)))}
return l}createCan(e){const{rawCommands:t,state:n}=this,r=!1,o=e||n.tr,i=this.buildProps(o,r)
return{...Object.fromEntries(Object.entries(t).map((([e,t])=>[e,(...e)=>t(...e)({...i,dispatch:void 0})]))),chain:()=>this.createChain(o,r)}}buildProps(e,t=!0){const{rawCommands:n,editor:r,state:o}=this,{view:i}=r,s={tr:e,editor:r,view:i,state:u({state:o,transaction:e}),dispatch:t?()=>{}:void 0,chain:()=>this.createChain(e,t),can:()=>this.createCan(e),get commands(){return Object.fromEntries(Object.entries(n).map((([e,t])=>[e,(...e)=>t(...e)(s)])))}}
return s}}class f{constructor(){this.callbacks={}}on(e,t){return this.callbacks[e]||(this.callbacks[e]=[]),this.callbacks[e].push(t),this}emit(e,...t){const n=this.callbacks[e]
return n&&n.forEach((e=>e.apply(this,t))),this}off(e,t){const n=this.callbacks[e]
return n&&(t?this.callbacks[e]=n.filter((e=>e!==t)):delete this.callbacks[e]),this}removeAllListeners(){this.callbacks={}}}function h(e,t,n){return void 0===e.config[t]&&e.parent?h(e.parent,t,n):"function"==typeof e.config[t]?e.config[t].bind({...n,parent:e.parent?h(e.parent,t,n):null}):e.config[t]}function p(e){return{baseExtensions:e.filter((e=>"extension"===e.type)),nodeExtensions:e.filter((e=>"node"===e.type)),markExtensions:e.filter((e=>"mark"===e.type))}}function m(e){const t=[],{nodeExtensions:n,markExtensions:r}=p(e),o=[...n,...r],i={default:null,rendered:!0,renderHTML:null,parseHTML:null,keepOnSplit:!0,isRequired:!1}
return e.forEach((e=>{const n=h(e,"addGlobalAttributes",{name:e.name,options:e.options,storage:e.storage,extensions:o})
n&&n().forEach((e=>{e.types.forEach((n=>{Object.entries(e.attributes).forEach((([e,r])=>{t.push({type:n,name:e,attribute:{...i,...r}})}))}))}))})),o.forEach((e=>{const n={name:e.name,options:e.options,storage:e.storage},r=h(e,"addAttributes",n)
if(!r)return
const o=r()
Object.entries(o).forEach((([n,r])=>{const o={...i,...r}
"function"==typeof(null==o?void 0:o.default)&&(o.default=o.default()),(null==o?void 0:o.isRequired)&&void 0===(null==o?void 0:o.default)&&delete o.default,t.push({type:e.name,name:n,attribute:o})}))})),t}function v(e,t){if("string"==typeof e){if(!t.nodes[e])throw Error(`There is no node type named '${e}'. Maybe you forgot to add the extension?`)
return t.nodes[e]}return e}function y(...e){return e.filter((e=>!!e)).reduce(((e,t)=>{const n={...e}
return Object.entries(t).forEach((([e,t])=>{if(n[e])if("class"===e){const r=t?t.split(" "):[],o=n[e]?n[e].split(" "):[],i=r.filter((e=>!o.includes(e)))
n[e]=[...o,...i].join(" ")}else n[e]="style"===e?[n[e],t].join("; "):t
else n[e]=t})),n}),{})}function g(e,t){return t.filter((e=>e.attribute.rendered)).map((t=>t.attribute.renderHTML?t.attribute.renderHTML(e.attrs)||{}:{[t.name]:e.attrs[t.name]})).reduce(((e,t)=>y(e,t)),{})}function k(e){return"function"==typeof e}function b(e,t=void 0,...n){return k(e)?t?e.bind(t)(...n):e(...n):e}function w(e={}){return 0===Object.keys(e).length&&e.constructor===Object}function S(e){return"string"!=typeof e?e:e.match(/^[+-]?(?:\d*\.)?\d+$/)?Number(e):"true"===e||"false"!==e&&e}function x(e,t){return"style"in e?e:{...e,getAttrs:n=>{const r=e.getAttrs?e.getAttrs(n):e.attrs
if(!1===r)return!1
const o=t.reduce(((e,t)=>{const r=t.attribute.parseHTML?t.attribute.parseHTML(n):S(n.getAttribute(t.name))
return null==r?e:{...e,[t.name]:r}}),{})
return{...r,...o}}}}function O(e){return Object.fromEntries(Object.entries(e).filter((([e,t])=>("attrs"!==e||!w(t))&&null!=t)))}function M(e,t){var n
const r=m(e),{nodeExtensions:o,markExtensions:i}=p(e),a=null===(n=o.find((e=>h(e,"topNode"))))||void 0===n?void 0:n.name,c=Object.fromEntries(o.map((n=>{const o=r.filter((e=>e.type===n.name)),i={name:n.name,options:n.options,storage:n.storage,editor:t},s=O({...e.reduce(((e,t)=>{const r=h(t,"extendNodeSchema",i)
return{...e,...r?r(n):{}}}),{}),content:b(h(n,"content",i)),marks:b(h(n,"marks",i)),group:b(h(n,"group",i)),inline:b(h(n,"inline",i)),atom:b(h(n,"atom",i)),selectable:b(h(n,"selectable",i)),draggable:b(h(n,"draggable",i)),code:b(h(n,"code",i)),whitespace:b(h(n,"whitespace",i)),defining:b(h(n,"defining",i)),isolating:b(h(n,"isolating",i)),attrs:Object.fromEntries(o.map((e=>{var t
return[e.name,{default:null===(t=null==e?void 0:e.attribute)||void 0===t?void 0:t.default}]})))}),a=b(h(n,"parseHTML",i))
a&&(s.parseDOM=a.map((e=>x(e,o))))
const c=h(n,"renderHTML",i)
c&&(s.toDOM=e=>c({node:e,HTMLAttributes:g(e,o)}))
const l=h(n,"renderText",i)
return l&&(s.toText=l),[n.name,s]}))),l=Object.fromEntries(i.map((n=>{const o=r.filter((e=>e.type===n.name)),i={name:n.name,options:n.options,storage:n.storage,editor:t},s=O({...e.reduce(((e,t)=>{const r=h(t,"extendMarkSchema",i)
return{...e,...r?r(n):{}}}),{}),inclusive:b(h(n,"inclusive",i)),excludes:b(h(n,"excludes",i)),group:b(h(n,"group",i)),spanning:b(h(n,"spanning",i)),code:b(h(n,"code",i)),attrs:Object.fromEntries(o.map((e=>{var t
return[e.name,{default:null===(t=null==e?void 0:e.attribute)||void 0===t?void 0:t.default}]})))}),a=b(h(n,"parseHTML",i))
a&&(s.parseDOM=a.map((e=>x(e,o))))
const c=h(n,"renderHTML",i)
return c&&(s.toDOM=e=>c({mark:e,HTMLAttributes:g(e,o)})),[n.name,s]})))
return new s.Schema({topNode:a,nodes:c,marks:l})}function C(e,t){return t.nodes[e]||t.marks[e]||null}function T(e,t){return Array.isArray(t)?t.some((t=>("string"==typeof t?t:t.name)===e.name)):t}const N=(e,t=500)=>{let n=""
const r=e.parentOffset
return e.parent.nodesBetween(Math.max(0,r-t),r,((e,t,o,i)=>{var s,a
const c=(null===(a=(s=e.type.spec).toText)||void 0===a?void 0:a.call(s,{node:e,pos:t,parent:o,index:i}))||e.textContent||"%leaf%"
n+=e.isAtom&&!e.isText?c:c.slice(0,Math.max(0,r-t))})),n}
function E(e){return"[object RegExp]"===Object.prototype.toString.call(e)}class D{constructor(e){this.find=e.find,this.handler=e.handler}}function A(e){var t
const{editor:n,from:r,to:o,text:i,rules:s,plugin:a}=e,{view:c}=n
if(c.composing)return!1
const l=c.state.doc.resolve(r)
if(l.parent.type.spec.code||(null===(t=l.nodeBefore||l.nodeAfter)||void 0===t?void 0:t.marks.find((e=>e.type.spec.code))))return!1
let f=!1
const h=N(l)+i
return s.forEach((e=>{if(f)return
const t=((e,t)=>{if(E(t))return t.exec(e)
const n=t(e)
if(!n)return null
const r=[n.text]
return r.index=n.index,r.input=e,r.data=n.data,n.replaceWith&&(n.text.includes(n.replaceWith)||console.warn('[tiptap warn]: "inputRuleMatch.replaceWith" must be part of "inputRuleMatch.text".'),r.push(n.replaceWith)),r})(h,e.find)
if(!t)return
const s=c.state.tr,l=u({state:c.state,transaction:s}),p={from:r-(t[0].length-i.length),to:o},{commands:m,chain:v,can:y}=new d({editor:n,state:l})
null!==e.handler({state:l,range:p,match:t,commands:m,chain:v,can:y})&&s.steps.length&&(s.setMeta(a,{transform:s,from:r,to:o,text:i}),c.dispatch(s),f=!0)})),f}function P(e){const{editor:t,rules:n}=e,o=new r.Plugin({state:{init:()=>null,apply(e,r){const i=e.getMeta(o)
if(i)return i
const s=e.getMeta("applyInputRules")
return!!s&&setTimeout((()=>{const{from:e,text:r}=s,i=e+r.length
A({editor:t,from:e,to:i,text:r,rules:n,plugin:o})})),e.selectionSet||e.docChanged?null:r}},props:{handleTextInput:(e,r,i,s)=>A({editor:t,from:r,to:i,text:s,rules:n,plugin:o}),handleDOMEvents:{compositionend:e=>(setTimeout((()=>{const{$cursor:r}=e.state.selection
r&&A({editor:t,from:r.pos,to:r.pos,text:"",rules:n,plugin:o})})),!1)},handleKeyDown(e,r){if("Enter"!==r.key)return!1
const{$cursor:i}=e.state.selection
return!!i&&A({editor:t,from:i.pos,to:i.pos,text:"\n",rules:n,plugin:o})}},isInputRules:!0})
return o}function R(e){return"number"==typeof e}class I{constructor(e){this.find=e.find,this.handler=e.handler}}function j(e){const{editor:t,rules:n}=e
let o=null,i=!1,s=!1,a="undefined"!=typeof ClipboardEvent?new ClipboardEvent("paste"):null,c="undefined"!=typeof DragEvent?new DragEvent("drop"):null
const l=({state:e,from:n,to:r,rule:o,pasteEvt:i})=>{const s=e.tr,l=u({state:e,transaction:s})
if(function(e){const{editor:t,state:n,from:r,to:o,rule:i,pasteEvent:s,dropEvent:a}=e,{commands:c,chain:l,can:u}=new d({editor:t,state:n}),f=[]
return n.doc.nodesBetween(r,o,((e,t)=>{if(!e.isTextblock||e.type.spec.code)return
const d=Math.max(r,t),h=Math.min(o,t+e.content.size);((e,t,n)=>{if(E(t))return[...e.matchAll(t)]
const r=t(e,n)
return r?r.map((t=>{const n=[t.text]
return n.index=t.index,n.input=e,n.data=t.data,t.replaceWith&&(t.text.includes(t.replaceWith)||console.warn('[tiptap warn]: "pasteRuleMatch.replaceWith" must be part of "pasteRuleMatch.text".'),n.push(t.replaceWith)),n})):[]})(e.textBetween(d-t,h-t,void 0,"￼"),i.find,s).forEach((e=>{if(void 0===e.index)return
const t=d+e.index+1,r=t+e[0].length,o={from:n.tr.mapping.map(t),to:n.tr.mapping.map(r)},h=i.handler({state:n,range:o,match:e,commands:c,chain:l,can:u,pasteEvent:s,dropEvent:a})
f.push(h)}))})),f.every((e=>null!==e))}({editor:t,state:l,from:Math.max(n-1,0),to:r.b-1,rule:o,pasteEvent:i,dropEvent:c})&&s.steps.length)return c="undefined"!=typeof DragEvent?new DragEvent("drop"):null,a="undefined"!=typeof ClipboardEvent?new ClipboardEvent("paste"):null,s},f=n.map((e=>new r.Plugin({view(e){const t=t=>{var n
o=(null===(n=e.dom.parentElement)||void 0===n?void 0:n.contains(t.target))?e.dom.parentElement:null}
return window.addEventListener("dragstart",t),{destroy(){window.removeEventListener("dragstart",t)}}},props:{handleDOMEvents:{drop:(e,t)=>(s=o===e.dom.parentElement,c=t,!1),paste:(e,t)=>{var n
const r=null===(n=t.clipboardData)||void 0===n?void 0:n.getData("text/html")
return a=t,i=!!(null==r?void 0:r.includes("data-pm-slice")),!1}}},appendTransaction:(t,n,r)=>{const o=t[0],c="paste"===o.getMeta("uiEvent")&&!i,u="drop"===o.getMeta("uiEvent")&&!s,d=o.getMeta("applyPasteRules"),f=!!d
if(!c&&!u&&!f)return
if(f){const{from:t,text:n}=d,o=t+n.length,i=(e=>{var t
const n=new ClipboardEvent("paste",{clipboardData:new DataTransfer})
return null===(t=n.clipboardData)||void 0===t||t.setData("text/html",e),n})(n)
return l({rule:e,state:r,from:t,to:{b:o},pasteEvt:i})}const h=n.doc.content.findDiffStart(r.doc.content),p=n.doc.content.findDiffEnd(r.doc.content)
return R(h)&&p&&h!==p.b?l({rule:e,state:r,from:h,to:p,pasteEvt:a}):void 0}})))
return f}function z(e){const t=e.filter(((t,n)=>e.indexOf(t)!==n))
return Array.from(new Set(t))}class B{constructor(e,t){this.splittableMarks=[],this.editor=t,this.extensions=B.resolve(e),this.schema=M(this.extensions,t),this.setupExtensions()}static resolve(e){const t=B.sort(B.flatten(e)),n=z(t.map((e=>e.name)))
return n.length&&console.warn(`[tiptap warn]: Duplicate extension names found: [${n.map((e=>`'${e}'`)).join(", ")}]. This can lead to issues.`),t}static flatten(e){return e.map((e=>{const t=h(e,"addExtensions",{name:e.name,options:e.options,storage:e.storage})
return t?[e,...this.flatten(t())]:e})).flat(10)}static sort(e){return e.sort(((e,t)=>{const n=h(e,"priority")||100,r=h(t,"priority")||100
return n>r?-1:n<r?1:0}))}get commands(){return this.extensions.reduce(((e,t)=>{const n=h(t,"addCommands",{name:t.name,options:t.options,storage:t.storage,editor:this.editor,type:C(t.name,this.schema)})
return n?{...e,...n()}:e}),{})}get plugins(){const{editor:e}=this,t=B.sort([...this.extensions].reverse()),n=[],r=[],o=t.map((t=>{const o={name:t.name,options:t.options,storage:t.storage,editor:e,type:C(t.name,this.schema)},s=[],a=h(t,"addKeyboardShortcuts",o)
let c={}
if("mark"===t.type&&h(t,"exitable",o)&&(c.ArrowRight=()=>ze.handleExit({editor:e,mark:t})),a){const t=Object.fromEntries(Object.entries(a()).map((([t,n])=>[t,()=>n({editor:e})])))
c={...c,...t}}const l=i.keymap(c)
s.push(l)
const u=h(t,"addInputRules",o)
T(t,e.options.enableInputRules)&&u&&n.push(...u())
const d=h(t,"addPasteRules",o)
T(t,e.options.enablePasteRules)&&d&&r.push(...d())
const f=h(t,"addProseMirrorPlugins",o)
if(f){const e=f()
s.push(...e)}return s})).flat()
return[P({editor:e,rules:n}),...j({editor:e,rules:r}),...o]}get attributes(){return m(this.extensions)}get nodeViews(){const{editor:e}=this,{nodeExtensions:t}=p(this.extensions)
return Object.fromEntries(t.filter((e=>!!h(e,"addNodeView"))).map((t=>{const n=this.attributes.filter((e=>e.type===t.name)),r={name:t.name,options:t.options,storage:t.storage,editor:e,type:v(t.name,this.schema)},o=h(t,"addNodeView",r)
return o?[t.name,(r,i,s,a)=>{const c=g(r,n)
return o()({editor:e,node:r,getPos:s,decorations:a,HTMLAttributes:c,extension:t})}]:[]})))}setupExtensions(){this.extensions.forEach((e=>{var t
this.editor.extensionStorage[e.name]=e.storage
const n={name:e.name,options:e.options,storage:e.storage,editor:this.editor,type:C(e.name,this.schema)}
"mark"===e.type&&(null===(t=b(h(e,"keepOnSplit",n)))||void 0===t||t)&&this.splittableMarks.push(e.name)
const r=h(e,"onBeforeCreate",n),o=h(e,"onCreate",n),i=h(e,"onUpdate",n),s=h(e,"onSelectionUpdate",n),a=h(e,"onTransaction",n),c=h(e,"onFocus",n),l=h(e,"onBlur",n),u=h(e,"onDestroy",n)
r&&this.editor.on("beforeCreate",r),o&&this.editor.on("create",o),i&&this.editor.on("update",i),s&&this.editor.on("selectionUpdate",s),a&&this.editor.on("transaction",a),c&&this.editor.on("focus",c),l&&this.editor.on("blur",l),u&&this.editor.on("destroy",u)}))}}function F(e){return"Object"===function(e){return Object.prototype.toString.call(e).slice(8,-1)}(e)&&e.constructor===Object&&Object.getPrototypeOf(e)===Object.prototype}function $(e,t){const n={...e}
return F(e)&&F(t)&&Object.keys(t).forEach((r=>{F(t[r])&&F(e[r])?n[r]=$(e[r],t[r]):n[r]=t[r]})),n}class V{constructor(e={}){this.type="extension",this.name="extension",this.parent=null,this.child=null,this.config={name:this.name,defaultOptions:{}},this.config={...this.config,...e},this.name=this.config.name,e.defaultOptions&&Object.keys(e.defaultOptions).length>0&&console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`),this.options=this.config.defaultOptions,this.config.addOptions&&(this.options=b(h(this,"addOptions",{name:this.name}))),this.storage=b(h(this,"addStorage",{name:this.name,options:this.options}))||{}}static create(e={}){return new V(e)}configure(e={}){const t=this.extend({...this.config,addOptions:()=>$(this.options,e)})
return t.name=this.name,t.parent=this.parent,t}extend(e={}){const t=new V({...this.config,...e})
return t.parent=this,this.child=t,t.name=e.name?e.name:t.parent.name,e.defaultOptions&&Object.keys(e.defaultOptions).length>0&&console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`),t.options=b(h(t,"addOptions",{name:t.name})),t.storage=b(h(t,"addStorage",{name:t.name,options:t.options})),t}}function _(e,t,n){const{from:r,to:o}=t,{blockSeparator:i="\n\n",textSerializers:s={}}=n||{}
let a=""
return e.nodesBetween(r,o,((e,n,c,l)=>{var u
e.isBlock&&n>r&&(a+=i)
const d=null==s?void 0:s[e.type.name]
if(d)return c&&(a+=d({node:e,pos:n,parent:c,index:l,range:t})),!1
e.isText&&(a+=null===(u=null==e?void 0:e.text)||void 0===u?void 0:u.slice(Math.max(r,n)-n,o-n))})),a}function L(e){return Object.fromEntries(Object.entries(e.nodes).filter((([,e])=>e.spec.toText)).map((([e,t])=>[e,t.spec.toText])))}const J=V.create({name:"clipboardTextSerializer",addOptions:()=>({blockSeparator:void 0}),addProseMirrorPlugins(){return[new r.Plugin({key:new r.PluginKey("clipboardTextSerializer"),props:{clipboardTextSerializer:()=>{const{editor:e}=this,{state:t,schema:n}=e,{doc:r,selection:o}=t,{ranges:i}=o,s=Math.min(...i.map((e=>e.$from.pos))),a=Math.max(...i.map((e=>e.$to.pos))),c=L(n)
return _(r,{from:s,to:a},{...void 0!==this.options.blockSeparator?{blockSeparator:this.options.blockSeparator}:{},textSerializers:c})}}})]}})
function W(e,t,n={strict:!0}){const r=Object.keys(t)
return!r.length||r.every((r=>n.strict?t[r]===e[r]:E(t[r])?t[r].test(e[r]):t[r]===e[r]))}function q(e,t,n={}){return e.find((e=>e.type===t&&W(e.attrs,n)))}function K(e,t,n={}){return!!q(e,t,n)}function H(e,t,n={}){if(!e||!t)return
let r=e.parent.childAfter(e.parentOffset)
if(e.parentOffset===r.offset&&0!==r.offset&&(r=e.parent.childBefore(e.parentOffset)),!r.node)return
const o=q([...r.node.marks],t,n)
if(!o)return
let i=r.index,s=e.start()+r.offset,a=i+1,c=s+r.node.nodeSize
for(q([...r.node.marks],t,n);i>0&&o.isInSet(e.parent.child(i-1).marks);)i-=1,s-=e.parent.child(i).nodeSize
for(;a<e.parent.childCount&&K([...e.parent.child(a).marks],t,n);)c+=e.parent.child(a).nodeSize,a+=1
return{from:s,to:c}}function U(e,t){if("string"==typeof e){if(!t.marks[e])throw Error(`There is no mark type named '${e}'. Maybe you forgot to add the extension?`)
return t.marks[e]}return e}function G(e){return e instanceof r.TextSelection}function X(e=0,t=0,n=0){return Math.min(Math.max(e,t),n)}function Y(e,t=null){if(!t)return null
const n=r.Selection.atStart(e),o=r.Selection.atEnd(e)
if("start"===t||!0===t)return n
if("end"===t)return o
const i=n.from,s=o.to
return"all"===t?r.TextSelection.create(e,X(0,i,s),X(e.content.size,i,s)):r.TextSelection.create(e,X(t,i,s),X(t,i,s))}function Q(){return["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"].includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"ontouchend"in document}const Z=e=>{const t=e.childNodes
for(let n=t.length-1;n>=0;n-=1){const r=t[n]
3===r.nodeType&&r.nodeValue&&/^(\n\s\s|\n)$/.test(r.nodeValue)?e.removeChild(r):1===r.nodeType&&Z(r)}return e}
function ee(e){const t=`<body>${e}</body>`,n=(new window.DOMParser).parseFromString(t,"text/html").body
return Z(n)}function te(e,t,n){n={slice:!0,parseOptions:{},...n}
const r="string"==typeof e
if("object"==typeof e&&null!==e)try{return Array.isArray(e)&&e.length>0?s.Fragment.fromArray(e.map((e=>t.nodeFromJSON(e)))):t.nodeFromJSON(e)}catch(r){if(n.errorOnInvalidContent)throw new Error("[tiptap error]: Invalid JSON content",{cause:r})
return console.warn("[tiptap warn]: Invalid content.","Passed value:",e,"Error:",r),te("",t,n)}if(r){if(n.errorOnInvalidContent){let r=!1,o=""
const i=new s.Schema({topNode:t.spec.topNode,marks:t.spec.marks,nodes:t.spec.nodes.append({__tiptap__private__unknown__catch__all__node:{content:"inline*",group:"block",parseDOM:[{tag:"*",getAttrs:e=>(r=!0,o="string"==typeof e?e:e.outerHTML,null)}]}})})
if(n.slice?s.DOMParser.fromSchema(i).parseSlice(ee(e),n.parseOptions):s.DOMParser.fromSchema(i).parse(ee(e),n.parseOptions),n.errorOnInvalidContent&&r)throw new Error("[tiptap error]: Invalid HTML content",{cause:new Error(`Invalid element found: ${o}`)})}const r=s.DOMParser.fromSchema(t)
return n.slice?r.parseSlice(ee(e),n.parseOptions).content:r.parse(ee(e),n.parseOptions)}return te("",t,n)}function ne(e,t,n){const o=e.steps.length-1
if(o<t)return
const i=e.steps[o]
if(!(i instanceof a.ReplaceStep||i instanceof a.ReplaceAroundStep))return
const s=e.mapping.maps[o]
let c=0
s.forEach(((e,t,n,r)=>{0===c&&(c=r)})),e.setSelection(r.Selection.near(e.doc.resolve(c),n))}function re(){return"undefined"!=typeof navigator&&/Mac/.test(navigator.platform)}function oe(e,t,n={}){const{from:r,to:o,empty:i}=e.selection,s=t?v(t,e.schema):null,a=[]
e.doc.nodesBetween(r,o,((e,t)=>{if(e.isText)return
const n=Math.max(r,t),i=Math.min(o,t+e.nodeSize)
a.push({node:e,from:n,to:i})}))
const c=o-r,l=a.filter((e=>!s||s.name===e.node.type.name)).filter((e=>W(e.node.attrs,n,{strict:!1})))
return i?!!l.length:l.reduce(((e,t)=>e+t.to-t.from),0)>=c}function ie(e,t){return t.nodes[e]?"node":t.marks[e]?"mark":null}function se(e,t){const n="string"==typeof t?[t]:t
return Object.keys(e).reduce(((t,r)=>(n.includes(r)||(t[r]=e[r]),t)),{})}function ae(e,t,n={},r={}){return te(e,t,{slice:!1,parseOptions:n,errorOnInvalidContent:r.errorOnInvalidContent})}function ce(e,t){const n=U(t,e.schema),{from:r,to:o,empty:i}=e.selection,s=[]
i?(e.storedMarks&&s.push(...e.storedMarks),s.push(...e.selection.$head.marks())):e.doc.nodesBetween(r,o,(e=>{s.push(...e.marks)}))
const a=s.find((e=>e.type.name===n.name))
return a?{...a.attrs}:{}}function le(e){for(let t=0;t<e.edgeCount;t+=1){const{type:n}=e.edge(t)
if(n.isTextblock&&!n.hasRequiredAttrs())return n}return null}function ue(e,t){for(let n=e.depth;n>0;n-=1){const r=e.node(n)
if(t(r))return{pos:n>0?e.before(n):0,start:e.start(n),depth:n,node:r}}}function de(e){return t=>ue(t.$from,e)}function fe(e,t){const n=s.DOMSerializer.fromSchema(t).serializeFragment(e),r=document.implementation.createHTMLDocument().createElement("div")
return r.appendChild(n),r.innerHTML}function he(e,t){return M(B.resolve(e),t)}function pe(e,t){return _(e,{from:0,to:e.content.size},t)}function me(e,t){const n=v(t,e.schema),{from:r,to:o}=e.selection,i=[]
e.doc.nodesBetween(r,o,(e=>{i.push(e)}))
const s=i.reverse().find((e=>e.type.name===n.name))
return s?{...s.attrs}:{}}function ve(e,t){const n=ie("string"==typeof t?t:t.name,e.schema)
return"node"===n?me(e,t):"mark"===n?ce(e,t):{}}function ye(e,t=JSON.stringify){const n={}
return e.filter((e=>{const r=t(e)
return!Object.prototype.hasOwnProperty.call(n,r)&&(n[r]=!0)}))}function ge(e,t,n){const r=[]
return e===t?n.resolve(e).marks().forEach((t=>{const o=H(n.resolve(e),t.type)
o&&r.push({mark:t,...o})})):n.nodesBetween(e,t,((e,t)=>{e&&void 0!==(null==e?void 0:e.nodeSize)&&r.push(...e.marks.map((n=>({from:t,to:t+e.nodeSize,mark:n}))))})),r}function ke(e,t,n){return Object.fromEntries(Object.entries(n).filter((([n])=>{const r=e.find((e=>e.type===t&&e.name===n))
return!!r&&r.attribute.keepOnSplit})))}function be(e,t,n={}){const{empty:r,ranges:o}=e.selection,i=t?U(t,e.schema):null
if(r)return!!(e.storedMarks||e.selection.$from.marks()).filter((e=>!i||i.name===e.type.name)).find((e=>W(e.attrs,n,{strict:!1})))
let s=0
const a=[]
if(o.forEach((({$from:t,$to:n})=>{const r=t.pos,o=n.pos
e.doc.nodesBetween(r,o,((e,t)=>{if(!e.isText&&!e.marks.length)return
const n=Math.max(r,t),i=Math.min(o,t+e.nodeSize)
s+=i-n,a.push(...e.marks.map((e=>({mark:e,from:n,to:i}))))}))})),0===s)return!1
const c=a.filter((e=>!i||i.name===e.mark.type.name)).filter((e=>W(e.mark.attrs,n,{strict:!1}))).reduce(((e,t)=>e+t.to-t.from),0),l=a.filter((e=>!i||e.mark.type!==i&&e.mark.type.excludes(i))).reduce(((e,t)=>e+t.to-t.from),0)
return(c>0?c+l:c)>=s}function we(e,t,n={}){if(!t)return oe(e,null,n)||be(e,null,n)
const r=ie(t,e.schema)
return"node"===r?oe(e,t,n):"mark"===r&&be(e,t,n)}function Se(e,t){const{nodeExtensions:n}=p(t),r=n.find((t=>t.name===e))
if(!r)return!1
const o=b(h(r,"group",{name:r.name,options:r.options,storage:r.storage}))
return"string"==typeof o&&o.split(" ").includes("list")}function xe(e,{checkChildren:t=!0,ignoreWhitespace:n=!1}={}){var r
if(n){if("hardBreak"===e.type.name)return!0
if(e.isText)return/^\s*$/m.test(null!==(r=e.text)&&void 0!==r?r:"")}if(e.isText)return!e.text
if(e.isAtom||e.isLeaf)return!1
if(0===e.content.childCount)return!0
if(t){let r=!0
return e.content.forEach((e=>{!1!==r&&(xe(e,{ignoreWhitespace:n,checkChildren:t})||(r=!1))})),r}return!1}function Oe(e,t){const n=e.storedMarks||e.selection.$to.parentOffset&&e.selection.$from.marks()
if(n){const r=n.filter((e=>null==t?void 0:t.includes(e.type.name)))
e.tr.ensureMarks(r)}}const Me=(e,t)=>{const n=de((e=>e.type===t))(e.selection)
if(!n)return!0
const r=e.doc.resolve(Math.max(0,n.pos-1)).before(n.depth)
if(void 0===r)return!0
const o=e.doc.nodeAt(r)
return n.node.type!==(null==o?void 0:o.type)||!a.canJoin(e.doc,n.pos)||(e.join(n.pos),!0)},Ce=(e,t)=>{const n=de((e=>e.type===t))(e.selection)
if(!n)return!0
const r=e.doc.resolve(n.start).after(n.depth)
if(void 0===r)return!0
const o=e.doc.nodeAt(r)
return n.node.type!==(null==o?void 0:o.type)||!a.canJoin(e.doc,r)||(e.join(r),!0)}
var Te=Object.freeze({__proto__:null,blur:()=>({editor:e,view:t})=>(requestAnimationFrame((()=>{var n
e.isDestroyed||(t.dom.blur(),null===(n=null===window||void 0===window?void 0:window.getSelection())||void 0===n||n.removeAllRanges())})),!0),clearContent:(e=!1)=>({commands:t})=>t.setContent("",e),clearNodes:()=>({state:e,tr:t,dispatch:n})=>{const{selection:r}=t,{ranges:o}=r
return!n||(o.forEach((({$from:n,$to:r})=>{e.doc.nodesBetween(n.pos,r.pos,((e,n)=>{if(e.type.isText)return
const{doc:r,mapping:o}=t,i=r.resolve(o.map(n)),s=r.resolve(o.map(n+e.nodeSize)),c=i.blockRange(s)
if(!c)return
const l=a.liftTarget(c)
if(e.type.isTextblock){const{defaultType:e}=i.parent.contentMatchAt(i.index())
t.setNodeMarkup(c.start,e)}(l||0===l)&&t.lift(c,l)}))})),!0)},command:e=>t=>e(t),createParagraphNear:()=>({state:e,dispatch:t})=>c.createParagraphNear(e,t),cut:(e,t)=>({editor:n,tr:o})=>{const{state:i}=n,s=i.doc.slice(e.from,e.to)
o.deleteRange(e.from,e.to)
const a=o.mapping.map(t)
return o.insert(a,s.content),o.setSelection(new r.TextSelection(o.doc.resolve(a-1))),!0},deleteCurrentNode:()=>({tr:e,dispatch:t})=>{const{selection:n}=e,r=n.$anchor.node()
if(r.content.size>0)return!1
const o=e.selection.$anchor
for(let i=o.depth;i>0;i-=1)if(o.node(i).type===r.type){if(t){const t=o.before(i),n=o.after(i)
e.delete(t,n).scrollIntoView()}return!0}return!1},deleteNode:e=>({tr:t,state:n,dispatch:r})=>{const o=v(e,n.schema),i=t.selection.$anchor
for(let e=i.depth;e>0;e-=1)if(i.node(e).type===o){if(r){const n=i.before(e),r=i.after(e)
t.delete(n,r).scrollIntoView()}return!0}return!1},deleteRange:e=>({tr:t,dispatch:n})=>{const{from:r,to:o}=e
return n&&t.delete(r,o),!0},deleteSelection:()=>({state:e,dispatch:t})=>c.deleteSelection(e,t),enter:()=>({commands:e})=>e.keyboardShortcut("Enter"),exitCode:()=>({state:e,dispatch:t})=>c.exitCode(e,t),extendMarkRange:(e,t={})=>({tr:n,state:o,dispatch:i})=>{const s=U(e,o.schema),{doc:a,selection:c}=n,{$from:l,from:u,to:d}=c
if(i){const e=H(l,s,t)
if(e&&e.from<=u&&e.to>=d){const t=r.TextSelection.create(a,e.from,e.to)
n.setSelection(t)}}return!0},first:e=>t=>{const n="function"==typeof e?e(t):e
for(let e=0;e<n.length;e+=1)if(n[e](t))return!0
return!1},focus:(e=null,t={})=>({editor:n,view:r,tr:o,dispatch:i})=>{t={scrollIntoView:!0,...t}
const s=()=>{Q()&&r.dom.focus(),requestAnimationFrame((()=>{n.isDestroyed||(r.focus(),(null==t?void 0:t.scrollIntoView)&&n.commands.scrollIntoView())}))}
if(r.hasFocus()&&null===e||!1===e)return!0
if(i&&null===e&&!G(n.state.selection))return s(),!0
const a=Y(o.doc,e)||n.state.selection,c=n.state.selection.eq(a)
return i&&(c||o.setSelection(a),c&&o.storedMarks&&o.setStoredMarks(o.storedMarks),s()),!0},forEach:(e,t)=>n=>e.every(((e,r)=>t(e,{...n,index:r}))),insertContent:(e,t)=>({tr:n,commands:r})=>r.insertContentAt({from:n.selection.from,to:n.selection.to},e,t),insertContentAt:(e,t,n)=>({tr:r,dispatch:o,editor:i})=>{var s
if(o){let o
n={parseOptions:{},updateSelection:!0,applyInputRules:!1,applyPasteRules:!1,...n}
try{o=te(t,i.schema,{parseOptions:{preserveWhitespace:"full",...n.parseOptions},errorOnInvalidContent:null!==(s=n.errorOnInvalidContent)&&void 0!==s?s:i.options.enableContentCheck})}catch(e){return i.emit("contentError",{editor:i,error:e,disableCollaboration:()=>{console.error("[tiptap error]: Unable to disable collaboration at this point in time")}}),!1}let a,{from:c,to:l}="number"==typeof e?{from:e,to:e}:{from:e.from,to:e.to},u=!0,d=!0
if(("type"in o?[o]:o).forEach((e=>{e.check(),u=!!u&&e.isText&&0===e.marks.length,d=!!d&&e.isBlock})),c===l&&d){const{parent:e}=r.doc.resolve(c)
e.isTextblock&&!e.type.spec.code&&!e.childCount&&(c-=1,l+=1)}u?(a=Array.isArray(t)?t.map((e=>e.text||"")).join(""):"object"==typeof t&&t&&t.text?t.text:t,r.insertText(a,c,l)):(a=o,r.replaceWith(c,l,a)),n.updateSelection&&ne(r,r.steps.length-1,-1),n.applyInputRules&&r.setMeta("applyInputRules",{from:c,text:a}),n.applyPasteRules&&r.setMeta("applyPasteRules",{from:c,text:a})}return!0},joinBackward:()=>({state:e,dispatch:t})=>c.joinBackward(e,t),joinDown:()=>({state:e,dispatch:t})=>c.joinDown(e,t),joinForward:()=>({state:e,dispatch:t})=>c.joinForward(e,t),joinItemBackward:()=>({state:e,dispatch:t,tr:n})=>{try{const r=a.joinPoint(e.doc,e.selection.$from.pos,-1)
return null!=r&&(n.join(r,2),t&&t(n),!0)}catch(e){return!1}},joinItemForward:()=>({state:e,dispatch:t,tr:n})=>{try{const r=a.joinPoint(e.doc,e.selection.$from.pos,1)
return null!=r&&(n.join(r,2),t&&t(n),!0)}catch(e){return!1}},joinTextblockBackward:()=>({state:e,dispatch:t})=>c.joinTextblockBackward(e,t),joinTextblockForward:()=>({state:e,dispatch:t})=>c.joinTextblockForward(e,t),joinUp:()=>({state:e,dispatch:t})=>c.joinUp(e,t),keyboardShortcut:e=>({editor:t,view:n,tr:r,dispatch:o})=>{const i=function(e){const t=e.split(/-(?!$)/)
let n,r,o,i,s=t[t.length-1]
"Space"===s&&(s=" ")
for(let a=0;a<t.length-1;a+=1){const e=t[a]
if(/^(cmd|meta|m)$/i.test(e))i=!0
else if(/^a(lt)?$/i.test(e))n=!0
else if(/^(c|ctrl|control)$/i.test(e))r=!0
else if(/^s(hift)?$/i.test(e))o=!0
else{if(!/^mod$/i.test(e))throw new Error(`Unrecognized modifier name: ${e}`)
Q()||re()?i=!0:r=!0}}return n&&(s=`Alt-${s}`),r&&(s=`Ctrl-${s}`),i&&(s=`Meta-${s}`),o&&(s=`Shift-${s}`),s}(e).split(/-(?!$)/),s=i.find((e=>!["Alt","Ctrl","Meta","Shift"].includes(e))),a=new KeyboardEvent("keydown",{key:"Space"===s?" ":s,altKey:i.includes("Alt"),ctrlKey:i.includes("Ctrl"),metaKey:i.includes("Meta"),shiftKey:i.includes("Shift"),bubbles:!0,cancelable:!0}),c=t.captureTransaction((()=>{n.someProp("handleKeyDown",(e=>e(n,a)))}))
return null==c||c.steps.forEach((e=>{const t=e.map(r.mapping)
t&&o&&r.maybeStep(t)})),!0},lift:(e,t={})=>({state:n,dispatch:r})=>!!oe(n,v(e,n.schema),t)&&c.lift(n,r),liftEmptyBlock:()=>({state:e,dispatch:t})=>c.liftEmptyBlock(e,t),liftListItem:e=>({state:t,dispatch:n})=>{const r=v(e,t.schema)
return l.liftListItem(r)(t,n)},newlineInCode:()=>({state:e,dispatch:t})=>c.newlineInCode(e,t),resetAttributes:(e,t)=>({tr:n,state:r,dispatch:o})=>{let i=null,s=null
const a=ie("string"==typeof e?e:e.name,r.schema)
return!!a&&("node"===a&&(i=v(e,r.schema)),"mark"===a&&(s=U(e,r.schema)),o&&n.selection.ranges.forEach((e=>{r.doc.nodesBetween(e.$from.pos,e.$to.pos,((e,r)=>{i&&i===e.type&&n.setNodeMarkup(r,void 0,se(e.attrs,t)),s&&e.marks.length&&e.marks.forEach((o=>{s===o.type&&n.addMark(r,r+e.nodeSize,s.create(se(o.attrs,t)))}))}))})),!0)},scrollIntoView:()=>({tr:e,dispatch:t})=>(t&&e.scrollIntoView(),!0),selectAll:()=>({tr:e,commands:t})=>t.setTextSelection({from:0,to:e.doc.content.size}),selectNodeBackward:()=>({state:e,dispatch:t})=>c.selectNodeBackward(e,t),selectNodeForward:()=>({state:e,dispatch:t})=>c.selectNodeForward(e,t),selectParentNode:()=>({state:e,dispatch:t})=>c.selectParentNode(e,t),selectTextblockEnd:()=>({state:e,dispatch:t})=>c.selectTextblockEnd(e,t),selectTextblockStart:()=>({state:e,dispatch:t})=>c.selectTextblockStart(e,t),setContent:(e,t=!1,n={},r={})=>({editor:o,tr:i,dispatch:s,commands:a})=>{var c,l
const{doc:u}=i
if("full"!==n.preserveWhitespace){const a=ae(e,o.schema,n,{errorOnInvalidContent:null!==(c=r.errorOnInvalidContent)&&void 0!==c?c:o.options.enableContentCheck})
return s&&i.replaceWith(0,u.content.size,a).setMeta("preventUpdate",!t),!0}return s&&i.setMeta("preventUpdate",!t),a.insertContentAt({from:0,to:u.content.size},e,{parseOptions:n,errorOnInvalidContent:null!==(l=r.errorOnInvalidContent)&&void 0!==l?l:o.options.enableContentCheck})},setMark:(e,t={})=>({tr:n,state:r,dispatch:o})=>{const{selection:i}=n,{empty:s,ranges:a}=i,c=U(e,r.schema)
if(o)if(s){const e=ce(r,c)
n.addStoredMark(c.create({...e,...t}))}else a.forEach((e=>{const o=e.$from.pos,i=e.$to.pos
r.doc.nodesBetween(o,i,((e,r)=>{const s=Math.max(r,o),a=Math.min(r+e.nodeSize,i)
e.marks.find((e=>e.type===c))?e.marks.forEach((e=>{c===e.type&&n.addMark(s,a,c.create({...e.attrs,...t}))})):n.addMark(s,a,c.create(t))}))}))
return function(e,t,n){var r
const{selection:o}=t
let i=null
if(G(o)&&(i=o.$cursor),i){const t=null!==(r=e.storedMarks)&&void 0!==r?r:i.marks()
return!!n.isInSet(t)||!t.some((e=>e.type.excludes(n)))}const{ranges:s}=o
return s.some((({$from:t,$to:r})=>{let o=0===t.depth&&e.doc.inlineContent&&e.doc.type.allowsMarkType(n)
return e.doc.nodesBetween(t.pos,r.pos,((e,t,r)=>{if(o)return!1
if(e.isInline){const t=!r||r.type.allowsMarkType(n),i=!!n.isInSet(e.marks)||!e.marks.some((e=>e.type.excludes(n)))
o=t&&i}return!o})),o}))}(r,n,c)},setMeta:(e,t)=>({tr:n})=>(n.setMeta(e,t),!0),setNode:(e,t={})=>({state:n,dispatch:r,chain:o})=>{const i=v(e,n.schema)
return i.isTextblock?o().command((({commands:e})=>!!c.setBlockType(i,t)(n)||e.clearNodes())).command((({state:e})=>c.setBlockType(i,t)(e,r))).run():(console.warn('[tiptap warn]: Currently "setNode()" only supports text block nodes.'),!1)},setNodeSelection:e=>({tr:t,dispatch:n})=>{if(n){const{doc:n}=t,o=X(e,0,n.content.size),i=r.NodeSelection.create(n,o)
t.setSelection(i)}return!0},setTextSelection:e=>({tr:t,dispatch:n})=>{if(n){const{doc:n}=t,{from:o,to:i}="number"==typeof e?{from:e,to:e}:e,s=r.TextSelection.atStart(n).from,a=r.TextSelection.atEnd(n).to,c=X(o,s,a),l=X(i,s,a),u=r.TextSelection.create(n,c,l)
t.setSelection(u)}return!0},sinkListItem:e=>({state:t,dispatch:n})=>{const r=v(e,t.schema)
return l.sinkListItem(r)(t,n)},splitBlock:({keepMarks:e=!0}={})=>({tr:t,state:n,dispatch:o,editor:i})=>{const{selection:s,doc:c}=t,{$from:l,$to:u}=s,d=ke(i.extensionManager.attributes,l.node().type.name,l.node().attrs)
if(s instanceof r.NodeSelection&&s.node.isBlock)return!(!l.parentOffset||!a.canSplit(c,l.pos)||(o&&(e&&Oe(n,i.extensionManager.splittableMarks),t.split(l.pos).scrollIntoView()),0))
if(!l.parent.isBlock)return!1
const f=u.parentOffset===u.parent.content.size,h=0===l.depth?void 0:le(l.node(-1).contentMatchAt(l.indexAfter(-1)))
let p=f&&h?[{type:h,attrs:d}]:void 0,m=a.canSplit(t.doc,t.mapping.map(l.pos),1,p)
if(p||m||!a.canSplit(t.doc,t.mapping.map(l.pos),1,h?[{type:h}]:void 0)||(m=!0,p=h?[{type:h,attrs:d}]:void 0),o){if(m&&(s instanceof r.TextSelection&&t.deleteSelection(),t.split(t.mapping.map(l.pos),1,p),h&&!f&&!l.parentOffset&&l.parent.type!==h)){const e=t.mapping.map(l.before()),n=t.doc.resolve(e)
l.node(-1).canReplaceWith(n.index(),n.index()+1,h)&&t.setNodeMarkup(t.mapping.map(l.before()),h)}e&&Oe(n,i.extensionManager.splittableMarks),t.scrollIntoView()}return m},splitListItem:(e,t={})=>({tr:n,state:o,dispatch:i,editor:c})=>{var l
const u=v(e,o.schema),{$from:d,$to:f}=o.selection,h=o.selection.node
if(h&&h.isBlock||d.depth<2||!d.sameParent(f))return!1
const p=d.node(-1)
if(p.type!==u)return!1
const m=c.extensionManager.attributes
if(0===d.parent.content.size&&d.node(-1).childCount===d.indexAfter(-1)){if(2===d.depth||d.node(-3).type!==u||d.index(-2)!==d.node(-2).childCount-1)return!1
if(i){let e=s.Fragment.empty
const o=d.index(-1)?1:d.index(-2)?2:3
for(let t=d.depth-o;t>=d.depth-3;t-=1)e=s.Fragment.from(d.node(t).copy(e))
const i=d.indexAfter(-1)<d.node(-2).childCount?1:d.indexAfter(-2)<d.node(-3).childCount?2:3,a={...ke(m,d.node().type.name,d.node().attrs),...t},c=(null===(l=u.contentMatch.defaultType)||void 0===l?void 0:l.createAndFill(a))||void 0
e=e.append(s.Fragment.from(u.createAndFill(null,c)||void 0))
const f=d.before(d.depth-(o-1))
n.replace(f,d.after(-i),new s.Slice(e,4-o,0))
let h=-1
n.doc.nodesBetween(f,n.doc.content.size,((e,t)=>{if(h>-1)return!1
e.isTextblock&&0===e.content.size&&(h=t+1)})),h>-1&&n.setSelection(r.TextSelection.near(n.doc.resolve(h))),n.scrollIntoView()}return!0}const y=f.pos===d.end()?p.contentMatchAt(0).defaultType:null,g={...ke(m,p.type.name,p.attrs),...t},k={...ke(m,d.node().type.name,d.node().attrs),...t}
n.delete(d.pos,f.pos)
const b=y?[{type:u,attrs:g},{type:y,attrs:k}]:[{type:u,attrs:g}]
if(!a.canSplit(n.doc,d.pos,2))return!1
if(i){const{selection:e,storedMarks:t}=o,{splittableMarks:r}=c.extensionManager,s=t||e.$to.parentOffset&&e.$from.marks()
if(n.split(d.pos,2,b).scrollIntoView(),!s||!i)return!0
const a=s.filter((e=>r.includes(e.type.name)))
n.ensureMarks(a)}return!0},toggleList:(e,t,n,r={})=>({editor:o,tr:i,state:s,dispatch:a,chain:c,commands:l,can:u})=>{const{extensions:d,splittableMarks:f}=o.extensionManager,h=v(e,s.schema),p=v(t,s.schema),{selection:m,storedMarks:y}=s,{$from:g,$to:k}=m,b=g.blockRange(k),w=y||m.$to.parentOffset&&m.$from.marks()
if(!b)return!1
const S=de((e=>Se(e.type.name,d)))(m)
if(b.depth>=1&&S&&b.depth-S.depth<=1){if(S.node.type===h)return l.liftListItem(p)
if(Se(S.node.type.name,d)&&h.validContent(S.node.content)&&a)return c().command((()=>(i.setNodeMarkup(S.pos,h),!0))).command((()=>Me(i,h))).command((()=>Ce(i,h))).run()}return n&&w&&a?c().command((()=>{const e=u().wrapInList(h,r),t=w.filter((e=>f.includes(e.type.name)))
return i.ensureMarks(t),!!e||l.clearNodes()})).wrapInList(h,r).command((()=>Me(i,h))).command((()=>Ce(i,h))).run():c().command((()=>!!u().wrapInList(h,r)||l.clearNodes())).wrapInList(h,r).command((()=>Me(i,h))).command((()=>Ce(i,h))).run()},toggleMark:(e,t={},n={})=>({state:r,commands:o})=>{const{extendEmptyMarkRange:i=!1}=n,s=U(e,r.schema)
return be(r,s,t)?o.unsetMark(s,{extendEmptyMarkRange:i}):o.setMark(s,t)},toggleNode:(e,t,n={})=>({state:r,commands:o})=>{const i=v(e,r.schema),s=v(t,r.schema)
return oe(r,i,n)?o.setNode(s):o.setNode(i,n)},toggleWrap:(e,t={})=>({state:n,commands:r})=>{const o=v(e,n.schema)
return oe(n,o,t)?r.lift(o):r.wrapIn(o,t)},undoInputRule:()=>({state:e,dispatch:t})=>{const n=e.plugins
for(let r=0;r<n.length;r+=1){const o=n[r]
let i
if(o.spec.isInputRules&&(i=o.getState(e))){if(t){const t=e.tr,n=i.transform
for(let e=n.steps.length-1;e>=0;e-=1)t.step(n.steps[e].invert(n.docs[e]))
if(i.text){const n=t.doc.resolve(i.from).marks()
t.replaceWith(i.from,i.to,e.schema.text(i.text,n))}else t.delete(i.from,i.to)}return!0}}return!1},unsetAllMarks:()=>({tr:e,dispatch:t})=>{const{selection:n}=e,{empty:r,ranges:o}=n
return r||t&&o.forEach((t=>{e.removeMark(t.$from.pos,t.$to.pos)})),!0},unsetMark:(e,t={})=>({tr:n,state:r,dispatch:o})=>{var i
const{extendEmptyMarkRange:s=!1}=t,{selection:a}=n,c=U(e,r.schema),{$from:l,empty:u,ranges:d}=a
if(!o)return!0
if(u&&s){let{from:e,to:t}=a
const r=null===(i=l.marks().find((e=>e.type===c)))||void 0===i?void 0:i.attrs,o=H(l,c,r)
o&&(e=o.from,t=o.to),n.removeMark(e,t,c)}else d.forEach((e=>{n.removeMark(e.$from.pos,e.$to.pos,c)}))
return n.removeStoredMark(c),!0},updateAttributes:(e,t={})=>({tr:n,state:r,dispatch:o})=>{let i=null,s=null
const a=ie("string"==typeof e?e:e.name,r.schema)
return!!a&&("node"===a&&(i=v(e,r.schema)),"mark"===a&&(s=U(e,r.schema)),o&&n.selection.ranges.forEach((e=>{const o=e.$from.pos,a=e.$to.pos
r.doc.nodesBetween(o,a,((e,r)=>{i&&i===e.type&&n.setNodeMarkup(r,void 0,{...e.attrs,...t}),s&&e.marks.length&&e.marks.forEach((i=>{if(s===i.type){const c=Math.max(r,o),l=Math.min(r+e.nodeSize,a)
n.addMark(c,l,s.create({...i.attrs,...t}))}}))}))})),!0)},wrapIn:(e,t={})=>({state:n,dispatch:r})=>{const o=v(e,n.schema)
return c.wrapIn(o,t)(n,r)},wrapInList:(e,t={})=>({state:n,dispatch:r})=>{const o=v(e,n.schema)
return l.wrapInList(o,t)(n,r)}})
const Ne=V.create({name:"commands",addCommands:()=>({...Te})}),Ee=V.create({name:"editable",addProseMirrorPlugins(){return[new r.Plugin({key:new r.PluginKey("editable"),props:{editable:()=>this.editor.options.editable}})]}}),De=V.create({name:"focusEvents",addProseMirrorPlugins(){const{editor:e}=this
return[new r.Plugin({key:new r.PluginKey("focusEvents"),props:{handleDOMEvents:{focus:(t,n)=>{e.isFocused=!0
const r=e.state.tr.setMeta("focus",{event:n}).setMeta("addToHistory",!1)
return t.dispatch(r),!1},blur:(t,n)=>{e.isFocused=!1
const r=e.state.tr.setMeta("blur",{event:n}).setMeta("addToHistory",!1)
return t.dispatch(r),!1}}}})]}}),Ae=V.create({name:"keymap",addKeyboardShortcuts(){const e=()=>this.editor.commands.first((({commands:e})=>[()=>e.undoInputRule(),()=>e.command((({tr:t})=>{const{selection:n,doc:o}=t,{empty:i,$anchor:s}=n,{pos:a,parent:c}=s,l=s.parent.isTextblock&&a>0?t.doc.resolve(a-1):s,u=l.parent.type.spec.isolating,d=s.pos-s.parentOffset,f=u&&1===l.parent.childCount?d===s.pos:r.Selection.atStart(o).from===a
return!(!i||!c.type.isTextblock||c.textContent.length||!f||f&&"paragraph"===s.parent.type.name)&&e.clearNodes()})),()=>e.deleteSelection(),()=>e.joinBackward(),()=>e.selectNodeBackward()])),t=()=>this.editor.commands.first((({commands:e})=>[()=>e.deleteSelection(),()=>e.deleteCurrentNode(),()=>e.joinForward(),()=>e.selectNodeForward()])),n={Enter:()=>this.editor.commands.first((({commands:e})=>[()=>e.newlineInCode(),()=>e.createParagraphNear(),()=>e.liftEmptyBlock(),()=>e.splitBlock()])),"Mod-Enter":()=>this.editor.commands.exitCode(),Backspace:e,"Mod-Backspace":e,"Shift-Backspace":e,Delete:t,"Mod-Delete":t,"Mod-a":()=>this.editor.commands.selectAll()},o={...n},i={...n,"Ctrl-h":e,"Alt-Backspace":e,"Ctrl-d":t,"Ctrl-Alt-Backspace":t,"Alt-Delete":t,"Alt-d":t,"Ctrl-a":()=>this.editor.commands.selectTextblockStart(),"Ctrl-e":()=>this.editor.commands.selectTextblockEnd()}
return Q()||re()?i:o},addProseMirrorPlugins(){return[new r.Plugin({key:new r.PluginKey("clearDocument"),appendTransaction:(e,t,n)=>{if(!e.some((e=>e.docChanged))||t.doc.eq(n.doc))return
const{empty:o,from:i,to:s}=t.selection,a=r.Selection.atStart(t.doc).from,c=r.Selection.atEnd(t.doc).to
if(o||i!==a||s!==c)return
if(0!==n.doc.textBetween(0,n.doc.content.size," "," ").length)return
const l=n.tr,f=u({state:n,transaction:l}),{commands:h}=new d({editor:this.editor,state:f})
return h.clearNodes(),l.steps.length?l:void 0}})]}}),Pe=V.create({name:"tabindex",addProseMirrorPlugins(){return[new r.Plugin({key:new r.PluginKey("tabindex"),props:{attributes:()=>this.editor.isEditable?{tabindex:"0"}:{}}})]}})
var Re=Object.freeze({__proto__:null,ClipboardTextSerializer:J,Commands:Ne,Editable:Ee,FocusEvents:De,Keymap:Ae,Tabindex:Pe})
class Ie{get name(){return this.node.type.name}constructor(e,t,n=!1,r=null){this.currentNode=null,this.actualDepth=null,this.isBlock=n,this.resolvedPos=e,this.editor=t,this.currentNode=r}get node(){return this.currentNode||this.resolvedPos.node()}get element(){return this.editor.view.domAtPos(this.pos).node}get depth(){var e
return null!==(e=this.actualDepth)&&void 0!==e?e:this.resolvedPos.depth}get pos(){return this.resolvedPos.pos}get content(){return this.node.content}set content(e){let t=this.from,n=this.to
if(this.isBlock){if(0===this.content.size)return void console.error(`You can’t set content on a block node. Tried to set content on ${this.name} at ${this.pos}`)
t=this.from+1,n=this.to-1}this.editor.commands.insertContentAt({from:t,to:n},e)}get attributes(){return this.node.attrs}get textContent(){return this.node.textContent}get size(){return this.node.nodeSize}get from(){return this.isBlock?this.pos:this.resolvedPos.start(this.resolvedPos.depth)}get range(){return{from:this.from,to:this.to}}get to(){return this.isBlock?this.pos+this.size:this.resolvedPos.end(this.resolvedPos.depth)+(this.node.isText?0:1)}get parent(){if(0===this.depth)return null
const e=this.resolvedPos.start(this.resolvedPos.depth-1),t=this.resolvedPos.doc.resolve(e)
return new Ie(t,this.editor)}get before(){let e=this.resolvedPos.doc.resolve(this.from-(this.isBlock?1:2))
return e.depth!==this.depth&&(e=this.resolvedPos.doc.resolve(this.from-3)),new Ie(e,this.editor)}get after(){let e=this.resolvedPos.doc.resolve(this.to+(this.isBlock?2:1))
return e.depth!==this.depth&&(e=this.resolvedPos.doc.resolve(this.to+3)),new Ie(e,this.editor)}get children(){const e=[]
return this.node.content.forEach(((t,n)=>{const r=t.isBlock&&!t.isTextblock,o=this.pos+n+1,i=this.resolvedPos.doc.resolve(o)
if(!r&&i.depth<=this.depth)return
const s=new Ie(i,this.editor,r,r?t:null)
r&&(s.actualDepth=this.depth+1),e.push(new Ie(i,this.editor,r,r?t:null))})),e}get firstChild(){return this.children[0]||null}get lastChild(){const e=this.children
return e[e.length-1]||null}closest(e,t={}){let n=null,r=this.parent
for(;r&&!n;){if(r.node.type.name===e)if(Object.keys(t).length>0){const e=r.node.attrs,n=Object.keys(t)
for(let r=0;r<n.length;r+=1){const o=n[r]
if(e[o]!==t[o])break}}else n=r
r=r.parent}return n}querySelector(e,t={}){return this.querySelectorAll(e,t,!0)[0]||null}querySelectorAll(e,t={},n=!1){let r=[]
if(!this.children||0===this.children.length)return r
const o=Object.keys(t)
return this.children.forEach((i=>{n&&r.length>0||(i.node.type.name===e&&o.every((e=>t[e]===i.node.attrs[e]))&&r.push(i),n&&r.length>0||(r=r.concat(i.querySelectorAll(e,t,n))))})),r}setAttribute(e){const t=this.editor.state.selection
this.editor.chain().setTextSelection(this.from).updateAttributes(this.node.type.name,e).setTextSelection(t.from).run()}}function je(e,t,n){const r=document.querySelector(`style[data-tiptap-style${n?`-${n}`:""}]`)
if(null!==r)return r
const o=document.createElement("style")
return t&&o.setAttribute("nonce",t),o.setAttribute("data-tiptap-style"+(n?`-${n}`:""),""),o.innerHTML=e,document.getElementsByTagName("head")[0].appendChild(o),o}class ze{constructor(e={}){this.type="mark",this.name="mark",this.parent=null,this.child=null,this.config={name:this.name,defaultOptions:{}},this.config={...this.config,...e},this.name=this.config.name,e.defaultOptions&&Object.keys(e.defaultOptions).length>0&&console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`),this.options=this.config.defaultOptions,this.config.addOptions&&(this.options=b(h(this,"addOptions",{name:this.name}))),this.storage=b(h(this,"addStorage",{name:this.name,options:this.options}))||{}}static create(e={}){return new ze(e)}configure(e={}){const t=this.extend({...this.config,addOptions:()=>$(this.options,e)})
return t.name=this.name,t.parent=this.parent,t}extend(e={}){const t=new ze(e)
return t.parent=this,this.child=t,t.name=e.name?e.name:t.parent.name,e.defaultOptions&&Object.keys(e.defaultOptions).length>0&&console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`),t.options=b(h(t,"addOptions",{name:t.name})),t.storage=b(h(t,"addStorage",{name:t.name,options:t.options})),t}static handleExit({editor:e,mark:t}){const{tr:n}=e.state,r=e.state.selection.$from
if(r.pos===r.end()){const o=r.marks()
if(!o.find((e=>(null==e?void 0:e.type.name)===t.name)))return!1
const i=o.find((e=>(null==e?void 0:e.type.name)===t.name))
return i&&n.removeStoredMark(i),n.insertText(" ",r.pos),e.view.dispatch(n),!0}return!1}}class Be{constructor(e={}){this.type="node",this.name="node",this.parent=null,this.child=null,this.config={name:this.name,defaultOptions:{}},this.config={...this.config,...e},this.name=this.config.name,e.defaultOptions&&Object.keys(e.defaultOptions).length>0&&console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${this.name}".`),this.options=this.config.defaultOptions,this.config.addOptions&&(this.options=b(h(this,"addOptions",{name:this.name}))),this.storage=b(h(this,"addStorage",{name:this.name,options:this.options}))||{}}static create(e={}){return new Be(e)}configure(e={}){const t=this.extend({...this.config,addOptions:()=>$(this.options,e)})
return t.name=this.name,t.parent=this.parent,t}extend(e={}){const t=new Be(e)
return t.parent=this,this.child=t,t.name=e.name?e.name:t.parent.name,e.defaultOptions&&Object.keys(e.defaultOptions).length>0&&console.warn(`[tiptap warn]: BREAKING CHANGE: "defaultOptions" is deprecated. Please use "addOptions" instead. Found in extension: "${t.name}".`),t.options=b(h(t,"addOptions",{name:t.name})),t.storage=b(h(t,"addStorage",{name:t.name,options:t.options})),t}}t.CommandManager=d,t.Editor=class extends f{constructor(e={}){super(),this.isFocused=!1,this.isInitialized=!1,this.extensionStorage={},this.options={element:document.createElement("div"),content:"",injectCSS:!0,injectNonce:void 0,extensions:[],autofocus:!1,editable:!0,editorProps:{},parseOptions:{},coreExtensionOptions:{},enableInputRules:!0,enablePasteRules:!0,enableCoreExtensions:!0,enableContentCheck:!1,onBeforeCreate:()=>null,onCreate:()=>null,onUpdate:()=>null,onSelectionUpdate:()=>null,onTransaction:()=>null,onFocus:()=>null,onBlur:()=>null,onDestroy:()=>null,onContentError:({error:e})=>{throw e}},this.isCapturingTransaction=!1,this.capturedTransaction=null,this.setOptions(e),this.createExtensionManager(),this.createCommandManager(),this.createSchema(),this.on("beforeCreate",this.options.onBeforeCreate),this.emit("beforeCreate",{editor:this}),this.on("contentError",this.options.onContentError),this.createView(),this.injectCSS(),this.on("create",this.options.onCreate),this.on("update",this.options.onUpdate),this.on("selectionUpdate",this.options.onSelectionUpdate),this.on("transaction",this.options.onTransaction),this.on("focus",this.options.onFocus),this.on("blur",this.options.onBlur),this.on("destroy",this.options.onDestroy),window.setTimeout((()=>{this.isDestroyed||(this.commands.focus(this.options.autofocus),this.emit("create",{editor:this}),this.isInitialized=!0)}),0)}get storage(){return this.extensionStorage}get commands(){return this.commandManager.commands}chain(){return this.commandManager.chain()}can(){return this.commandManager.can()}injectCSS(){this.options.injectCSS&&document&&(this.css=je('.ProseMirror {\n  position: relative;\n}\n\n.ProseMirror {\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  white-space: break-spaces;\n  -webkit-font-variant-ligatures: none;\n  font-variant-ligatures: none;\n  font-feature-settings: "liga" 0; /* the above doesn\'t seem to work in Edge */\n}\n\n.ProseMirror [contenteditable="false"] {\n  white-space: normal;\n}\n\n.ProseMirror [contenteditable="false"] [contenteditable="true"] {\n  white-space: pre-wrap;\n}\n\n.ProseMirror pre {\n  white-space: pre-wrap;\n}\n\nimg.ProseMirror-separator {\n  display: inline !important;\n  border: none !important;\n  margin: 0 !important;\n  width: 0 !important;\n  height: 0 !important;\n}\n\n.ProseMirror-gapcursor {\n  display: none;\n  pointer-events: none;\n  position: absolute;\n  margin: 0;\n}\n\n.ProseMirror-gapcursor:after {\n  content: "";\n  display: block;\n  position: absolute;\n  top: -2px;\n  width: 20px;\n  border-top: 1px solid black;\n  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;\n}\n\n@keyframes ProseMirror-cursor-blink {\n  to {\n    visibility: hidden;\n  }\n}\n\n.ProseMirror-hideselection *::selection {\n  background: transparent;\n}\n\n.ProseMirror-hideselection *::-moz-selection {\n  background: transparent;\n}\n\n.ProseMirror-hideselection * {\n  caret-color: transparent;\n}\n\n.ProseMirror-focused .ProseMirror-gapcursor {\n  display: block;\n}\n\n.tippy-box[data-animation=fade][data-state=hidden] {\n  opacity: 0\n}',this.options.injectNonce))}setOptions(e={}){this.options={...this.options,...e},this.view&&this.state&&!this.isDestroyed&&(this.options.editorProps&&this.view.setProps(this.options.editorProps),this.view.updateState(this.state))}setEditable(e,t=!0){this.setOptions({editable:e}),t&&this.emit("update",{editor:this,transaction:this.state.tr})}get isEditable(){return this.options.editable&&this.view&&this.view.editable}get state(){return this.view.state}registerPlugin(e,t){const n=k(t)?t(e,[...this.state.plugins]):[...this.state.plugins,e],r=this.state.reconfigure({plugins:n})
this.view.updateState(r)}unregisterPlugin(e){if(this.isDestroyed)return
const t="string"==typeof e?`${e}$`:e.key,n=this.state.reconfigure({plugins:this.state.plugins.filter((e=>!e.key.startsWith(t)))})
this.view.updateState(n)}createExtensionManager(){var e,t
const n=[...this.options.enableCoreExtensions?[Ee,J.configure({blockSeparator:null===(t=null===(e=this.options.coreExtensionOptions)||void 0===e?void 0:e.clipboardTextSerializer)||void 0===t?void 0:t.blockSeparator}),Ne,De,Ae,Pe]:[],...this.options.extensions].filter((e=>["extension","node","mark"].includes(null==e?void 0:e.type)))
this.extensionManager=new B(n,this)}createCommandManager(){this.commandManager=new d({editor:this})}createSchema(){this.schema=this.extensionManager.schema}createView(){let e
try{e=ae(this.options.content,this.schema,this.options.parseOptions,{errorOnInvalidContent:this.options.enableContentCheck})}catch(t){if(!(t instanceof Error&&["[tiptap error]: Invalid JSON content","[tiptap error]: Invalid HTML content"].includes(t.message)))throw t
this.emit("contentError",{editor:this,error:t,disableCollaboration:()=>{this.options.extensions=this.options.extensions.filter((e=>"collaboration"!==e.name)),this.createExtensionManager()}}),e=ae(this.options.content,this.schema,this.options.parseOptions,{errorOnInvalidContent:!1})}const t=Y(e,this.options.autofocus)
this.view=new o.EditorView(this.options.element,{...this.options.editorProps,dispatchTransaction:this.dispatchTransaction.bind(this),state:r.EditorState.create({doc:e,selection:t||void 0})})
const n=this.state.reconfigure({plugins:this.extensionManager.plugins})
this.view.updateState(n),this.createNodeViews(),this.prependClass(),this.view.dom.editor=this}createNodeViews(){this.view.isDestroyed||this.view.setProps({nodeViews:this.extensionManager.nodeViews})}prependClass(){this.view.dom.className=`tiptap ${this.view.dom.className}`}captureTransaction(e){this.isCapturingTransaction=!0,e(),this.isCapturingTransaction=!1
const t=this.capturedTransaction
return this.capturedTransaction=null,t}dispatchTransaction(e){if(this.view.isDestroyed)return
if(this.isCapturingTransaction)return this.capturedTransaction?void e.steps.forEach((e=>{var t
return null===(t=this.capturedTransaction)||void 0===t?void 0:t.step(e)})):void(this.capturedTransaction=e)
const t=this.state.apply(e),n=!this.state.selection.eq(t.selection)
this.emit("beforeTransaction",{editor:this,transaction:e,nextState:t}),this.view.updateState(t),this.emit("transaction",{editor:this,transaction:e}),n&&this.emit("selectionUpdate",{editor:this,transaction:e})
const r=e.getMeta("focus"),o=e.getMeta("blur")
r&&this.emit("focus",{editor:this,event:r.event,transaction:e}),o&&this.emit("blur",{editor:this,event:o.event,transaction:e}),e.docChanged&&!e.getMeta("preventUpdate")&&this.emit("update",{editor:this,transaction:e})}getAttributes(e){return ve(this.state,e)}isActive(e,t){const n="string"==typeof e?e:null,r="string"==typeof e?t:e
return we(this.state,n,r)}getJSON(){return this.state.doc.toJSON()}getHTML(){return fe(this.state.doc.content,this.schema)}getText(e){const{blockSeparator:t="\n\n",textSerializers:n={}}=e||{}
return pe(this.state.doc,{blockSeparator:t,textSerializers:{...L(this.schema),...n}})}get isEmpty(){return xe(this.state.doc)}getCharacterCount(){return console.warn('[tiptap warn]: "editor.getCharacterCount()" is deprecated. Please use "editor.storage.characterCount.characters()" instead.'),this.state.doc.content.size-2}destroy(){this.emit("destroy"),this.view&&this.view.destroy(),this.removeAllListeners()}get isDestroyed(){var e
return!(null===(e=this.view)||void 0===e?void 0:e.docView)}$node(e,t){var n
return(null===(n=this.$doc)||void 0===n?void 0:n.querySelector(e,t))||null}$nodes(e,t){var n
return(null===(n=this.$doc)||void 0===n?void 0:n.querySelectorAll(e,t))||null}$pos(e){const t=this.state.doc.resolve(e)
return new Ie(t,this)}get $doc(){return this.$pos(0)}},t.Extension=V,t.InputRule=D,t.Mark=ze,t.Node=Be,t.NodePos=Ie,t.NodeView=class{constructor(e,t,n){this.isDragging=!1,this.component=e,this.editor=t.editor,this.options={stopEvent:null,ignoreMutation:null,...n},this.extension=t.extension,this.node=t.node,this.decorations=t.decorations,this.getPos=t.getPos,this.mount()}mount(){}get dom(){return this.editor.view.dom}get contentDOM(){return null}onDragStart(e){var t,n,o,i,s,a,c
const{view:l}=this.editor,u=e.target,d=3===u.nodeType?null===(t=u.parentElement)||void 0===t?void 0:t.closest("[data-drag-handle]"):u.closest("[data-drag-handle]")
if(!this.dom||(null===(n=this.contentDOM)||void 0===n?void 0:n.contains(u))||!d)return
let f=0,h=0
if(this.dom!==d){const t=this.dom.getBoundingClientRect(),n=d.getBoundingClientRect(),r=null!==(o=e.offsetX)&&void 0!==o?o:null===(i=e.nativeEvent)||void 0===i?void 0:i.offsetX,c=null!==(s=e.offsetY)&&void 0!==s?s:null===(a=e.nativeEvent)||void 0===a?void 0:a.offsetY
f=n.x-t.x+r,h=n.y-t.y+c}null===(c=e.dataTransfer)||void 0===c||c.setDragImage(this.dom,f,h)
const p=r.NodeSelection.create(l.state.doc,this.getPos()),m=l.state.tr.setSelection(p)
l.dispatch(m)}stopEvent(e){var t
if(!this.dom)return!1
if("function"==typeof this.options.stopEvent)return this.options.stopEvent({event:e})
const n=e.target
if(!this.dom.contains(n)||(null===(t=this.contentDOM)||void 0===t?void 0:t.contains(n)))return!1
const o=e.type.startsWith("drag"),i="drop"===e.type
if((["INPUT","BUTTON","SELECT","TEXTAREA"].includes(n.tagName)||n.isContentEditable)&&!i&&!o)return!0
const{isEditable:s}=this.editor,{isDragging:a}=this,c=!!this.node.type.spec.draggable,l=r.NodeSelection.isSelectable(this.node),u="copy"===e.type,d="paste"===e.type,f="cut"===e.type,h="mousedown"===e.type
if(!c&&l&&o&&e.preventDefault(),c&&o&&!a)return e.preventDefault(),!1
if(c&&s&&!a&&h){const e=n.closest("[data-drag-handle]")
e&&(this.dom===e||this.dom.contains(e))&&(this.isDragging=!0,document.addEventListener("dragend",(()=>{this.isDragging=!1}),{once:!0}),document.addEventListener("drop",(()=>{this.isDragging=!1}),{once:!0}),document.addEventListener("mouseup",(()=>{this.isDragging=!1}),{once:!0}))}return!(a||i||u||d||f||h&&l)}ignoreMutation(e){return!this.dom||!this.contentDOM||("function"==typeof this.options.ignoreMutation?this.options.ignoreMutation({mutation:e}):!(!this.node.isLeaf&&!this.node.isAtom&&("selection"===e.type||this.dom.contains(e.target)&&"childList"===e.type&&(Q()||"Android"===navigator.platform||/android/i.test(navigator.userAgent))&&this.editor.isFocused&&[...Array.from(e.addedNodes),...Array.from(e.removedNodes)].every((e=>e.isContentEditable))||(this.contentDOM!==e.target||"attributes"!==e.type)&&this.contentDOM.contains(e.target))))}updateAttributes(e){this.editor.commands.command((({tr:t})=>{const n=this.getPos()
return t.setNodeMarkup(n,void 0,{...this.node.attrs,...e}),!0}))}deleteNode(){const e=this.getPos(),t=e+this.node.nodeSize
this.editor.commands.deleteRange({from:e,to:t})}},t.PasteRule=I,t.Tracker=class{constructor(e){this.transaction=e,this.currentStep=this.transaction.steps.length}map(e){let t=!1
return{position:this.transaction.steps.slice(this.currentStep).reduce(((e,n)=>{const r=n.getMap().mapResult(e)
return r.deleted&&(t=!0),r.pos}),e),deleted:t}}},t.callOrReturn=b,t.combineTransactionSteps=function(e,t){const n=new a.Transform(e)
return t.forEach((e=>{e.steps.forEach((e=>{n.step(e)}))})),n},t.createChainableState=u,t.createDocument=ae,t.createNodeFromContent=te,t.createStyleTag=je,t.defaultBlockAt=le,t.deleteProps=se,t.elementFromString=ee,t.escapeForRegEx=function(e){return e.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&")},t.extensions=Re,t.findChildren=function(e,t){const n=[]
return e.descendants(((e,r)=>{t(e)&&n.push({node:e,pos:r})})),n},t.findChildrenInRange=function(e,t,n){const r=[]
return e.nodesBetween(t.from,t.to,((e,t)=>{n(e)&&r.push({node:e,pos:t})})),r},t.findDuplicates=z,t.findParentNode=de,t.findParentNodeClosestToPos=ue,t.fromString=S,t.generateHTML=function(e,t){const n=he(t)
return fe(s.Node.fromJSON(n,e).content,n)},t.generateJSON=function(e,t){const n=he(t),r=ee(e)
return s.DOMParser.fromSchema(n).parse(r).toJSON()},t.generateText=function(e,t,n){const{blockSeparator:r="\n\n",textSerializers:o={}}=n||{},i=he(t)
return pe(s.Node.fromJSON(i,e),{blockSeparator:r,textSerializers:{...L(i),...o}})},t.getAttributes=ve,t.getAttributesFromExtensions=m,t.getChangedRanges=function(e){const{mapping:t,steps:n}=e,r=[]
return t.maps.forEach(((e,o)=>{const i=[]
if(e.ranges.length)e.forEach(((e,t)=>{i.push({from:e,to:t})}))
else{const{from:e,to:t}=n[o]
if(void 0===e||void 0===t)return
i.push({from:e,to:t})}i.forEach((({from:e,to:n})=>{const i=t.slice(o).map(e,-1),s=t.slice(o).map(n),a=t.invert().map(i,-1),c=t.invert().map(s)
r.push({oldRange:{from:a,to:c},newRange:{from:i,to:s}})}))})),function(e){const t=ye(e)
return 1===t.length?t:t.filter(((e,n)=>!t.filter(((e,t)=>t!==n)).some((t=>e.oldRange.from>=t.oldRange.from&&e.oldRange.to<=t.oldRange.to&&e.newRange.from>=t.newRange.from&&e.newRange.to<=t.newRange.to))))}(r)},t.getDebugJSON=function e(t,n=0){const r=t.type===t.type.schema.topNodeType?0:1,o=n,i=o+t.nodeSize,s=t.marks.map((e=>{const t={type:e.type.name}
return Object.keys(e.attrs).length&&(t.attrs={...e.attrs}),t})),a={...t.attrs},c={type:t.type.name,from:o,to:i}
return Object.keys(a).length&&(c.attrs=a),s.length&&(c.marks=s),t.content.childCount&&(c.content=[],t.forEach(((t,o)=>{var i
null===(i=c.content)||void 0===i||i.push(e(t,n+o+r))}))),t.text&&(c.text=t.text),c},t.getExtensionField=h,t.getHTMLFromFragment=fe,t.getMarkAttributes=ce,t.getMarkRange=H,t.getMarkType=U,t.getMarksBetween=ge,t.getNodeAtPosition=(e,t,n,r=20)=>{const o=e.doc.resolve(n)
let i=r,s=null
for(;i>0&&null===s;){const e=o.node(i);(null==e?void 0:e.type.name)===t?s=e:i-=1}return[s,i]},t.getNodeAttributes=me,t.getNodeType=v,t.getRenderedAttributes=g,t.getSchema=he,t.getSchemaByResolvedExtensions=M,t.getSchemaTypeByName=C,t.getSchemaTypeNameByName=ie,t.getSplittedAttributes=ke,t.getText=pe,t.getTextBetween=_,t.getTextContentFromNodes=N,t.getTextSerializersFromSchema=L,t.injectExtensionAttributesToParseRule=x,t.inputRulesPlugin=P,t.isActive=we,t.isAtEndOfNode=(e,t)=>{const{$from:n,$to:r,$anchor:o}=e.selection
if(t){const n=de((e=>e.type.name===t))(e.selection)
if(!n)return!1
const r=e.doc.resolve(n.pos+1)
return o.pos+1===r.end()}return!(r.parentOffset<r.parent.nodeSize-2||n.pos!==r.pos)},t.isAtStartOfNode=e=>{const{$from:t,$to:n}=e.selection
return!(t.parentOffset>0||t.pos!==n.pos)},t.isEmptyObject=w,t.isExtensionRulesEnabled=T,t.isFunction=k,t.isList=Se,t.isMacOS=re,t.isMarkActive=be,t.isNodeActive=oe,t.isNodeEmpty=xe,t.isNodeSelection=function(e){return e instanceof r.NodeSelection},t.isNumber=R,t.isPlainObject=F,t.isRegExp=E,t.isString=function(e){return"string"==typeof e},t.isTextSelection=G,t.isiOS=Q,t.markInputRule=function(e){return new D({find:e.find,handler:({state:t,range:n,match:r})=>{const o=b(e.getAttributes,void 0,r)
if(!1===o||null===o)return null
const{tr:i}=t,s=r[r.length-1],a=r[0]
if(s){const r=a.search(/\S/),c=n.from+a.indexOf(s),l=c+s.length
if(ge(n.from,n.to,t.doc).filter((t=>t.mark.type.excluded.find((n=>n===e.type&&n!==t.mark.type)))).filter((e=>e.to>c)).length)return null
l<n.to&&i.delete(l,n.to),c>n.from&&i.delete(n.from+r,c)
const u=n.from+r+s.length
i.addMark(n.from+r,u,e.type.create(o||{})),i.removeStoredMark(e.type)}}})},t.markPasteRule=function(e){return new I({find:e.find,handler:({state:t,range:n,match:r,pasteEvent:o})=>{const i=b(e.getAttributes,void 0,r,o)
if(!1===i||null===i)return null
const{tr:s}=t,a=r[r.length-1],c=r[0]
let l=n.to
if(a){const r=c.search(/\S/),o=n.from+c.indexOf(a),u=o+a.length
if(ge(n.from,n.to,t.doc).filter((t=>t.mark.type.excluded.find((n=>n===e.type&&n!==t.mark.type)))).filter((e=>e.to>o)).length)return null
u<n.to&&s.delete(u,n.to),o>n.from&&s.delete(n.from+r,o),l=n.from+r+a.length,s.addMark(n.from+r,l,e.type.create(i||{})),s.removeStoredMark(e.type)}}})},t.mergeAttributes=y,t.mergeDeep=$,t.minMax=X,t.nodeInputRule=function(e){return new D({find:e.find,handler:({state:t,range:n,match:r})=>{const o=b(e.getAttributes,void 0,r)||{},{tr:i}=t,s=n.from
let a=n.to
const c=e.type.create(o)
if(r[1]){let e=s+r[0].lastIndexOf(r[1])
e>a?e=a:a=e+r[1].length
const t=r[0][r[0].length-1]
i.insertText(t,s+r[0].length-1),i.replaceWith(e,a,c)}else if(r[0]){const t=e.type.isInline?s:s-1
i.insert(t,e.type.create(o)).delete(i.mapping.map(s),i.mapping.map(a))}i.scrollIntoView()}})},t.nodePasteRule=function(e){return new I({find:e.find,handler({match:t,chain:n,range:r,pasteEvent:o}){const i=b(e.getAttributes,void 0,t,o),s=b(e.getContent,void 0,i)
if(!1===i||null===i)return null
const a={type:e.type.name,attrs:i}
s&&(a.content=s),t.input&&n().deleteRange(r).insertContentAt(r.from,a)}})},t.objectIncludes=W,t.pasteRulesPlugin=j,t.posToDOMRect=function(e,t,n){const r=e.state.doc.content.size,o=X(t,0,r),i=X(n,0,r),s=e.coordsAtPos(o),a=e.coordsAtPos(i,-1),c=Math.min(s.top,a.top),l=Math.max(s.bottom,a.bottom),u=Math.min(s.left,a.left),d=Math.max(s.right,a.right),f={top:c,bottom:l,left:u,right:d,width:d-u,height:l-c,x:u,y:c}
return{...f,toJSON:()=>f}},t.removeDuplicates=ye,t.resolveFocusPosition=Y,t.selectionToInsertionEnd=ne,t.splitExtensions=p,t.textInputRule=function(e){return new D({find:e.find,handler:({state:t,range:n,match:r})=>{let o=e.replace,i=n.from
const s=n.to
if(r[1]){const e=r[0].lastIndexOf(r[1])
o+=r[0].slice(e+r[1].length),i+=e
const t=i-s
t>0&&(o=r[0].slice(e-t,e)+o,i=s)}t.tr.insertText(o,i,s)}})},t.textPasteRule=function(e){return new I({find:e.find,handler:({state:t,range:n,match:r})=>{let o=e.replace,i=n.from
const s=n.to
if(r[1]){const e=r[0].lastIndexOf(r[1])
o+=r[0].slice(e+r[1].length),i+=e
const t=i-s
t>0&&(o=r[0].slice(e-t,e)+o,i=s)}t.tr.insertText(o,i,s)}})},t.textblockTypeInputRule=function(e){return new D({find:e.find,handler:({state:t,range:n,match:r})=>{const o=t.doc.resolve(n.from),i=b(e.getAttributes,void 0,r)||{}
if(!o.node(-1).canReplaceWith(o.index(-1),o.indexAfter(-1),e.type))return null
t.tr.delete(n.from,n.to).setBlockType(n.from,n.from,e.type,i)}})},t.wrappingInputRule=function(e){return new D({find:e.find,handler:({state:t,range:n,match:r,chain:o})=>{const i=b(e.getAttributes,void 0,r)||{},s=t.tr.delete(n.from,n.to),c=s.doc.resolve(n.from).blockRange(),l=c&&a.findWrapping(c,e.type,i)
if(!l)return null
if(s.wrap(c,l),e.keepMarks&&e.editor){const{selection:n,storedMarks:r}=t,{splittableMarks:o}=e.editor.extensionManager,i=r||n.$to.parentOffset&&n.$from.marks()
if(i){const e=i.filter((e=>o.includes(e.type.name)))
s.ensureMarks(e)}}if(e.keepAttributes){const t="bulletList"===e.type.name||"orderedList"===e.type.name?"listItem":"taskList"
o().updateAttributes(t,i).run()}const u=s.doc.resolve(n.from-1).nodeBefore
u&&u.type===e.type&&a.canJoin(s.doc,n.from-1)&&(!e.joinPredicate||e.joinPredicate(r,u))&&s.join(n.from-1)}})}},392:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0})
var r,o=n(454)
r=o,Object.keys(r).filter((e=>"default"!==e&&"__esModule"!==e)).forEach((e=>{t.hasOwnProperty(e)||Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:()=>r[e]})}))},400:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0})
var r=n(248),o=n(938)
const i=r.Extension.create({name:"dropCursor",addOptions:()=>({color:"currentColor",width:1,class:void 0}),addProseMirrorPlugins(){return[o.dropCursor(this.options)]}})
t.Dropcursor=i,t.default=i},415:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0})
var r=n(248),o=n(769)
const i=r.Extension.create({name:"gapCursor",addProseMirrorPlugins:()=>[o.gapCursor()],extendNodeSchema(e){var t
const n={name:e.name,options:e.options,storage:e.storage}
return{allowGapCursor:null!==(t=r.callOrReturn(r.getExtensionField(e,"allowGapCursor",n)))&&void 0!==t?t:null}}})
t.Gapcursor=i,t.default=i},430:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0})
const r=n(248).Node.create({name:"doc",topNode:!0,content:"block+"})
t.Document=r,t.default=r},449:(e,t,n)=>{var r=n(553),o=n(712),i=n(820),s=function(e,t){return!e.selection.empty&&(t&&t(e.tr.deleteSelection().scrollIntoView()),!0)}
function a(e,t){var n=e.selection.$cursor
return!n||(t?!t.endOfTextblock("backward",e):n.parentOffset>0)?null:n}var c=function(e,t,n){var s=a(e,n)
if(!s)return!1
var c=f(s)
if(!c){var l=s.blockRange(),d=l&&r.liftTarget(l)
return null!=d&&(t&&t(e.tr.lift(l,d).scrollIntoView()),!0)}var h=c.nodeBefore
if(M(e,c,t,-1))return!0
if(0==s.parent.content.size&&(u(h,"end")||i.NodeSelection.isSelectable(h)))for(var p=s.depth;;p--){var m=r.replaceStep(e.doc,s.before(p),s.after(p),o.Slice.empty)
if(m&&m.slice.size<m.to-m.from){if(t){var v=e.tr.step(m)
v.setSelection(u(h,"end")?i.Selection.findFrom(v.doc.resolve(v.mapping.map(c.pos,-1)),-1):i.NodeSelection.create(v.doc,c.pos-h.nodeSize)),t(v.scrollIntoView())}return!0}if(1==p||s.node(p-1).childCount>1)break}return!(!h.isAtom||c.depth!=s.depth-1||(t&&t(e.tr.delete(c.pos-h.nodeSize,c.pos).scrollIntoView()),0))}
function l(e,t,n){for(var s=t.nodeBefore,a=t.pos-1;!s.isTextblock;a--){if(s.type.spec.isolating)return!1
var c=s.lastChild
if(!c)return!1
s=c}for(var l=t.nodeAfter,u=t.pos+1;!l.isTextblock;u++){if(l.type.spec.isolating)return!1
var d=l.firstChild
if(!d)return!1
l=d}var f=r.replaceStep(e.doc,a,u,o.Slice.empty)
if(!f||f.from!=a||f instanceof r.ReplaceStep&&f.slice.size>=u-a)return!1
if(n){var h=e.tr.step(f)
h.setSelection(i.TextSelection.create(h.doc,a)),n(h.scrollIntoView())}return!0}function u(e,t){for(var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=e;r;r="start"==t?r.firstChild:r.lastChild){if(r.isTextblock)return!0
if(n&&1!=r.childCount)return!1}return!1}var d=function(e,t,n){var r=e.selection,o=r.$head,s=o
if(!r.empty)return!1
if(o.parent.isTextblock){if(n?!n.endOfTextblock("backward",e):o.parentOffset>0)return!1
s=f(o)}var a=s&&s.nodeBefore
return!(!a||!i.NodeSelection.isSelectable(a)||(t&&t(e.tr.setSelection(i.NodeSelection.create(e.doc,s.pos-a.nodeSize)).scrollIntoView()),0))}
function f(e){if(!e.parent.type.spec.isolating)for(var t=e.depth-1;t>=0;t--){if(e.index(t)>0)return e.doc.resolve(e.before(t+1))
if(e.node(t).type.spec.isolating)break}return null}function h(e,t){var n=e.selection.$cursor
return!n||(t?!t.endOfTextblock("forward",e):n.parentOffset<n.parent.content.size)?null:n}var p=function(e,t,n){var s=h(e,n)
if(!s)return!1
var a=v(s)
if(!a)return!1
var c=a.nodeAfter
if(M(e,a,t,1))return!0
if(0==s.parent.content.size&&(u(c,"start")||i.NodeSelection.isSelectable(c))){var l=r.replaceStep(e.doc,s.before(),s.after(),o.Slice.empty)
if(l&&l.slice.size<l.to-l.from){if(t){var d=e.tr.step(l)
d.setSelection(u(c,"start")?i.Selection.findFrom(d.doc.resolve(d.mapping.map(a.pos)),1):i.NodeSelection.create(d.doc,d.mapping.map(a.pos))),t(d.scrollIntoView())}return!0}}return!(!c.isAtom||a.depth!=s.depth-1||(t&&t(e.tr.delete(a.pos,a.pos+c.nodeSize).scrollIntoView()),0))},m=function(e,t,n){var r=e.selection,o=r.$head,s=o
if(!r.empty)return!1
if(o.parent.isTextblock){if(n?!n.endOfTextblock("forward",e):o.parentOffset<o.parent.content.size)return!1
s=v(o)}var a=s&&s.nodeAfter
return!(!a||!i.NodeSelection.isSelectable(a)||(t&&t(e.tr.setSelection(i.NodeSelection.create(e.doc,s.pos)).scrollIntoView()),0))}
function v(e){if(!e.parent.type.spec.isolating)for(var t=e.depth-1;t>=0;t--){var n=e.node(t)
if(e.index(t)+1<n.childCount)return e.doc.resolve(e.after(t+1))
if(n.type.spec.isolating)break}return null}var y=function(e,t){var n=e.selection,r=n.$head,o=n.$anchor
return!(!r.parent.type.spec.code||!r.sameParent(o)||(t&&t(e.tr.insertText("\n").scrollIntoView()),0))}
function g(e){for(var t=0;t<e.edgeCount;t++){var n=e.edge(t).type
if(n.isTextblock&&!n.hasRequiredAttrs())return n}return null}var k=function(e,t){var n=e.selection,r=n.$head,o=n.$anchor
if(!r.parent.type.spec.code||!r.sameParent(o))return!1
var s=r.node(-1),a=r.indexAfter(-1),c=g(s.contentMatchAt(a))
if(!c||!s.canReplaceWith(a,a,c))return!1
if(t){var l=r.after(),u=e.tr.replaceWith(l,l,c.createAndFill())
u.setSelection(i.Selection.near(u.doc.resolve(l),1)),t(u.scrollIntoView())}return!0},b=function(e,t){var n=e.selection,r=n.$from,o=n.$to
if(n instanceof i.AllSelection||r.parent.inlineContent||o.parent.inlineContent)return!1
var s=g(o.parent.contentMatchAt(o.indexAfter()))
if(!s||!s.isTextblock)return!1
if(t){var a=(!r.parentOffset&&o.index()<o.parent.childCount?r:o).pos,c=e.tr.insert(a,s.createAndFill())
c.setSelection(i.TextSelection.create(c.doc,a+1)),t(c.scrollIntoView())}return!0},w=function(e,t){var n=e.selection.$cursor
if(!n||n.parent.content.size)return!1
if(n.depth>1&&n.after()!=n.end(-1)){var o=n.before()
if(r.canSplit(e.doc,o))return t&&t(e.tr.split(o).scrollIntoView()),!0}var i=n.blockRange(),s=i&&r.liftTarget(i)
return null!=s&&(t&&t(e.tr.lift(i,s).scrollIntoView()),!0)}
function S(e){return function(t,n){var o=t.selection,s=o.$from,a=o.$to
if(t.selection instanceof i.NodeSelection&&t.selection.node.isBlock)return!(!s.parentOffset||!r.canSplit(t.doc,s.pos)||(n&&n(t.tr.split(s.pos).scrollIntoView()),0))
if(!s.parent.isBlock)return!1
if(n){var c=a.parentOffset==a.parent.content.size,l=t.tr;(t.selection instanceof i.TextSelection||t.selection instanceof i.AllSelection)&&l.deleteSelection()
var u=0==s.depth?null:g(s.node(-1).contentMatchAt(s.indexAfter(-1))),d=e&&e(a.parent,c,s),f=d?[d]:c&&u?[{type:u}]:void 0,h=r.canSplit(l.doc,l.mapping.map(s.pos),1,f)
if(f||h||!r.canSplit(l.doc,l.mapping.map(s.pos),1,u?[{type:u}]:void 0)||(u&&(f=[{type:u}]),h=!0),h&&(l.split(l.mapping.map(s.pos),1,f),!c&&!s.parentOffset&&s.parent.type!=u)){var p=l.mapping.map(s.before()),m=l.doc.resolve(p)
u&&s.node(-1).canReplaceWith(m.index(),m.index()+1,u)&&l.setNodeMarkup(l.mapping.map(s.before()),u)}n(l.scrollIntoView())}return!0}}var x=S(),O=function(e,t){return t&&t(e.tr.setSelection(new i.AllSelection(e.doc))),!0}
function M(e,t,n,s){var a,c,l=t.nodeBefore,d=t.nodeAfter,f=l.type.spec.isolating||d.type.spec.isolating
if(!f&&function(e,t,n){var o=t.nodeBefore,i=t.nodeAfter,s=t.index()
return!(!(o&&i&&o.type.compatibleContent(i.type))||(!o.content.size&&t.parent.canReplace(s-1,s)?(n&&n(e.tr.delete(t.pos-o.nodeSize,t.pos).scrollIntoView()),0):!t.parent.canReplace(s,s+1)||!i.isTextblock&&!r.canJoin(e.doc,t.pos)||(n&&n(e.tr.clearIncompatible(t.pos,o.type,o.contentMatchAt(o.childCount)).join(t.pos).scrollIntoView()),0)))}(e,t,n))return!0
var h=!f&&t.parent.canReplace(t.index(),t.index()+1)
if(h&&(a=(c=l.contentMatchAt(l.childCount)).findWrapping(d.type))&&c.matchType(a[0]||d.type).validEnd){if(n){for(var p=t.pos+d.nodeSize,m=o.Fragment.empty,v=a.length-1;v>=0;v--)m=o.Fragment.from(a[v].create(null,m))
m=o.Fragment.from(l.copy(m))
var y=e.tr.step(new r.ReplaceAroundStep(t.pos-1,p,t.pos,p,new o.Slice(m,1,0),a.length,!0)),g=p+2*a.length
r.canJoin(y.doc,g)&&y.join(g),n(y.scrollIntoView())}return!0}var k=d.type.spec.isolating||s>0&&f?null:i.Selection.findFrom(t,1),b=k&&k.$from.blockRange(k.$to),w=b&&r.liftTarget(b)
if(null!=w&&w>=t.depth)return n&&n(e.tr.lift(b,w).scrollIntoView()),!0
if(h&&u(d,"start",!0)&&u(l,"end")){for(var S=l,x=[];x.push(S),!S.isTextblock;)S=S.lastChild
for(var O=d,M=1;!O.isTextblock;O=O.firstChild)M++
if(S.canReplace(S.childCount,S.childCount,O.content)){if(n){for(var C=o.Fragment.empty,T=x.length-1;T>=0;T--)C=o.Fragment.from(x[T].copy(C))
n(e.tr.step(new r.ReplaceAroundStep(t.pos-x.length,t.pos+d.nodeSize,t.pos+M,t.pos+d.nodeSize-M,new o.Slice(C,x.length,0),0,!0)).scrollIntoView())}return!0}}return!1}function C(e){return function(t,n){for(var r=t.selection,o=e<0?r.$from:r.$to,s=o.depth;o.node(s).isInline;){if(!s)return!1
s--}return!!o.node(s).isTextblock&&(n&&n(t.tr.setSelection(i.TextSelection.create(t.doc,e<0?o.start(s):o.end(s)))),!0)}}var T=C(-1),N=C(1)
function E(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n]
return function(e,n,r){for(var o=0;o<t.length;o++)if(t[o](e,n,r))return!0
return!1}}var D=E(s,c,d),A=E(s,p,m),P={Enter:E(y,b,w,x),"Mod-Enter":k,Backspace:D,"Mod-Backspace":D,"Shift-Backspace":D,Delete:A,"Mod-Delete":A,"Mod-a":O},R={"Ctrl-h":P.Backspace,"Alt-Backspace":P["Mod-Backspace"],"Ctrl-d":P.Delete,"Ctrl-Alt-Backspace":P["Mod-Delete"],"Alt-Delete":P["Mod-Delete"],"Alt-d":P["Mod-Delete"],"Ctrl-a":T,"Ctrl-e":N}
for(var I in P)R[I]=P[I]
var j=("undefined"!=typeof navigator?/Mac|iP(hone|[oa]d)/.test(navigator.platform):"undefined"!=typeof os&&os.platform&&"darwin"==os.platform())?R:P
t.autoJoin=function(e,t){var n=Array.isArray(t)?function(e){return t.indexOf(e.type.name)>-1}:t
return function(t,o,i){return e(t,o&&function(e,t){return function(n){if(!n.isGeneric)return e(n)
for(var o=[],i=0;i<n.mapping.maps.length;i++){for(var s=n.mapping.maps[i],a=0;a<o.length;a++)o[a]=s.map(o[a])
s.forEach((function(e,t,n,r){return o.push(n,r)}))}for(var c=[],l=0;l<o.length;l+=2)for(var u=o[l],d=o[l+1],f=n.doc.resolve(u),h=f.sharedDepth(d),p=f.node(h),m=f.indexAfter(h),v=f.after(h+1);v<=d;++m){var y=p.maybeChild(m)
if(!y)break
if(m&&-1==c.indexOf(v)){var g=p.child(m-1)
g.type==y.type&&t(g,y)&&c.push(v)}v+=y.nodeSize}c.sort((function(e,t){return e-t}))
for(var k=c.length-1;k>=0;k--)r.canJoin(n.doc,c[k])&&n.join(c[k])
e(n)}}(o,n),i)}},t.baseKeymap=j,t.chainCommands=E,t.createParagraphNear=b,t.deleteSelection=s,t.exitCode=k,t.joinBackward=c,t.joinDown=function(e,t){var n,o=e.selection
if(o instanceof i.NodeSelection){if(o.node.isTextblock||!r.canJoin(e.doc,o.to))return!1
n=o.to}else if(null==(n=r.joinPoint(e.doc,o.to,1)))return!1
return t&&t(e.tr.join(n).scrollIntoView()),!0},t.joinForward=p,t.joinTextblockBackward=function(e,t,n){var r=a(e,n)
if(!r)return!1
var o=f(r)
return!!o&&l(e,o,t)},t.joinTextblockForward=function(e,t,n){var r=h(e,n)
if(!r)return!1
var o=v(r)
return!!o&&l(e,o,t)},t.joinUp=function(e,t){var n,o=e.selection,s=o instanceof i.NodeSelection
if(s){if(o.node.isTextblock||!r.canJoin(e.doc,o.from))return!1
n=o.from}else if(null==(n=r.joinPoint(e.doc,o.from,-1)))return!1
if(t){var a=e.tr.join(n)
s&&a.setSelection(i.NodeSelection.create(a.doc,n-e.doc.resolve(n).nodeBefore.nodeSize)),t(a.scrollIntoView())}return!0},t.lift=function(e,t){var n=e.selection,o=n.$from,i=n.$to,s=o.blockRange(i),a=s&&r.liftTarget(s)
return null!=a&&(t&&t(e.tr.lift(s,a).scrollIntoView()),!0)},t.liftEmptyBlock=w,t.macBaseKeymap=R,t.newlineInCode=y,t.pcBaseKeymap=P,t.selectAll=O,t.selectNodeBackward=d,t.selectNodeForward=m,t.selectParentNode=function(e,t){var n,r=e.selection,o=r.$from,s=r.to,a=o.sharedDepth(s)
return 0!=a&&(n=o.before(a),t&&t(e.tr.setSelection(i.NodeSelection.create(e.doc,n))),!0)},t.selectTextblockEnd=N,t.selectTextblockStart=T,t.setBlockType=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null
return function(n,r){for(var o=!1,i=0;i<n.selection.ranges.length&&!o;i++){var s=n.selection.ranges[i],a=s.$from.pos,c=s.$to.pos
n.doc.nodesBetween(a,c,(function(r,i){if(o)return!1
if(r.isTextblock&&!r.hasMarkup(e,t))if(r.type==e)o=!0
else{var s=n.doc.resolve(i),a=s.index()
o=s.parent.canReplaceWith(a,a+1,e)}}))}if(!o)return!1
if(r){for(var l=n.tr,u=0;u<n.selection.ranges.length;u++){var d=n.selection.ranges[u],f=d.$from.pos,h=d.$to.pos
l.setBlockType(f,h,e,t)}r(l.scrollIntoView())}return!0}},t.splitBlock=x,t.splitBlockAs=S,t.splitBlockKeepMarks=function(e,t){return x(e,t&&function(n){var r=e.storedMarks||e.selection.$to.parentOffset&&e.selection.$from.marks()
r&&n.ensureMarks(r),t(n)})},t.toggleMark=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2?arguments[2]:void 0,r=!1!==(n&&n.removeWhenPresent),o=!1!==(n&&n.enterInlineAtoms)
return function(n,s){var a=n.selection,c=a.empty,l=a.$cursor,u=a.ranges
if(c&&!l||!function(e,t,n,r){for(var o,i=function(){var o=t[s],i=o.$from,a=o.$to,c=0==i.depth&&e.inlineContent&&e.type.allowsMarkType(n)
if(e.nodesBetween(i.pos,a.pos,(function(e,t){if(c||!r&&e.isAtom&&e.isInline&&t>=i.pos&&t+e.nodeSize<=a.pos)return!1
c=e.inlineContent&&e.type.allowsMarkType(n)})),c)return{v:!0}},s=0;s<t.length;s++)if(o=i())return o.v
return!1}(n.doc,u,e,o))return!1
if(s)if(l)e.isInSet(n.storedMarks||l.marks())?s(n.tr.removeStoredMark(e)):s(n.tr.addStoredMark(e.create(t)))
else{var d,f=n.tr
o||(u=function(e){for(var t=[],n=function(){var n=e[r],o=n.$from,s=n.$to
o.doc.nodesBetween(o.pos,s.pos,(function(e,n){if(e.isAtom&&e.content.size&&e.isInline&&n>=o.pos&&n+e.nodeSize<=s.pos)return n+1>o.pos&&t.push(new i.SelectionRange(o,o.doc.resolve(n+1))),o=o.doc.resolve(n+1+e.content.size),!1})),o.pos<s.pos&&t.push(new i.SelectionRange(o,s))},r=0;r<e.length;r++)n()
return t}(u)),d=r?!u.some((function(t){return n.doc.rangeHasMark(t.$from.pos,t.$to.pos,e)})):!u.every((function(t){var n=!1
return f.doc.nodesBetween(t.$from.pos,t.$to.pos,(function(r,o,i){if(n)return!1
n=!e.isInSet(r.marks)&&!!i&&i.type.allowsMarkType(e)&&!(r.isText&&/^\s*$/.test(r.textBetween(Math.max(0,t.$from.pos-o),Math.min(r.nodeSize,t.$to.pos-o))))})),!n}))
for(var h=0;h<u.length;h++){var p=u[h],m=p.$from,v=p.$to
if(d){var y=m.pos,g=v.pos,k=m.nodeAfter,b=v.nodeBefore,w=k&&k.isText?/^\s*/.exec(k.text)[0].length:0,S=b&&b.isText?/\s*$/.exec(b.text)[0].length:0
y+w<g&&(y+=w,g-=S),f.addMark(y,g,e.create(t))}else f.removeMark(m.pos,v.pos,e)}s(f.scrollIntoView())}return!0}},t.wrapIn=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null
return function(n,o){var i=n.selection,s=i.$from,a=i.$to,c=s.blockRange(a),l=c&&r.findWrapping(c,e,t)
return!!l&&(o&&o(n.tr.wrap(c,l).scrollIntoView()),!0)}}},454:(e,t,n)=>{function r(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]
if(!n){if(Array.isArray(e)||(n=o(e))||t&&e&&"number"==typeof e.length){n&&(e=n)
var r=0,i=function(){}
return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,c=!1
return{s:function(){n=n.call(e)},n:function(){var e=n.next()
return a=e.done,e},e:function(e){c=!0,s=e},f:function(){try{a||null==n.return||n.return()}finally{if(c)throw s}}}}function o(e,t){if(e){if("string"==typeof e)return i(e,t)
var n=Object.prototype.toString.call(e).slice(8,-1)
return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(e,t):void 0}}function i(e,t){(null==t||t>e.length)&&(t=e.length)
for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n]
return r}function s(){return s="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=d(e)););return e}(e,t)
if(r){var o=Object.getOwnPropertyDescriptor(r,t)
return o.get?o.get.call(arguments.length<3?e:n):o.value}},s.apply(this,arguments)}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&c(e,t)}function c(e,t){return c=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},c(e,t)}function l(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}()
return function(){var n,r=d(e)
if(t){var o=d(this).constructor
n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments)
return function(e,t){if(t&&("object"===f(t)||"function"==typeof t))return t
if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined")
return u(e)}(this,n)}}function u(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function d(e){return d=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},d(e)}function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function h(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(o=function(e){if("object"!==f(e)||null===e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var n=t.call(e,"string")
if("object"!==f(n))return n
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===f(o)?o:String(o)),r)}var o}function m(e,t,n){return t&&p(e.prototype,t),n&&p(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}var v=n(820),y=n(712),g=n(553),k=function(e){for(var t=0;;t++)if(!(e=e.previousSibling))return t},b=function(e){var t=e.assignedSlot||e.parentNode
return t&&11==t.nodeType?t.host:t},w=null,S=function(e,t,n){var r=w||(w=document.createRange())
return r.setEnd(e,null==n?e.nodeValue.length:n),r.setStart(e,t||0),r},x=function(e,t,n,r){return n&&(M(e,t,n,r,-1)||M(e,t,n,r,1))},O=/^(img|br|input|textarea|hr)$/i
function M(e,t,n,r,o){for(;;){if(e==n&&t==r)return!0
if(t==(o<0?0:C(e))){var i=e.parentNode
if(!i||1!=i.nodeType||T(e)||O.test(e.nodeName)||"false"==e.contentEditable)return!1
t=k(e)+(o<0?0:1),e=i}else{if(1!=e.nodeType)return!1
if("false"==(e=e.childNodes[t+(o<0?-1:0)]).contentEditable)return!1
t=o<0?C(e):0}}}function C(e){return 3==e.nodeType?e.nodeValue.length:e.childNodes.length}function T(e){for(var t,n=e;n&&!(t=n.pmViewDesc);n=n.parentNode);return t&&t.node&&t.node.isBlock&&(t.dom==e||t.contentDOM==e)}var N=function(e){return e.focusNode&&x(e.focusNode,e.focusOffset,e.anchorNode,e.anchorOffset)}
function E(e,t){var n=document.createEvent("Event")
return n.initEvent("keydown",!0,!0),n.keyCode=e,n.key=n.code=t,n}var D="undefined"!=typeof navigator?navigator:null,A="undefined"!=typeof document?document:null,P=D&&D.userAgent||"",R=/Edge\/(\d+)/.exec(P),I=/MSIE \d/.exec(P),j=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(P),z=!!(I||j||R),B=I?document.documentMode:j?+j[1]:R?+R[1]:0,F=!z&&/gecko\/(\d+)/i.test(P)
F&&(/Firefox\/(\d+)/.exec(P)||[0,0])[1]
var $=!z&&/Chrome\/(\d+)/.exec(P),V=!!$,_=$?+$[1]:0,L=!z&&!!D&&/Apple Computer/.test(D.vendor),J=L&&(/Mobile\/\w+/.test(P)||!!D&&D.maxTouchPoints>2),W=J||!!D&&/Mac/.test(D.platform),q=!!D&&/Win/.test(D.platform),K=/Android \d/.test(P),H=!!A&&"webkitFontSmoothing"in A.documentElement.style,U=H?+(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent)||[0,0])[1]:0
function G(e){var t=e.defaultView&&e.defaultView.visualViewport
return t?{left:0,right:t.width,top:0,bottom:t.height}:{left:0,right:e.documentElement.clientWidth,top:0,bottom:e.documentElement.clientHeight}}function X(e,t){return"number"==typeof e?e:e[t]}function Y(e){var t=e.getBoundingClientRect(),n=t.width/e.offsetWidth||1,r=t.height/e.offsetHeight||1
return{left:t.left,right:t.left+e.clientWidth*n,top:t.top,bottom:t.top+e.clientHeight*r}}function Q(e,t,n){for(var r=e.someProp("scrollThreshold")||0,o=e.someProp("scrollMargin")||5,i=e.dom.ownerDocument,s=n||e.dom;s;s=b(s))if(1==s.nodeType){var a=s,c=a==i.body,l=c?G(i):Y(a),u=0,d=0
if(t.top<l.top+X(r,"top")?d=-(l.top-t.top+X(o,"top")):t.bottom>l.bottom-X(r,"bottom")&&(d=t.bottom-t.top>l.bottom-l.top?t.top+X(o,"top")-l.top:t.bottom-l.bottom+X(o,"bottom")),t.left<l.left+X(r,"left")?u=-(l.left-t.left+X(o,"left")):t.right>l.right-X(r,"right")&&(u=t.right-l.right+X(o,"right")),u||d)if(c)i.defaultView.scrollBy(u,d)
else{var f=a.scrollLeft,h=a.scrollTop
d&&(a.scrollTop+=d),u&&(a.scrollLeft+=u)
var p=a.scrollLeft-f,m=a.scrollTop-h
t={left:t.left-p,top:t.top-m,right:t.right-p,bottom:t.bottom-m}}if(c||/^(fixed|sticky)$/.test(getComputedStyle(s).position))break}}function Z(e){for(var t=[],n=e.ownerDocument,r=e;r&&(t.push({dom:r,top:r.scrollTop,left:r.scrollLeft}),e!=n);r=b(r));return t}function ee(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=r.dom,i=r.top,s=r.left
o.scrollTop!=i+t&&(o.scrollTop=i+t),o.scrollLeft!=s&&(o.scrollLeft=s)}}var te=null
function ne(e,t){for(var n,r,o,i,s=2e8,a=0,c=t.top,l=t.top,u=e.firstChild,d=0;u;u=u.nextSibling,d++){var f=void 0
if(1==u.nodeType)f=u.getClientRects()
else{if(3!=u.nodeType)continue
f=S(u).getClientRects()}for(var h=0;h<f.length;h++){var p=f[h]
if(p.top<=c&&p.bottom>=l){c=Math.max(p.bottom,c),l=Math.min(p.top,l)
var m=p.left>t.left?p.left-t.left:p.right<t.left?t.left-p.right:0
if(m<s){n=u,s=m,r=m&&3==n.nodeType?{left:p.right<t.left?p.right:p.left,top:t.top}:t,1==u.nodeType&&m&&(a=d+(t.left>=(p.left+p.right)/2?1:0))
continue}}else p.top>t.top&&!o&&p.left<=t.left&&p.right>=t.left&&(o=u,i={left:Math.max(p.left,Math.min(p.right,t.left)),top:p.top})
!n&&(t.left>=p.right&&t.top>=p.top||t.left>=p.left&&t.top>=p.bottom)&&(a=d+1)}}return!n&&o&&(n=o,r=i,s=0),n&&3==n.nodeType?function(e,t){for(var n=e.nodeValue.length,r=document.createRange(),o=0;o<n;o++){r.setEnd(e,o+1),r.setStart(e,o)
var i=ae(r,1)
if(i.top!=i.bottom&&re(t,i))return{node:e,offset:o+(t.left>=(i.left+i.right)/2?1:0)}}return{node:e,offset:0}}(n,r):!n||s&&1==n.nodeType?{node:e,offset:a}:ne(n,r)}function re(e,t){return e.left>=t.left-1&&e.left<=t.right+1&&e.top>=t.top-1&&e.top<=t.bottom+1}function oe(e,t,n){var r=e.childNodes.length
if(r&&n.top<n.bottom)for(var o=Math.max(0,Math.min(r-1,Math.floor(r*(t.top-n.top)/(n.bottom-n.top))-2)),i=o;;){var s=e.childNodes[i]
if(1==s.nodeType)for(var a=s.getClientRects(),c=0;c<a.length;c++){var l=a[c]
if(re(t,l))return oe(s,t,l)}if((i=(i+1)%r)==o)break}return e}function ie(e,t){var n,r=e.dom.ownerDocument,o=0,i=function(e,t,n){if(e.caretPositionFromPoint)try{var r=e.caretPositionFromPoint(t,n)
if(r)return{node:r.offsetNode,offset:r.offset}}catch(e){}if(e.caretRangeFromPoint){var o=e.caretRangeFromPoint(t,n)
if(o)return{node:o.startContainer,offset:o.startOffset}}}(r,t.left,t.top)
i&&(n=i.node,o=i.offset)
var s,a=(e.root.elementFromPoint?e.root:r).elementFromPoint(t.left,t.top)
if(!a||!e.dom.contains(1!=a.nodeType?a.parentNode:a)){var c=e.dom.getBoundingClientRect()
if(!re(t,c))return null
if(!(a=oe(e.dom,t,c)))return null}if(L)for(var l=a;n&&l;l=b(l))l.draggable&&(n=void 0)
if(a=function(e,t){var n=e.parentNode
return n&&/^li$/i.test(n.nodeName)&&t.left<e.getBoundingClientRect().left?n:e}(a,t),n){if(F&&1==n.nodeType&&(o=Math.min(o,n.childNodes.length))<n.childNodes.length){var u,d=n.childNodes[o]
"IMG"==d.nodeName&&(u=d.getBoundingClientRect()).right<=t.left&&u.bottom>t.top&&o++}var f
H&&o&&1==n.nodeType&&1==(f=n.childNodes[o-1]).nodeType&&"false"==f.contentEditable&&f.getBoundingClientRect().top>=t.top&&o--,n==e.dom&&o==n.childNodes.length-1&&1==n.lastChild.nodeType&&t.top>n.lastChild.getBoundingClientRect().bottom?s=e.state.doc.content.size:0!=o&&1==n.nodeType&&"BR"==n.childNodes[o-1].nodeName||(s=function(e,t,n,r){for(var o=-1,i=t,s=!1;i!=e.dom;){var a=e.docView.nearestDesc(i,!0)
if(!a)return null
if(1==a.dom.nodeType&&(a.node.isBlock&&a.parent||!a.contentDOM)){var c=a.dom.getBoundingClientRect()
if(a.node.isBlock&&a.parent&&(!s&&c.left>r.left||c.top>r.top?o=a.posBefore:(!s&&c.right<r.left||c.bottom<r.top)&&(o=a.posAfter),s=!0),!a.contentDOM&&o<0&&!a.node.isText)return(a.node.isBlock?r.top<(c.top+c.bottom)/2:r.left<(c.left+c.right)/2)?a.posBefore:a.posAfter}i=a.dom.parentNode}return o>-1?o:e.docView.posFromDOM(t,n,-1)}(e,n,o,t))}null==s&&(s=function(e,t,n){var r=ne(t,n),o=r.node,i=r.offset,s=-1
if(1==o.nodeType&&!o.firstChild){var a=o.getBoundingClientRect()
s=a.left!=a.right&&n.left>(a.left+a.right)/2?1:-1}return e.docView.posFromDOM(o,i,s)}(e,a,t))
var h=e.docView.nearestDesc(a,!0)
return{pos:s,inside:h?h.posAtStart-h.border:-1}}function se(e){return e.top<e.bottom||e.left<e.right}function ae(e,t){var n=e.getClientRects()
if(n.length){var r=n[t<0?0:n.length-1]
if(se(r))return r}return Array.prototype.find.call(n,se)||e.getBoundingClientRect()}var ce=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/
function le(e,t,n){var r=e.docView.domFromPos(t,n<0?-1:1),o=r.node,i=r.offset,s=r.atom,a=H||F
if(3==o.nodeType){if(!a||!ce.test(o.nodeValue)&&(n<0?i:i!=o.nodeValue.length)){var c=i,l=i,u=n<0?1:-1
return n<0&&!i?(l++,u=-1):n>=0&&i==o.nodeValue.length?(c--,u=1):n<0?c--:l++,ue(ae(S(o,c,l),u),u<0)}var d=ae(S(o,i,i),n)
if(F&&i&&/\s/.test(o.nodeValue[i-1])&&i<o.nodeValue.length){var f=ae(S(o,i-1,i-1),-1)
if(f.top==d.top){var h=ae(S(o,i,i+1),-1)
if(h.top!=d.top)return ue(h,h.left<f.left)}}return d}if(!e.state.doc.resolve(t-(s||0)).parent.inlineContent){if(null==s&&i&&(n<0||i==C(o))){var p=o.childNodes[i-1]
if(1==p.nodeType)return de(p.getBoundingClientRect(),!1)}if(null==s&&i<C(o)){var m=o.childNodes[i]
if(1==m.nodeType)return de(m.getBoundingClientRect(),!0)}return de(o.getBoundingClientRect(),n>=0)}if(null==s&&i&&(n<0||i==C(o))){var v=o.childNodes[i-1],y=3==v.nodeType?S(v,C(v)-(a?0:1)):1!=v.nodeType||"BR"==v.nodeName&&v.nextSibling?null:v
if(y)return ue(ae(y,1),!1)}if(null==s&&i<C(o)){for(var g=o.childNodes[i];g.pmViewDesc&&g.pmViewDesc.ignoreForCoords;)g=g.nextSibling
var k=g?3==g.nodeType?S(g,0,a?0:1):1==g.nodeType?g:null:null
if(k)return ue(ae(k,-1),!0)}return ue(ae(3==o.nodeType?S(o):o,-n),n>=0)}function ue(e,t){if(0==e.width)return e
var n=t?e.left:e.right
return{top:e.top,bottom:e.bottom,left:n,right:n}}function de(e,t){if(0==e.height)return e
var n=t?e.top:e.bottom
return{top:n,bottom:n,left:e.left,right:e.right}}function fe(e,t,n){var r=e.state,o=e.root.activeElement
r!=t&&e.updateState(t),o!=e.dom&&e.focus()
try{return n()}finally{r!=t&&e.updateState(r),o!=e.dom&&o&&o.focus()}}var he=/[\u0590-\u08ac]/,pe=null,me=null,ve=!1,ye=function(){function e(t,n,r,o){h(this,e),this.parent=t,this.children=n,this.dom=r,this.contentDOM=o,this.dirty=0,r.pmViewDesc=this}return m(e,[{key:"matchesWidget",value:function(e){return!1}},{key:"matchesMark",value:function(e){return!1}},{key:"matchesNode",value:function(e,t,n){return!1}},{key:"matchesHack",value:function(e){return!1}},{key:"parseRule",value:function(){return null}},{key:"stopEvent",value:function(e){return!1}},{key:"size",get:function(){for(var e=0,t=0;t<this.children.length;t++)e+=this.children[t].size
return e}},{key:"border",get:function(){return 0}},{key:"destroy",value:function(){this.parent=void 0,this.dom.pmViewDesc==this&&(this.dom.pmViewDesc=void 0)
for(var e=0;e<this.children.length;e++)this.children[e].destroy()}},{key:"posBeforeChild",value:function(e){for(var t=0,n=this.posAtStart;;t++){var r=this.children[t]
if(r==e)return n
n+=r.size}}},{key:"posBefore",get:function(){return this.parent.posBeforeChild(this)}},{key:"posAtStart",get:function(){return this.parent?this.parent.posBeforeChild(this)+this.border:0}},{key:"posAfter",get:function(){return this.posBefore+this.size}},{key:"posAtEnd",get:function(){return this.posAtStart+this.size-2*this.border}},{key:"localPosFromDOM",value:function(e,t,n){if(this.contentDOM&&this.contentDOM.contains(1==e.nodeType?e:e.parentNode)){if(n<0){var r,o
if(e==this.contentDOM)r=e.childNodes[t-1]
else{for(;e.parentNode!=this.contentDOM;)e=e.parentNode
r=e.previousSibling}for(;r&&(!(o=r.pmViewDesc)||o.parent!=this);)r=r.previousSibling
return r?this.posBeforeChild(o)+o.size:this.posAtStart}var i,s
if(e==this.contentDOM)i=e.childNodes[t]
else{for(;e.parentNode!=this.contentDOM;)e=e.parentNode
i=e.nextSibling}for(;i&&(!(s=i.pmViewDesc)||s.parent!=this);)i=i.nextSibling
return i?this.posBeforeChild(s):this.posAtEnd}var a
if(e==this.dom&&this.contentDOM)a=t>k(this.contentDOM)
else if(this.contentDOM&&this.contentDOM!=this.dom&&this.dom.contains(this.contentDOM))a=2&e.compareDocumentPosition(this.contentDOM)
else if(this.dom.firstChild){if(0==t)for(var c=e;;c=c.parentNode){if(c==this.dom){a=!1
break}if(c.previousSibling)break}if(null==a&&t==e.childNodes.length)for(var l=e;;l=l.parentNode){if(l==this.dom){a=!0
break}if(l.nextSibling)break}}return(null==a?n>0:a)?this.posAtEnd:this.posAtStart}},{key:"nearestDesc",value:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=!0,r=e;r;r=r.parentNode){var o=this.getDesc(r),i=void 0
if(o&&(!t||o.node)){if(!n||!(i=o.nodeDOM)||(1==i.nodeType?i.contains(1==e.nodeType?e:e.parentNode):i==e))return o
n=!1}}}},{key:"getDesc",value:function(e){for(var t=e.pmViewDesc,n=t;n;n=n.parent)if(n==this)return t}},{key:"posFromDOM",value:function(e,t,n){for(var r=e;r;r=r.parentNode){var o=this.getDesc(r)
if(o)return o.localPosFromDOM(e,t,n)}return-1}},{key:"descAt",value:function(e){for(var t=0,n=0;t<this.children.length;t++){var r=this.children[t],o=n+r.size
if(n==e&&o!=n){for(;!r.border&&r.children.length;)r=r.children[0]
return r}if(e<o)return r.descAt(e-n-r.border)
n=o}}},{key:"domFromPos",value:function(e,t){if(!this.contentDOM)return{node:this.dom,offset:0,atom:e+1}
for(var n,r=0,o=0,i=0;r<this.children.length;r++){var s=this.children[r],a=i+s.size
if(a>e||s instanceof Oe){o=e-i
break}i=a}if(o)return this.children[r].domFromPos(o-this.children[r].border,t)
for(;r&&!(n=this.children[r-1]).size&&n instanceof ge&&n.side>=0;r--);if(t<=0){for(var c,l=!0;(c=r?this.children[r-1]:null)&&c.dom.parentNode!=this.contentDOM;r--,l=!1);return c&&t&&l&&!c.border&&!c.domAtom?c.domFromPos(c.size,t):{node:this.contentDOM,offset:c?k(c.dom)+1:0}}for(var u,d=!0;(u=r<this.children.length?this.children[r]:null)&&u.dom.parentNode!=this.contentDOM;r++,d=!1);return u&&d&&!u.border&&!u.domAtom?u.domFromPos(0,t):{node:this.contentDOM,offset:u?k(u.dom):this.contentDOM.childNodes.length}}},{key:"parseRange",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0
if(0==this.children.length)return{node:this.contentDOM,from:e,to:t,fromOffset:0,toOffset:this.contentDOM.childNodes.length}
for(var r=-1,o=-1,i=n,s=0;;s++){var a=this.children[s],c=i+a.size
if(-1==r&&e<=c){var l=i+a.border
if(e>=l&&t<=c-a.border&&a.node&&a.contentDOM&&this.contentDOM.contains(a.contentDOM))return a.parseRange(e,t,l)
e=i
for(var u=s;u>0;u--){var d=this.children[u-1]
if(d.size&&d.dom.parentNode==this.contentDOM&&!d.emptyChildAt(1)){r=k(d.dom)+1
break}e-=d.size}-1==r&&(r=0)}if(r>-1&&(c>t||s==this.children.length-1)){t=c
for(var f=s+1;f<this.children.length;f++){var h=this.children[f]
if(h.size&&h.dom.parentNode==this.contentDOM&&!h.emptyChildAt(-1)){o=k(h.dom)
break}t+=h.size}-1==o&&(o=this.contentDOM.childNodes.length)
break}i=c}return{node:this.contentDOM,from:e,to:t,fromOffset:r,toOffset:o}}},{key:"emptyChildAt",value:function(e){if(this.border||!this.contentDOM||!this.children.length)return!1
var t=this.children[e<0?0:this.children.length-1]
return 0==t.size||t.emptyChildAt(e)}},{key:"domAfterPos",value:function(e){var t=this.domFromPos(e,0),n=t.node,r=t.offset
if(1!=n.nodeType||r==n.childNodes.length)throw new RangeError("No node after pos "+e)
return n.childNodes[r]}},{key:"setSelection",value:function(e,t,n){for(var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],o=Math.min(e,t),i=Math.max(e,t),s=0,a=0;s<this.children.length;s++){var c=this.children[s],l=a+c.size
if(o>a&&i<l)return c.setSelection(e-a-c.border,t-a-c.border,n,r)
a=l}var u=this.domFromPos(e,e?-1:1),d=t==e?u:this.domFromPos(t,t?-1:1),f=n.getSelection(),h=!1
if((F||L)&&e==t){var p=u,m=p.node,v=p.offset
if(3==m.nodeType){if((h=!(!v||"\n"!=m.nodeValue[v-1]))&&v==m.nodeValue.length)for(var y,g=m;g;g=g.parentNode){if(y=g.nextSibling){"BR"==y.nodeName&&(u=d={node:y.parentNode,offset:k(y)+1})
break}var b=g.pmViewDesc
if(b&&b.node&&b.node.isBlock)break}}else{var w=m.childNodes[v-1]
h=w&&("BR"==w.nodeName||"false"==w.contentEditable)}}if(F&&f.focusNode&&f.focusNode!=d.node&&1==f.focusNode.nodeType){var S=f.focusNode.childNodes[f.focusOffset]
S&&"false"==S.contentEditable&&(r=!0)}if(r||h&&L||!x(u.node,u.offset,f.anchorNode,f.anchorOffset)||!x(d.node,d.offset,f.focusNode,f.focusOffset)){var O=!1
if((f.extend||e==t)&&!h){f.collapse(u.node,u.offset)
try{e!=t&&f.extend(d.node,d.offset),O=!0}catch(e){}}if(!O){if(e>t){var M=u
u=d,d=M}var C=document.createRange()
C.setEnd(d.node,d.offset),C.setStart(u.node,u.offset),f.removeAllRanges(),f.addRange(C)}}}},{key:"ignoreMutation",value:function(e){return!this.contentDOM&&"selection"!=e.type}},{key:"contentLost",get:function(){return this.contentDOM&&this.contentDOM!=this.dom&&!this.dom.contains(this.contentDOM)}},{key:"markDirty",value:function(e,t){for(var n=0,r=0;r<this.children.length;r++){var o=this.children[r],i=n+o.size
if(n==i?e<=i&&t>=n:e<i&&t>n){var s=n+o.border,a=i-o.border
if(e>=s&&t<=a)return this.dirty=e==n||t==i?2:1,void(e!=s||t!=a||!o.contentLost&&o.dom.parentNode==this.contentDOM?o.markDirty(e-s,t-s):o.dirty=3)
o.dirty=o.dom!=o.contentDOM||o.dom.parentNode!=this.contentDOM||o.children.length?3:2}n=i}this.dirty=2}},{key:"markParentsDirty",value:function(){for(var e=1,t=this.parent;t;t=t.parent,e++){var n=1==e?2:1
t.dirty<n&&(t.dirty=n)}}},{key:"domAtom",get:function(){return!1}},{key:"ignoreForCoords",get:function(){return!1}},{key:"isText",value:function(e){return!1}}]),e}(),ge=function(e){a(n,e)
var t=l(n)
function n(e,r,o,i){var s
h(this,n)
var a,c=r.type.toDOM
if("function"==typeof c&&(c=c(o,(function(){return a?a.parent?a.parent.posBeforeChild(a):void 0:i}))),!r.type.spec.raw){if(1!=c.nodeType){var l=document.createElement("span")
l.appendChild(c),c=l}c.contentEditable="false",c.classList.add("ProseMirror-widget")}return(s=t.call(this,e,[],c,null)).widget=r,s.widget=r,a=u(s),s}return m(n,[{key:"matchesWidget",value:function(e){return 0==this.dirty&&e.type.eq(this.widget.type)}},{key:"parseRule",value:function(){return{ignore:!0}}},{key:"stopEvent",value:function(e){var t=this.widget.spec.stopEvent
return!!t&&t(e)}},{key:"ignoreMutation",value:function(e){return"selection"!=e.type||this.widget.spec.ignoreSelection}},{key:"destroy",value:function(){this.widget.type.destroy(this.dom),s(d(n.prototype),"destroy",this).call(this)}},{key:"domAtom",get:function(){return!0}},{key:"side",get:function(){return this.widget.type.side}}]),n}(ye),ke=function(e){a(n,e)
var t=l(n)
function n(e,r,o,i){var s
return h(this,n),(s=t.call(this,e,[],r,null)).textDOM=o,s.text=i,s}return m(n,[{key:"size",get:function(){return this.text.length}},{key:"localPosFromDOM",value:function(e,t){return e!=this.textDOM?this.posAtStart+(t?this.size:0):this.posAtStart+t}},{key:"domFromPos",value:function(e){return{node:this.textDOM,offset:e}}},{key:"ignoreMutation",value:function(e){return"characterData"===e.type&&e.target.nodeValue==e.oldValue}}]),n}(ye),be=function(e){a(n,e)
var t=l(n)
function n(e,r,o,i){var s
return h(this,n),(s=t.call(this,e,[],o,i)).mark=r,s}return m(n,[{key:"parseRule",value:function(){return 3&this.dirty||this.mark.type.spec.reparseInView?null:{mark:this.mark.type.name,attrs:this.mark.attrs,contentElement:this.contentDOM}}},{key:"matchesMark",value:function(e){return 3!=this.dirty&&this.mark.eq(e)}},{key:"markDirty",value:function(e,t){if(s(d(n.prototype),"markDirty",this).call(this,e,t),0!=this.dirty){for(var r=this.parent;!r.node;)r=r.parent
r.dirty<this.dirty&&(r.dirty=this.dirty),this.dirty=0}}},{key:"slice",value:function(e,t,r){var o=n.create(this.parent,this.mark,!0,r),i=this.children,s=this.size
t<s&&(i=Be(i,t,s,r)),e>0&&(i=Be(i,0,e,r))
for(var a=0;a<i.length;a++)i[a].parent=o
return o.children=i,o}}],[{key:"create",value:function(e,t,r,o){var i=o.nodeViews[t.type.name],s=i&&i(t,o,r)
return s&&s.dom||(s=y.DOMSerializer.renderSpec(document,t.type.spec.toDOM(t,r),null,t.attrs)),new n(e,t,s.dom,s.contentDOM||s.dom)}}]),n}(ye),we=function(e){a(n,e)
var t=l(n)
function n(e,r,o,i,s,a,c,l,u){var d
return h(this,n),(d=t.call(this,e,[],s,a)).node=r,d.outerDeco=o,d.innerDeco=i,d.nodeDOM=c,d}return m(n,[{key:"parseRule",value:function(){var e=this
if(this.node.type.spec.reparseInView)return null
var t={node:this.node.type.name,attrs:this.node.attrs}
if("pre"==this.node.type.whitespace&&(t.preserveWhitespace="full"),this.contentDOM)if(this.contentLost){for(var n=this.children.length-1;n>=0;n--){var r=this.children[n]
if(this.dom.contains(r.dom.parentNode)){t.contentElement=r.dom.parentNode
break}}t.contentElement||(t.getContent=function(){return y.Fragment.empty})}else t.contentElement=this.contentDOM
else t.getContent=function(){return e.node.content}
return t}},{key:"matchesNode",value:function(e,t,n){return 0==this.dirty&&e.eq(this.node)&&Re(t,this.outerDeco)&&n.eq(this.innerDeco)}},{key:"size",get:function(){return this.node.nodeSize}},{key:"border",get:function(){return this.node.isLeaf?0:1}},{key:"updateChildren",value:function(e,t){var n=this,r=this.node.inlineContent,o=t,i=e.composing?this.localCompositionInfo(e,t):null,s=i&&i.pos>-1?i:null,a=i&&i.pos<0,c=new je(this,s&&s.node,e)
!function(e,t,n,r){var o=t.locals(e),i=0
if(0!=o.length)for(var s=0,a=[],c=null,l=0;;){for(var u=void 0,d=void 0;s<o.length&&o[s].to==i;){var f=o[s++]
f.widget&&(u?(d||(d=[u])).push(f):u=f)}if(u)if(d){d.sort(ze)
for(var h=0;h<d.length;h++)n(d[h],l,!!c)}else n(u,l,!!c)
var p=void 0,m=void 0
if(c)m=-1,p=c,c=null
else{if(!(l<e.childCount))break
m=l,p=e.child(l++)}for(var v=0;v<a.length;v++)a[v].to<=i&&a.splice(v--,1)
for(;s<o.length&&o[s].from<=i&&o[s].to>i;)a.push(o[s++])
var y=i+p.nodeSize
if(p.isText){var g=y
s<o.length&&o[s].from<g&&(g=o[s].from)
for(var k=0;k<a.length;k++)a[k].to<g&&(g=a[k].to)
g<y&&(c=p.cut(g-i),p=p.cut(0,g-i),y=g,m=-1)}else for(;s<o.length&&o[s].to<y;)s++
r(p,p.isInline&&!p.isLeaf?a.filter((function(e){return!e.inline})):a.slice(),t.forChild(i,p),m),i=y}else for(var b=0;b<e.childCount;b++){var w=e.child(b)
r(w,o,t.forChild(i,w),b),i+=w.nodeSize}}(this.node,this.innerDeco,(function(t,i,s){t.spec.marks?c.syncToMarks(t.spec.marks,r,e):t.type.side>=0&&!s&&c.syncToMarks(i==n.node.childCount?y.Mark.none:n.node.child(i).marks,r,e),c.placeWidget(t,e,o)}),(function(t,n,s,l){var u
c.syncToMarks(t.marks,r,e),c.findNodeMatch(t,n,s,l)||a&&e.state.selection.from>o&&e.state.selection.to<o+t.nodeSize&&(u=c.findIndexWithChild(i.node))>-1&&c.updateNodeAt(t,n,s,u,e)||c.updateNextNode(t,n,s,e,l,o)||c.addNode(t,n,s,e,o),o+=t.nodeSize})),c.syncToMarks([],r,e),this.node.isTextblock&&c.addTextblockHacks(),c.destroyRest(),(c.changed||2==this.dirty)&&(s&&this.protectLocalComposition(e,s),Ce(this.contentDOM,this.children,e),J&&function(e){if("UL"==e.nodeName||"OL"==e.nodeName){var t=e.style.cssText
e.style.cssText=t+"; list-style: square !important",window.getComputedStyle(e).listStyle,e.style.cssText=t}}(this.dom))}},{key:"localCompositionInfo",value:function(e,t){var n=e.state.selection,r=n.from,o=n.to
if(!(e.state.selection instanceof v.TextSelection)||r<t||o>t+this.node.content.size)return null
var i=e.input.compositionNode
if(!i||!this.dom.contains(i.parentNode))return null
if(this.node.inlineContent){var s=i.nodeValue,a=function(e,t,n,r){for(var o=0,i=0;o<e.childCount&&i<=r;){var s=e.child(o++),a=i
if(i+=s.nodeSize,s.isText){for(var c=s.text;o<e.childCount;){var l=e.child(o++)
if(i+=l.nodeSize,!l.isText)break
c+=l.text}if(i>=n){if(i>=r&&c.slice(r-t.length-a,r-a)==t)return r-t.length
var u=a<r?c.lastIndexOf(t,r-a-1):-1
if(u>=0&&u+t.length+a>=n)return a+u
if(n==r&&c.length>=r+t.length-a&&c.slice(r-a,r-a+t.length)==t)return r}}}return-1}(this.node.content,s,r-t,o-t)
return a<0?null:{node:i,pos:a,text:s}}return{node:i,pos:-1,text:""}}},{key:"protectLocalComposition",value:function(e,t){var n=t.node,r=t.pos,o=t.text
if(!this.getDesc(n)){for(var i=n;i.parentNode!=this.contentDOM;i=i.parentNode){for(;i.previousSibling;)i.parentNode.removeChild(i.previousSibling)
for(;i.nextSibling;)i.parentNode.removeChild(i.nextSibling)
i.pmViewDesc&&(i.pmViewDesc=void 0)}var s=new ke(this,i,n,o)
e.input.compositionNodes.push(s),this.children=Be(this.children,r,r+o.length,e,s)}}},{key:"update",value:function(e,t,n,r){return!(3==this.dirty||!e.sameMarkup(this.node)||(this.updateInner(e,t,n,r),0))}},{key:"updateInner",value:function(e,t,n,r){this.updateOuterDeco(t),this.node=e,this.innerDeco=n,this.contentDOM&&this.updateChildren(r,this.posAtStart),this.dirty=0}},{key:"updateOuterDeco",value:function(e){if(!Re(e,this.outerDeco)){var t=1!=this.nodeDOM.nodeType,n=this.dom
this.dom=De(this.dom,this.nodeDOM,Ee(this.outerDeco,this.node,t),Ee(e,this.node,t)),this.dom!=n&&(n.pmViewDesc=void 0,this.dom.pmViewDesc=this),this.outerDeco=e}}},{key:"selectNode",value:function(){1==this.nodeDOM.nodeType&&this.nodeDOM.classList.add("ProseMirror-selectednode"),!this.contentDOM&&this.node.type.spec.draggable||(this.dom.draggable=!0)}},{key:"deselectNode",value:function(){1==this.nodeDOM.nodeType&&(this.nodeDOM.classList.remove("ProseMirror-selectednode"),!this.contentDOM&&this.node.type.spec.draggable||this.dom.removeAttribute("draggable"))}},{key:"domAtom",get:function(){return this.node.isAtom}}],[{key:"create",value:function(e,t,r,o,i,s){var a,c=i.nodeViews[t.type.name],l=c&&c(t,i,(function(){return a?a.parent?a.parent.posBeforeChild(a):void 0:s}),r,o),u=l&&l.dom,d=l&&l.contentDOM
if(t.isText)if(u){if(3!=u.nodeType)throw new RangeError("Text must be rendered as a DOM text node")}else u=document.createTextNode(t.text)
else if(!u){var f=y.DOMSerializer.renderSpec(document,t.type.spec.toDOM(t),null,t.attrs)
u=f.dom,d=f.contentDOM}d||t.isText||"BR"==u.nodeName||(u.hasAttribute("contenteditable")||(u.contentEditable="false"),t.type.spec.draggable&&(u.draggable=!0))
var h=u
return u=Pe(u,r,t),l?a=new Me(e,t,r,o,u,d||null,h,l,i,s+1):t.isText?new xe(e,t,r,o,u,h,i):new n(e,t,r,o,u,d||null,h,i,s+1)}}]),n}(ye)
function Se(e,t,n,r,o){Pe(r,t,e)
var i=new we(void 0,e,t,n,r,r,r,o,0)
return i.contentDOM&&i.updateChildren(o,0),i}var xe=function(e){a(n,e)
var t=l(n)
function n(e,r,o,i,s,a,c){return h(this,n),t.call(this,e,r,o,i,s,null,a,c,0)}return m(n,[{key:"parseRule",value:function(){for(var e=this.nodeDOM.parentNode;e&&e!=this.dom&&!e.pmIsDeco;)e=e.parentNode
return{skip:e||!0}}},{key:"update",value:function(e,t,n,r){return!(3==this.dirty||0!=this.dirty&&!this.inParent()||!e.sameMarkup(this.node)||(this.updateOuterDeco(t),0==this.dirty&&e.text==this.node.text||e.text==this.nodeDOM.nodeValue||(this.nodeDOM.nodeValue=e.text,r.trackWrites==this.nodeDOM&&(r.trackWrites=null)),this.node=e,this.dirty=0,0))}},{key:"inParent",value:function(){for(var e=this.parent.contentDOM,t=this.nodeDOM;t;t=t.parentNode)if(t==e)return!0
return!1}},{key:"domFromPos",value:function(e){return{node:this.nodeDOM,offset:e}}},{key:"localPosFromDOM",value:function(e,t,r){return e==this.nodeDOM?this.posAtStart+Math.min(t,this.node.text.length):s(d(n.prototype),"localPosFromDOM",this).call(this,e,t,r)}},{key:"ignoreMutation",value:function(e){return"characterData"!=e.type&&"selection"!=e.type}},{key:"slice",value:function(e,t,r){var o=this.node.cut(e,t),i=document.createTextNode(o.text)
return new n(this.parent,o,this.outerDeco,this.innerDeco,i,i,r)}},{key:"markDirty",value:function(e,t){s(d(n.prototype),"markDirty",this).call(this,e,t),this.dom==this.nodeDOM||0!=e&&t!=this.nodeDOM.nodeValue.length||(this.dirty=3)}},{key:"domAtom",get:function(){return!1}},{key:"isText",value:function(e){return this.node.text==e}}]),n}(we),Oe=function(e){a(n,e)
var t=l(n)
function n(){return h(this,n),t.apply(this,arguments)}return m(n,[{key:"parseRule",value:function(){return{ignore:!0}}},{key:"matchesHack",value:function(e){return 0==this.dirty&&this.dom.nodeName==e}},{key:"domAtom",get:function(){return!0}},{key:"ignoreForCoords",get:function(){return"IMG"==this.dom.nodeName}}]),n}(ye),Me=function(e){a(n,e)
var t=l(n)
function n(e,r,o,i,s,a,c,l,u,d){var f
return h(this,n),(f=t.call(this,e,r,o,i,s,a,c,u,d)).spec=l,f}return m(n,[{key:"update",value:function(e,t,r,o){if(3==this.dirty)return!1
if(this.spec.update){var i=this.spec.update(e,t,r)
return i&&this.updateInner(e,t,r,o),i}return!(!this.contentDOM&&!e.isLeaf)&&s(d(n.prototype),"update",this).call(this,e,t,r,o)}},{key:"selectNode",value:function(){this.spec.selectNode?this.spec.selectNode():s(d(n.prototype),"selectNode",this).call(this)}},{key:"deselectNode",value:function(){this.spec.deselectNode?this.spec.deselectNode():s(d(n.prototype),"deselectNode",this).call(this)}},{key:"setSelection",value:function(e,t,r,o){this.spec.setSelection?this.spec.setSelection(e,t,r):s(d(n.prototype),"setSelection",this).call(this,e,t,r,o)}},{key:"destroy",value:function(){this.spec.destroy&&this.spec.destroy(),s(d(n.prototype),"destroy",this).call(this)}},{key:"stopEvent",value:function(e){return!!this.spec.stopEvent&&this.spec.stopEvent(e)}},{key:"ignoreMutation",value:function(e){return this.spec.ignoreMutation?this.spec.ignoreMutation(e):s(d(n.prototype),"ignoreMutation",this).call(this,e)}}]),n}(we)
function Ce(e,t,n){for(var r=e.firstChild,o=!1,i=0;i<t.length;i++){var s=t[i],a=s.dom
if(a.parentNode==e){for(;a!=r;)r=Ie(r),o=!0
r=r.nextSibling}else o=!0,e.insertBefore(a,r)
if(s instanceof be){var c=r?r.previousSibling:e.lastChild
Ce(s.contentDOM,s.children,n),r=c?c.nextSibling:e.firstChild}}for(;r;)r=Ie(r),o=!0
o&&n.trackWrites==e&&(n.trackWrites=null)}var Te=function(e){e&&(this.nodeName=e)}
Te.prototype=Object.create(null)
var Ne=[new Te]
function Ee(e,t,n){if(0==e.length)return Ne
for(var r=n?Ne[0]:new Te,o=[r],i=0;i<e.length;i++){var s=e[i].type.attrs
if(s)for(var a in s.nodeName&&o.push(r=new Te(s.nodeName)),s){var c=s[a]
null!=c&&(n&&1==o.length&&o.push(r=new Te(t.isInline?"span":"div")),"class"==a?r.class=(r.class?r.class+" ":"")+c:"style"==a?r.style=(r.style?r.style+";":"")+c:"nodeName"!=a&&(r[a]=c))}}return o}function De(e,t,n,r){if(n==Ne&&r==Ne)return t
for(var o=t,i=0;i<r.length;i++){var s=r[i],a=n[i]
if(i){var c=void 0
a&&a.nodeName==s.nodeName&&o!=e&&(c=o.parentNode)&&c.nodeName.toLowerCase()==s.nodeName||((c=document.createElement(s.nodeName)).pmIsDeco=!0,c.appendChild(o),a=Ne[0]),o=c}Ae(o,a||Ne[0],s)}return o}function Ae(e,t,n){for(var r in t)"class"==r||"style"==r||"nodeName"==r||r in n||e.removeAttribute(r)
for(var o in n)"class"!=o&&"style"!=o&&"nodeName"!=o&&n[o]!=t[o]&&e.setAttribute(o,n[o])
if(t.class!=n.class){for(var i=t.class?t.class.split(" ").filter(Boolean):[],s=n.class?n.class.split(" ").filter(Boolean):[],a=0;a<i.length;a++)-1==s.indexOf(i[a])&&e.classList.remove(i[a])
for(var c=0;c<s.length;c++)-1==i.indexOf(s[c])&&e.classList.add(s[c])
0==e.classList.length&&e.removeAttribute("class")}if(t.style!=n.style){if(t.style)for(var l,u=/\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g;l=u.exec(t.style);)e.style.removeProperty(l[1])
n.style&&(e.style.cssText+=n.style)}}function Pe(e,t,n){return De(e,e,Ne,Ee(t,n,1!=e.nodeType))}function Re(e,t){if(e.length!=t.length)return!1
for(var n=0;n<e.length;n++)if(!e[n].type.eq(t[n].type))return!1
return!0}function Ie(e){var t=e.nextSibling
return e.parentNode.removeChild(e),t}var je=function(){function e(t,n,r){h(this,e),this.lock=n,this.view=r,this.index=0,this.stack=[],this.changed=!1,this.top=t,this.preMatch=function(e,t){var n=t,r=n.children.length,o=e.childCount,i=new Map,s=[]
e:for(;o>0;){for(var a=void 0;;)if(r){var c=n.children[r-1]
if(!(c instanceof be)){a=c,r--
break}n=c,r=c.children.length}else{if(n==t)break e
r=n.parent.children.indexOf(n),n=n.parent}var l=a.node
if(l){if(l!=e.child(o-1))break;--o,i.set(a,o),s.push(a)}}return{index:o,matched:i,matches:s.reverse()}}(t.node.content,t)}return m(e,[{key:"destroyBetween",value:function(e,t){if(e!=t){for(var n=e;n<t;n++)this.top.children[n].destroy()
this.top.children.splice(e,t-e),this.changed=!0}}},{key:"destroyRest",value:function(){this.destroyBetween(this.index,this.top.children.length)}},{key:"syncToMarks",value:function(e,t,n){for(var r=0,o=this.stack.length>>1,i=Math.min(o,e.length);r<i&&(r==o-1?this.top:this.stack[r+1<<1]).matchesMark(e[r])&&!1!==e[r].type.spec.spanning;)r++
for(;r<o;)this.destroyRest(),this.top.dirty=0,this.index=this.stack.pop(),this.top=this.stack.pop(),o--
for(;o<e.length;){this.stack.push(this.top,this.index+1)
for(var s=-1,a=this.index;a<Math.min(this.index+3,this.top.children.length);a++){var c=this.top.children[a]
if(c.matchesMark(e[o])&&!this.isLocked(c.dom)){s=a
break}}if(s>-1)s>this.index&&(this.changed=!0,this.destroyBetween(this.index,s)),this.top=this.top.children[this.index]
else{var l=be.create(this.top,e[o],t,n)
this.top.children.splice(this.index,0,l),this.top=l,this.changed=!0}this.index=0,o++}}},{key:"findNodeMatch",value:function(e,t,n,r){var o,i=-1
if(r>=this.preMatch.index&&(o=this.preMatch.matches[r-this.preMatch.index]).parent==this.top&&o.matchesNode(e,t,n))i=this.top.children.indexOf(o,this.index)
else for(var s=this.index,a=Math.min(this.top.children.length,s+5);s<a;s++){var c=this.top.children[s]
if(c.matchesNode(e,t,n)&&!this.preMatch.matched.has(c)){i=s
break}}return!(i<0||(this.destroyBetween(this.index,i),this.index++,0))}},{key:"updateNodeAt",value:function(e,t,n,r,o){var i=this.top.children[r]
return 3==i.dirty&&i.dom==i.contentDOM&&(i.dirty=2),!!i.update(e,t,n,o)&&(this.destroyBetween(this.index,r),this.index++,!0)}},{key:"findIndexWithChild",value:function(e){for(;;){var t=e.parentNode
if(!t)return-1
if(t==this.top.contentDOM){var n=e.pmViewDesc
if(n)for(var r=this.index;r<this.top.children.length;r++)if(this.top.children[r]==n)return r
return-1}e=t}}},{key:"updateNextNode",value:function(e,t,n,r,o,i){for(var s=this.index;s<this.top.children.length;s++){var a=this.top.children[s]
if(a instanceof we){var c=this.preMatch.matched.get(a)
if(null!=c&&c!=o)return!1
var l=a.dom,u=void 0,d=this.isLocked(l)&&!(e.isText&&a.node&&a.node.isText&&a.nodeDOM.nodeValue==e.text&&3!=a.dirty&&Re(t,a.outerDeco))
if(!d&&a.update(e,t,n,r))return this.destroyBetween(this.index,s),a.dom!=l&&(this.changed=!0),this.index++,!0
if(!d&&(u=this.recreateWrapper(a,e,t,n,r,i)))return this.top.children[this.index]=u,u.contentDOM&&(u.dirty=2,u.updateChildren(r,i+1),u.dirty=0),this.changed=!0,this.index++,!0
break}}return!1}},{key:"recreateWrapper",value:function(e,t,n,o,i,s){if(e.dirty||t.isAtom||!e.children.length||!e.node.content.eq(t.content))return null
var a=we.create(this.top,t,n,o,i,s)
if(a.contentDOM){a.children=e.children,e.children=[]
var c,l=r(a.children)
try{for(l.s();!(c=l.n()).done;)c.value.parent=a}catch(e){l.e(e)}finally{l.f()}}return e.destroy(),a}},{key:"addNode",value:function(e,t,n,r,o){var i=we.create(this.top,e,t,n,r,o)
i.contentDOM&&i.updateChildren(r,o+1),this.top.children.splice(this.index++,0,i),this.changed=!0}},{key:"placeWidget",value:function(e,t,n){var r=this.index<this.top.children.length?this.top.children[this.index]:null
if(!r||!r.matchesWidget(e)||e!=r.widget&&r.widget.type.toDOM.parentNode){var o=new ge(this.top,e,t,n)
this.top.children.splice(this.index++,0,o),this.changed=!0}else this.index++}},{key:"addTextblockHacks",value:function(){for(var e=this.top.children[this.index-1],t=this.top;e instanceof be;)e=(t=e).children[t.children.length-1];(!e||!(e instanceof xe)||/\n$/.test(e.node.text)||this.view.requiresGeckoHackNode&&/\s$/.test(e.node.text))&&((L||V)&&e&&"false"==e.dom.contentEditable&&this.addHackNode("IMG",t),this.addHackNode("BR",this.top))}},{key:"addHackNode",value:function(e,t){if(t==this.top&&this.index<t.children.length&&t.children[this.index].matchesHack(e))this.index++
else{var n=document.createElement(e)
"IMG"==e&&(n.className="ProseMirror-separator",n.alt=""),"BR"==e&&(n.className="ProseMirror-trailingBreak")
var r=new Oe(this.top,[],n,null)
t!=this.top?t.children.push(r):t.children.splice(this.index++,0,r),this.changed=!0}}},{key:"isLocked",value:function(e){return this.lock&&(e==this.lock||1==e.nodeType&&e.contains(this.lock.parentNode))}}]),e}()
function ze(e,t){return e.type.side-t.type.side}function Be(e,t,n,r,o){for(var i=[],s=0,a=0;s<e.length;s++){var c=e[s],l=a,u=a+=c.size
l>=n||u<=t?i.push(c):(l<t&&i.push(c.slice(0,t-l,r)),o&&(i.push(o),o=void 0),u>n&&i.push(c.slice(n-l,c.size,r)))}return i}function Fe(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=e.domSelectionRange(),r=e.state.doc
if(!n.focusNode)return null
var o=e.docView.nearestDesc(n.focusNode),i=o&&0==o.size,s=e.docView.posFromDOM(n.focusNode,n.focusOffset,1)
if(s<0)return null
var a,c,l=r.resolve(s)
if(N(n)){for(a=l;o&&!o.node;)o=o.parent
var u=o.node
if(o&&u.isAtom&&v.NodeSelection.isSelectable(u)&&o.parent&&(!u.isInline||!function(e,t,n){for(var r=0==t,o=t==C(e);r||o;){if(e==n)return!0
var i=k(e)
if(!(e=e.parentNode))return!1
r=r&&0==i,o=o&&i==C(e)}}(n.focusNode,n.focusOffset,o.dom))){var d=o.posBefore
c=new v.NodeSelection(s==d?l:r.resolve(d))}}else{var f=e.docView.posFromDOM(n.anchorNode,n.anchorOffset,1)
if(f<0)return null
a=r.resolve(f)}return c||(c=He(e,a,l,"pointer"==t||e.state.selection.head<l.pos&&!i?1:-1)),c}function $e(e){return e.editable?e.hasFocus():Ge(e)&&document.activeElement&&document.activeElement.contains(e.dom)}function Ve(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=e.state.selection
if(qe(e,n),$e(e)){if(!t&&e.input.mouseDown&&e.input.mouseDown.allowDefault&&V){var r=e.domSelectionRange(),o=e.domObserver.currentSelection
if(r.anchorNode&&o.anchorNode&&x(r.anchorNode,r.anchorOffset,o.anchorNode,o.anchorOffset))return e.input.mouseDown.delayedSelectionSync=!0,void e.domObserver.setCurSelection()}if(e.domObserver.disconnectSelection(),e.cursorWrapper)!function(e){var t=e.domSelection(),n=document.createRange()
if(t){var r=e.cursorWrapper.dom,o="IMG"==r.nodeName
o?n.setStart(r.parentNode,k(r)+1):n.setStart(r,0)
var i=e.state.selection
if(i.empty)n.collapse(!0)
else{var s=e.domAtPos(i.to)
n.setEnd(s.node,s.offset)}t.removeAllRanges(),t.addRange(n),!o&&!e.state.selection.visible&&z&&B<=11&&(r.disabled=!0,r.disabled=!1)}}(e)
else{var i,s,a=n.anchor,c=n.head
!_e||n instanceof v.TextSelection||(n.$from.parent.inlineContent||(i=Le(e,n.from)),n.empty||n.$from.parent.inlineContent||(s=Le(e,n.to))),e.docView.setSelection(a,c,e.root,t),_e&&(i&&We(i),s&&We(s)),n.visible?e.dom.classList.remove("ProseMirror-hideselection"):(e.dom.classList.add("ProseMirror-hideselection"),"onselectionchange"in document&&function(e){var t=e.dom.ownerDocument
t.removeEventListener("selectionchange",e.input.hideSelectionGuard)
var n=e.domSelectionRange(),r=n.anchorNode,o=n.anchorOffset
t.addEventListener("selectionchange",e.input.hideSelectionGuard=function(){n.anchorNode==r&&n.anchorOffset==o||(t.removeEventListener("selectionchange",e.input.hideSelectionGuard),setTimeout((function(){$e(e)&&!e.state.selection.visible||e.dom.classList.remove("ProseMirror-hideselection")}),20))})}(e))}e.domObserver.setCurSelection(),e.domObserver.connectSelection()}}var _e=L||V&&_<63
function Le(e,t){var n=e.docView.domFromPos(t,0),r=n.node,o=n.offset,i=o<r.childNodes.length?r.childNodes[o]:null,s=o?r.childNodes[o-1]:null
if(L&&i&&"false"==i.contentEditable)return Je(i)
if(!(i&&"false"!=i.contentEditable||s&&"false"!=s.contentEditable)){if(i)return Je(i)
if(s)return Je(s)}}function Je(e){return e.contentEditable="true",L&&e.draggable&&(e.draggable=!1,e.wasDraggable=!0),e}function We(e){e.contentEditable="false",e.wasDraggable&&(e.draggable=!0,e.wasDraggable=null)}function qe(e,t){if(t instanceof v.NodeSelection){var n=e.docView.descAt(t.from)
n!=e.lastSelectedViewDesc&&(Ke(e),n&&n.selectNode(),e.lastSelectedViewDesc=n)}else Ke(e)}function Ke(e){e.lastSelectedViewDesc&&(e.lastSelectedViewDesc.parent&&e.lastSelectedViewDesc.deselectNode(),e.lastSelectedViewDesc=void 0)}function He(e,t,n,r){return e.someProp("createSelectionBetween",(function(r){return r(e,t,n)}))||v.TextSelection.between(t,n,r)}function Ue(e){return!(e.editable&&!e.hasFocus())&&Ge(e)}function Ge(e){var t=e.domSelectionRange()
if(!t.anchorNode)return!1
try{return e.dom.contains(3==t.anchorNode.nodeType?t.anchorNode.parentNode:t.anchorNode)&&(e.editable||e.dom.contains(3==t.focusNode.nodeType?t.focusNode.parentNode:t.focusNode))}catch(e){return!1}}function Xe(e,t){var n=e.selection,r=n.$anchor,o=n.$head,i=t>0?r.max(o):r.min(o),s=i.parent.inlineContent?i.depth?e.doc.resolve(t>0?i.after():i.before()):null:i
return s&&v.Selection.findFrom(s,t)}function Ye(e,t){return e.dispatch(e.state.tr.setSelection(t).scrollIntoView()),!0}function Qe(e,t,n){var r=e.state.selection
if(!(r instanceof v.TextSelection)){if(r instanceof v.NodeSelection&&r.node.isInline)return Ye(e,new v.TextSelection(t>0?r.$to:r.$from))
var o=Xe(e.state,t)
return!!o&&Ye(e,o)}if(n.indexOf("s")>-1){var i=r.$head,s=i.textOffset?null:t<0?i.nodeBefore:i.nodeAfter
if(!s||s.isText||!s.isLeaf)return!1
var a=e.state.doc.resolve(i.pos+s.nodeSize*(t<0?-1:1))
return Ye(e,new v.TextSelection(r.$anchor,a))}if(!r.empty)return!1
if(e.endOfTextblock(t>0?"forward":"backward")){var c=Xe(e.state,t)
return!!(c&&c instanceof v.NodeSelection)&&Ye(e,c)}if(!(W&&n.indexOf("m")>-1)){var l,u=r.$head,d=u.textOffset?null:t<0?u.nodeBefore:u.nodeAfter
if(!d||d.isText)return!1
var f=t<0?u.pos-d.nodeSize:u.pos
return!!(d.isAtom||(l=e.docView.descAt(f))&&!l.contentDOM)&&(v.NodeSelection.isSelectable(d)?Ye(e,new v.NodeSelection(t<0?e.state.doc.resolve(u.pos-d.nodeSize):u)):!!H&&Ye(e,new v.TextSelection(e.state.doc.resolve(t<0?f:f+d.nodeSize))))}}function Ze(e){return 3==e.nodeType?e.nodeValue.length:e.childNodes.length}function et(e,t){var n=e.pmViewDesc
return n&&0==n.size&&(t<0||e.nextSibling||"BR"!=e.nodeName)}function tt(e,t){return t<0?function(e){var t=e.domSelectionRange(),n=t.focusNode,r=t.focusOffset
if(n){var o,i,s=!1
for(F&&1==n.nodeType&&r<Ze(n)&&et(n.childNodes[r],-1)&&(s=!0);;)if(r>0){if(1!=n.nodeType)break
var a=n.childNodes[r-1]
if(et(a,-1))o=n,i=--r
else{if(3!=a.nodeType)break
r=(n=a).nodeValue.length}}else{if(nt(n))break
for(var c=n.previousSibling;c&&et(c,-1);)o=n.parentNode,i=k(c),c=c.previousSibling
if(c)r=Ze(n=c)
else{if((n=n.parentNode)==e.dom)break
r=0}}s?rt(e,n,r):o&&rt(e,o,i)}}(e):function(e){var t=e.domSelectionRange(),n=t.focusNode,r=t.focusOffset
if(n){for(var o,i,s=Ze(n);;)if(r<s){if(1!=n.nodeType)break
if(!et(n.childNodes[r],1))break
o=n,i=++r}else{if(nt(n))break
for(var a=n.nextSibling;a&&et(a,1);)o=a.parentNode,i=k(a)+1,a=a.nextSibling
if(a)r=0,s=Ze(n=a)
else{if((n=n.parentNode)==e.dom)break
r=s=0}}o&&rt(e,o,i)}}(e)}function nt(e){var t=e.pmViewDesc
return t&&t.node&&t.node.isBlock}function rt(e,t,n){var r,o
3!=t.nodeType&&((o=function(e,t){for(;e&&t==e.childNodes.length&&!T(e);)t=k(e)+1,e=e.parentNode
for(;e&&t<e.childNodes.length;){var n=e.childNodes[t]
if(3==n.nodeType)return n
if(1==n.nodeType&&"false"==n.contentEditable)break
e=n,t=0}}(t,n))?(t=o,n=0):(r=function(e,t){for(;e&&!t&&!T(e);)t=k(e),e=e.parentNode
for(;e&&t;){var n=e.childNodes[t-1]
if(3==n.nodeType)return n
if(1==n.nodeType&&"false"==n.contentEditable)break
t=(e=n).childNodes.length}}(t,n))&&(t=r,n=r.nodeValue.length))
var i=e.domSelection()
if(i){if(N(i)){var s=document.createRange()
s.setEnd(t,n),s.setStart(t,n),i.removeAllRanges(),i.addRange(s)}else i.extend&&i.extend(t,n)
e.domObserver.setCurSelection()
var a=e.state
setTimeout((function(){e.state==a&&Ve(e)}),50)}}function ot(e,t){var n=e.state.doc.resolve(t)
if(!V&&!q&&n.parent.inlineContent){var r=e.coordsAtPos(t)
if(t>n.start()){var o=e.coordsAtPos(t-1),i=(o.top+o.bottom)/2
if(i>r.top&&i<r.bottom&&Math.abs(o.left-r.left)>1)return o.left<r.left?"ltr":"rtl"}if(t<n.end()){var s=e.coordsAtPos(t+1),a=(s.top+s.bottom)/2
if(a>r.top&&a<r.bottom&&Math.abs(s.left-r.left)>1)return s.left>r.left?"ltr":"rtl"}}return"rtl"==getComputedStyle(e.dom).direction?"rtl":"ltr"}function it(e,t,n){var r=e.state.selection
if(r instanceof v.TextSelection&&!r.empty||n.indexOf("s")>-1)return!1
if(W&&n.indexOf("m")>-1)return!1
var o=r.$from,i=r.$to
if(!o.parent.inlineContent||e.endOfTextblock(t<0?"up":"down")){var s=Xe(e.state,t)
if(s&&s instanceof v.NodeSelection)return Ye(e,s)}if(!o.parent.inlineContent){var a=t<0?o:i,c=r instanceof v.AllSelection?v.Selection.near(a,t):v.Selection.findFrom(a,t)
return!!c&&Ye(e,c)}return!1}function st(e,t){if(!(e.state.selection instanceof v.TextSelection))return!0
var n=e.state.selection,r=n.$head,o=n.$anchor,i=n.empty
if(!r.sameParent(o))return!0
if(!i)return!1
if(e.endOfTextblock(t>0?"forward":"backward"))return!0
var s=!r.textOffset&&(t<0?r.nodeBefore:r.nodeAfter)
if(s&&!s.isText){var a=e.state.tr
return t<0?a.delete(r.pos-s.nodeSize,r.pos):a.delete(r.pos,r.pos+s.nodeSize),e.dispatch(a),!0}return!1}function at(e,t,n){e.domObserver.stop(),t.contentEditable=n,e.domObserver.start()}function ct(e,t){e.someProp("transformCopied",(function(n){t=n(t,e)}))
for(var n=[],r=t,o=r.content,i=r.openStart,s=r.openEnd;i>1&&s>1&&1==o.childCount&&1==o.firstChild.childCount;){i--,s--
var a=o.firstChild
n.push(a.type.name,a.attrs!=a.type.defaultAttrs?a.attrs:null),o=a.content}var c=e.someProp("clipboardSerializer")||y.DOMSerializer.fromSchema(e.state.schema),l=gt(),u=l.createElement("div")
u.appendChild(c.serializeFragment(o,{document:l}))
for(var d,f=u.firstChild,h=0;f&&1==f.nodeType&&(d=vt[f.nodeName.toLowerCase()]);){for(var p=d.length-1;p>=0;p--){for(var m=l.createElement(d[p]);u.firstChild;)m.appendChild(u.firstChild)
u.appendChild(m),h++}f=u.firstChild}return f&&1==f.nodeType&&f.setAttribute("data-pm-slice","".concat(i," ").concat(s).concat(h?" -".concat(h):""," ").concat(JSON.stringify(n))),{dom:u,text:e.someProp("clipboardTextSerializer",(function(n){return n(t,e)}))||t.content.textBetween(0,t.content.size,"\n\n"),slice:t}}function lt(e,t,n,r,o){var i,s,a=o.parent.type.spec.code
if(!n&&!t)return null
var c=t&&(r||a||!n)
if(c){if(e.someProp("transformPastedText",(function(n){t=n(t,a||r,e)})),a)return t?new y.Slice(y.Fragment.from(e.state.schema.text(t.replace(/\r\n?/g,"\n"))),0,0):y.Slice.empty
var l=e.someProp("clipboardTextParser",(function(n){return n(t,o,r,e)}))
if(l)s=l
else{var u=o.marks(),d=e.state.schema,f=y.DOMSerializer.fromSchema(d)
i=document.createElement("div"),t.split(/(?:\r\n?|\n)+/).forEach((function(e){var t=i.appendChild(document.createElement("p"))
e&&t.appendChild(f.serializeNode(d.text(e,u)))}))}}else e.someProp("transformPastedHTML",(function(t){n=t(n,e)})),i=function(e){var t=/^(\s*<meta [^>]*>)*/.exec(e)
t&&(e=e.slice(t[0].length))
var n,r=gt().createElement("div"),o=/<([a-z][^>\s]+)/i.exec(e)
if((n=o&&vt[o[1].toLowerCase()])&&(e=n.map((function(e){return"<"+e+">"})).join("")+e+n.map((function(e){return"</"+e+">"})).reverse().join("")),r.innerHTML=e,n)for(var i=0;i<n.length;i++)r=r.querySelector(n[i])||r
return r}(n),H&&function(e){for(var t=e.querySelectorAll(V?"span:not([class]):not([style])":"span.Apple-converted-space"),n=0;n<t.length;n++){var r=t[n]
1==r.childNodes.length&&" "==r.textContent&&r.parentNode&&r.parentNode.replaceChild(e.ownerDocument.createTextNode(" "),r)}}(i)
var h=i&&i.querySelector("[data-pm-slice]"),p=h&&/^(\d+) (\d+)(?: -(\d+))? (.*)/.exec(h.getAttribute("data-pm-slice")||"")
if(p&&p[3])for(var m=+p[3];m>0;m--){for(var v=i.firstChild;v&&1!=v.nodeType;)v=v.nextSibling
if(!v)break
i=v}if(!s){var g=e.someProp("clipboardParser")||e.someProp("domParser")||y.DOMParser.fromSchema(e.state.schema)
s=g.parseSlice(i,{preserveWhitespace:!(!c&&!p),context:o,ruleFromNode:function(e){return"BR"!=e.nodeName||e.nextSibling||!e.parentNode||ut.test(e.parentNode.nodeName)?null:{ignore:!0}}})}if(p)s=function(e,t){if(!e.size)return e
var n,r=e.content.firstChild.type.schema
try{n=JSON.parse(t)}catch(t){return e}for(var o=e.content,i=e.openStart,s=e.openEnd,a=n.length-2;a>=0;a-=2){var c=r.nodes[n[a]]
if(!c||c.hasRequiredAttrs())break
o=y.Fragment.from(c.create(n[a+1],o)),i++,s++}return new y.Slice(o,i,s)}(mt(s,+p[1],+p[2]),p[4])
else if(s=y.Slice.maxOpen(function(e,t){if(e.childCount<2)return e
for(var n,r=function(){var n,r=t.node(o).contentMatchAt(t.index(o)),i=[]
if(e.forEach((function(e){if(i){var t,o=r.findWrapping(e.type)
if(!o)return i=null
if(t=i.length&&n.length&&ft(o,n,e,i[i.length-1],0))i[i.length-1]=t
else{i.length&&(i[i.length-1]=ht(i[i.length-1],n.length))
var s=dt(e,o)
i.push(s),r=r.matchType(s.type),n=o}}})),i)return{v:y.Fragment.from(i)}},o=t.depth;o>=0;o--)if(n=r())return n.v
return e}(s.content,o),!0),s.openStart||s.openEnd){for(var k=0,b=0,w=s.content.firstChild;k<s.openStart&&!w.type.spec.isolating;k++,w=w.firstChild);for(var S=s.content.lastChild;b<s.openEnd&&!S.type.spec.isolating;b++,S=S.lastChild);s=mt(s,k,b)}return e.someProp("transformPasted",(function(t){s=t(s,e)})),s}var ut=/^(a|abbr|acronym|b|cite|code|del|em|i|ins|kbd|label|output|q|ruby|s|samp|span|strong|sub|sup|time|u|tt|var)$/i
function dt(e,t){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=t.length-1;r>=n;r--)e=t[r].create(null,y.Fragment.from(e))
return e}function ft(e,t,n,r,o){if(o<e.length&&o<t.length&&e[o]==t[o]){var i=ft(e,t,n,r.lastChild,o+1)
if(i)return r.copy(r.content.replaceChild(r.childCount-1,i))
if(r.contentMatchAt(r.childCount).matchType(o==e.length-1?n.type:e[o+1]))return r.copy(r.content.append(y.Fragment.from(dt(n,e,o+1))))}}function ht(e,t){if(0==t)return e
var n=e.content.replaceChild(e.childCount-1,ht(e.lastChild,t-1)),r=e.contentMatchAt(e.childCount).fillBefore(y.Fragment.empty,!0)
return e.copy(n.append(r))}function pt(e,t,n,r,o,i){var s=t<0?e.firstChild:e.lastChild,a=s.content
return e.childCount>1&&(i=0),o<r-1&&(a=pt(a,t,n,r,o+1,i)),o>=n&&(a=t<0?s.contentMatchAt(0).fillBefore(a,i<=o).append(a):a.append(s.contentMatchAt(s.childCount).fillBefore(y.Fragment.empty,!0))),e.replaceChild(t<0?0:e.childCount-1,s.copy(a))}function mt(e,t,n){return t<e.openStart&&(e=new y.Slice(pt(e.content,-1,t,e.openStart,0,e.openEnd),t,e.openEnd)),n<e.openEnd&&(e=new y.Slice(pt(e.content,1,n,e.openEnd,0,0),e.openStart,n)),e}var vt={thead:["table"],tbody:["table"],tfoot:["table"],caption:["table"],colgroup:["table"],col:["table","colgroup"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","tbody","tr"]},yt=null
function gt(){return yt||(yt=document.implementation.createHTMLDocument("title"))}var kt={},bt={},wt={touchstart:!0,touchmove:!0},St=m((function e(){h(this,e),this.shiftKey=!1,this.mouseDown=null,this.lastKeyCode=null,this.lastKeyCodeTime=0,this.lastClick={time:0,x:0,y:0,type:""},this.lastSelectionOrigin=null,this.lastSelectionTime=0,this.lastIOSEnter=0,this.lastIOSEnterFallbackTimeout=-1,this.lastFocus=0,this.lastTouch=0,this.lastAndroidDelete=0,this.composing=!1,this.compositionNode=null,this.composingTimeout=-1,this.compositionNodes=[],this.compositionEndedAt=-2e8,this.compositionID=1,this.compositionPendingChanges=0,this.domChangeCount=0,this.eventHandlers=Object.create(null),this.hideSelectionGuard=null}))
function xt(e,t){e.input.lastSelectionOrigin=t,e.input.lastSelectionTime=Date.now()}function Ot(e){e.someProp("handleDOMEvents",(function(t){for(var n in t)e.input.eventHandlers[n]||e.dom.addEventListener(n,e.input.eventHandlers[n]=function(t){return Mt(e,t)})}))}function Mt(e,t){return e.someProp("handleDOMEvents",(function(n){var r=n[t.type]
return!!r&&(r(e,t)||t.defaultPrevented)}))}function Ct(e){return{left:e.clientX,top:e.clientY}}function Tt(e,t,n,r,o){if(-1==r)return!1
for(var i,s=e.state.doc.resolve(r),a=function(r){if(e.someProp(t,(function(t){return r>s.depth?t(e,n,s.nodeAfter,s.before(r),o,!0):t(e,n,s.node(r),s.before(r),o,!1)})))return{v:!0}},c=s.depth+1;c>0;c--)if(i=a(c))return i.v
return!1}function Nt(e,t,n){if(e.focused||e.focus(),!e.state.selection.eq(t)){var r=e.state.tr.setSelection(t)
"pointer"==n&&r.setMeta("pointer",!0),e.dispatch(r)}}function Et(e,t,n,r){return Tt(e,"handleDoubleClickOn",t,n,r)||e.someProp("handleDoubleClick",(function(n){return n(e,t,r)}))}function Dt(e,t,n,r){return Tt(e,"handleTripleClickOn",t,n,r)||e.someProp("handleTripleClick",(function(n){return n(e,t,r)}))||function(e,t,n){if(0!=n.button)return!1
var r=e.state.doc
if(-1==t)return!!r.inlineContent&&(Nt(e,v.TextSelection.create(r,0,r.content.size),"pointer"),!0)
for(var o=r.resolve(t),i=o.depth+1;i>0;i--){var s=i>o.depth?o.nodeAfter:o.node(i),a=o.before(i)
if(s.inlineContent)Nt(e,v.TextSelection.create(r,a+1,a+1+s.content.size),"pointer")
else{if(!v.NodeSelection.isSelectable(s))continue
Nt(e,v.NodeSelection.create(r,a),"pointer")}return!0}}(e,n,r)}function At(e){return Ft(e)}bt.keydown=function(e,t){var n=t
if(e.input.shiftKey=16==n.keyCode||n.shiftKey,!It(e,n)&&(e.input.lastKeyCode=n.keyCode,e.input.lastKeyCodeTime=Date.now(),!K||!V||13!=n.keyCode))if(229!=n.keyCode&&e.domObserver.forceFlush(),!J||13!=n.keyCode||n.ctrlKey||n.altKey||n.metaKey)e.someProp("handleKeyDown",(function(t){return t(e,n)}))||function(e,t){var n=t.keyCode,r=function(e){var t=""
return e.ctrlKey&&(t+="c"),e.metaKey&&(t+="m"),e.altKey&&(t+="a"),e.shiftKey&&(t+="s"),t}(t)
if(8==n||W&&72==n&&"c"==r)return st(e,-1)||tt(e,-1)
if(46==n&&!t.shiftKey||W&&68==n&&"c"==r)return st(e,1)||tt(e,1)
if(13==n||27==n)return!0
if(37==n||W&&66==n&&"c"==r){var o=37==n?"ltr"==ot(e,e.state.selection.from)?-1:1:-1
return Qe(e,o,r)||tt(e,o)}if(39==n||W&&70==n&&"c"==r){var i=39==n?"ltr"==ot(e,e.state.selection.from)?1:-1:1
return Qe(e,i,r)||tt(e,i)}return 38==n||W&&80==n&&"c"==r?it(e,-1,r)||tt(e,-1):40==n||W&&78==n&&"c"==r?function(e){if(!L||e.state.selection.$head.parentOffset>0)return!1
var t=e.domSelectionRange(),n=t.focusNode,r=t.focusOffset
if(n&&1==n.nodeType&&0==r&&n.firstChild&&"false"==n.firstChild.contentEditable){var o=n.firstChild
at(e,o,"true"),setTimeout((function(){return at(e,o,"false")}),20)}return!1}(e)||it(e,1,r)||tt(e,1):r==(W?"m":"c")&&(66==n||73==n||89==n||90==n)}(e,n)?n.preventDefault():xt(e,"key")
else{var r=Date.now()
e.input.lastIOSEnter=r,e.input.lastIOSEnterFallbackTimeout=setTimeout((function(){e.input.lastIOSEnter==r&&(e.someProp("handleKeyDown",(function(t){return t(e,E(13,"Enter"))})),e.input.lastIOSEnter=0)}),200)}},bt.keyup=function(e,t){16==t.keyCode&&(e.input.shiftKey=!1)},bt.keypress=function(e,t){var n=t
if(!(It(e,n)||!n.charCode||n.ctrlKey&&!n.altKey||W&&n.metaKey))if(e.someProp("handleKeyPress",(function(t){return t(e,n)})))n.preventDefault()
else{var r=e.state.selection
if(!(r instanceof v.TextSelection&&r.$from.sameParent(r.$to))){var o=String.fromCharCode(n.charCode);/[\r\n]/.test(o)||e.someProp("handleTextInput",(function(t){return t(e,r.$from.pos,r.$to.pos,o)}))||e.dispatch(e.state.tr.insertText(o).scrollIntoView()),n.preventDefault()}}}
var Pt=W?"metaKey":"ctrlKey"
kt.mousedown=function(e,t){var n=t
e.input.shiftKey=n.shiftKey
var r=At(e),o=Date.now(),i="singleClick"
o-e.input.lastClick.time<500&&function(e,t){var n=t.x-e.clientX,r=t.y-e.clientY
return n*n+r*r<100}(n,e.input.lastClick)&&!n[Pt]&&("singleClick"==e.input.lastClick.type?i="doubleClick":"doubleClick"==e.input.lastClick.type&&(i="tripleClick")),e.input.lastClick={time:o,x:n.clientX,y:n.clientY,type:i}
var s=e.posAtCoords(Ct(n))
s&&("singleClick"==i?(e.input.mouseDown&&e.input.mouseDown.done(),e.input.mouseDown=new Rt(e,s,n,!!r)):("doubleClick"==i?Et:Dt)(e,s.pos,s.inside,n)?n.preventDefault():xt(e,"pointer"))}
var Rt=function(){function e(t,n,r,o){var i,s,a=this
if(h(this,e),this.view=t,this.pos=n,this.event=r,this.flushed=o,this.delayedSelectionSync=!1,this.mightDrag=null,this.startDoc=t.state.doc,this.selectNode=!!r[Pt],this.allowDefault=r.shiftKey,n.inside>-1)i=t.state.doc.nodeAt(n.inside),s=n.inside
else{var c=t.state.doc.resolve(n.pos)
i=c.parent,s=c.depth?c.before():0}var l=o?null:r.target,u=l?t.docView.nearestDesc(l,!0):null
this.target=u&&1==u.dom.nodeType?u.dom:null
var d=t.state.selection;(0==r.button&&i.type.spec.draggable&&!1!==i.type.spec.selectable||d instanceof v.NodeSelection&&d.from<=s&&d.to>s)&&(this.mightDrag={node:i,pos:s,addAttr:!(!this.target||this.target.draggable),setUneditable:!(!this.target||!F||this.target.hasAttribute("contentEditable"))}),this.target&&this.mightDrag&&(this.mightDrag.addAttr||this.mightDrag.setUneditable)&&(this.view.domObserver.stop(),this.mightDrag.addAttr&&(this.target.draggable=!0),this.mightDrag.setUneditable&&setTimeout((function(){a.view.input.mouseDown==a&&a.target.setAttribute("contentEditable","false")}),20),this.view.domObserver.start()),t.root.addEventListener("mouseup",this.up=this.up.bind(this)),t.root.addEventListener("mousemove",this.move=this.move.bind(this)),xt(t,"pointer")}return m(e,[{key:"done",value:function(){var e=this
this.view.root.removeEventListener("mouseup",this.up),this.view.root.removeEventListener("mousemove",this.move),this.mightDrag&&this.target&&(this.view.domObserver.stop(),this.mightDrag.addAttr&&this.target.removeAttribute("draggable"),this.mightDrag.setUneditable&&this.target.removeAttribute("contentEditable"),this.view.domObserver.start()),this.delayedSelectionSync&&setTimeout((function(){return Ve(e.view)})),this.view.input.mouseDown=null}},{key:"up",value:function(e){if(this.done(),this.view.dom.contains(e.target)){var t=this.pos
this.view.state.doc!=this.startDoc&&(t=this.view.posAtCoords(Ct(e))),this.updateAllowDefault(e),this.allowDefault||!t?xt(this.view,"pointer"):function(e,t,n,r,o){return Tt(e,"handleClickOn",t,n,r)||e.someProp("handleClick",(function(n){return n(e,t,r)}))||(o?function(e,t){if(-1==t)return!1
var n,r,o=e.state.selection
o instanceof v.NodeSelection&&(n=o.node)
for(var i=e.state.doc.resolve(t),s=i.depth+1;s>0;s--){var a=s>i.depth?i.nodeAfter:i.node(s)
if(v.NodeSelection.isSelectable(a)){r=n&&o.$from.depth>0&&s>=o.$from.depth&&i.before(o.$from.depth+1)==o.$from.pos?i.before(o.$from.depth):i.before(s)
break}}return null!=r&&(Nt(e,v.NodeSelection.create(e.state.doc,r),"pointer"),!0)}(e,n):function(e,t){if(-1==t)return!1
var n=e.state.doc.resolve(t),r=n.nodeAfter
return!!(r&&r.isAtom&&v.NodeSelection.isSelectable(r))&&(Nt(e,new v.NodeSelection(n),"pointer"),!0)}(e,n))}(this.view,t.pos,t.inside,e,this.selectNode)?e.preventDefault():0==e.button&&(this.flushed||L&&this.mightDrag&&!this.mightDrag.node.isAtom||V&&!this.view.state.selection.visible&&Math.min(Math.abs(t.pos-this.view.state.selection.from),Math.abs(t.pos-this.view.state.selection.to))<=2)?(Nt(this.view,v.Selection.near(this.view.state.doc.resolve(t.pos)),"pointer"),e.preventDefault()):xt(this.view,"pointer")}}},{key:"move",value:function(e){this.updateAllowDefault(e),xt(this.view,"pointer"),0==e.buttons&&this.done()}},{key:"updateAllowDefault",value:function(e){!this.allowDefault&&(Math.abs(this.event.x-e.clientX)>4||Math.abs(this.event.y-e.clientY)>4)&&(this.allowDefault=!0)}}]),e}()
function It(e,t){return!!e.composing||!!(L&&Math.abs(t.timeStamp-e.input.compositionEndedAt)<500)&&(e.input.compositionEndedAt=-2e8,!0)}kt.touchstart=function(e){e.input.lastTouch=Date.now(),At(e),xt(e,"pointer")},kt.touchmove=function(e){e.input.lastTouch=Date.now(),xt(e,"pointer")},kt.contextmenu=function(e){return At(e)}
var jt=K?5e3:-1
function zt(e,t){clearTimeout(e.input.composingTimeout),t>-1&&(e.input.composingTimeout=setTimeout((function(){return Ft(e)}),t))}function Bt(e){var t
for(e.composing&&(e.input.composing=!1,e.input.compositionEndedAt=((t=document.createEvent("Event")).initEvent("event",!0,!0),t.timeStamp));e.input.compositionNodes.length>0;)e.input.compositionNodes.pop().markParentsDirty()}function Ft(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1]
if(!(K&&e.domObserver.flushingSoon>=0)){if(e.domObserver.forceFlush(),Bt(e),t||e.docView&&e.docView.dirty){var n=Fe(e)
return n&&!n.eq(e.state.selection)?e.dispatch(e.state.tr.setSelection(n)):e.updateState(e.state),!0}return!1}}bt.compositionstart=bt.compositionupdate=function(e){if(!e.composing){e.domObserver.flush()
var t=e.state,n=t.selection.$to
if(t.selection instanceof v.TextSelection&&(t.storedMarks||!n.textOffset&&n.parentOffset&&n.nodeBefore.marks.some((function(e){return!1===e.type.spec.inclusive}))))e.markCursor=e.state.storedMarks||n.marks(),Ft(e,!0),e.markCursor=null
else if(Ft(e),F&&t.selection.empty&&n.parentOffset&&!n.textOffset&&n.nodeBefore.marks.length)for(var r=e.domSelectionRange(),o=r.focusNode,i=r.focusOffset;o&&1==o.nodeType&&0!=i;){var s=i<0?o.lastChild:o.childNodes[i-1]
if(!s)break
if(3==s.nodeType){var a=e.domSelection()
a&&a.collapse(s,s.nodeValue.length)
break}o=s,i=-1}e.input.composing=!0}zt(e,jt)},bt.compositionend=function(e,t){e.composing&&(e.input.composing=!1,e.input.compositionEndedAt=t.timeStamp,e.input.compositionPendingChanges=e.domObserver.pendingRecords().length?e.input.compositionID:0,e.input.compositionNode=null,e.input.compositionPendingChanges&&Promise.resolve().then((function(){return e.domObserver.flush()})),e.input.compositionID++,zt(e,20))}
var $t=z&&B<15||J&&U<604
function Vt(e,t,n,r,o){var i=lt(e,t,n,r,e.state.selection.$from)
if(e.someProp("handlePaste",(function(t){return t(e,o,i||y.Slice.empty)})))return!0
if(!i)return!1
var s=function(e){return 0==e.openStart&&0==e.openEnd&&1==e.content.childCount?e.content.firstChild:null}(i),a=s?e.state.tr.replaceSelectionWith(s,r):e.state.tr.replaceSelection(i)
return e.dispatch(a.scrollIntoView().setMeta("paste",!0).setMeta("uiEvent","paste")),!0}function _t(e){var t=e.getData("text/plain")||e.getData("Text")
if(t)return t
var n=e.getData("text/uri-list")
return n?n.replace(/\r?\n/g," "):""}kt.copy=bt.cut=function(e,t){var n=t,r=e.state.selection,o="cut"==n.type
if(!r.empty){var i=$t?null:n.clipboardData,s=ct(e,r.content()),a=s.dom,c=s.text
i?(n.preventDefault(),i.clearData(),i.setData("text/html",a.innerHTML),i.setData("text/plain",c)):function(e,t){if(e.dom.parentNode){var n=e.dom.parentNode.appendChild(document.createElement("div"))
n.appendChild(t),n.style.cssText="position: fixed; left: -10000px; top: 10px"
var r=getSelection(),o=document.createRange()
o.selectNodeContents(t),e.dom.blur(),r.removeAllRanges(),r.addRange(o),setTimeout((function(){n.parentNode&&n.parentNode.removeChild(n),e.focus()}),50)}}(e,a),o&&e.dispatch(e.state.tr.deleteSelection().scrollIntoView().setMeta("uiEvent","cut"))}},bt.paste=function(e,t){var n=t
if(!e.composing||K){var r=$t?null:n.clipboardData,o=e.input.shiftKey&&45!=e.input.lastKeyCode
r&&Vt(e,_t(r),r.getData("text/html"),o,n)?n.preventDefault():function(e,t){if(e.dom.parentNode){var n=e.input.shiftKey||e.state.selection.$from.parent.type.spec.code,r=e.dom.parentNode.appendChild(document.createElement(n?"textarea":"div"))
n||(r.contentEditable="true"),r.style.cssText="position: fixed; left: -10000px; top: 10px",r.focus()
var o=e.input.shiftKey&&45!=e.input.lastKeyCode
setTimeout((function(){e.focus(),r.parentNode&&r.parentNode.removeChild(r),n?Vt(e,r.value,null,o,t):Vt(e,r.textContent,r.innerHTML,o,t)}),50)}}(e,n)}}
var Lt=m((function e(t,n,r){h(this,e),this.slice=t,this.move=n,this.node=r})),Jt=W?"altKey":"ctrlKey"
for(var Wt in kt.dragstart=function(e,t){var n=t,r=e.input.mouseDown
if(r&&r.done(),n.dataTransfer){var o,i=e.state.selection,s=i.empty?null:e.posAtCoords(Ct(n))
if(s&&s.pos>=i.from&&s.pos<=(i instanceof v.NodeSelection?i.to-1:i.to));else if(r&&r.mightDrag)o=v.NodeSelection.create(e.state.doc,r.mightDrag.pos)
else if(n.target&&1==n.target.nodeType){var a=e.docView.nearestDesc(n.target,!0)
a&&a.node.type.spec.draggable&&a!=e.docView&&(o=v.NodeSelection.create(e.state.doc,a.posBefore))}var c=ct(e,(o||e.state.selection).content()),l=c.dom,u=c.text,d=c.slice;(!n.dataTransfer.files.length||!V||_>120)&&n.dataTransfer.clearData(),n.dataTransfer.setData($t?"Text":"text/html",l.innerHTML),n.dataTransfer.effectAllowed="copyMove",$t||n.dataTransfer.setData("text/plain",u),e.dragging=new Lt(d,!n[Jt],o)}},kt.dragend=function(e){var t=e.dragging
window.setTimeout((function(){e.dragging==t&&(e.dragging=null)}),50)},bt.dragover=bt.dragenter=function(e,t){return t.preventDefault()},bt.drop=function(e,t){var n=t,r=e.dragging
if(e.dragging=null,n.dataTransfer){var o=e.posAtCoords(Ct(n))
if(o){var i=e.state.doc.resolve(o.pos),s=r&&r.slice
s?e.someProp("transformPasted",(function(t){s=t(s,e)})):s=lt(e,_t(n.dataTransfer),$t?null:n.dataTransfer.getData("text/html"),!1,i)
var a=!(!r||n[Jt])
if(e.someProp("handleDrop",(function(t){return t(e,n,s||y.Slice.empty,a)})))n.preventDefault()
else if(s){n.preventDefault()
var c=s?g.dropPoint(e.state.doc,i.pos,s):i.pos
null==c&&(c=i.pos)
var l=e.state.tr
if(a){var u=r.node
u?u.replace(l):l.deleteSelection()}var d=l.mapping.map(c),f=0==s.openStart&&0==s.openEnd&&1==s.content.childCount,h=l.doc
if(f?l.replaceRangeWith(d,d,s.content.firstChild):l.replaceRange(d,d,s),!l.doc.eq(h)){var p=l.doc.resolve(d)
if(f&&v.NodeSelection.isSelectable(s.content.firstChild)&&p.nodeAfter&&p.nodeAfter.sameMarkup(s.content.firstChild))l.setSelection(new v.NodeSelection(p))
else{var m=l.mapping.map(c)
l.mapping.maps[l.mapping.maps.length-1].forEach((function(e,t,n,r){return m=r})),l.setSelection(He(e,p,l.doc.resolve(m)))}e.focus(),e.dispatch(l.setMeta("uiEvent","drop"))}}}}},kt.focus=function(e){e.input.lastFocus=Date.now(),e.focused||(e.domObserver.stop(),e.dom.classList.add("ProseMirror-focused"),e.domObserver.start(),e.focused=!0,setTimeout((function(){e.docView&&e.hasFocus()&&!e.domObserver.currentSelection.eq(e.domSelectionRange())&&Ve(e)}),20))},kt.blur=function(e,t){var n=t
e.focused&&(e.domObserver.stop(),e.dom.classList.remove("ProseMirror-focused"),e.domObserver.start(),n.relatedTarget&&e.dom.contains(n.relatedTarget)&&e.domObserver.currentSelection.clear(),e.focused=!1)},kt.beforeinput=function(e,t){if(V&&K&&"deleteContentBackward"==t.inputType){e.domObserver.flushSoon()
var n=e.input.domChangeCount
setTimeout((function(){if(e.input.domChangeCount==n&&(e.dom.blur(),e.focus(),!e.someProp("handleKeyDown",(function(t){return t(e,E(8,"Backspace"))})))){var t=e.state.selection.$cursor
t&&t.pos>0&&e.dispatch(e.state.tr.delete(t.pos-1,t.pos).scrollIntoView())}}),50)}},bt)kt[Wt]=bt[Wt]
function qt(e,t){if(e==t)return!0
for(var n in e)if(e[n]!==t[n])return!1
for(var r in t)if(!(r in e))return!1
return!0}var Kt=function(){function e(t,n){h(this,e),this.toDOM=t,this.spec=n||Yt,this.side=this.spec.side||0}return m(e,[{key:"map",value:function(e,t,n,r){var o=e.mapResult(t.from+r,this.side<0?-1:1),i=o.pos
return o.deleted?null:new Gt(i-n,i-n,this)}},{key:"valid",value:function(){return!0}},{key:"eq",value:function(t){return this==t||t instanceof e&&(this.spec.key&&this.spec.key==t.spec.key||this.toDOM==t.toDOM&&qt(this.spec,t.spec))}},{key:"destroy",value:function(e){this.spec.destroy&&this.spec.destroy(e)}}]),e}(),Ht=function(){function e(t,n){h(this,e),this.attrs=t,this.spec=n||Yt}return m(e,[{key:"map",value:function(e,t,n,r){var o=e.map(t.from+r,this.spec.inclusiveStart?-1:1)-n,i=e.map(t.to+r,this.spec.inclusiveEnd?1:-1)-n
return o>=i?null:new Gt(o,i,this)}},{key:"valid",value:function(e,t){return t.from<t.to}},{key:"eq",value:function(t){return this==t||t instanceof e&&qt(this.attrs,t.attrs)&&qt(this.spec,t.spec)}},{key:"destroy",value:function(){}}],[{key:"is",value:function(t){return t.type instanceof e}}]),e}(),Ut=function(){function e(t,n){h(this,e),this.attrs=t,this.spec=n||Yt}return m(e,[{key:"map",value:function(e,t,n,r){var o=e.mapResult(t.from+r,1)
if(o.deleted)return null
var i=e.mapResult(t.to+r,-1)
return i.deleted||i.pos<=o.pos?null:new Gt(o.pos-n,i.pos-n,this)}},{key:"valid",value:function(e,t){var n,r=e.content.findIndex(t.from),o=r.index,i=r.offset
return i==t.from&&!(n=e.child(o)).isText&&i+n.nodeSize==t.to}},{key:"eq",value:function(t){return this==t||t instanceof e&&qt(this.attrs,t.attrs)&&qt(this.spec,t.spec)}},{key:"destroy",value:function(){}}]),e}(),Gt=function(){function e(t,n,r){h(this,e),this.from=t,this.to=n,this.type=r}return m(e,[{key:"copy",value:function(t,n){return new e(t,n,this.type)}},{key:"eq",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0
return this.type.eq(e.type)&&this.from+t==e.from&&this.to+t==e.to}},{key:"map",value:function(e,t,n){return this.type.map(e,this,t,n)}},{key:"spec",get:function(){return this.type.spec}},{key:"inline",get:function(){return this.type instanceof Ht}},{key:"widget",get:function(){return this.type instanceof Kt}}],[{key:"widget",value:function(t,n,r){return new e(t,t,new Kt(n,r))}},{key:"inline",value:function(t,n,r,o){return new e(t,n,new Ht(r,o))}},{key:"node",value:function(t,n,r,o){return new e(t,n,new Ut(r,o))}}]),e}(),Xt=[],Yt={},Qt=function(){function e(t,n){h(this,e),this.local=t.length?t:Xt,this.children=n.length?n:Xt}return m(e,[{key:"find",value:function(e,t,n){var r=[]
return this.findInner(null==e?0:e,null==t?1e9:t,r,0,n),r}},{key:"findInner",value:function(e,t,n,r,o){for(var i=0;i<this.local.length;i++){var s=this.local[i]
s.from<=t&&s.to>=e&&(!o||o(s.spec))&&n.push(s.copy(s.from+r,s.to+r))}for(var a=0;a<this.children.length;a+=3)if(this.children[a]<t&&this.children[a+1]>e){var c=this.children[a]+1
this.children[a+2].findInner(e-c,t-c,n,r+c,o)}}},{key:"map",value:function(e,t,n){return this==Zt||0==e.maps.length?this:this.mapInner(e,t,0,0,n||Yt)}},{key:"mapInner",value:function(t,n,r,o,i){for(var s,a=0;a<this.local.length;a++){var c=this.local[a].map(t,r,o)
c&&c.type.valid(n,c)?(s||(s=[])).push(c):i.onRemove&&i.onRemove(this.local[a].spec)}return this.children.length?function(e,t,n,r,o,i,s){for(var a=e.slice(),c=function(e){var t=0
n.maps[l].forEach((function(n,r,o,i){for(var s=i-o-(r-n),c=0;c<a.length;c+=3){var l=a[c+1]
if(!(l<0||n>l+e-t)){var u=a[c]+e-t
r>=u?a[c+1]=n<=u?-2:-1:n>=e&&s&&(a[c]+=s,a[c+1]+=s)}}t+=s})),e=n.maps[l].map(e,-1),u=e},l=0,u=i;l<n.maps.length;l++)c(u)
for(var d=!1,f=0;f<a.length;f+=3)if(a[f+1]<0){if(-2==a[f+1]){d=!0,a[f+1]=-1
continue}var h=n.map(e[f]+i),p=h-o
if(p<0||p>=r.content.size){d=!0
continue}var m=n.map(e[f+1]+i,-1)-o,v=r.content.findIndex(p),y=v.index,g=v.offset,k=r.maybeChild(y)
if(k&&g==p&&g+k.nodeSize==m){var b=a[f+2].mapInner(n,k,h+1,e[f]+i+1,s)
b!=Zt?(a[f]=p,a[f+1]=m,a[f+2]=b):(a[f+1]=-2,d=!0)}else d=!0}if(d){var w=function(e,t,n,r,o,i,s){function a(e,t){for(var i=0;i<e.local.length;i++){var c=e.local[i].map(r,o,t)
c?n.push(c):s.onRemove&&s.onRemove(e.local[i].spec)}for(var l=0;l<e.children.length;l+=3)a(e.children[l+2],e.children[l]+t+1)}for(var c=0;c<e.length;c+=3)-1==e[c+1]&&a(e[c+2],t[c]+i+1)
return n}(a,e,t,n,o,i,s),S=on(w,r,0,s)
t=S.local
for(var x=0;x<a.length;x+=3)a[x+1]<0&&(a.splice(x,3),x-=3)
for(var O=0,M=0;O<S.children.length;O+=3){for(var C=S.children[O];M<a.length&&a[M]<C;)M+=3
a.splice(M,0,S.children[O],S.children[O+1],S.children[O+2])}}return new Qt(t.sort(sn),a)}(this.children,s||[],t,n,r,o,i):s?new e(s.sort(sn),Xt):Zt}},{key:"add",value:function(t,n){return n.length?this==Zt?e.create(t,n):this.addInner(t,n,0):this}},{key:"addInner",value:function(t,n,r){var o,i=this,s=0
t.forEach((function(e,t){var a,c=t+r
if(a=nn(n,e,c)){for(o||(o=i.children.slice());s<o.length&&o[s]<t;)s+=3
o[s]==t?o[s+2]=o[s+2].addInner(e,a,c+1):o.splice(s,0,t,t+e.nodeSize,on(a,e,c+1,Yt)),s+=3}}))
for(var a=tn(s?rn(n):n,-r),c=0;c<a.length;c++)a[c].type.valid(t,a[c])||a.splice(c--,1)
return new e(a.length?this.local.concat(a).sort(sn):this.local,o||this.children)}},{key:"remove",value:function(e){return 0==e.length||this==Zt?this:this.removeInner(e,0)}},{key:"removeInner",value:function(t,n){for(var r=this.children,o=this.local,i=0;i<r.length;i+=3){for(var s,a=void 0,c=r[i]+n,l=r[i+1]+n,u=0;u<t.length;u++)(s=t[u])&&s.from>c&&s.to<l&&(t[u]=null,(a||(a=[])).push(s))
if(a){r==this.children&&(r=this.children.slice())
var d=r[i+2].removeInner(a,c+1)
d!=Zt?r[i+2]=d:(r.splice(i,3),i-=3)}}if(o.length)for(var f,h=0;h<t.length;h++)if(f=t[h])for(var p=0;p<o.length;p++)o[p].eq(f,n)&&(o==this.local&&(o=this.local.slice()),o.splice(p--,1))
return r==this.children&&o==this.local?this:o.length||r.length?new e(o,r):Zt}},{key:"forChild",value:function(t,n){if(this==Zt)return this
if(n.isLeaf)return e.empty
for(var r,o,i=0;i<this.children.length;i+=3)if(this.children[i]>=t){this.children[i]==t&&(r=this.children[i+2])
break}for(var s=t+1,a=s+n.content.size,c=0;c<this.local.length;c++){var l=this.local[c]
if(l.from<a&&l.to>s&&l.type instanceof Ht){var u=Math.max(s,l.from)-s,d=Math.min(a,l.to)-s
u<d&&(o||(o=[])).push(l.copy(u,d))}}if(o){var f=new e(o.sort(sn),Xt)
return r?new en([f,r]):f}return r||Zt}},{key:"eq",value:function(t){if(this==t)return!0
if(!(t instanceof e)||this.local.length!=t.local.length||this.children.length!=t.children.length)return!1
for(var n=0;n<this.local.length;n++)if(!this.local[n].eq(t.local[n]))return!1
for(var r=0;r<this.children.length;r+=3)if(this.children[r]!=t.children[r]||this.children[r+1]!=t.children[r+1]||!this.children[r+2].eq(t.children[r+2]))return!1
return!0}},{key:"locals",value:function(e){return an(this.localsInner(e))}},{key:"localsInner",value:function(e){if(this==Zt)return Xt
if(e.inlineContent||!this.local.some(Ht.is))return this.local
for(var t=[],n=0;n<this.local.length;n++)this.local[n].type instanceof Ht||t.push(this.local[n])
return t}}],[{key:"create",value:function(e,t){return t.length?on(t,e,0,Yt):Zt}}]),e}()
Qt.empty=new Qt([],[]),Qt.removeOverlap=an
var Zt=Qt.empty,en=function(){function e(t){h(this,e),this.members=t}return m(e,[{key:"map",value:function(t,n){var r=this.members.map((function(e){return e.map(t,n,Yt)}))
return e.from(r)}},{key:"forChild",value:function(t,n){if(n.isLeaf)return Qt.empty
for(var r=[],o=0;o<this.members.length;o++){var i=this.members[o].forChild(t,n)
i!=Zt&&(i instanceof e?r=r.concat(i.members):r.push(i))}return e.from(r)}},{key:"eq",value:function(t){if(!(t instanceof e)||t.members.length!=this.members.length)return!1
for(var n=0;n<this.members.length;n++)if(!this.members[n].eq(t.members[n]))return!1
return!0}},{key:"locals",value:function(e){for(var t,n=!0,r=0;r<this.members.length;r++){var o=this.members[r].localsInner(e)
if(o.length)if(t){n&&(t=t.slice(),n=!1)
for(var i=0;i<o.length;i++)t.push(o[i])}else t=o}return t?an(n?t:t.sort(sn)):Xt}}],[{key:"from",value:function(t){switch(t.length){case 0:return Zt
case 1:return t[0]
default:return new e(t.every((function(e){return e instanceof Qt}))?t:t.reduce((function(e,t){return e.concat(t instanceof Qt?t:t.members)}),[]))}}}]),e}()
function tn(e,t){if(!t||!e.length)return e
for(var n=[],r=0;r<e.length;r++){var o=e[r]
n.push(new Gt(o.from+t,o.to+t,o.type))}return n}function nn(e,t,n){if(t.isLeaf)return null
for(var r,o=n+t.nodeSize,i=null,s=0;s<e.length;s++)(r=e[s])&&r.from>n&&r.to<o&&((i||(i=[])).push(r),e[s]=null)
return i}function rn(e){for(var t=[],n=0;n<e.length;n++)null!=e[n]&&t.push(e[n])
return t}function on(e,t,n,r){var o=[],i=!1
t.forEach((function(t,s){var a=nn(e,t,s+n)
if(a){i=!0
var c=on(a,t,n+s+1,r)
c!=Zt&&o.push(s,s+t.nodeSize,c)}}))
for(var s=tn(i?rn(e):e,-n).sort(sn),a=0;a<s.length;a++)s[a].type.valid(t,s[a])||(r.onRemove&&r.onRemove(s[a].spec),s.splice(a--,1))
return s.length||o.length?new Qt(s,o):Zt}function sn(e,t){return e.from-t.from||e.to-t.to}function an(e){for(var t=e,n=0;n<t.length-1;n++){var r=t[n]
if(r.from!=r.to)for(var o=n+1;o<t.length;o++){var i=t[o]
if(i.from!=r.from){i.from<r.to&&(t==e&&(t=e.slice()),t[n]=r.copy(r.from,i.from),cn(t,o,r.copy(i.from,r.to)))
break}i.to!=r.to&&(t==e&&(t=e.slice()),t[o]=i.copy(i.from,r.to),cn(t,o+1,i.copy(r.to,i.to)))}}return t}function cn(e,t,n){for(;t<e.length&&sn(n,e[t])>0;)t++
e.splice(t,0,n)}function ln(e){var t=[]
return e.someProp("decorations",(function(n){var r=n(e.state)
r&&r!=Zt&&t.push(r)})),e.cursorWrapper&&t.push(Qt.create(e.state.doc,[e.cursorWrapper.deco])),en.from(t)}var un={childList:!0,characterData:!0,characterDataOldValue:!0,attributes:!0,attributeOldValue:!0,subtree:!0},dn=z&&B<=11,fn=function(){function e(){h(this,e),this.anchorNode=null,this.anchorOffset=0,this.focusNode=null,this.focusOffset=0}return m(e,[{key:"set",value:function(e){this.anchorNode=e.anchorNode,this.anchorOffset=e.anchorOffset,this.focusNode=e.focusNode,this.focusOffset=e.focusOffset}},{key:"clear",value:function(){this.anchorNode=this.focusNode=null}},{key:"eq",value:function(e){return e.anchorNode==this.anchorNode&&e.anchorOffset==this.anchorOffset&&e.focusNode==this.focusNode&&e.focusOffset==this.focusOffset}}]),e}(),hn=function(){function e(t,n){var r=this
h(this,e),this.view=t,this.handleDOMChange=n,this.queue=[],this.flushingSoon=-1,this.observer=null,this.currentSelection=new fn,this.onCharData=null,this.suppressingSelectionUpdates=!1,this.lastChangedTextNode=null,this.observer=window.MutationObserver&&new window.MutationObserver((function(e){for(var t=0;t<e.length;t++)r.queue.push(e[t])
z&&B<=11&&e.some((function(e){return"childList"==e.type&&e.removedNodes.length||"characterData"==e.type&&e.oldValue.length>e.target.nodeValue.length}))?r.flushSoon():r.flush()})),dn&&(this.onCharData=function(e){r.queue.push({target:e.target,type:"characterData",oldValue:e.prevValue}),r.flushSoon()}),this.onSelectionChange=this.onSelectionChange.bind(this)}return m(e,[{key:"flushSoon",value:function(){var e=this
this.flushingSoon<0&&(this.flushingSoon=window.setTimeout((function(){e.flushingSoon=-1,e.flush()}),20))}},{key:"forceFlush",value:function(){this.flushingSoon>-1&&(window.clearTimeout(this.flushingSoon),this.flushingSoon=-1,this.flush())}},{key:"start",value:function(){this.observer&&(this.observer.takeRecords(),this.observer.observe(this.view.dom,un)),this.onCharData&&this.view.dom.addEventListener("DOMCharacterDataModified",this.onCharData),this.connectSelection()}},{key:"stop",value:function(){var e=this
if(this.observer){var t=this.observer.takeRecords()
if(t.length){for(var n=0;n<t.length;n++)this.queue.push(t[n])
window.setTimeout((function(){return e.flush()}),20)}this.observer.disconnect()}this.onCharData&&this.view.dom.removeEventListener("DOMCharacterDataModified",this.onCharData),this.disconnectSelection()}},{key:"connectSelection",value:function(){this.view.dom.ownerDocument.addEventListener("selectionchange",this.onSelectionChange)}},{key:"disconnectSelection",value:function(){this.view.dom.ownerDocument.removeEventListener("selectionchange",this.onSelectionChange)}},{key:"suppressSelectionUpdates",value:function(){var e=this
this.suppressingSelectionUpdates=!0,setTimeout((function(){return e.suppressingSelectionUpdates=!1}),50)}},{key:"onSelectionChange",value:function(){if(Ue(this.view)){if(this.suppressingSelectionUpdates)return Ve(this.view)
if(z&&B<=11&&!this.view.state.selection.empty){var e=this.view.domSelectionRange()
if(e.focusNode&&x(e.focusNode,e.focusOffset,e.anchorNode,e.anchorOffset))return this.flushSoon()}this.flush()}}},{key:"setCurSelection",value:function(){this.currentSelection.set(this.view.domSelectionRange())}},{key:"ignoreSelectionChange",value:function(e){if(!e.focusNode)return!0
for(var t,n=new Set,r=e.focusNode;r;r=b(r))n.add(r)
for(var o=e.anchorNode;o;o=b(o))if(n.has(o)){t=o
break}var i=t&&this.view.docView.nearestDesc(t)
return i&&i.ignoreMutation({type:"selection",target:3==t.nodeType?t.parentNode:t})?(this.setCurSelection(),!0):void 0}},{key:"pendingRecords",value:function(){if(this.observer){var e,t=r(this.observer.takeRecords())
try{for(t.s();!(e=t.n()).done;){var n=e.value
this.queue.push(n)}}catch(e){t.e(e)}finally{t.f()}}return this.queue}},{key:"flush",value:function(){var e=this.view
if(e.docView&&!(this.flushingSoon>-1)){var t=this.pendingRecords()
t.length&&(this.queue=[])
var n=e.domSelectionRange(),i=!this.suppressingSelectionUpdates&&!this.currentSelection.eq(n)&&Ue(e)&&!this.ignoreSelectionChange(n),s=-1,a=-1,c=!1,l=[]
if(e.editable)for(var u=0;u<t.length;u++){var d=this.registerMutation(t[u],l)
d&&(s=s<0?d.from:Math.min(d.from,s),a=a<0?d.to:Math.max(d.to,a),d.typeOver&&(c=!0))}if(F&&l.length){var f=l.filter((function(e){return"BR"==e.nodeName}))
if(2==f.length){var h=function(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]
if(null!=n){var r,o,i,s,a=[],c=!0,l=!1
try{for(i=(n=n.call(e)).next,!2;!(c=(r=i.call(n)).done)&&(a.push(r.value),2!==a.length);c=!0);}catch(e){l=!0,o=e}finally{try{if(!c&&null!=n.return&&(s=n.return(),Object(s)!==s))return}finally{if(l)throw o}}return a}}(e)||o(e,2)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}(f),p=h[0],m=h[1]
p.parentNode&&p.parentNode.parentNode==m.parentNode?m.remove():p.remove()}else{var y,g=this.currentSelection.focusNode,k=r(f)
try{for(k.s();!(y=k.n()).done;){var b=y.value,w=b.parentNode
!w||"LI"!=w.nodeName||g&&yn(e,g)==w||b.remove()}}catch(e){k.e(e)}finally{k.f()}}}var S=null
s<0&&i&&e.input.lastFocus>Date.now()-200&&Math.max(e.input.lastTouch,e.input.lastClick.time)<Date.now()-300&&N(n)&&(S=Fe(e))&&S.eq(v.Selection.near(e.state.doc.resolve(0),1))?(e.input.lastFocus=0,Ve(e),this.currentSelection.set(n),e.scrollToSelection()):(s>-1||i)&&(s>-1&&(e.docView.markDirty(s,a),function(e){if(!pn.has(e)&&(pn.set(e,null),-1!==["normal","nowrap","pre-line"].indexOf(getComputedStyle(e.dom).whiteSpace))){if(e.requiresGeckoHackNode=F,mn)return
console.warn("ProseMirror expects the CSS white-space property to be set, preferably to 'pre-wrap'. It is recommended to load style/prosemirror.css from the prosemirror-view package."),mn=!0}}(e)),this.handleDOMChange(s,a,c,l),e.docView&&e.docView.dirty?e.updateState(e.state):this.currentSelection.eq(n)||Ve(e),this.currentSelection.set(n))}}},{key:"registerMutation",value:function(e,t){if(t.indexOf(e.target)>-1)return null
var n=this.view.docView.nearestDesc(e.target)
if("attributes"==e.type&&(n==this.view.docView||"contenteditable"==e.attributeName||"style"==e.attributeName&&!e.oldValue&&!e.target.getAttribute("style")))return null
if(!n||n.ignoreMutation(e))return null
if("childList"==e.type){for(var r=0;r<e.addedNodes.length;r++){var o=e.addedNodes[r]
t.push(o),3==o.nodeType&&(this.lastChangedTextNode=o)}if(n.contentDOM&&n.contentDOM!=n.dom&&!n.contentDOM.contains(e.target))return{from:n.posBefore,to:n.posAfter}
var i=e.previousSibling,s=e.nextSibling
if(z&&B<=11&&e.addedNodes.length)for(var a=0;a<e.addedNodes.length;a++){var c=e.addedNodes[a],l=c.previousSibling,u=c.nextSibling;(!l||Array.prototype.indexOf.call(e.addedNodes,l)<0)&&(i=l),(!u||Array.prototype.indexOf.call(e.addedNodes,u)<0)&&(s=u)}var d=i&&i.parentNode==e.target?k(i)+1:0,f=n.localPosFromDOM(e.target,d,-1),h=s&&s.parentNode==e.target?k(s):e.target.childNodes.length
return{from:f,to:n.localPosFromDOM(e.target,h,1)}}return"attributes"==e.type?{from:n.posAtStart-n.border,to:n.posAtEnd+n.border}:(this.lastChangedTextNode=e.target,{from:n.posAtStart,to:n.posAtEnd,typeOver:e.target.nodeValue==e.oldValue})}}]),e}(),pn=new WeakMap,mn=!1
function vn(e,t){var n=t.startContainer,r=t.startOffset,o=t.endContainer,i=t.endOffset,s=e.domAtPos(e.state.selection.anchor)
if(x(s.node,s.offset,o,i)){var a=[o,i,n,r]
n=a[0],r=a[1],o=a[2],i=a[3]}return{anchorNode:n,anchorOffset:r,focusNode:o,focusOffset:i}}function yn(e,t){for(var n=t.parentNode;n&&n!=e.dom;n=n.parentNode){var r=e.docView.nearestDesc(n,!0)
if(r&&r.node.isBlock)return n}return null}function gn(e){var t=e.pmViewDesc
if(t)return t.parseRule()
if("BR"==e.nodeName&&e.parentNode){if(L&&/^(ul|ol)$/i.test(e.parentNode.nodeName)){var n=document.createElement("div")
return n.appendChild(document.createElement("li")),{skip:n}}if(e.parentNode.lastChild==e||L&&/^(tr|table)$/i.test(e.parentNode.nodeName))return{ignore:!0}}else if("IMG"==e.nodeName&&e.getAttribute("mark-placeholder"))return{ignore:!0}
return null}var kn=/^(a|abbr|acronym|b|bd[io]|big|br|button|cite|code|data(list)?|del|dfn|em|i|ins|kbd|label|map|mark|meter|output|q|ruby|s|samp|small|span|strong|su[bp]|time|u|tt|var)$/i
function bn(e,t,n){return Math.max(n.anchor,n.head)>t.content.size?null:He(e,t.resolve(n.anchor),t.resolve(n.head))}function wn(e,t,n){for(var r=e.depth,o=t?e.end():e.pos;r>0&&(t||e.indexAfter(r)==e.node(r).childCount);)r--,o++,t=!1
if(n)for(var i=e.node(r).maybeChild(e.indexAfter(r));i&&!i.isLeaf;)i=i.firstChild,o++
return o}function Sn(e){if(2!=e.length)return!1
var t=e.charCodeAt(0),n=e.charCodeAt(1)
return t>=56320&&t<=57343&&n>=55296&&n<=56319}var xn=ct,On=lt,Mn=Ft,Cn=function(){function e(t,n){var r=this
h(this,e),this._root=null,this.focused=!1,this.trackWrites=null,this.mounted=!1,this.markCursor=null,this.cursorWrapper=null,this.lastSelectedViewDesc=void 0,this.input=new St,this.prevDirectPlugins=[],this.pluginViews=[],this.requiresGeckoHackNode=!1,this.dragging=null,this._props=n,this.state=n.state,this.directPlugins=n.plugins||[],this.directPlugins.forEach(An),this.dispatch=this.dispatch.bind(this),this.dom=t&&t.mount||document.createElement("div"),t&&(t.appendChild?t.appendChild(this.dom):"function"==typeof t?t(this.dom):t.mount&&(this.mounted=!0)),this.editable=En(this),Nn(this),this.nodeViews=Dn(this),this.docView=Se(this.state.doc,Tn(this),ln(this),this.dom,this),this.domObserver=new hn(this,(function(e,t,n,o){return function(e,t,n,r,o){var i=e.input.compositionPendingChanges||(e.composing?e.input.compositionID:0)
if(e.input.compositionPendingChanges=0,t<0){var s=e.input.lastSelectionTime>Date.now()-50?e.input.lastSelectionOrigin:null,a=Fe(e,s)
if(a&&!e.state.selection.eq(a)){if(V&&K&&13===e.input.lastKeyCode&&Date.now()-100<e.input.lastKeyCodeTime&&e.someProp("handleKeyDown",(function(t){return t(e,E(13,"Enter"))})))return
var c=e.state.tr.setSelection(a)
"pointer"==s?c.setMeta("pointer",!0):"key"==s&&c.scrollIntoView(),i&&c.setMeta("composition",i),e.dispatch(c)}}else{var l=e.state.doc.resolve(t),u=l.sharedDepth(n)
t=l.before(u+1),n=e.state.doc.resolve(n).after(u+1)
var d,f,h=e.state.selection,p=function(e,t,n){var r,o=e.docView.parseRange(t,n),i=o.node,s=o.fromOffset,a=o.toOffset,c=o.from,l=o.to,u=e.domSelectionRange(),d=u.anchorNode
if(d&&e.dom.contains(1==d.nodeType?d:d.parentNode)&&(r=[{node:d,offset:u.anchorOffset}],N(u)||r.push({node:u.focusNode,offset:u.focusOffset})),V&&8===e.input.lastKeyCode)for(var f=a;f>s;f--){var h=i.childNodes[f-1],p=h.pmViewDesc
if("BR"==h.nodeName&&!p){a=f
break}if(!p||p.size)break}var m=e.state.doc,v=e.someProp("domParser")||y.DOMParser.fromSchema(e.state.schema),g=m.resolve(c),k=null,b=v.parse(i,{topNode:g.parent,topMatch:g.parent.contentMatchAt(g.index()),topOpen:!0,from:s,to:a,preserveWhitespace:"pre"!=g.parent.type.whitespace||"full",findPositions:r,ruleFromNode:gn,context:g})
if(r&&null!=r[0].pos){var w=r[0].pos,S=r[1]&&r[1].pos
null==S&&(S=w),k={anchor:w+c,head:S+c}}return{doc:b,sel:k,from:c,to:l}}(e,t,n),m=e.state.doc,g=m.slice(p.from,p.to)
8===e.input.lastKeyCode&&Date.now()-100<e.input.lastKeyCodeTime?(d=e.state.selection.to,f="end"):(d=e.state.selection.from,f="start"),e.input.lastKeyCode=null
var k=function(e,t,n,r,o){var i=e.findDiffStart(t,n)
if(null==i)return null
var s=e.findDiffEnd(t,n+e.size,n+t.size),a=s.a,c=s.b
if("end"==o&&(r-=a+Math.max(0,i-Math.min(a,c))-i),a<i&&e.size<t.size){var l=r<=i&&r>=a?i-r:0;(i-=l)&&i<t.size&&Sn(t.textBetween(i-1,i+1))&&(i+=l?1:-1),c=i+(c-a),a=i}else if(c<i){var u=r<=i&&r>=c?i-r:0;(i-=u)&&i<e.size&&Sn(e.textBetween(i-1,i+1))&&(i+=u?1:-1),a=i+(a-c),c=i}return{start:i,endA:a,endB:c}}(g.content,p.doc.content,p.from,d,f)
if((J&&e.input.lastIOSEnter>Date.now()-225||K)&&o.some((function(e){return 1==e.nodeType&&!kn.test(e.nodeName)}))&&(!k||k.endA>=k.endB)&&e.someProp("handleKeyDown",(function(t){return t(e,E(13,"Enter"))})))e.input.lastIOSEnter=0
else{if(!k){if(!(r&&h instanceof v.TextSelection&&!h.empty&&h.$head.sameParent(h.$anchor))||e.composing||p.sel&&p.sel.anchor!=p.sel.head){if(p.sel){var b=bn(e,e.state.doc,p.sel)
if(b&&!b.eq(e.state.selection)){var w=e.state.tr.setSelection(b)
i&&w.setMeta("composition",i),e.dispatch(w)}}return}k={start:h.from,endA:h.to,endB:h.to}}e.input.domChangeCount++,e.state.selection.from<e.state.selection.to&&k.start==k.endB&&e.state.selection instanceof v.TextSelection&&(k.start>e.state.selection.from&&k.start<=e.state.selection.from+2&&e.state.selection.from>=p.from?k.start=e.state.selection.from:k.endA<e.state.selection.to&&k.endA>=e.state.selection.to-2&&e.state.selection.to<=p.to&&(k.endB+=e.state.selection.to-k.endA,k.endA=e.state.selection.to)),z&&B<=11&&k.endB==k.start+1&&k.endA==k.start&&k.start>p.from&&"  "==p.doc.textBetween(k.start-p.from-1,k.start-p.from+1)&&(k.start--,k.endA--,k.endB--)
var S,x=p.doc.resolveNoCache(k.start-p.from),O=p.doc.resolveNoCache(k.endB-p.from),M=m.resolve(k.start),C=x.sameParent(O)&&x.parent.inlineContent&&M.end()>=k.endA
if((J&&e.input.lastIOSEnter>Date.now()-225&&(!C||o.some((function(e){return"DIV"==e.nodeName||"P"==e.nodeName})))||!C&&x.pos<p.doc.content.size&&!x.sameParent(O)&&(S=v.Selection.findFrom(p.doc.resolve(x.pos+1),1,!0))&&S.head==O.pos)&&e.someProp("handleKeyDown",(function(t){return t(e,E(13,"Enter"))})))e.input.lastIOSEnter=0
else if(e.state.selection.anchor>k.start&&function(e,t,n,r,o){if(n-t<=o.pos-r.pos||wn(r,!0,!1)<o.pos)return!1
var i=e.resolve(t)
if(!r.parent.isTextblock){var s=i.nodeAfter
return null!=s&&n==t+s.nodeSize}if(i.parentOffset<i.parent.content.size||!i.parent.isTextblock)return!1
var a=e.resolve(wn(i,!0,!0))
return!(!a.parent.isTextblock||a.pos>n||wn(a,!0,!1)<n)&&r.parent.content.cut(r.parentOffset).eq(a.parent.content)}(m,k.start,k.endA,x,O)&&e.someProp("handleKeyDown",(function(t){return t(e,E(8,"Backspace"))})))K&&V&&e.domObserver.suppressSelectionUpdates()
else{V&&K&&k.endB==k.start&&(e.input.lastAndroidDelete=Date.now()),K&&!C&&x.start()!=O.start()&&0==O.parentOffset&&x.depth==O.depth&&p.sel&&p.sel.anchor==p.sel.head&&p.sel.head==k.endA&&(k.endB-=2,O=p.doc.resolveNoCache(k.endB-p.from),setTimeout((function(){e.someProp("handleKeyDown",(function(t){return t(e,E(13,"Enter"))}))}),20))
var T,D,A,P=k.start,R=k.endA
if(C)if(x.pos==O.pos)z&&B<=11&&0==x.parentOffset&&(e.domObserver.suppressSelectionUpdates(),setTimeout((function(){return Ve(e)}),20)),T=e.state.tr.delete(P,R),D=m.resolve(k.start).marksAcross(m.resolve(k.endA))
else if(k.endA==k.endB&&(A=function(e,t){for(var n,r,o,i=e.firstChild.marks,s=t.firstChild.marks,a=i,c=s,l=0;l<s.length;l++)a=s[l].removeFromSet(a)
for(var u=0;u<i.length;u++)c=i[u].removeFromSet(c)
if(1==a.length&&0==c.length)r=a[0],n="add",o=function(e){return e.mark(r.addToSet(e.marks))}
else{if(0!=a.length||1!=c.length)return null
r=c[0],n="remove",o=function(e){return e.mark(r.removeFromSet(e.marks))}}for(var d=[],f=0;f<t.childCount;f++)d.push(o(t.child(f)))
if(y.Fragment.from(d).eq(e))return{mark:r,type:n}}(x.parent.content.cut(x.parentOffset,O.parentOffset),M.parent.content.cut(M.parentOffset,k.endA-M.start()))))T=e.state.tr,"add"==A.type?T.addMark(P,R,A.mark):T.removeMark(P,R,A.mark)
else if(x.parent.child(x.index()).isText&&x.index()==O.index()-(O.textOffset?0:1)){var I=x.parent.textBetween(x.parentOffset,O.parentOffset)
if(e.someProp("handleTextInput",(function(t){return t(e,P,R,I)})))return
T=e.state.tr.insertText(I,P,R)}if(T||(T=e.state.tr.replace(P,R,p.doc.slice(k.start-p.from,k.endB-p.from))),p.sel){var j=bn(e,T.doc,p.sel)
j&&!(V&&K&&e.composing&&j.empty&&(k.start!=k.endB||e.input.lastAndroidDelete<Date.now()-100)&&(j.head==P||j.head==T.mapping.map(R)-1)||z&&j.empty&&j.head==P)&&T.setSelection(j)}D&&T.ensureMarks(D),i&&T.setMeta("composition",i),e.dispatch(T.scrollIntoView())}}}}(r,e,t,n,o)})),this.domObserver.start(),function(e){var t=function(){var t=kt[n]
e.dom.addEventListener(n,e.input.eventHandlers[n]=function(n){!function(e,t){if(!t.bubbles)return!0
if(t.defaultPrevented)return!1
for(var n=t.target;n!=e.dom;n=n.parentNode)if(!n||11==n.nodeType||n.pmViewDesc&&n.pmViewDesc.stopEvent(t))return!1
return!0}(e,n)||Mt(e,n)||!e.editable&&n.type in bt||t(e,n)},wt[n]?{passive:!0}:void 0)}
for(var n in kt)t()
L&&e.dom.addEventListener("input",(function(){return null})),Ot(e)}(this),this.updatePluginViews()}return m(e,[{key:"composing",get:function(){return this.input.composing}},{key:"props",get:function(){if(this._props.state!=this.state){var e=this._props
for(var t in this._props={},e)this._props[t]=e[t]
this._props.state=this.state}return this._props}},{key:"update",value:function(e){e.handleDOMEvents!=this._props.handleDOMEvents&&Ot(this)
var t=this._props
this._props=e,e.plugins&&(e.plugins.forEach(An),this.directPlugins=e.plugins),this.updateStateInner(e.state,t)}},{key:"setProps",value:function(e){var t={}
for(var n in this._props)t[n]=this._props[n]
for(var r in t.state=this.state,e)t[r]=e[r]
this.update(t)}},{key:"updateState",value:function(e){this.updateStateInner(e,this._props)}},{key:"updateStateInner",value:function(e,t){var n,r=this.state,o=!1,i=!1
e.storedMarks&&this.composing&&(Bt(this),i=!0),this.state=e
var s=r.plugins!=e.plugins||this._props.plugins!=t.plugins
if(s||this._props.plugins!=t.plugins||this._props.nodeViews!=t.nodeViews){var a=Dn(this);(function(e,t){var n=0,r=0
for(var o in e){if(e[o]!=t[o])return!0
n++}for(var i in t)r++
return n!=r})(a,this.nodeViews)&&(this.nodeViews=a,o=!0)}(s||t.handleDOMEvents!=this._props.handleDOMEvents)&&Ot(this),this.editable=En(this),Nn(this)
var c=ln(this),l=Tn(this),u=r.plugins==e.plugins||r.doc.eq(e.doc)?e.scrollToSelection>r.scrollToSelection?"to selection":"preserve":"reset",d=o||!this.docView.matchesNode(e.doc,l,c)
!d&&e.selection.eq(r.selection)||(i=!0)
var f,h,p,m,v,y,g,b,w,S,O="preserve"==u&&i&&null==this.dom.style.overflowAnchor&&function(e){for(var t,n,r=e.dom.getBoundingClientRect(),o=Math.max(0,r.top),i=(r.left+r.right)/2,s=o+1;s<Math.min(innerHeight,r.bottom);s+=5){var a=e.root.elementFromPoint(i,s)
if(a&&a!=e.dom&&e.dom.contains(a)){var c=a.getBoundingClientRect()
if(c.top>=o-20){t=a,n=c.top
break}}}return{refDOM:t,refTop:n,stack:Z(e.dom)}}(this)
if(i){this.domObserver.stop()
var M=d&&(z||V)&&!this.composing&&!r.selection.empty&&!e.selection.empty&&(m=r.selection,v=e.selection,y=Math.min(m.$anchor.sharedDepth(m.head),v.$anchor.sharedDepth(v.head)),m.$anchor.start(y)!=v.$anchor.start(y))
if(d){var N=V?this.trackWrites=this.domSelectionRange().focusNode:null
this.composing&&(this.input.compositionNode=function(e){var t=e.domSelectionRange()
if(!t.focusNode)return null
var n=function(e,t){for(;;){if(3==e.nodeType&&t)return e
if(1==e.nodeType&&t>0){if("false"==e.contentEditable)return null
t=C(e=e.childNodes[t-1])}else{if(!e.parentNode||T(e))return null
t=k(e),e=e.parentNode}}}(t.focusNode,t.focusOffset),r=function(e,t){for(;;){if(3==e.nodeType&&t<e.nodeValue.length)return e
if(1==e.nodeType&&t<e.childNodes.length){if("false"==e.contentEditable)return null
e=e.childNodes[t],t=0}else{if(!e.parentNode||T(e))return null
t=k(e)+1,e=e.parentNode}}}(t.focusNode,t.focusOffset)
if(n&&r&&n!=r){var o=r.pmViewDesc,i=e.domObserver.lastChangedTextNode
if(n==i||r==i)return i
if(!o||!o.isText(r.nodeValue))return r
if(e.input.compositionNode==r){var s=n.pmViewDesc
if(s&&s.isText(n.nodeValue))return r}}return n||r}(this)),!o&&this.docView.update(e.doc,l,c,this)||(this.docView.updateOuterDeco(l),this.docView.destroy(),this.docView=Se(e.doc,l,c,this.dom,this)),N&&!this.trackWrites&&(M=!0)}M||!(this.input.mouseDown&&this.domObserver.currentSelection.eq(this.domSelectionRange())&&(f=this,h=f.docView.domFromPos(f.state.selection.anchor,0),p=f.domSelectionRange(),x(h.node,h.offset,p.anchorNode,p.anchorOffset)))?Ve(this,M):(qe(this,e.selection),this.domObserver.setCurSelection()),this.domObserver.start()}this.updatePluginViews(r),(null===(n=this.dragging)||void 0===n?void 0:n.node)&&!r.doc.eq(e.doc)&&this.updateDraggedNode(this.dragging,r),"reset"==u?this.dom.scrollTop=0:"to selection"==u?this.scrollToSelection():O&&(b=(g=O).refDOM,w=g.refTop,ee(g.stack,0==(S=b?b.getBoundingClientRect().top:0)?0:S-w))}},{key:"scrollToSelection",value:function(){var e=this,t=this.domSelectionRange().focusNode
if(this.someProp("handleScrollToSelection",(function(t){return t(e)})));else if(this.state.selection instanceof v.NodeSelection){var n=this.docView.domAfterPos(this.state.selection.from)
1==n.nodeType&&Q(this,n.getBoundingClientRect(),t)}else Q(this,this.coordsAtPos(this.state.selection.head,1),t)}},{key:"destroyPluginViews",value:function(){for(var e;e=this.pluginViews.pop();)e.destroy&&e.destroy()}},{key:"updatePluginViews",value:function(e){if(e&&e.plugins==this.state.plugins&&this.directPlugins==this.prevDirectPlugins)for(var t=0;t<this.pluginViews.length;t++){var n=this.pluginViews[t]
n.update&&n.update(this,e)}else{this.prevDirectPlugins=this.directPlugins,this.destroyPluginViews()
for(var r=0;r<this.directPlugins.length;r++){var o=this.directPlugins[r]
o.spec.view&&this.pluginViews.push(o.spec.view(this))}for(var i=0;i<this.state.plugins.length;i++){var s=this.state.plugins[i]
s.spec.view&&this.pluginViews.push(s.spec.view(this))}}}},{key:"updateDraggedNode",value:function(e,t){var n=e.node,r=-1
if(this.state.doc.nodeAt(n.from)==n.node)r=n.from
else{var o=n.from+(this.state.doc.content.size-t.doc.content.size);(o>0&&this.state.doc.nodeAt(o))==n.node&&(r=o)}this.dragging=new Lt(e.slice,e.move,r<0?void 0:v.NodeSelection.create(this.state.doc,r))}},{key:"someProp",value:function(e,t){var n,r=this._props&&this._props[e]
if(null!=r&&(n=t?t(r):r))return n
for(var o=0;o<this.directPlugins.length;o++){var i=this.directPlugins[o].props[e]
if(null!=i&&(n=t?t(i):i))return n}var s=this.state.plugins
if(s)for(var a=0;a<s.length;a++){var c=s[a].props[e]
if(null!=c&&(n=t?t(c):c))return n}}},{key:"hasFocus",value:function(){if(z){var e=this.root.activeElement
if(e==this.dom)return!0
if(!e||!this.dom.contains(e))return!1
for(;e&&this.dom!=e&&this.dom.contains(e);){if("false"==e.contentEditable)return!1
e=e.parentElement}return!0}return this.root.activeElement==this.dom}},{key:"focus",value:function(){this.domObserver.stop(),this.editable&&function(e){if(e.setActive)return e.setActive()
if(te)return e.focus(te)
var t=Z(e)
e.focus(null==te?{get preventScroll(){return te={preventScroll:!0},!0}}:void 0),te||(te=!1,ee(t,0))}(this.dom),Ve(this),this.domObserver.start()}},{key:"root",get:function(){var e=this,t=this._root
if(null==t)for(var n,r=function(t){if(9==t.nodeType||11==t.nodeType&&t.host)return t.getSelection||(Object.getPrototypeOf(t).getSelection=function(){return t.ownerDocument.getSelection()}),{v:e._root=t}},o=this.dom.parentNode;o;o=o.parentNode)if(n=r(o))return n.v
return t||document}},{key:"updateRoot",value:function(){this._root=null}},{key:"posAtCoords",value:function(e){return ie(this,e)}},{key:"coordsAtPos",value:function(e){return le(this,e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:1)}},{key:"domAtPos",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0
return this.docView.domFromPos(e,t)}},{key:"nodeDOM",value:function(e){var t=this.docView.descAt(e)
return t?t.nodeDOM:null}},{key:"posAtDOM",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:-1,r=this.docView.posFromDOM(e,t,n)
if(null==r)throw new RangeError("DOM position not inside the editor")
return r}},{key:"endOfTextblock",value:function(e,t){return function(e,t,n){return pe==t&&me==n?ve:(pe=t,me=n,ve="up"==n||"down"==n?function(e,t,n){var r=t.selection,o="up"==n?r.$from:r.$to
return fe(e,t,(function(){for(var t=e.docView.domFromPos(o.pos,"up"==n?-1:1).node;;){var r=e.docView.nearestDesc(t,!0)
if(!r)break
if(r.node.isBlock){t=r.contentDOM||r.dom
break}t=r.dom.parentNode}for(var i=le(e,o.pos,1),s=t.firstChild;s;s=s.nextSibling){var a=void 0
if(1==s.nodeType)a=s.getClientRects()
else{if(3!=s.nodeType)continue
a=S(s,0,s.nodeValue.length).getClientRects()}for(var c=0;c<a.length;c++){var l=a[c]
if(l.bottom>l.top+1&&("up"==n?i.top-l.top>2*(l.bottom-i.top):l.bottom-i.bottom>2*(i.bottom-l.top)))return!1}}return!0}))}(e,t,n):function(e,t,n){var r=t.selection.$head
if(!r.parent.isTextblock)return!1
var o=r.parentOffset,i=!o,s=o==r.parent.content.size,a=e.domSelection()
return a?he.test(r.parent.textContent)&&a.modify?fe(e,t,(function(){var t=e.domSelectionRange(),o=t.focusNode,i=t.focusOffset,s=t.anchorNode,c=t.anchorOffset,l=a.caretBidiLevel
a.modify("move",n,"character")
var u=r.depth?e.docView.domAfterPos(r.before()):e.dom,d=e.domSelectionRange(),f=d.focusNode,h=d.focusOffset,p=f&&!u.contains(1==f.nodeType?f:f.parentNode)||o==f&&i==h
try{a.collapse(s,c),o&&(o!=s||i!=c)&&a.extend&&a.extend(o,i)}catch(e){}return null!=l&&(a.caretBidiLevel=l),p})):"left"==n||"backward"==n?i:s:r.pos==r.start()||r.pos==r.end()}(e,t,n))}(this,t||this.state,e)}},{key:"pasteHTML",value:function(e,t){return Vt(this,"",e,!1,t||new ClipboardEvent("paste"))}},{key:"pasteText",value:function(e,t){return Vt(this,e,null,!0,t||new ClipboardEvent("paste"))}},{key:"destroy",value:function(){this.docView&&(function(e){for(var t in e.domObserver.stop(),e.input.eventHandlers)e.dom.removeEventListener(t,e.input.eventHandlers[t])
clearTimeout(e.input.composingTimeout),clearTimeout(e.input.lastIOSEnterFallbackTimeout)}(this),this.destroyPluginViews(),this.mounted?(this.docView.update(this.state.doc,[],ln(this),this),this.dom.textContent=""):this.dom.parentNode&&this.dom.parentNode.removeChild(this.dom),this.docView.destroy(),this.docView=null,w=null)}},{key:"isDestroyed",get:function(){return null==this.docView}},{key:"dispatchEvent",value:function(e){return function(e,t){Mt(e,t)||!kt[t.type]||!e.editable&&t.type in bt||kt[t.type](e,t)}(this,e)}},{key:"dispatch",value:function(e){var t=this._props.dispatchTransaction
t?t.call(this,e):this.updateState(this.state.apply(e))}},{key:"domSelectionRange",value:function(){var e=this.domSelection()
return e?L&&11===this.root.nodeType&&function(e){for(var t=e.activeElement;t&&t.shadowRoot;)t=t.shadowRoot.activeElement
return t}(this.dom.ownerDocument)==this.dom&&function(e,t){if(t.getComposedRanges){var n=t.getComposedRanges(e.root)[0]
if(n)return vn(e,n)}var r
function o(e){e.preventDefault(),e.stopImmediatePropagation(),r=e.getTargetRanges()[0]}return e.dom.addEventListener("beforeinput",o,!0),document.execCommand("indent"),e.dom.removeEventListener("beforeinput",o,!0),r?vn(e,r):null}(this,e)||e:{focusNode:null,focusOffset:0,anchorNode:null,anchorOffset:0}}},{key:"domSelection",value:function(){return this.root.getSelection()}}]),e}()
function Tn(e){var t=Object.create(null)
return t.class="ProseMirror",t.contenteditable=String(e.editable),e.someProp("attributes",(function(n){if("function"==typeof n&&(n=n(e.state)),n)for(var r in n)"class"==r?t.class+=" "+n[r]:"style"==r?t.style=(t.style?t.style+";":"")+n[r]:t[r]||"contenteditable"==r||"nodeName"==r||(t[r]=String(n[r]))})),t.translate||(t.translate="no"),[Gt.node(0,e.state.doc.content.size,t)]}function Nn(e){if(e.markCursor){var t=document.createElement("img")
t.className="ProseMirror-separator",t.setAttribute("mark-placeholder","true"),t.setAttribute("alt",""),e.cursorWrapper={dom:t,deco:Gt.widget(e.state.selection.from,t,{raw:!0,marks:e.markCursor})}}else e.cursorWrapper=null}function En(e){return!e.someProp("editable",(function(t){return!1===t(e.state)}))}function Dn(e){var t=Object.create(null)
function n(e){for(var n in e)Object.prototype.hasOwnProperty.call(t,n)||(t[n]=e[n])}return e.someProp("nodeViews",n),e.someProp("markViews",n),t}function An(e){if(e.spec.state||e.spec.filterTransaction||e.spec.appendTransaction)throw new RangeError("Plugins passed directly to the view must not have a state component")}t.Decoration=Gt,t.DecorationSet=Qt,t.EditorView=Cn,t.__endComposition=Mn,t.__parseFromClipboard=On,t.__serializeForClipboard=xn},459:(e,t,n)=>{function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function a(e,t){return a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},a(e,t)}function c(e){return c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},c(e)}Object.defineProperty(t,"__esModule",{value:!0})
var l=n(136),u=n(820),d=n(712),f=n(454),h=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&a(e,t)}(l,e)
var t,n,i=(t=l,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,o=c(t)
if(n){var i=c(this).constructor
e=Reflect.construct(o,arguments,i)}else e=o.apply(this,arguments)
return function(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t
if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined")
return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}(e)}(this,e)})
function l(e){return o(this,l),i.call(this,e,e)}return s(l,[{key:"map",value:function(e,t){var n=e.resolve(t.map(this.head))
return l.valid(n)?new l(n):u.Selection.near(n)}},{key:"content",value:function(){return d.Slice.empty}},{key:"eq",value:function(e){return e instanceof l&&e.head==this.head}},{key:"toJSON",value:function(){return{type:"gapcursor",pos:this.head}}},{key:"getBookmark",value:function(){return new p(this.anchor)}}],[{key:"fromJSON",value:function(e,t){if("number"!=typeof t.pos)throw new RangeError("Invalid input for GapCursor.fromJSON")
return new l(e.resolve(t.pos))}},{key:"valid",value:function(e){var t=e.parent
if(t.isTextblock||!function(e){for(var t=e.depth;t>=0;t--){var n=e.index(t),r=e.node(t)
if(0!=n)for(var o=r.child(n-1);;o=o.lastChild){if(0==o.childCount&&!o.inlineContent||o.isAtom||o.type.spec.isolating)return!0
if(o.inlineContent)return!1}else if(r.type.spec.isolating)return!0}return!0}(e)||!function(e){for(var t=e.depth;t>=0;t--){var n=e.indexAfter(t),r=e.node(t)
if(n!=r.childCount)for(var o=r.child(n);;o=o.firstChild){if(0==o.childCount&&!o.inlineContent||o.isAtom||o.type.spec.isolating)return!0
if(o.inlineContent)return!1}else if(r.type.spec.isolating)return!0}return!0}(e))return!1
var n=t.type.spec.allowGapCursor
if(null!=n)return n
var r=t.contentMatchAt(e.index()).defaultType
return r&&r.isTextblock}},{key:"findGapCursorFrom",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2]
e:for(;;){if(!n&&l.valid(e))return e
for(var r=e.pos,o=null,i=e.depth;;i--){var s=e.node(i)
if(t>0?e.indexAfter(i)<s.childCount:e.index(i)>0){o=s.child(t>0?e.indexAfter(i):e.index(i)-1)
break}if(0==i)return null
r+=t
var a=e.doc.resolve(r)
if(l.valid(a))return a}for(;;){var c=t>0?o.firstChild:o.lastChild
if(!c){if(o.isAtom&&!o.isText&&!u.NodeSelection.isSelectable(o)){e=e.doc.resolve(r+o.nodeSize*t),n=!1
continue e}break}o=c,r+=t
var d=e.doc.resolve(r)
if(l.valid(d))return d}return null}}}]),l}(u.Selection)
h.prototype.visible=!1,h.findFrom=h.findGapCursorFrom,u.Selection.jsonID("gapcursor",h)
var p=function(){function e(t){o(this,e),this.pos=t}return s(e,[{key:"map",value:function(t){return new e(t.map(this.pos))}},{key:"resolve",value:function(e){var t=e.resolve(this.pos)
return h.valid(t)?new h(t):u.Selection.near(t)}}]),e}(),m=l.keydownHandler({ArrowLeft:v("horiz",-1),ArrowRight:v("horiz",1),ArrowUp:v("vert",-1),ArrowDown:v("vert",1)})
function v(e,t){var n="vert"==e?t>0?"down":"up":t>0?"right":"left"
return function(e,r,o){var i=e.selection,s=t>0?i.$to:i.$from,a=i.empty
if(i instanceof u.TextSelection){if(!o.endOfTextblock(n)||0==s.depth)return!1
a=!1,s=e.doc.resolve(t>0?s.after():s.before())}var c=h.findGapCursorFrom(s,t,a)
return!!c&&(r&&r(e.tr.setSelection(new h(c))),!0)}}function y(e,t,n){if(!e||!e.editable)return!1
var r=e.state.doc.resolve(t)
if(!h.valid(r))return!1
var o=e.posAtCoords({left:n.clientX,top:n.clientY})
return!(o&&o.inside>-1&&u.NodeSelection.isSelectable(e.state.doc.nodeAt(o.inside))||(e.dispatch(e.state.tr.setSelection(new h(r))),0))}function g(e,t){if("insertCompositionText"!=t.inputType||!(e.state.selection instanceof h))return!1
var n=e.state.selection.$from,r=n.parent.contentMatchAt(n.index()).findWrapping(e.state.schema.nodes.text)
if(!r)return!1
for(var o=d.Fragment.empty,i=r.length-1;i>=0;i--)o=d.Fragment.from(r[i].createAndFill(null,o))
var s=e.state.tr.replace(n.pos,n.pos,new d.Slice(o,0,0))
return s.setSelection(u.TextSelection.near(s.doc.resolve(n.pos+1))),e.dispatch(s),!1}function k(e){if(!(e.selection instanceof h))return null
var t=document.createElement("div")
return t.className="ProseMirror-gapcursor",f.DecorationSet.create(e.doc,[f.Decoration.widget(e.selection.head,t,{key:"gapcursor"})])}t.GapCursor=h,t.gapCursor=function(){return new u.Plugin({props:{decorations:k,createSelectionBetween:function(e,t,n){return t.pos==n.pos&&h.valid(n)?new h(n):null},handleClick:y,handleKeyDown:m,handleDOMEvents:{beforeinput:g}}})}},470:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0})
var r,o=n(136)
r=o,Object.keys(r).filter((e=>"default"!==e&&"__esModule"!==e)).forEach((e=>{t.hasOwnProperty(e)||Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:()=>r[e]})}))},510:(e,t,n)=>{function r(e,t,n){return(t="symbol"==typeof(r=function(e){if("object"!=typeof e||!e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var n=t.call(e,"string")
if("object"!=typeof n)return n
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(t))?r:String(r))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e
var r}function o(e,t,n,r){n&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(r):void 0})}function i(e,t,n,r,o){var i={}
return Object.keys(r).forEach((function(e){i[e]=r[e]})),i.enumerable=!!i.enumerable,i.configurable=!!i.configurable,("value"in i||i.initializer)&&(i.writable=!0),i=n.slice().reverse().reduce((function(n,r){return r(e,t,n)||n}),i),o&&void 0!==i.initializer&&(i.value=i.initializer?i.initializer.call(o):void 0,i.initializer=void 0),void 0===i.initializer&&(Object.defineProperty(e,t,i),i=null),i}n.d(t,{_:()=>i,a:()=>o,b:()=>r})},553:(e,t,n)=>{function r(e){var t="function"==typeof Map?new Map:void 0
return r=function(e){if(null===e||!function(e){try{return-1!==Function.toString.call(e).indexOf("[native code]")}catch(t){return"function"==typeof e}}(e))return e
if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function")
if(void 0!==t){if(t.has(e))return t.get(e)
t.set(e,n)}function n(){return o(e,arguments,l(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),s(n,e)},r(e)}function o(e,t,n){return o=c()?Reflect.construct.bind():function(e,t,n){var r=[null]
r.push.apply(r,t)
var o=new(Function.bind.apply(e,r))
return n&&s(o,n.prototype),o},o.apply(null,arguments)}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&s(e,t)}function s(e,t){return s=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},s(e,t)}function a(e){var t=c()
return function(){var n,r=l(e)
if(t){var o=l(this).constructor
n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments)
return function(e,t){if(t&&("object"===u(t)||"function"==typeof t))return t
if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined")
return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}(e)}(this,n)}}function c(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function l(e){return l=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},l(e)}function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function f(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(o=function(e){if("object"!==u(e)||null===e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var n=t.call(e,"string")
if("object"!==u(n))return n
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===u(o)?o:String(o)),r)}var o}function h(e,t,n){return t&&f(e.prototype,t),n&&f(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}var p=n(712),m=Math.pow(2,16)
function v(e){return 65535&e}var y=function(){function e(t,n,r){d(this,e),this.pos=t,this.delInfo=n,this.recover=r}return h(e,[{key:"deleted",get:function(){return(8&this.delInfo)>0}},{key:"deletedBefore",get:function(){return(5&this.delInfo)>0}},{key:"deletedAfter",get:function(){return(6&this.delInfo)>0}},{key:"deletedAcross",get:function(){return(4&this.delInfo)>0}}]),e}(),g=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1]
if(d(this,e),this.ranges=t,this.inverted=n,!t.length&&e.empty)return e.empty}return h(e,[{key:"recover",value:function(e){var t=0,n=v(e)
if(!this.inverted)for(var r=0;r<n;r++)t+=this.ranges[3*r+2]-this.ranges[3*r+1]
return this.ranges[3*n]+t+function(e){return(e-(65535&e))/m}(e)}},{key:"mapResult",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1
return this._map(e,t,!1)}},{key:"map",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1
return this._map(e,t,!0)}},{key:"_map",value:function(e,t,n){for(var r=0,o=this.inverted?2:1,i=this.inverted?1:2,s=0;s<this.ranges.length;s+=3){var a=this.ranges[s]-(this.inverted?r:0)
if(a>e)break
var c=this.ranges[s+o],l=this.ranges[s+i],u=a+c
if(e<=u){var d=a+r+((c?e==a?-1:e==u?1:t:t)<0?0:l)
if(n)return d
var f=e==a?2:e==u?1:4
return(t<0?e!=a:e!=u)&&(f|=8),new y(d,f,e==(t<0?a:u)?null:s/3+(e-a)*m)}r+=l-c}return n?e+r:new y(e+r,0,null)}},{key:"touches",value:function(e,t){for(var n=0,r=v(t),o=this.inverted?2:1,i=this.inverted?1:2,s=0;s<this.ranges.length;s+=3){var a=this.ranges[s]-(this.inverted?n:0)
if(a>e)break
var c=this.ranges[s+o]
if(e<=a+c&&s==3*r)return!0
n+=this.ranges[s+i]-c}return!1}},{key:"forEach",value:function(e){for(var t=this.inverted?2:1,n=this.inverted?1:2,r=0,o=0;r<this.ranges.length;r+=3){var i=this.ranges[r],s=i-(this.inverted?o:0),a=i+(this.inverted?0:o),c=this.ranges[r+t],l=this.ranges[r+n]
e(s,s+c,a,a+l),o+=l-c}}},{key:"invert",value:function(){return new e(this.ranges,!this.inverted)}},{key:"toString",value:function(){return(this.inverted?"-":"")+JSON.stringify(this.ranges)}}],[{key:"offset",value:function(t){return 0==t?e.empty:new e(t<0?[0,-t,0]:[0,0,t])}}]),e}()
g.empty=new g([])
var k=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1?arguments[1]:void 0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:t.length
d(this,e),this.maps=t,this.mirror=n,this.from=r,this.to=o}return h(e,[{key:"slice",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.maps.length
return new e(this.maps,this.mirror,t,n)}},{key:"copy",value:function(){return new e(this.maps.slice(),this.mirror&&this.mirror.slice(),this.from,this.to)}},{key:"appendMap",value:function(e,t){this.to=this.maps.push(e),null!=t&&this.setMirror(this.maps.length-1,t)}},{key:"appendMapping",value:function(e){for(var t=0,n=this.maps.length;t<e.maps.length;t++){var r=e.getMirror(t)
this.appendMap(e.maps[t],null!=r&&r<t?n+r:void 0)}}},{key:"getMirror",value:function(e){if(this.mirror)for(var t=0;t<this.mirror.length;t++)if(this.mirror[t]==e)return this.mirror[t+(t%2?-1:1)]}},{key:"setMirror",value:function(e,t){this.mirror||(this.mirror=[]),this.mirror.push(e,t)}},{key:"appendMappingInverted",value:function(e){for(var t=e.maps.length-1,n=this.maps.length+e.maps.length;t>=0;t--){var r=e.getMirror(t)
this.appendMap(e.maps[t].invert(),null!=r&&r>t?n-r-1:void 0)}}},{key:"invert",value:function(){var t=new e
return t.appendMappingInverted(this),t}},{key:"map",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1
if(this.mirror)return this._map(e,t,!0)
for(var n=this.from;n<this.to;n++)e=this.maps[n].map(e,t)
return e}},{key:"mapResult",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1
return this._map(e,t,!1)}},{key:"_map",value:function(e,t,n){for(var r=0,o=this.from;o<this.to;o++){var i=this.maps[o].mapResult(e,t)
if(null!=i.recover){var s=this.getMirror(o)
if(null!=s&&s>o&&s<this.to){o=s,e=this.maps[s].recover(i.recover)
continue}}r|=i.delInfo,e=i.pos}return n?e:new y(e,r,null)}}]),e}(),b=Object.create(null),w=function(){function e(){d(this,e)}return h(e,[{key:"getMap",value:function(){return g.empty}},{key:"merge",value:function(e){return null}}],[{key:"fromJSON",value:function(e,t){if(!t||!t.stepType)throw new RangeError("Invalid input for Step.fromJSON")
var n=b[t.stepType]
if(!n)throw new RangeError("No step type ".concat(t.stepType," defined"))
return n.fromJSON(e,t)}},{key:"jsonID",value:function(e,t){if(e in b)throw new RangeError("Duplicate use of step JSON ID "+e)
return b[e]=t,t.prototype.jsonID=e,t}}]),e}(),S=function(){function e(t,n){d(this,e),this.doc=t,this.failed=n}return h(e,null,[{key:"ok",value:function(t){return new e(t,null)}},{key:"fail",value:function(t){return new e(null,t)}},{key:"fromReplace",value:function(t,n,r,o){try{return e.ok(t.replace(n,r,o))}catch(t){if(t instanceof p.ReplaceError)return e.fail(t.message)
throw t}}}]),e}()
function x(e,t,n){for(var r=[],o=0;o<e.childCount;o++){var i=e.child(o)
i.content.size&&(i=i.copy(x(i.content,t,i))),i.isInline&&(i=t(i,n,o)),r.push(i)}return p.Fragment.fromArray(r)}var O=function(e){i(n,e)
var t=a(n)
function n(e,r,o){var i
return d(this,n),(i=t.call(this)).from=e,i.to=r,i.mark=o,i}return h(n,[{key:"apply",value:function(e){var t=this,n=e.slice(this.from,this.to),r=e.resolve(this.from),o=r.node(r.sharedDepth(this.to)),i=new p.Slice(x(n.content,(function(e,n){return e.isAtom&&n.type.allowsMarkType(t.mark.type)?e.mark(t.mark.addToSet(e.marks)):e}),o),n.openStart,n.openEnd)
return S.fromReplace(e,this.from,this.to,i)}},{key:"invert",value:function(){return new M(this.from,this.to,this.mark)}},{key:"map",value:function(e){var t=e.mapResult(this.from,1),r=e.mapResult(this.to,-1)
return t.deleted&&r.deleted||t.pos>=r.pos?null:new n(t.pos,r.pos,this.mark)}},{key:"merge",value:function(e){return e instanceof n&&e.mark.eq(this.mark)&&this.from<=e.to&&this.to>=e.from?new n(Math.min(this.from,e.from),Math.max(this.to,e.to),this.mark):null}},{key:"toJSON",value:function(){return{stepType:"addMark",mark:this.mark.toJSON(),from:this.from,to:this.to}}}],[{key:"fromJSON",value:function(e,t){if("number"!=typeof t.from||"number"!=typeof t.to)throw new RangeError("Invalid input for AddMarkStep.fromJSON")
return new n(t.from,t.to,e.markFromJSON(t.mark))}}]),n}(w)
w.jsonID("addMark",O)
var M=function(e){i(n,e)
var t=a(n)
function n(e,r,o){var i
return d(this,n),(i=t.call(this)).from=e,i.to=r,i.mark=o,i}return h(n,[{key:"apply",value:function(e){var t=this,n=e.slice(this.from,this.to),r=new p.Slice(x(n.content,(function(e){return e.mark(t.mark.removeFromSet(e.marks))}),e),n.openStart,n.openEnd)
return S.fromReplace(e,this.from,this.to,r)}},{key:"invert",value:function(){return new O(this.from,this.to,this.mark)}},{key:"map",value:function(e){var t=e.mapResult(this.from,1),r=e.mapResult(this.to,-1)
return t.deleted&&r.deleted||t.pos>=r.pos?null:new n(t.pos,r.pos,this.mark)}},{key:"merge",value:function(e){return e instanceof n&&e.mark.eq(this.mark)&&this.from<=e.to&&this.to>=e.from?new n(Math.min(this.from,e.from),Math.max(this.to,e.to),this.mark):null}},{key:"toJSON",value:function(){return{stepType:"removeMark",mark:this.mark.toJSON(),from:this.from,to:this.to}}}],[{key:"fromJSON",value:function(e,t){if("number"!=typeof t.from||"number"!=typeof t.to)throw new RangeError("Invalid input for RemoveMarkStep.fromJSON")
return new n(t.from,t.to,e.markFromJSON(t.mark))}}]),n}(w)
w.jsonID("removeMark",M)
var C=function(e){i(n,e)
var t=a(n)
function n(e,r){var o
return d(this,n),(o=t.call(this)).pos=e,o.mark=r,o}return h(n,[{key:"apply",value:function(e){var t=e.nodeAt(this.pos)
if(!t)return S.fail("No node at mark step's position")
var n=t.type.create(t.attrs,null,this.mark.addToSet(t.marks))
return S.fromReplace(e,this.pos,this.pos+1,new p.Slice(p.Fragment.from(n),0,t.isLeaf?0:1))}},{key:"invert",value:function(e){var t=e.nodeAt(this.pos)
if(t){var r=this.mark.addToSet(t.marks)
if(r.length==t.marks.length){for(var o=0;o<t.marks.length;o++)if(!t.marks[o].isInSet(r))return new n(this.pos,t.marks[o])
return new n(this.pos,this.mark)}}return new T(this.pos,this.mark)}},{key:"map",value:function(e){var t=e.mapResult(this.pos,1)
return t.deletedAfter?null:new n(t.pos,this.mark)}},{key:"toJSON",value:function(){return{stepType:"addNodeMark",pos:this.pos,mark:this.mark.toJSON()}}}],[{key:"fromJSON",value:function(e,t){if("number"!=typeof t.pos)throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON")
return new n(t.pos,e.markFromJSON(t.mark))}}]),n}(w)
w.jsonID("addNodeMark",C)
var T=function(e){i(n,e)
var t=a(n)
function n(e,r){var o
return d(this,n),(o=t.call(this)).pos=e,o.mark=r,o}return h(n,[{key:"apply",value:function(e){var t=e.nodeAt(this.pos)
if(!t)return S.fail("No node at mark step's position")
var n=t.type.create(t.attrs,null,this.mark.removeFromSet(t.marks))
return S.fromReplace(e,this.pos,this.pos+1,new p.Slice(p.Fragment.from(n),0,t.isLeaf?0:1))}},{key:"invert",value:function(e){var t=e.nodeAt(this.pos)
return t&&this.mark.isInSet(t.marks)?new C(this.pos,this.mark):this}},{key:"map",value:function(e){var t=e.mapResult(this.pos,1)
return t.deletedAfter?null:new n(t.pos,this.mark)}},{key:"toJSON",value:function(){return{stepType:"removeNodeMark",pos:this.pos,mark:this.mark.toJSON()}}}],[{key:"fromJSON",value:function(e,t){if("number"!=typeof t.pos)throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON")
return new n(t.pos,e.markFromJSON(t.mark))}}]),n}(w)
w.jsonID("removeNodeMark",T)
var N=function(e){i(n,e)
var t=a(n)
function n(e,r,o){var i,s=arguments.length>3&&void 0!==arguments[3]&&arguments[3]
return d(this,n),(i=t.call(this)).from=e,i.to=r,i.slice=o,i.structure=s,i}return h(n,[{key:"apply",value:function(e){return this.structure&&D(e,this.from,this.to)?S.fail("Structure replace would overwrite content"):S.fromReplace(e,this.from,this.to,this.slice)}},{key:"getMap",value:function(){return new g([this.from,this.to-this.from,this.slice.size])}},{key:"invert",value:function(e){return new n(this.from,this.from+this.slice.size,e.slice(this.from,this.to))}},{key:"map",value:function(e){var t=e.mapResult(this.from,1),r=e.mapResult(this.to,-1)
return t.deletedAcross&&r.deletedAcross?null:new n(t.pos,Math.max(t.pos,r.pos),this.slice)}},{key:"merge",value:function(e){if(!(e instanceof n)||e.structure||this.structure)return null
if(this.from+this.slice.size!=e.from||this.slice.openEnd||e.slice.openStart){if(e.to!=this.from||this.slice.openStart||e.slice.openEnd)return null
var t=this.slice.size+e.slice.size==0?p.Slice.empty:new p.Slice(e.slice.content.append(this.slice.content),e.slice.openStart,this.slice.openEnd)
return new n(e.from,this.to,t,this.structure)}var r=this.slice.size+e.slice.size==0?p.Slice.empty:new p.Slice(this.slice.content.append(e.slice.content),this.slice.openStart,e.slice.openEnd)
return new n(this.from,this.to+(e.to-e.from),r,this.structure)}},{key:"toJSON",value:function(){var e={stepType:"replace",from:this.from,to:this.to}
return this.slice.size&&(e.slice=this.slice.toJSON()),this.structure&&(e.structure=!0),e}}],[{key:"fromJSON",value:function(e,t){if("number"!=typeof t.from||"number"!=typeof t.to)throw new RangeError("Invalid input for ReplaceStep.fromJSON")
return new n(t.from,t.to,p.Slice.fromJSON(e,t.slice),!!t.structure)}}]),n}(w)
w.jsonID("replace",N)
var E=function(e){i(n,e)
var t=a(n)
function n(e,r,o,i,s,a){var c,l=arguments.length>6&&void 0!==arguments[6]&&arguments[6]
return d(this,n),(c=t.call(this)).from=e,c.to=r,c.gapFrom=o,c.gapTo=i,c.slice=s,c.insert=a,c.structure=l,c}return h(n,[{key:"apply",value:function(e){if(this.structure&&(D(e,this.from,this.gapFrom)||D(e,this.gapTo,this.to)))return S.fail("Structure gap-replace would overwrite content")
var t=e.slice(this.gapFrom,this.gapTo)
if(t.openStart||t.openEnd)return S.fail("Gap is not a flat range")
var n=this.slice.insertAt(this.insert,t.content)
return n?S.fromReplace(e,this.from,this.to,n):S.fail("Content does not fit in gap")}},{key:"getMap",value:function(){return new g([this.from,this.gapFrom-this.from,this.insert,this.gapTo,this.to-this.gapTo,this.slice.size-this.insert])}},{key:"invert",value:function(e){var t=this.gapTo-this.gapFrom
return new n(this.from,this.from+this.slice.size+t,this.from+this.insert,this.from+this.insert+t,e.slice(this.from,this.to).removeBetween(this.gapFrom-this.from,this.gapTo-this.from),this.gapFrom-this.from,this.structure)}},{key:"map",value:function(e){var t=e.mapResult(this.from,1),r=e.mapResult(this.to,-1),o=this.from==this.gapFrom?t.pos:e.map(this.gapFrom,-1),i=this.to==this.gapTo?r.pos:e.map(this.gapTo,1)
return t.deletedAcross&&r.deletedAcross||o<t.pos||i>r.pos?null:new n(t.pos,r.pos,o,i,this.slice,this.insert,this.structure)}},{key:"toJSON",value:function(){var e={stepType:"replaceAround",from:this.from,to:this.to,gapFrom:this.gapFrom,gapTo:this.gapTo,insert:this.insert}
return this.slice.size&&(e.slice=this.slice.toJSON()),this.structure&&(e.structure=!0),e}}],[{key:"fromJSON",value:function(e,t){if("number"!=typeof t.from||"number"!=typeof t.to||"number"!=typeof t.gapFrom||"number"!=typeof t.gapTo||"number"!=typeof t.insert)throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON")
return new n(t.from,t.to,t.gapFrom,t.gapTo,p.Slice.fromJSON(e,t.slice),t.insert,!!t.structure)}}]),n}(w)
function D(e,t,n){for(var r=e.resolve(t),o=n-t,i=r.depth;o>0&&i>0&&r.indexAfter(i)==r.node(i).childCount;)i--,o--
if(o>0)for(var s=r.node(i).maybeChild(r.indexAfter(i));o>0;){if(!s||s.isLeaf)return!0
s=s.firstChild,o--}return!1}function A(e,t,n){for(var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:n.contentMatch,o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],i=e.doc.nodeAt(t),s=[],a=t+1,c=0;c<i.childCount;c++){var l=i.child(c),u=a+l.nodeSize,d=r.matchType(l.type)
if(d){r=d
for(var f=0;f<l.marks.length;f++)n.allowsMarkType(l.marks[f].type)||e.step(new M(a,u,l.marks[f]))
if(o&&l.isText&&"pre"!=n.whitespace)for(var h=void 0,m=/\r?\n|\r/g,v=void 0;h=m.exec(l.text);)v||(v=new p.Slice(p.Fragment.from(n.schema.text(" ",n.allowedMarks(l.marks))),0,0)),s.push(new N(a+h.index,a+h.index+h[0].length,v))}else s.push(new N(a,u,p.Slice.empty))
a=u}if(!r.validEnd){var y=r.fillBefore(p.Fragment.empty,!0)
e.replace(a,a,new p.Slice(y,0,0))}for(var g=s.length-1;g>=0;g--)e.step(s[g])}function P(e,t,n){return(0==t||e.canReplace(t,e.childCount))&&(n==e.childCount||e.canReplace(0,n))}function R(e){return{type:e,attrs:null}}function I(e,t){return!(!e||!t||e.isLeaf||!e.canAppend(t))}function j(e,t,n){var r=e.resolve(t)
if(r.parent.canReplaceWith(r.index(),r.index(),n))return t
if(0==r.parentOffset)for(var o=r.depth-1;o>=0;o--){var i=r.index(o)
if(r.node(o).canReplaceWith(i,i,n))return r.before(o+1)
if(i>0)return null}if(r.parentOffset==r.parent.content.size)for(var s=r.depth-1;s>=0;s--){var a=r.indexAfter(s)
if(r.node(s).canReplaceWith(a,a,n))return r.after(s+1)
if(a<r.node(s).childCount)return null}return null}function z(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:p.Slice.empty
if(t==n&&!r.size)return null
var o=e.resolve(t),i=e.resolve(n)
return B(o,i,r)?new N(t,n,r):new F(o,i,r).fit()}function B(e,t,n){return!n.openStart&&!n.openEnd&&e.start()==t.start()&&e.parent.canReplace(e.index(),t.index(),n.content)}w.jsonID("replaceAround",E)
var F=function(){function e(t,n,r){d(this,e),this.$from=t,this.$to=n,this.unplaced=r,this.frontier=[],this.placed=p.Fragment.empty
for(var o=0;o<=t.depth;o++){var i=t.node(o)
this.frontier.push({type:i.type,match:i.contentMatchAt(t.indexAfter(o))})}for(var s=t.depth;s>0;s--)this.placed=p.Fragment.from(t.node(s).copy(this.placed))}return h(e,[{key:"depth",get:function(){return this.frontier.length-1}},{key:"fit",value:function(){for(;this.unplaced.size;){var e=this.findFittable()
e?this.placeNodes(e):this.openMore()||this.dropNode()}var t=this.mustMoveInline(),n=this.placed.size-this.depth-this.$from.depth,r=this.$from,o=this.close(t<0?this.$to:r.doc.resolve(t))
if(!o)return null
for(var i=this.placed,s=r.depth,a=o.depth;s&&a&&1==i.childCount;)i=i.firstChild.content,s--,a--
var c=new p.Slice(i,s,a)
return t>-1?new E(r.pos,t,this.$to.pos,this.$to.end(),c,n):c.size||r.pos!=this.$to.pos?new N(r.pos,o.pos,c):null}},{key:"findFittable",value:function(){for(var e=this.unplaced.openStart,t=this.unplaced.content,n=0,r=this.unplaced.openEnd;n<e;n++){var o=t.firstChild
if(t.childCount>1&&(r=0),o.type.spec.isolating&&r<=n){e=n
break}t=o.content}for(var i=1;i<=2;i++)for(var s=1==i?e:this.unplaced.openStart;s>=0;s--)for(var a=null,c=(s?(a=_(this.unplaced.content,s-1).firstChild).content:this.unplaced.content).firstChild,l=this.depth;l>=0;l--){var u=this.frontier[l],d=u.type,f=u.match,h=void 0,m=null
if(1==i&&(c?f.matchType(c.type)||(m=f.fillBefore(p.Fragment.from(c),!1)):a&&d.compatibleContent(a.type)))return{sliceDepth:s,frontierDepth:l,parent:a,inject:m}
if(2==i&&c&&(h=f.findWrapping(c.type)))return{sliceDepth:s,frontierDepth:l,parent:a,wrap:h}
if(a&&f.matchType(a.type))break}}},{key:"openMore",value:function(){var e=this.unplaced,t=e.content,n=e.openStart,r=e.openEnd,o=_(t,n)
return!(!o.childCount||o.firstChild.isLeaf||(this.unplaced=new p.Slice(t,n+1,Math.max(r,o.size+n>=t.size-r?n+1:0)),0))}},{key:"dropNode",value:function(){var e=this.unplaced,t=e.content,n=e.openStart,r=e.openEnd,o=_(t,n)
if(o.childCount<=1&&n>0){var i=t.size-n<=n+o.size
this.unplaced=new p.Slice($(t,n-1,1),n-1,i?n-1:r)}else this.unplaced=new p.Slice($(t,n,1),n,r)}},{key:"placeNodes",value:function(e){for(var t=e.sliceDepth,n=e.frontierDepth,r=e.parent,o=e.inject,i=e.wrap;this.depth>n;)this.closeFrontierNode()
if(i)for(var s=0;s<i.length;s++)this.openFrontierNode(i[s])
var a=this.unplaced,c=r?r.content:a.content,l=a.openStart-t,u=0,d=[],f=this.frontier[n],h=f.match,m=f.type
if(o){for(var v=0;v<o.childCount;v++)d.push(o.child(v))
h=h.matchFragment(o)}for(var y=c.size+t-(a.content.size-a.openEnd);u<c.childCount;){var g=c.child(u),k=h.matchType(g.type)
if(!k)break;(++u>1||0==l||g.content.size)&&(h=k,d.push(L(g.mark(m.allowedMarks(g.marks)),1==u?l:0,u==c.childCount?y:-1)))}var b=u==c.childCount
b||(y=-1),this.placed=V(this.placed,n,p.Fragment.from(d)),this.frontier[n].match=h,b&&y<0&&r&&r.type==this.frontier[this.depth].type&&this.frontier.length>1&&this.closeFrontierNode()
for(var w=0,S=c;w<y;w++){var x=S.lastChild
this.frontier.push({type:x.type,match:x.contentMatchAt(x.childCount)}),S=x.content}this.unplaced=b?0==t?p.Slice.empty:new p.Slice($(a.content,t-1,1),t-1,y<0?a.openEnd:t-1):new p.Slice($(a.content,t,u),a.openStart,a.openEnd)}},{key:"mustMoveInline",value:function(){if(!this.$to.parent.isTextblock)return-1
var e,t=this.frontier[this.depth]
if(!t.type.isTextblock||!J(this.$to,this.$to.depth,t.type,t.match,!1)||this.$to.depth==this.depth&&(e=this.findCloseLevel(this.$to))&&e.depth==this.depth)return-1
for(var n=this.$to.depth,r=this.$to.after(n);n>1&&r==this.$to.end(--n);)++r
return r}},{key:"findCloseLevel",value:function(e){e:for(var t=Math.min(this.depth,e.depth);t>=0;t--){var n=this.frontier[t],r=n.match,o=n.type,i=t<e.depth&&e.end(t+1)==e.pos+(e.depth-(t+1)),s=J(e,t,o,r,i)
if(s){for(var a=t-1;a>=0;a--){var c=this.frontier[a],l=c.match,u=J(e,a,c.type,l,!0)
if(!u||u.childCount)continue e}return{depth:t,fit:s,move:i?e.doc.resolve(e.after(t+1)):e}}}}},{key:"close",value:function(e){var t=this.findCloseLevel(e)
if(!t)return null
for(;this.depth>t.depth;)this.closeFrontierNode()
t.fit.childCount&&(this.placed=V(this.placed,t.depth,t.fit)),e=t.move
for(var n=t.depth+1;n<=e.depth;n++){var r=e.node(n),o=r.type.contentMatch.fillBefore(r.content,!0,e.index(n))
this.openFrontierNode(r.type,r.attrs,o)}return e}},{key:"openFrontierNode",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2?arguments[2]:void 0,r=this.frontier[this.depth]
r.match=r.match.matchType(e),this.placed=V(this.placed,this.depth,p.Fragment.from(e.create(t,n))),this.frontier.push({type:e,match:e.contentMatch})}},{key:"closeFrontierNode",value:function(){var e=this.frontier.pop().match.fillBefore(p.Fragment.empty,!0)
e.childCount&&(this.placed=V(this.placed,this.frontier.length,e))}}]),e}()
function $(e,t,n){return 0==t?e.cutByIndex(n,e.childCount):e.replaceChild(0,e.firstChild.copy($(e.firstChild.content,t-1,n)))}function V(e,t,n){return 0==t?e.append(n):e.replaceChild(e.childCount-1,e.lastChild.copy(V(e.lastChild.content,t-1,n)))}function _(e,t){for(var n=0;n<t;n++)e=e.firstChild.content
return e}function L(e,t,n){if(t<=0)return e
var r=e.content
return t>1&&(r=r.replaceChild(0,L(r.firstChild,t-1,1==r.childCount?n-1:0))),t>0&&(r=e.type.contentMatch.fillBefore(r).append(r),n<=0&&(r=r.append(e.type.contentMatch.matchFragment(r).fillBefore(p.Fragment.empty,!0)))),e.copy(r)}function J(e,t,n,r,o){var i=e.node(t),s=o?e.indexAfter(t):e.index(t)
if(s==i.childCount&&!n.compatibleContent(i.type))return null
var a=r.fillBefore(i.content,!0,s)
return a&&!function(e,t,n){for(var r=n;r<t.childCount;r++)if(!e.allowsMarks(t.child(r).marks))return!0
return!1}(n,i.content,s)?a:null}function W(e,t,n,r,o){if(t<n){var i=e.firstChild
e=e.replaceChild(0,i.copy(W(i.content,t+1,n,r,i)))}if(t>r){var s=o.contentMatchAt(0),a=s.fillBefore(e).append(e)
e=a.append(s.matchFragment(a).fillBefore(p.Fragment.empty,!0))}return e}function q(e,t){for(var n=[],r=Math.min(e.depth,t.depth);r>=0;r--){var o=e.start(r)
if(o<e.pos-(e.depth-r)||t.end(r)>t.pos+(t.depth-r)||e.node(r).type.spec.isolating||t.node(r).type.spec.isolating)break;(o==t.start(r)||r==e.depth&&r==t.depth&&e.parent.inlineContent&&t.parent.inlineContent&&r&&t.start(r-1)==o-1)&&n.push(r)}return n}var K=function(e){i(n,e)
var t=a(n)
function n(e,r,o){var i
return d(this,n),(i=t.call(this)).pos=e,i.attr=r,i.value=o,i}return h(n,[{key:"apply",value:function(e){var t=e.nodeAt(this.pos)
if(!t)return S.fail("No node at attribute step's position")
var n=Object.create(null)
for(var r in t.attrs)n[r]=t.attrs[r]
n[this.attr]=this.value
var o=t.type.create(n,null,t.marks)
return S.fromReplace(e,this.pos,this.pos+1,new p.Slice(p.Fragment.from(o),0,t.isLeaf?0:1))}},{key:"getMap",value:function(){return g.empty}},{key:"invert",value:function(e){return new n(this.pos,this.attr,e.nodeAt(this.pos).attrs[this.attr])}},{key:"map",value:function(e){var t=e.mapResult(this.pos,1)
return t.deletedAfter?null:new n(t.pos,this.attr,this.value)}},{key:"toJSON",value:function(){return{stepType:"attr",pos:this.pos,attr:this.attr,value:this.value}}}],[{key:"fromJSON",value:function(e,t){if("number"!=typeof t.pos||"string"!=typeof t.attr)throw new RangeError("Invalid input for AttrStep.fromJSON")
return new n(t.pos,t.attr,t.value)}}]),n}(w)
w.jsonID("attr",K)
var H=function(e){i(n,e)
var t=a(n)
function n(e,r){var o
return d(this,n),(o=t.call(this)).attr=e,o.value=r,o}return h(n,[{key:"apply",value:function(e){var t=Object.create(null)
for(var n in e.attrs)t[n]=e.attrs[n]
t[this.attr]=this.value
var r=e.type.create(t,e.content,e.marks)
return S.ok(r)}},{key:"getMap",value:function(){return g.empty}},{key:"invert",value:function(e){return new n(this.attr,e.attrs[this.attr])}},{key:"map",value:function(e){return this}},{key:"toJSON",value:function(){return{stepType:"docAttr",attr:this.attr,value:this.value}}}],[{key:"fromJSON",value:function(e,t){if("string"!=typeof t.attr)throw new RangeError("Invalid input for DocAttrStep.fromJSON")
return new n(t.attr,t.value)}}]),n}(w)
w.jsonID("docAttr",H),t.TransformError=function(e){i(n,e)
var t=a(n)
function n(){return d(this,n),t.apply(this,arguments)}return h(n)}(r(Error)),t.TransformError=function e(t){var n=Error.call(this,t)
return n.__proto__=e.prototype,n},t.TransformError.prototype=Object.create(Error.prototype),t.TransformError.prototype.constructor=t.TransformError,t.TransformError.prototype.name="TransformError"
var U=function(){function e(t){d(this,e),this.doc=t,this.steps=[],this.docs=[],this.mapping=new k}return h(e,[{key:"before",get:function(){return this.docs.length?this.docs[0]:this.doc}},{key:"step",value:function(e){var n=this.maybeStep(e)
if(n.failed)throw new t.TransformError(n.failed)
return this}},{key:"maybeStep",value:function(e){var t=e.apply(this.doc)
return t.failed||this.addStep(e,t.doc),t}},{key:"docChanged",get:function(){return this.steps.length>0}},{key:"addStep",value:function(e,t){this.docs.push(this.doc),this.steps.push(e),this.mapping.appendMap(e.getMap()),this.doc=t}},{key:"replace",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:p.Slice.empty,r=z(this.doc,e,t,n)
return r&&this.step(r),this}},{key:"replaceWith",value:function(e,t,n){return this.replace(e,t,new p.Slice(p.Fragment.from(n),0,0))}},{key:"delete",value:function(e,t){return this.replace(e,t,p.Slice.empty)}},{key:"insert",value:function(e,t){return this.replaceWith(e,e,t)}},{key:"replaceRange",value:function(e,t,n){return function(e,t,n,r){if(!r.size)return e.deleteRange(t,n)
var o=e.doc.resolve(t),i=e.doc.resolve(n)
if(B(o,i,r))return e.step(new N(t,n,r))
var s=q(o,e.doc.resolve(n))
0==s[s.length-1]&&s.pop()
var a=-(o.depth+1)
s.unshift(a)
for(var c=o.depth,l=o.pos-1;c>0;c--,l--){var u=o.node(c).type.spec
if(u.defining||u.definingAsContext||u.isolating)break
s.indexOf(c)>-1?a=c:o.before(c)==l&&s.splice(1,0,-c)}for(var d,f=s.indexOf(a),h=[],m=r.openStart,v=r.content,y=0;;y++){var g=v.firstChild
if(h.push(g),y==r.openStart)break
v=g.content}for(var k=m-1;k>=0;k--){var b=h[k],w=(d=b.type).spec.defining||d.spec.definingForContent
if(w&&!b.sameMarkup(o.node(Math.abs(a)-1)))m=k
else if(w||!b.type.isTextblock)break}for(var S=r.openStart;S>=0;S--){var x=(S+m+1)%(r.openStart+1),O=h[x]
if(O)for(var M=0;M<s.length;M++){var C=s[(M+f)%s.length],T=!0
C<0&&(T=!1,C=-C)
var E=o.node(C-1),D=o.index(C-1)
if(E.canReplaceWith(D,D,O.type,O.marks))return e.replace(o.before(C),T?i.after(C):n,new p.Slice(W(r.content,0,r.openStart,x),x,r.openEnd))}}for(var A=e.steps.length,P=s.length-1;P>=0&&(e.replace(t,n,r),!(e.steps.length>A));P--){var R=s[P]
R<0||(t=o.before(R),n=i.after(R))}}(this,e,t,n),this}},{key:"replaceRangeWith",value:function(e,t,n){return function(e,t,n,r){if(!r.isInline&&t==n&&e.doc.resolve(t).parent.content.size){var o=j(e.doc,t,r.type)
null!=o&&(t=n=o)}e.replaceRange(t,n,new p.Slice(p.Fragment.from(r),0,0))}(this,e,t,n),this}},{key:"deleteRange",value:function(e,t){return function(e,t,n){for(var r=e.doc.resolve(t),o=e.doc.resolve(n),i=q(r,o),s=0;s<i.length;s++){var a=i[s],c=s==i.length-1
if(c&&0==a||r.node(a).type.contentMatch.validEnd)return e.delete(r.start(a),o.end(a))
if(a>0&&(c||r.node(a-1).canReplace(r.index(a-1),o.indexAfter(a-1))))return e.delete(r.before(a),o.after(a))}for(var l=1;l<=r.depth&&l<=o.depth;l++)if(t-r.start(l)==r.depth-l&&n>r.end(l)&&o.end(l)-n!=o.depth-l)return e.delete(r.before(l),n)
e.delete(t,n)}(this,e,t),this}},{key:"lift",value:function(e,t){return function(e,t,n){for(var r=t.$from,o=t.$to,i=t.depth,s=r.before(i+1),a=o.after(i+1),c=s,l=a,u=p.Fragment.empty,d=0,f=i,h=!1;f>n;f--)h||r.index(f)>0?(h=!0,u=p.Fragment.from(r.node(f).copy(u)),d++):c--
for(var m=p.Fragment.empty,v=0,y=i,g=!1;y>n;y--)g||o.after(y+1)<o.end(y)?(g=!0,m=p.Fragment.from(o.node(y).copy(m)),v++):l++
e.step(new E(c,l,s,a,new p.Slice(u.append(m),d,v),u.size-d,!0))}(this,e,t),this}},{key:"join",value:function(e){return function(e,t,n){var r=new N(t-n,t+n,p.Slice.empty,!0)
e.step(r)}(this,e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:1),this}},{key:"wrap",value:function(e,t){return function(e,t,n){for(var r=p.Fragment.empty,o=n.length-1;o>=0;o--){if(r.size){var i=n[o].type.contentMatch.matchFragment(r)
if(!i||!i.validEnd)throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper")}r=p.Fragment.from(n[o].type.create(n[o].attrs,r))}var s=t.start,a=t.end
e.step(new E(s,a,s,a,new p.Slice(r,0,0),n.length,!0))}(this,e,t),this}},{key:"setBlockType",value:function(e){return function(e,t,n,r,o){if(!r.isTextblock)throw new RangeError("Type given to setBlockType should be a textblock")
var i=e.steps.length
e.doc.nodesBetween(t,n,(function(t,n){var s="function"==typeof o?o(t):o
if(t.isTextblock&&!t.hasMarkup(r,s)&&function(e,t,n){var r=e.resolve(t),o=r.index()
return r.parent.canReplaceWith(o,o+1,n)}(e.doc,e.mapping.slice(i).map(n),r)){var a=null
if(r.schema.linebreakReplacement){var c="pre"==r.whitespace,l=!!r.contentMatch.matchType(r.schema.linebreakReplacement)
c&&!l?a=!1:!c&&l&&(a=!0)}!1===a&&function(e,t,n,r){t.forEach((function(o,i){if(o.type==o.type.schema.linebreakReplacement){var s=e.mapping.slice(r).map(n+1+i)
e.replaceWith(s,s+1,t.type.schema.text("\n"))}}))}(e,t,n,i),A(e,e.mapping.slice(i).map(n,1),r,void 0,null===a)
var u=e.mapping.slice(i),d=u.map(n,1),f=u.map(n+t.nodeSize,1)
return e.step(new E(d,f,d+1,f-1,new p.Slice(p.Fragment.from(r.create(s,null,t.marks)),0,0),1,!0)),!0===a&&function(e,t,n,r){t.forEach((function(o,i){if(o.isText)for(var s,a=/\r?\n|\r/g;s=a.exec(o.text);){var c=e.mapping.slice(r).map(n+1+i+s.index)
e.replaceWith(c,c+1,t.type.schema.linebreakReplacement.create())}}))}(e,t,n,i),!1}}))}(this,e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:e,arguments.length>2?arguments[2]:void 0,arguments.length>3&&void 0!==arguments[3]?arguments[3]:null),this}},{key:"setNodeMarkup",value:function(e,t){return function(e,t,n,r,o){var i=e.doc.nodeAt(t)
if(!i)throw new RangeError("No node at given position")
n||(n=i.type)
var s=n.create(r,null,o||i.marks)
if(i.isLeaf)return e.replaceWith(t,t+i.nodeSize,s)
if(!n.validContent(i.content))throw new RangeError("Invalid content for node type "+n.name)
e.step(new E(t,t+i.nodeSize,t+1,t+i.nodeSize-1,new p.Slice(p.Fragment.from(s),0,0),1,!0))}(this,e,t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,arguments.length>3?arguments[3]:void 0),this}},{key:"setNodeAttribute",value:function(e,t,n){return this.step(new K(e,t,n)),this}},{key:"setDocAttribute",value:function(e,t){return this.step(new H(e,t)),this}},{key:"addNodeMark",value:function(e,t){return this.step(new C(e,t)),this}},{key:"removeNodeMark",value:function(e,t){if(!(t instanceof p.Mark)){var n=this.doc.nodeAt(e)
if(!n)throw new RangeError("No node at position "+e)
if(!(t=t.isInSet(n.marks)))return this}return this.step(new T(e,t)),this}},{key:"split",value:function(e){return function(e,t){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=arguments.length>3?arguments[3]:void 0,o=e.doc.resolve(t),i=p.Fragment.empty,s=p.Fragment.empty,a=o.depth,c=o.depth-n,l=n-1;a>c;a--,l--){i=p.Fragment.from(o.node(a).copy(i))
var u=r&&r[l]
s=p.Fragment.from(u?u.type.create(u.attrs,s):o.node(a).copy(s))}e.step(new N(t,t,new p.Slice(i.append(s),n,n),!0))}(this,e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,arguments.length>2?arguments[2]:void 0),this}},{key:"addMark",value:function(e,t,n){return function(e,t,n,r){var o,i,s=[],a=[]
e.doc.nodesBetween(t,n,(function(e,c,l){if(e.isInline){var u=e.marks
if(!r.isInSet(u)&&l.type.allowsMarkType(r.type)){for(var d=Math.max(c,t),f=Math.min(c+e.nodeSize,n),h=r.addToSet(u),p=0;p<u.length;p++)u[p].isInSet(h)||(o&&o.to==d&&o.mark.eq(u[p])?o.to=f:s.push(o=new M(d,f,u[p])))
i&&i.to==d?i.to=f:a.push(i=new O(d,f,r))}}})),s.forEach((function(t){return e.step(t)})),a.forEach((function(t){return e.step(t)}))}(this,e,t,n),this}},{key:"removeMark",value:function(e,t,n){return function(e,t,n,r){var o=[],i=0
e.doc.nodesBetween(t,n,(function(e,s){if(e.isInline){i++
var a=null
if(r instanceof p.MarkType)for(var c,l=e.marks;c=r.isInSet(l);)(a||(a=[])).push(c),l=c.removeFromSet(l)
else r?r.isInSet(e.marks)&&(a=[r]):a=e.marks
if(a&&a.length)for(var u=Math.min(s+e.nodeSize,n),d=0;d<a.length;d++){for(var f=a[d],h=void 0,m=0;m<o.length;m++){var v=o[m]
v.step==i-1&&f.eq(o[m].style)&&(h=v)}h?(h.to=u,h.step=i):o.push({style:f,from:Math.max(s,t),to:u,step:i})}}})),o.forEach((function(t){return e.step(new M(t.from,t.to,t.style))}))}(this,e,t,n),this}},{key:"clearIncompatible",value:function(e,t,n){return A(this,e,t,n),this}}]),e}()
t.AddMarkStep=O,t.AddNodeMarkStep=C,t.AttrStep=K,t.DocAttrStep=H,t.MapResult=y,t.Mapping=k,t.RemoveMarkStep=M,t.RemoveNodeMarkStep=T,t.ReplaceAroundStep=E,t.ReplaceStep=N,t.Step=w,t.StepMap=g,t.StepResult=S,t.Transform=U,t.canJoin=function(e,t){var n=e.resolve(t),r=n.index()
return I(n.nodeBefore,n.nodeAfter)&&n.parent.canReplace(r,r+1)},t.canSplit=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=arguments.length>3?arguments[3]:void 0,o=e.resolve(t),i=o.depth-n,s=r&&r[r.length-1]||o.parent
if(i<0||o.parent.type.spec.isolating||!o.parent.canReplace(o.index(),o.parent.childCount)||!s.type.validContent(o.parent.content.cutByIndex(o.index(),o.parent.childCount)))return!1
for(var a=o.depth-1,c=n-2;a>i;a--,c--){var l=o.node(a),u=o.index(a)
if(l.type.spec.isolating)return!1
var d=l.content.cutByIndex(u,l.childCount),f=r&&r[c+1]
f&&(d=d.replaceChild(0,f.type.create(f.attrs)))
var h=r&&r[c]||l
if(!l.canReplace(u+1,l.childCount)||!h.type.validContent(d))return!1}var p=o.indexAfter(i),m=r&&r[0]
return o.node(i).canReplaceWith(p,p,m?m.type:o.node(i+1).type)},t.dropPoint=function(e,t,n){var r=e.resolve(t)
if(!n.content.size)return t
for(var o=n.content,i=0;i<n.openStart;i++)o=o.firstChild.content
for(var s=1;s<=(0==n.openStart&&n.size?2:1);s++)for(var a=r.depth;a>=0;a--){var c=a==r.depth?0:r.pos<=(r.start(a+1)+r.end(a+1))/2?-1:1,l=r.index(a)+(c>0?1:0),u=r.node(a),d=!1
if(1==s)d=u.canReplace(l,l,o)
else{var f=u.contentMatchAt(l).findWrapping(o.firstChild.type)
d=f&&u.canReplaceWith(l,l,f[0])}if(d)return 0==c?r.pos:c<0?r.before(a+1):r.after(a+1)}return null},t.findWrapping=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:e,o=function(e,t){var n=e.parent,r=e.startIndex,o=e.endIndex,i=n.contentMatchAt(r).findWrapping(t)
if(!i)return null
var s=i.length?i[0]:t
return n.canReplaceWith(r,o,s)?i:null}(e,t),i=o&&function(e,t){var n=e.parent,r=e.startIndex,o=e.endIndex,i=n.child(r),s=t.contentMatch.findWrapping(i.type)
if(!s)return null
for(var a=(s.length?s[s.length-1]:t).contentMatch,c=r;a&&c<o;c++)a=a.matchType(n.child(c).type)
return a&&a.validEnd?s:null}(r,t)
return i?o.map(R).concat({type:t,attrs:n}).concat(i.map(R)):null},t.insertPoint=j,t.joinPoint=function(e,t){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:-1,r=e.resolve(t),o=r.depth;;o--){var i=void 0,s=void 0,a=r.index(o)
if(o==r.depth?(i=r.nodeBefore,s=r.nodeAfter):n>0?(i=r.node(o+1),a++,s=r.node(o).maybeChild(a)):(i=r.node(o).maybeChild(a-1),s=r.node(o+1)),i&&!i.isTextblock&&I(i,s)&&r.node(o).canReplace(a,a+1))return t
if(0==o)break
t=n<0?r.before(o):r.after(o)}},t.liftTarget=function(e){for(var t=e.parent.content.cutByIndex(e.startIndex,e.endIndex),n=e.depth;;--n){var r=e.$from.node(n),o=e.$from.index(n),i=e.$to.indexAfter(n)
if(n<e.depth&&r.canReplace(o,i,t))return n
if(0==n||r.type.spec.isolating||!P(r,o,i))break}return null},t.replaceStep=z},614:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0})
var r,o=n(820)
r=o,Object.keys(r).filter((e=>"default"!==e&&"__esModule"!==e)).forEach((e=>{t.hasOwnProperty(e)||Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:()=>r[e]})}))},637:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0})
var r,o=n(243)
r=o,Object.keys(r).filter((e=>"default"!==e&&"__esModule"!==e)).forEach((e=>{t.hasOwnProperty(e)||Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:()=>r[e]})}))},669:(e,t,n)=>{function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var o=t[n]
o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(i=function(e){if("object"!==r(e)||null===e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var n=t.call(e,"string")
if("object"!==r(n))return n
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===r(i)?i:String(i)),o)}var i}function s(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}var a=n(233),c=n(553),l=n(820),u=function(){function e(t,n){o(this,e),this.items=t,this.eventCount=n}return s(e,[{key:"popEvent",value:function(t,n){var r=this
if(0==this.eventCount)return null
for(var o,i,s=this.items.length;;s--)if(this.items.get(s-1).selection){--s
break}n&&(o=this.remapping(s,this.items.length),i=o.maps.length)
var a,c,l=t.tr,u=[],f=[]
return this.items.forEach((function(t,n){if(!t.step)return o||(o=r.remapping(s,n+1),i=o.maps.length),i--,void f.push(t)
if(o){f.push(new d(t.map))
var h,p=t.step.map(o.slice(i))
p&&l.maybeStep(p).doc&&(h=l.mapping.maps[l.mapping.maps.length-1],u.push(new d(h,void 0,void 0,u.length+f.length))),i--,h&&o.appendMap(h,i)}else l.maybeStep(t.step)
return t.selection?(a=o?t.selection.map(o.slice(i)):t.selection,c=new e(r.items.slice(0,s).append(f.reverse().concat(u)),r.eventCount-1),!1):void 0}),this.items.length,0),{remaining:c,transform:l,selection:a}}},{key:"addTransform",value:function(t,n,r,o){for(var i=[],s=this.eventCount,a=this.items,c=!o&&a.length?a.get(a.length-1):null,l=0;l<t.steps.length;l++){var u,f=t.steps[l].invert(t.docs[l]),p=new d(t.mapping.maps[l],f,n);(u=c&&c.merge(p))&&(p=u,l?i.pop():a=a.slice(0,a.length-1)),i.push(p),n&&(s++,n=void 0),o||(c=p)}var m,v,y,g=s-r.depth
return g>h&&(v=g,(m=a).forEach((function(e,t){if(e.selection&&0==v--)return y=t,!1})),a=m.slice(y),s-=g),new e(a.append(i),s)}},{key:"remapping",value:function(e,t){var n=new c.Mapping
return this.items.forEach((function(t,r){var o=null!=t.mirrorOffset&&r-t.mirrorOffset>=e?n.maps.length-t.mirrorOffset:void 0
n.appendMap(t.map,o)}),e,t),n}},{key:"addMaps",value:function(t){return 0==this.eventCount?this:new e(this.items.append(t.map((function(e){return new d(e)}))),this.eventCount)}},{key:"rebased",value:function(t,n){if(!this.eventCount)return this
var r=[],o=Math.max(0,this.items.length-n),i=t.mapping,s=t.steps.length,a=this.eventCount
this.items.forEach((function(e){e.selection&&a--}),o)
var c=n
this.items.forEach((function(e){var n=i.getMirror(--c)
if(null!=n){s=Math.min(s,n)
var o=i.maps[n]
if(e.step){var l=t.steps[n].invert(t.docs[n]),u=e.selection&&e.selection.map(i.slice(c+1,n))
u&&a++,r.push(new d(o,l,u))}else r.push(new d(o))}}),o)
for(var l=[],u=n;u<s;u++)l.push(new d(i.maps[u]))
var f=new e(this.items.slice(0,o).append(l).append(r),a)
return f.emptyItemCount()>500&&(f=f.compress(this.items.length-r.length)),f}},{key:"emptyItemCount",value:function(){var e=0
return this.items.forEach((function(t){t.step||e++})),e}},{key:"compress",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.items.length,n=this.remapping(0,t),r=n.maps.length,o=[],i=0
return this.items.forEach((function(e,s){if(s>=t)o.push(e),e.selection&&i++
else if(e.step){var a=e.step.map(n.slice(r)),c=a&&a.getMap()
if(r--,c&&n.appendMap(c,r),a){var l=e.selection&&e.selection.map(n.slice(r))
l&&i++
var u,f=new d(c.invert(),a,l),h=o.length-1;(u=o.length&&o[h].merge(f))?o[h]=u:o.push(f)}}else e.map&&r--}),this.items.length,0),new e(a.from(o.reverse()),i)}}]),e}()
u.empty=new u(a.empty,0)
var d=function(){function e(t,n,r,i){o(this,e),this.map=t,this.step=n,this.selection=r,this.mirrorOffset=i}return s(e,[{key:"merge",value:function(t){if(this.step&&t.step&&!t.selection){var n=t.step.merge(this.step)
if(n)return new e(n.getMap().invert(),n,this.selection)}}}]),e}(),f=s((function e(t,n,r,i,s){o(this,e),this.done=t,this.undone=n,this.prevRanges=r,this.prevTime=i,this.prevComposition=s})),h=20
function p(e){for(var t=[],n=e.length-1;n>=0&&0==t.length;n--)e[n].forEach((function(e,n,r,o){return t.push(r,o)}))
return t}function m(e,t){if(!e)return null
for(var n=[],r=0;r<e.length;r+=2){var o=t.map(e[r],1),i=t.map(e[r+1],-1)
o<=i&&n.push(o,i)}return n}var v=!1,y=null
function g(e){var t=e.plugins
if(y!=t){v=!1,y=t
for(var n=0;n<t.length;n++)if(t[n].spec.historyPreserveItems){v=!0
break}}return v}var k=new l.PluginKey("history"),b=new l.PluginKey("closeHistory")
function w(e,t){return function(n,r){var o=k.getState(n)
if(!o||0==(e?o.undone:o.done).eventCount)return!1
if(r){var i=function(e,t,n){var r=g(t),o=k.get(t).spec.config,i=(n?e.undone:e.done).popEvent(t,r)
if(!i)return null
var s=i.selection.resolve(i.transform.doc),a=(n?e.done:e.undone).addTransform(i.transform,t.selection.getBookmark(),o,r),c=new f(n?a:i.remaining,n?i.remaining:a,null,0,-1)
return i.transform.setSelection(s).setMeta(k,{redo:n,historyState:c})}(o,n,e)
i&&r(t?i.scrollIntoView():i)}return!0}}var S=w(!1,!0),x=w(!0,!0),O=w(!1,!1),M=w(!0,!1)
t.closeHistory=function(e){return e.setMeta(b,!0)},t.history=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
return e={depth:e.depth||100,newGroupDelay:e.newGroupDelay||500},new l.Plugin({key:k,state:{init:function(){return new f(u.empty,u.empty,null,0,-1)},apply:function(t,n,r){return function(e,t,n,r){var o,i=n.getMeta(k)
if(i)return i.historyState
n.getMeta(b)&&(e=new f(e.done,e.undone,null,0,-1))
var s=n.getMeta("appendedTransaction")
if(0==n.steps.length)return e
if(s&&s.getMeta(k))return s.getMeta(k).redo?new f(e.done.addTransform(n,void 0,r,g(t)),e.undone,p(n.mapping.maps),e.prevTime,e.prevComposition):new f(e.done,e.undone.addTransform(n,void 0,r,g(t)),null,e.prevTime,e.prevComposition)
if(!1===n.getMeta("addToHistory")||s&&!1===s.getMeta("addToHistory"))return(o=n.getMeta("rebased"))?new f(e.done.rebased(n,o),e.undone.rebased(n,o),m(e.prevRanges,n.mapping),e.prevTime,e.prevComposition):new f(e.done.addMaps(n.mapping.maps),e.undone.addMaps(n.mapping.maps),m(e.prevRanges,n.mapping),e.prevTime,e.prevComposition)
var a=n.getMeta("composition"),c=0==e.prevTime||!s&&e.prevComposition!=a&&(e.prevTime<(n.time||0)-r.newGroupDelay||!function(e,t){if(!t)return!1
if(!e.docChanged)return!0
var n=!1
return e.mapping.maps[0].forEach((function(e,r){for(var o=0;o<t.length;o+=2)e<=t[o+1]&&r>=t[o]&&(n=!0)})),n}(n,e.prevRanges)),l=s?m(e.prevRanges,n.mapping):p(n.mapping.maps)
return new f(e.done.addTransform(n,c?t.selection.getBookmark():void 0,r,g(t)),u.empty,l,n.time,null==a?e.prevComposition:a)}(n,r,t,e)}},config:e,props:{handleDOMEvents:{beforeinput:function(e,t){var n=t.inputType,r="historyUndo"==n?S:"historyRedo"==n?x:null
return!!r&&(t.preventDefault(),r(e.state,e.dispatch))}}}})},t.redo=x,t.redoDepth=function(e){var t=k.getState(e)
return t?t.undone.eventCount:0},t.redoNoScroll=M,t.undo=S,t.undoDepth=function(e){var t=k.getState(e)
return t?t.done.eventCount:0},t.undoNoScroll=O},675:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0})
var r,o=n(449)
r=o,Object.keys(r).filter((e=>"default"!==e&&"__esModule"!==e)).forEach((e=>{t.hasOwnProperty(e)||Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:()=>r[e]})}))},689:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0})
var r=n(248),o=n(223)
const i=r.Extension.create({name:"history",addOptions:()=>({depth:100,newGroupDelay:500}),addCommands:()=>({undo:()=>({state:e,dispatch:t})=>o.undo(e,t),redo:()=>({state:e,dispatch:t})=>o.redo(e,t)}),addProseMirrorPlugins(){return[o.history(this.options)]},addKeyboardShortcuts(){return{"Mod-z":()=>this.editor.commands.undo(),"Shift-Mod-z":()=>this.editor.commands.redo(),"Mod-y":()=>this.editor.commands.redo(),"Mod-я":()=>this.editor.commands.undo(),"Shift-Mod-я":()=>this.editor.commands.redo()}}})
t.History=i,t.default=i},712:(e,t,n)=>{function r(e,t){(null==t||t>e.length)&&(t=e.length)
for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n]
return r}function o(){return o="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=d(e)););return e}(e,t)
if(r){var o=Object.getOwnPropertyDescriptor(r,t)
return o.get?o.get.call(arguments.length<3?e:n):o.value}},o.apply(this,arguments)}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&u(e,t)}function s(e){var t=l()
return function(){var n,r=d(e)
if(t){var o=d(this).constructor
n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments)
return function(e,t){if(t&&("object"===f(t)||"function"==typeof t))return t
if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined")
return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}(e)}(this,n)}}function a(e){var t="function"==typeof Map?new Map:void 0
return a=function(e){if(null===e||!function(e){try{return-1!==Function.toString.call(e).indexOf("[native code]")}catch(t){return"function"==typeof e}}(e))return e
if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function")
if(void 0!==t){if(t.has(e))return t.get(e)
t.set(e,n)}function n(){return c(e,arguments,d(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),u(n,e)},a(e)}function c(e,t,n){return c=l()?Reflect.construct.bind():function(e,t,n){var r=[null]
r.push.apply(r,t)
var o=new(Function.bind.apply(e,r))
return n&&u(o,n.prototype),o},c.apply(null,arguments)}function l(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function u(e,t){return u=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},u(e,t)}function d(e){return d=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},d(e)}function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function h(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,(o=function(e){if("object"!==f(e)||null===e)return e
var t=e[Symbol.toPrimitive]
if(void 0!==t){var n=t.call(e,"string")
if("object"!==f(n))return n
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(r.key),"symbol"===f(o)?o:String(o)),r)}var o}function m(e,t,n){return t&&p(e.prototype,t),n&&p(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}var v=n(717)
function y(e,t,n){for(var r=0;;r++){if(r==e.childCount||r==t.childCount)return e.childCount==t.childCount?null:n
var o=e.child(r),i=t.child(r)
if(o!=i){if(!o.sameMarkup(i))return n
if(o.isText&&o.text!=i.text){for(var s=0;o.text[s]==i.text[s];s++)n++
return n}if(o.content.size||i.content.size){var a=y(o.content,i.content,n+1)
if(null!=a)return a}n+=o.nodeSize}else n+=o.nodeSize}}function g(e,t,n,r){for(var o=e.childCount,i=t.childCount;;){if(0==o||0==i)return o==i?null:{a:n,b:r}
var s=e.child(--o),a=t.child(--i),c=s.nodeSize
if(s!=a){if(!s.sameMarkup(a))return{a:n,b:r}
if(s.isText&&s.text!=a.text){for(var l=0,u=Math.min(s.text.length,a.text.length);l<u&&s.text[s.text.length-l-1]==a.text[a.text.length-l-1];)l++,n--,r--
return{a:n,b:r}}if(s.content.size||a.content.size){var d=g(s.content,a.content,n-1,r-1)
if(d)return d}n-=c,r-=c}else n-=c,r-=c}}var k=function(){function e(t,n){if(h(this,e),this.content=t,this.size=n||0,null==n)for(var r=0;r<t.length;r++)this.size+=t[r].nodeSize}return m(e,[{key:"nodesBetween",value:function(e,t,n){for(var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,o=arguments.length>4?arguments[4]:void 0,i=0,s=0;s<t;i++){var a=this.content[i],c=s+a.nodeSize
if(c>e&&!1!==n(a,r+s,o||null,i)&&a.content.size){var l=s+1
a.nodesBetween(Math.max(0,e-l),Math.min(a.content.size,t-l),n,r+l)}s=c}}},{key:"descendants",value:function(e){this.nodesBetween(0,this.size,e)}},{key:"textBetween",value:function(e,t,n,r){var o="",i=!0
return this.nodesBetween(e,t,(function(s,a){var c=s.isText?s.text.slice(Math.max(e,a)-a,t-a):s.isLeaf?r?"function"==typeof r?r(s):r:s.type.spec.leafText?s.type.spec.leafText(s):"":""
s.isBlock&&(s.isLeaf&&c||s.isTextblock)&&n&&(i?i=!1:o+=n),o+=c}),0),o}},{key:"append",value:function(t){if(!t.size)return this
if(!this.size)return t
var n=this.lastChild,r=t.firstChild,o=this.content.slice(),i=0
for(n.isText&&n.sameMarkup(r)&&(o[o.length-1]=n.withText(n.text+r.text),i=1);i<t.content.length;i++)o.push(t.content[i])
return new e(o,this.size+t.size)}},{key:"cut",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.size
if(0==t&&n==this.size)return this
var r=[],o=0
if(n>t)for(var i=0,s=0;s<n;i++){var a=this.content[i],c=s+a.nodeSize
c>t&&((s<t||c>n)&&(a=a.isText?a.cut(Math.max(0,t-s),Math.min(a.text.length,n-s)):a.cut(Math.max(0,t-s-1),Math.min(a.content.size,n-s-1))),r.push(a),o+=a.nodeSize),s=c}return new e(r,o)}},{key:"cutByIndex",value:function(t,n){return t==n?e.empty:0==t&&n==this.content.length?this:new e(this.content.slice(t,n))}},{key:"replaceChild",value:function(t,n){var r=this.content[t]
if(r==n)return this
var o=this.content.slice(),i=this.size+n.nodeSize-r.nodeSize
return o[t]=n,new e(o,i)}},{key:"addToStart",value:function(t){return new e([t].concat(this.content),this.size+t.nodeSize)}},{key:"addToEnd",value:function(t){return new e(this.content.concat(t),this.size+t.nodeSize)}},{key:"eq",value:function(e){if(this.content.length!=e.content.length)return!1
for(var t=0;t<this.content.length;t++)if(!this.content[t].eq(e.content[t]))return!1
return!0}},{key:"firstChild",get:function(){return this.content.length?this.content[0]:null}},{key:"lastChild",get:function(){return this.content.length?this.content[this.content.length-1]:null}},{key:"childCount",get:function(){return this.content.length}},{key:"child",value:function(e){var t=this.content[e]
if(!t)throw new RangeError("Index "+e+" out of range for "+this)
return t}},{key:"maybeChild",value:function(e){return this.content[e]||null}},{key:"forEach",value:function(e){for(var t=0,n=0;t<this.content.length;t++){var r=this.content[t]
e(r,n,t),n+=r.nodeSize}}},{key:"findDiffStart",value:function(e){return y(this,e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:0)}},{key:"findDiffEnd",value:function(e){return g(this,e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.size,arguments.length>2&&void 0!==arguments[2]?arguments[2]:e.size)}},{key:"findIndex",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1
if(0==e)return w(0,e)
if(e==this.size)return w(this.content.length,e)
if(e>this.size||e<0)throw new RangeError("Position ".concat(e," outside of fragment (").concat(this,")"))
for(var n=0,r=0;;n++){var o=r+this.child(n).nodeSize
if(o>=e)return o==e||t>0?w(n+1,o):w(n,r)
r=o}}},{key:"toString",value:function(){return"<"+this.toStringInner()+">"}},{key:"toStringInner",value:function(){return this.content.join(", ")}},{key:"toJSON",value:function(){return this.content.length?this.content.map((function(e){return e.toJSON()})):null}}],[{key:"fromJSON",value:function(t,n){if(!n)return e.empty
if(!Array.isArray(n))throw new RangeError("Invalid input for Fragment.fromJSON")
return new e(n.map(t.nodeFromJSON))}},{key:"fromArray",value:function(t){if(!t.length)return e.empty
for(var n,r=0,o=0;o<t.length;o++){var i=t[o]
r+=i.nodeSize,o&&i.isText&&t[o-1].sameMarkup(i)?(n||(n=t.slice(0,o)),n[n.length-1]=i.withText(n[n.length-1].text+i.text)):n&&n.push(i)}return new e(n||t,r)}},{key:"from",value:function(t){if(!t)return e.empty
if(t instanceof e)return t
if(Array.isArray(t))return this.fromArray(t)
if(t.attrs)return new e([t],t.nodeSize)
throw new RangeError("Can not convert "+t+" to a Fragment"+(t.nodesBetween?" (looks like multiple versions of prosemirror-model were loaded)":""))}}]),e}()
k.empty=new k([],0)
var b={index:0,offset:0}
function w(e,t){return b.index=e,b.offset=t,b}function S(e,t){if(e===t)return!0
if(!e||"object"!=f(e)||!t||"object"!=f(t))return!1
var n=Array.isArray(e)
if(Array.isArray(t)!=n)return!1
if(n){if(e.length!=t.length)return!1
for(var r=0;r<e.length;r++)if(!S(e[r],t[r]))return!1}else{for(var o in e)if(!(o in t)||!S(e[o],t[o]))return!1
for(var i in t)if(!(i in e))return!1}return!0}var x=function(){function e(t,n){h(this,e),this.type=t,this.attrs=n}return m(e,[{key:"addToSet",value:function(e){for(var t,n=!1,r=0;r<e.length;r++){var o=e[r]
if(this.eq(o))return e
if(this.type.excludes(o.type))t||(t=e.slice(0,r))
else{if(o.type.excludes(this.type))return e
!n&&o.type.rank>this.type.rank&&(t||(t=e.slice(0,r)),t.push(this),n=!0),t&&t.push(o)}}return t||(t=e.slice()),n||t.push(this),t}},{key:"removeFromSet",value:function(e){for(var t=0;t<e.length;t++)if(this.eq(e[t]))return e.slice(0,t).concat(e.slice(t+1))
return e}},{key:"isInSet",value:function(e){for(var t=0;t<e.length;t++)if(this.eq(e[t]))return!0
return!1}},{key:"eq",value:function(e){return this==e||this.type==e.type&&S(this.attrs,e.attrs)}},{key:"toJSON",value:function(){var e={type:this.type.name}
for(var t in this.attrs){e.attrs=this.attrs
break}return e}}],[{key:"fromJSON",value:function(e,t){if(!t)throw new RangeError("Invalid input for Mark.fromJSON")
var n=e.marks[t.type]
if(!n)throw new RangeError("There is no mark type ".concat(t.type," in this schema"))
var r=n.create(t.attrs)
return n.checkAttrs(r.attrs),r}},{key:"sameSet",value:function(e,t){if(e==t)return!0
if(e.length!=t.length)return!1
for(var n=0;n<e.length;n++)if(!e[n].eq(t[n]))return!1
return!0}},{key:"setFrom",value:function(t){if(!t||Array.isArray(t)&&0==t.length)return e.none
if(t instanceof e)return[t]
var n=t.slice()
return n.sort((function(e,t){return e.type.rank-t.type.rank})),n}}]),e}()
x.none=[]
var O=function(e){i(n,e)
var t=s(n)
function n(){return h(this,n),t.apply(this,arguments)}return m(n)}(a(Error)),M=function(){function e(t,n,r){h(this,e),this.content=t,this.openStart=n,this.openEnd=r}return m(e,[{key:"size",get:function(){return this.content.size-this.openStart-this.openEnd}},{key:"insertAt",value:function(t,n){var r=T(this.content,t+this.openStart,n)
return r&&new e(r,this.openStart,this.openEnd)}},{key:"removeBetween",value:function(t,n){return new e(C(this.content,t+this.openStart,n+this.openStart),this.openStart,this.openEnd)}},{key:"eq",value:function(e){return this.content.eq(e.content)&&this.openStart==e.openStart&&this.openEnd==e.openEnd}},{key:"toString",value:function(){return this.content+"("+this.openStart+","+this.openEnd+")"}},{key:"toJSON",value:function(){if(!this.content.size)return null
var e={content:this.content.toJSON()}
return this.openStart>0&&(e.openStart=this.openStart),this.openEnd>0&&(e.openEnd=this.openEnd),e}}],[{key:"fromJSON",value:function(t,n){if(!n)return e.empty
var r=n.openStart||0,o=n.openEnd||0
if("number"!=typeof r||"number"!=typeof o)throw new RangeError("Invalid input for Slice.fromJSON")
return new e(k.fromJSON(t,n.content),r,o)}},{key:"maxOpen",value:function(t){for(var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=0,o=0,i=t.firstChild;i&&!i.isLeaf&&(n||!i.type.spec.isolating);i=i.firstChild)r++
for(var s=t.lastChild;s&&!s.isLeaf&&(n||!s.type.spec.isolating);s=s.lastChild)o++
return new e(t,r,o)}}]),e}()
function C(e,t,n){var r=e.findIndex(t),o=r.index,i=r.offset,s=e.maybeChild(o),a=e.findIndex(n),c=a.index,l=a.offset
if(i==t||s.isText){if(l!=n&&!e.child(c).isText)throw new RangeError("Removing non-flat range")
return e.cut(0,t).append(e.cut(n))}if(o!=c)throw new RangeError("Removing non-flat range")
return e.replaceChild(o,s.copy(C(s.content,t-i-1,n-i-1)))}function T(e,t,n,r){var o=e.findIndex(t),i=o.index,s=o.offset,a=e.maybeChild(i)
if(s==t||a.isText)return r&&!r.canReplace(i,i,n)?null:e.cut(0,t).append(n).append(e.cut(t))
var c=T(a.content,t-s-1,n)
return c&&e.replaceChild(i,a.copy(c))}function N(e,t,n){if(n.openStart>e.depth)throw new O("Inserted content deeper than insertion position")
if(e.depth-n.openStart!=t.depth-n.openEnd)throw new O("Inconsistent open depths")
return E(e,t,n,0)}function E(e,t,n,r){var o=e.index(r),i=e.node(r)
if(o==t.index(r)&&r<e.depth-n.openStart){var s=E(e,t,n,r+1)
return i.copy(i.content.replaceChild(o,s))}if(n.content.size){if(n.openStart||n.openEnd||e.depth!=r||t.depth!=r){var a=function(e,t){for(var n=t.depth-e.openStart,r=t.node(n).copy(e.content),o=n-1;o>=0;o--)r=t.node(o).copy(k.from(r))
return{start:r.resolveNoCache(e.openStart+n),end:r.resolveNoCache(r.content.size-e.openEnd-n)}}(n,e)
return I(i,j(e,a.start,a.end,t,r))}var c=e.parent,l=c.content
return I(c,l.cut(0,e.parentOffset).append(n.content).append(l.cut(t.parentOffset)))}return I(i,z(e,t,r))}function D(e,t){if(!t.type.compatibleContent(e.type))throw new O("Cannot join "+t.type.name+" onto "+e.type.name)}function A(e,t,n){var r=e.node(n)
return D(r,t.node(n)),r}function P(e,t){var n=t.length-1
n>=0&&e.isText&&e.sameMarkup(t[n])?t[n]=e.withText(t[n].text+e.text):t.push(e)}function R(e,t,n,r){var o=(t||e).node(n),i=0,s=t?t.index(n):o.childCount
e&&(i=e.index(n),e.depth>n?i++:e.textOffset&&(P(e.nodeAfter,r),i++))
for(var a=i;a<s;a++)P(o.child(a),r)
t&&t.depth==n&&t.textOffset&&P(t.nodeBefore,r)}function I(e,t){return e.type.checkContent(t),e.copy(t)}function j(e,t,n,r,o){var i=e.depth>o&&A(e,t,o+1),s=r.depth>o&&A(n,r,o+1),a=[]
return R(null,e,o,a),i&&s&&t.index(o)==n.index(o)?(D(i,s),P(I(i,j(e,t,n,r,o+1)),a)):(i&&P(I(i,z(e,t,o+1)),a),R(t,n,o,a),s&&P(I(s,z(n,r,o+1)),a)),R(r,null,o,a),new k(a)}function z(e,t,n){var r=[]
return R(null,e,n,r),e.depth>n&&P(I(A(e,t,n+1),z(e,t,n+1)),r),R(t,null,n,r),new k(r)}M.empty=new M(k.empty,0,0)
var B=function(){function e(t,n,r){h(this,e),this.pos=t,this.path=n,this.parentOffset=r,this.depth=n.length/3-1}return m(e,[{key:"resolveDepth",value:function(e){return null==e?this.depth:e<0?this.depth+e:e}},{key:"parent",get:function(){return this.node(this.depth)}},{key:"doc",get:function(){return this.node(0)}},{key:"node",value:function(e){return this.path[3*this.resolveDepth(e)]}},{key:"index",value:function(e){return this.path[3*this.resolveDepth(e)+1]}},{key:"indexAfter",value:function(e){return e=this.resolveDepth(e),this.index(e)+(e!=this.depth||this.textOffset?1:0)}},{key:"start",value:function(e){return 0==(e=this.resolveDepth(e))?0:this.path[3*e-1]+1}},{key:"end",value:function(e){return e=this.resolveDepth(e),this.start(e)+this.node(e).content.size}},{key:"before",value:function(e){if(!(e=this.resolveDepth(e)))throw new RangeError("There is no position before the top-level node")
return e==this.depth+1?this.pos:this.path[3*e-1]}},{key:"after",value:function(e){if(!(e=this.resolveDepth(e)))throw new RangeError("There is no position after the top-level node")
return e==this.depth+1?this.pos:this.path[3*e-1]+this.path[3*e].nodeSize}},{key:"textOffset",get:function(){return this.pos-this.path[this.path.length-1]}},{key:"nodeAfter",get:function(){var e=this.parent,t=this.index(this.depth)
if(t==e.childCount)return null
var n=this.pos-this.path[this.path.length-1],r=e.child(t)
return n?e.child(t).cut(n):r}},{key:"nodeBefore",get:function(){var e=this.index(this.depth),t=this.pos-this.path[this.path.length-1]
return t?this.parent.child(e).cut(0,t):0==e?null:this.parent.child(e-1)}},{key:"posAtIndex",value:function(e,t){t=this.resolveDepth(t)
for(var n=this.path[3*t],r=0==t?0:this.path[3*t-1]+1,o=0;o<e;o++)r+=n.child(o).nodeSize
return r}},{key:"marks",value:function(){var e=this.parent,t=this.index()
if(0==e.content.size)return x.none
if(this.textOffset)return e.child(t).marks
var n=e.maybeChild(t-1),r=e.maybeChild(t)
if(!n){var o=n
n=r,r=o}for(var i=n.marks,s=0;s<i.length;s++)!1!==i[s].type.spec.inclusive||r&&i[s].isInSet(r.marks)||(i=i[s--].removeFromSet(i))
return i}},{key:"marksAcross",value:function(e){var t=this.parent.maybeChild(this.index())
if(!t||!t.isInline)return null
for(var n=t.marks,r=e.parent.maybeChild(e.index()),o=0;o<n.length;o++)!1!==n[o].type.spec.inclusive||r&&n[o].isInSet(r.marks)||(n=n[o--].removeFromSet(n))
return n}},{key:"sharedDepth",value:function(e){for(var t=this.depth;t>0;t--)if(this.start(t)<=e&&this.end(t)>=e)return t
return 0}},{key:"blockRange",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this,t=arguments.length>1?arguments[1]:void 0
if(e.pos<this.pos)return e.blockRange(this)
for(var n=this.depth-(this.parent.inlineContent||this.pos==e.pos?1:0);n>=0;n--)if(e.pos<=this.end(n)&&(!t||t(this.node(n))))return new _(this,e,n)
return null}},{key:"sameParent",value:function(e){return this.pos-this.parentOffset==e.pos-e.parentOffset}},{key:"max",value:function(e){return e.pos>this.pos?e:this}},{key:"min",value:function(e){return e.pos<this.pos?e:this}},{key:"toString",value:function(){for(var e="",t=1;t<=this.depth;t++)e+=(e?"/":"")+this.node(t).type.name+"_"+this.index(t-1)
return e+":"+this.parentOffset}}],[{key:"resolve",value:function(t,n){if(!(n>=0&&n<=t.content.size))throw new RangeError("Position "+n+" out of range")
for(var r=[],o=0,i=n,s=t;;){var a=s.content.findIndex(i),c=a.index,l=a.offset,u=i-l
if(r.push(s,c,o+l),!u)break
if((s=s.child(c)).isText)break
i=u-1,o+=l+1}return new e(n,r,i)}},{key:"resolveCached",value:function(t,n){var r=V.get(t)
if(r)for(var o=0;o<r.elts.length;o++){var i=r.elts[o]
if(i.pos==n)return i}else V.set(t,r=new F)
var s=r.elts[r.i]=e.resolve(t,n)
return r.i=(r.i+1)%$,s}}]),e}(),F=m((function e(){h(this,e),this.elts=[],this.i=0})),$=12,V=new WeakMap,_=function(){function e(t,n,r){h(this,e),this.$from=t,this.$to=n,this.depth=r}return m(e,[{key:"start",get:function(){return this.$from.before(this.depth+1)}},{key:"end",get:function(){return this.$to.after(this.depth+1)}},{key:"parent",get:function(){return this.$from.node(this.depth)}},{key:"startIndex",get:function(){return this.$from.index(this.depth)}},{key:"endIndex",get:function(){return this.$to.indexAfter(this.depth)}}]),e}(),L=Object.create(null),J=function(){function e(t,n,r){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:x.none
h(this,e),this.type=t,this.attrs=n,this.marks=o,this.content=r||k.empty}return m(e,[{key:"nodeSize",get:function(){return this.isLeaf?1:2+this.content.size}},{key:"childCount",get:function(){return this.content.childCount}},{key:"child",value:function(e){return this.content.child(e)}},{key:"maybeChild",value:function(e){return this.content.maybeChild(e)}},{key:"forEach",value:function(e){this.content.forEach(e)}},{key:"nodesBetween",value:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0
this.content.nodesBetween(e,t,n,r,this)}},{key:"descendants",value:function(e){this.nodesBetween(0,this.content.size,e)}},{key:"textContent",get:function(){return this.isLeaf&&this.type.spec.leafText?this.type.spec.leafText(this):this.textBetween(0,this.content.size,"")}},{key:"textBetween",value:function(e,t,n,r){return this.content.textBetween(e,t,n,r)}},{key:"firstChild",get:function(){return this.content.firstChild}},{key:"lastChild",get:function(){return this.content.lastChild}},{key:"eq",value:function(e){return this==e||this.sameMarkup(e)&&this.content.eq(e.content)}},{key:"sameMarkup",value:function(e){return this.hasMarkup(e.type,e.attrs,e.marks)}},{key:"hasMarkup",value:function(e,t,n){return this.type==e&&S(this.attrs,t||e.defaultAttrs||L)&&x.sameSet(this.marks,n||x.none)}},{key:"copy",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null
return t==this.content?this:new e(this.type,this.attrs,t,this.marks)}},{key:"mark",value:function(t){return t==this.marks?this:new e(this.type,this.attrs,this.content,t)}},{key:"cut",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.content.size
return 0==e&&t==this.content.size?this:this.copy(this.content.cut(e,t))}},{key:"slice",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.content.size,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2]
if(e==t)return M.empty
var r=this.resolve(e),o=this.resolve(t),i=n?0:r.sharedDepth(t),s=r.start(i),a=r.node(i).content.cut(r.pos-s,o.pos-s)
return new M(a,r.depth-i,o.depth-i)}},{key:"replace",value:function(e,t,n){return N(this.resolve(e),this.resolve(t),n)}},{key:"nodeAt",value:function(e){for(var t=this;;){var n=t.content.findIndex(e),r=n.index,o=n.offset
if(!(t=t.maybeChild(r)))return null
if(o==e||t.isText)return t
e-=o+1}}},{key:"childAfter",value:function(e){var t=this.content.findIndex(e),n=t.index,r=t.offset
return{node:this.content.maybeChild(n),index:n,offset:r}}},{key:"childBefore",value:function(e){if(0==e)return{node:null,index:0,offset:0}
var t=this.content.findIndex(e),n=t.index,r=t.offset
if(r<e)return{node:this.content.child(n),index:n,offset:r}
var o=this.content.child(n-1)
return{node:o,index:n-1,offset:r-o.nodeSize}}},{key:"resolve",value:function(e){return B.resolveCached(this,e)}},{key:"resolveNoCache",value:function(e){return B.resolve(this,e)}},{key:"rangeHasMark",value:function(e,t,n){var r=!1
return t>e&&this.nodesBetween(e,t,(function(e){return n.isInSet(e.marks)&&(r=!0),!r})),r}},{key:"isBlock",get:function(){return this.type.isBlock}},{key:"isTextblock",get:function(){return this.type.isTextblock}},{key:"inlineContent",get:function(){return this.type.inlineContent}},{key:"isInline",get:function(){return this.type.isInline}},{key:"isText",get:function(){return this.type.isText}},{key:"isLeaf",get:function(){return this.type.isLeaf}},{key:"isAtom",get:function(){return this.type.isAtom}},{key:"toString",value:function(){if(this.type.spec.toDebugString)return this.type.spec.toDebugString(this)
var e=this.type.name
return this.content.size&&(e+="("+this.content.toStringInner()+")"),q(this.marks,e)}},{key:"contentMatchAt",value:function(e){var t=this.type.contentMatch.matchFragment(this.content,0,e)
if(!t)throw new Error("Called contentMatchAt on a node with invalid content")
return t}},{key:"canReplace",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:k.empty,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:n.childCount,i=this.contentMatchAt(e).matchFragment(n,r,o),s=i&&i.matchFragment(this.content,t)
if(!s||!s.validEnd)return!1
for(var a=r;a<o;a++)if(!this.type.allowsMarks(n.child(a).marks))return!1
return!0}},{key:"canReplaceWith",value:function(e,t,n,r){if(r&&!this.type.allowsMarks(r))return!1
var o=this.contentMatchAt(e).matchType(n),i=o&&o.matchFragment(this.content,t)
return!!i&&i.validEnd}},{key:"canAppend",value:function(e){return e.content.size?this.canReplace(this.childCount,this.childCount,e.content):this.type.compatibleContent(e.type)}},{key:"check",value:function(){this.type.checkContent(this.content),this.type.checkAttrs(this.attrs)
for(var e=x.none,t=0;t<this.marks.length;t++){var n=this.marks[t]
n.type.checkAttrs(n.attrs),e=n.addToSet(e)}if(!x.sameSet(e,this.marks))throw new RangeError("Invalid collection of marks for node ".concat(this.type.name,": ").concat(this.marks.map((function(e){return e.type.name}))))
this.content.forEach((function(e){return e.check()}))}},{key:"toJSON",value:function(){var e={type:this.type.name}
for(var t in this.attrs){e.attrs=this.attrs
break}return this.content.size&&(e.content=this.content.toJSON()),this.marks.length&&(e.marks=this.marks.map((function(e){return e.toJSON()}))),e}}],[{key:"fromJSON",value:function(e,t){if(!t)throw new RangeError("Invalid input for Node.fromJSON")
var n=void 0
if(t.marks){if(!Array.isArray(t.marks))throw new RangeError("Invalid mark data for Node.fromJSON")
n=t.marks.map(e.markFromJSON)}if("text"==t.type){if("string"!=typeof t.text)throw new RangeError("Invalid text node in JSON")
return e.text(t.text,n)}var r=k.fromJSON(e,t.content),o=e.nodeType(t.type).create(t.attrs,r,n)
return o.type.checkAttrs(o.attrs),o}}]),e}()
J.prototype.text=void 0
var W=function(e){i(n,e)
var t=s(n)
function n(e,r,o,i){var s
if(h(this,n),s=t.call(this,e,r,null,i),!o)throw new RangeError("Empty text nodes are not allowed")
return s.text=o,s}return m(n,[{key:"toString",value:function(){return this.type.spec.toDebugString?this.type.spec.toDebugString(this):q(this.marks,JSON.stringify(this.text))}},{key:"textContent",get:function(){return this.text}},{key:"textBetween",value:function(e,t){return this.text.slice(e,t)}},{key:"nodeSize",get:function(){return this.text.length}},{key:"mark",value:function(e){return e==this.marks?this:new n(this.type,this.attrs,this.text,e)}},{key:"withText",value:function(e){return e==this.text?this:new n(this.type,this.attrs,e,this.marks)}},{key:"cut",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.text.length
return 0==e&&t==this.text.length?this:this.withText(this.text.slice(e,t))}},{key:"eq",value:function(e){return this.sameMarkup(e)&&this.text==e.text}},{key:"toJSON",value:function(){var e=o(d(n.prototype),"toJSON",this).call(this)
return e.text=this.text,e}}]),n}(J)
function q(e,t){for(var n=e.length-1;n>=0;n--)t=e[n].type.name+"("+t+")"
return t}var K=function(){function e(t){h(this,e),this.validEnd=t,this.next=[],this.wrapCache=[]}return m(e,[{key:"matchType",value:function(e){for(var t=0;t<this.next.length;t++)if(this.next[t].type==e)return this.next[t].next
return null}},{key:"matchFragment",value:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e.childCount,r=this,o=t;r&&o<n;o++)r=r.matchType(e.child(o).type)
return r}},{key:"inlineContent",get:function(){return 0!=this.next.length&&this.next[0].type.isInline}},{key:"defaultType",get:function(){for(var e=0;e<this.next.length;e++){var t=this.next[e].type
if(!t.isText&&!t.hasRequiredAttrs())return t}return null}},{key:"compatible",value:function(e){for(var t=0;t<this.next.length;t++)for(var n=0;n<e.next.length;n++)if(this.next[t].type==e.next[n].type)return!0
return!1}},{key:"fillBefore",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=[this]
return function o(i,s){var a=i.matchFragment(e,n)
if(a&&(!t||a.validEnd))return k.from(s.map((function(e){return e.createAndFill()})))
for(var c=0;c<i.next.length;c++){var l=i.next[c],u=l.type,d=l.next
if(!u.isText&&!u.hasRequiredAttrs()&&-1==r.indexOf(d)){r.push(d)
var f=o(d,s.concat(u))
if(f)return f}}return null}(this,[])}},{key:"findWrapping",value:function(e){for(var t=0;t<this.wrapCache.length;t+=2)if(this.wrapCache[t]==e)return this.wrapCache[t+1]
var n=this.computeWrapping(e)
return this.wrapCache.push(e,n),n}},{key:"computeWrapping",value:function(e){for(var t=Object.create(null),n=[{match:this,type:null,via:null}];n.length;){var r=n.shift(),o=r.match
if(o.matchType(e)){for(var i=[],s=r;s.type;s=s.via)i.push(s.type)
return i.reverse()}for(var a=0;a<o.next.length;a++){var c=o.next[a],l=c.type,u=c.next
l.isLeaf||l.hasRequiredAttrs()||l.name in t||r.type&&!u.validEnd||(n.push({match:l.contentMatch,type:l,via:r}),t[l.name]=!0)}}return null}},{key:"edgeCount",get:function(){return this.next.length}},{key:"edge",value:function(e){if(e>=this.next.length)throw new RangeError("There's no ".concat(e,"th edge in this content match"))
return this.next[e]}},{key:"toString",value:function(){var e=[]
return function t(n){e.push(n)
for(var r=0;r<n.next.length;r++)-1==e.indexOf(n.next[r].next)&&t(n.next[r].next)}(this),e.map((function(t,n){for(var r=n+(t.validEnd?"*":" ")+" ",o=0;o<t.next.length;o++)r+=(o?", ":"")+t.next[o].type.name+"->"+e.indexOf(t.next[o].next)
return r})).join("\n")}}],[{key:"parse",value:function(t,n){var r=new H(t,n)
if(null==r.next)return e.empty
var o=U(r)
r.next&&r.err("Unexpected trailing text")
var i=function(e){var t=Object.create(null)
return function n(r){var o=[]
r.forEach((function(t){e[t].forEach((function(t){var n=t.term,r=t.to
if(n){for(var i,s=0;s<o.length;s++)o[s][0]==n&&(i=o[s][1])
ee(e,r).forEach((function(e){i||o.push([n,i=[]]),-1==i.indexOf(e)&&i.push(e)}))}}))}))
for(var i=t[r.join(",")]=new K(r.indexOf(e.length-1)>-1),s=0;s<o.length;s++){var a=o[s][1].sort(Z)
i.next.push({type:o[s][0],next:t[a.join(",")]||n(a)})}return i}(ee(e,0))}(function(e){var t=[[]]
return o(function e(t,i){if("choice"==t.type)return t.exprs.reduce((function(t,n){return t.concat(e(n,i))}),[])
if("seq"!=t.type){if("star"==t.type){var s=n()
return r(i,s),o(e(t.expr,s),s),[r(s)]}if("plus"==t.type){var a=n()
return o(e(t.expr,i),a),o(e(t.expr,a),a),[r(a)]}if("opt"==t.type)return[r(i)].concat(e(t.expr,i))
if("range"==t.type){for(var c=i,l=0;l<t.min;l++){var u=n()
o(e(t.expr,c),u),c=u}if(-1==t.max)o(e(t.expr,c),c)
else for(var d=t.min;d<t.max;d++){var f=n()
r(c,f),o(e(t.expr,c),f),c=f}return[r(c)]}if("name"==t.type)return[r(i,void 0,t.value)]
throw new Error("Unknown expr type")}for(var h=0;;h++){var p=e(t.exprs[h],i)
if(h==t.exprs.length-1)return p
o(p,i=n())}}(e,0),n()),t
function n(){return t.push([])-1}function r(e,n,r){var o={term:r,to:n}
return t[e].push(o),o}function o(e,t){e.forEach((function(e){return e.to=t}))}}(o))
return function(e,t){for(var n=0,r=[e];n<r.length;n++){for(var o=r[n],i=!o.validEnd,s=[],a=0;a<o.next.length;a++){var c=o.next[a],l=c.type,u=c.next
s.push(l.name),!i||l.isText||l.hasRequiredAttrs()||(i=!1),-1==r.indexOf(u)&&r.push(u)}i&&t.err("Only non-generatable nodes ("+s.join(", ")+") in a required position (see https://prosemirror.net/docs/guide/#generatable)")}}(i,r),i}}]),e}()
K.empty=new K(!0)
var H=function(){function e(t,n){h(this,e),this.string=t,this.nodeTypes=n,this.inline=null,this.pos=0,this.tokens=t.split(/\s*(?=\b|\W|$)/),""==this.tokens[this.tokens.length-1]&&this.tokens.pop(),""==this.tokens[0]&&this.tokens.shift()}return m(e,[{key:"next",get:function(){return this.tokens[this.pos]}},{key:"eat",value:function(e){return this.next==e&&(this.pos++||!0)}},{key:"err",value:function(e){throw new SyntaxError(e+" (in content expression '"+this.string+"')")}}]),e}()
function U(e){var t=[]
do{t.push(G(e))}while(e.eat("|"))
return 1==t.length?t[0]:{type:"choice",exprs:t}}function G(e){var t=[]
do{t.push(X(e))}while(e.next&&")"!=e.next&&"|"!=e.next)
return 1==t.length?t[0]:{type:"seq",exprs:t}}function X(e){for(var t=function(e){if(e.eat("(")){var t=U(e)
return e.eat(")")||e.err("Missing closing paren"),t}if(!/\W/.test(e.next)){var n=function(e,t){var n=e.nodeTypes,r=n[t]
if(r)return[r]
var o=[]
for(var i in n){var s=n[i]
s.groups.indexOf(t)>-1&&o.push(s)}return 0==o.length&&e.err("No node type or group '"+t+"' found"),o}(e,e.next).map((function(t){return null==e.inline?e.inline=t.isInline:e.inline!=t.isInline&&e.err("Mixing inline and block content"),{type:"name",value:t}}))
return e.pos++,1==n.length?n[0]:{type:"choice",exprs:n}}e.err("Unexpected token '"+e.next+"'")}(e);;)if(e.eat("+"))t={type:"plus",expr:t}
else if(e.eat("*"))t={type:"star",expr:t}
else if(e.eat("?"))t={type:"opt",expr:t}
else{if(!e.eat("{"))break
t=Q(e,t)}return t}function Y(e){/\D/.test(e.next)&&e.err("Expected number, got '"+e.next+"'")
var t=Number(e.next)
return e.pos++,t}function Q(e,t){var n=Y(e),r=n
return e.eat(",")&&(r="}"!=e.next?Y(e):-1),e.eat("}")||e.err("Unclosed braced range"),{type:"range",min:n,max:r,expr:t}}function Z(e,t){return t-e}function ee(e,t){var n=[]
return function t(r){var o=e[r]
if(1==o.length&&!o[0].term)return t(o[0].to)
n.push(r)
for(var i=0;i<o.length;i++){var s=o[i],a=s.term,c=s.to
a||-1!=n.indexOf(c)||t(c)}}(t),n.sort(Z)}function te(e){var t=Object.create(null)
for(var n in e){var r=e[n]
if(!r.hasDefault)return null
t[n]=r.default}return t}function ne(e,t){var n=Object.create(null)
for(var r in e){var o=t&&t[r]
if(void 0===o){var i=e[r]
if(!i.hasDefault)throw new RangeError("No value supplied for attribute "+r)
o=i.default}n[r]=o}return n}function re(e,t,n,r){for(var o in t)if(!(o in e))throw new RangeError("Unsupported attribute ".concat(o," for ").concat(n," of type ").concat(o))
for(var i in e){var s=e[i]
s.validate&&s.validate(t[i])}}function oe(e,t){var n=Object.create(null)
if(t)for(var r in t)n[r]=new se(e,r,t[r])
return n}var ie=function(){function e(t,n,r){h(this,e),this.name=t,this.schema=n,this.spec=r,this.markSet=null,this.groups=r.group?r.group.split(" "):[],this.attrs=oe(t,r.attrs),this.defaultAttrs=te(this.attrs),this.contentMatch=null,this.inlineContent=null,this.isBlock=!(r.inline||"text"==t),this.isText="text"==t}return m(e,[{key:"isInline",get:function(){return!this.isBlock}},{key:"isTextblock",get:function(){return this.isBlock&&this.inlineContent}},{key:"isLeaf",get:function(){return this.contentMatch==K.empty}},{key:"isAtom",get:function(){return this.isLeaf||!!this.spec.atom}},{key:"whitespace",get:function(){return this.spec.whitespace||(this.spec.code?"pre":"normal")}},{key:"hasRequiredAttrs",value:function(){for(var e in this.attrs)if(this.attrs[e].isRequired)return!0
return!1}},{key:"compatibleContent",value:function(e){return this==e||this.contentMatch.compatible(e.contentMatch)}},{key:"computeAttrs",value:function(e){return!e&&this.defaultAttrs?this.defaultAttrs:ne(this.attrs,e)}},{key:"create",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2?arguments[2]:void 0
if(this.isText)throw new Error("NodeType.create can't construct text nodes")
return new J(this,this.computeAttrs(e),k.from(t),x.setFrom(n))}},{key:"createChecked",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2?arguments[2]:void 0
return t=k.from(t),this.checkContent(t),new J(this,this.computeAttrs(e),t,x.setFrom(n))}},{key:"createAndFill",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2?arguments[2]:void 0
if(e=this.computeAttrs(e),(t=k.from(t)).size){var r=this.contentMatch.fillBefore(t)
if(!r)return null
t=r.append(t)}var o=this.contentMatch.matchFragment(t),i=o&&o.fillBefore(k.empty,!0)
return i?new J(this,e,t.append(i),x.setFrom(n)):null}},{key:"validContent",value:function(e){var t=this.contentMatch.matchFragment(e)
if(!t||!t.validEnd)return!1
for(var n=0;n<e.childCount;n++)if(!this.allowsMarks(e.child(n).marks))return!1
return!0}},{key:"checkContent",value:function(e){if(!this.validContent(e))throw new RangeError("Invalid content for node ".concat(this.name,": ").concat(e.toString().slice(0,50)))}},{key:"checkAttrs",value:function(e){re(this.attrs,e,"node",this.name)}},{key:"allowsMarkType",value:function(e){return null==this.markSet||this.markSet.indexOf(e)>-1}},{key:"allowsMarks",value:function(e){if(null==this.markSet)return!0
for(var t=0;t<e.length;t++)if(!this.allowsMarkType(e[t].type))return!1
return!0}},{key:"allowedMarks",value:function(e){if(null==this.markSet)return e
for(var t,n=0;n<e.length;n++)this.allowsMarkType(e[n].type)?t&&t.push(e[n]):t||(t=e.slice(0,n))
return t?t.length?t:x.none:e}}],[{key:"compile",value:function(t,n){var r=Object.create(null)
t.forEach((function(t,o){return r[t]=new e(t,n,o)}))
var o=n.spec.topNode||"doc"
if(!r[o])throw new RangeError("Schema is missing its top node type ('"+o+"')")
if(!r.text)throw new RangeError("Every schema needs a 'text' type")
for(var i in r.text.attrs)throw new RangeError("The text node type should not have attributes")
return r}}]),e}(),se=function(){function e(t,n,r){h(this,e),this.hasDefault=Object.prototype.hasOwnProperty.call(r,"default"),this.default=r.default,this.validate="string"==typeof r.validate?function(e,t,n){var r=n.split("|")
return function(n){var o=null===n?"null":f(n)
if(r.indexOf(o)<0)throw new RangeError("Expected value of type ".concat(r," for attribute ").concat(t," on type ").concat(e,", got ").concat(o))}}(t,n,r.validate):r.validate}return m(e,[{key:"isRequired",get:function(){return!this.hasDefault}}]),e}(),ae=function(){function e(t,n,r,o){h(this,e),this.name=t,this.rank=n,this.schema=r,this.spec=o,this.attrs=oe(t,o.attrs),this.excluded=null
var i=te(this.attrs)
this.instance=i?new x(this,i):null}return m(e,[{key:"create",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null
return!e&&this.instance?this.instance:new x(this,ne(this.attrs,e))}},{key:"removeFromSet",value:function(e){for(var t=0;t<e.length;t++)e[t].type==this&&(e=e.slice(0,t).concat(e.slice(t+1)),t--)
return e}},{key:"isInSet",value:function(e){for(var t=0;t<e.length;t++)if(e[t].type==this)return e[t]}},{key:"checkAttrs",value:function(e){re(this.attrs,e,"mark",this.name)}},{key:"excludes",value:function(e){return this.excluded.indexOf(e)>-1}}],[{key:"compile",value:function(t,n){var r=Object.create(null),o=0
return t.forEach((function(t,i){return r[t]=new e(t,o++,n,i)})),r}}]),e}(),ce=function(){function e(t){h(this,e),this.linebreakReplacement=null,this.cached=Object.create(null)
var n=this.spec={}
for(var r in t)n[r]=t[r]
n.nodes=v.from(t.nodes),n.marks=v.from(t.marks||{}),this.nodes=ie.compile(this.spec.nodes,this),this.marks=ae.compile(this.spec.marks,this)
var o=Object.create(null)
for(var i in this.nodes){if(i in this.marks)throw new RangeError(i+" can not be both a node and a mark")
var s=this.nodes[i],a=s.spec.content||"",c=s.spec.marks
if(s.contentMatch=o[a]||(o[a]=K.parse(a,this.nodes)),s.inlineContent=s.contentMatch.inlineContent,s.spec.linebreakReplacement){if(this.linebreakReplacement)throw new RangeError("Multiple linebreak nodes defined")
if(!s.isInline||!s.isLeaf)throw new RangeError("Linebreak replacement nodes must be inline leaf nodes")
this.linebreakReplacement=s}s.markSet="_"==c?null:c?le(this,c.split(" ")):""!=c&&s.inlineContent?null:[]}for(var l in this.marks){var u=this.marks[l],d=u.spec.excludes
u.excluded=null==d?[u]:""==d?[]:le(this,d.split(" "))}this.nodeFromJSON=this.nodeFromJSON.bind(this),this.markFromJSON=this.markFromJSON.bind(this),this.topNodeType=this.nodes[this.spec.topNode||"doc"],this.cached.wrappings=Object.create(null)}return m(e,[{key:"node",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2?arguments[2]:void 0,r=arguments.length>3?arguments[3]:void 0
if("string"==typeof e)e=this.nodeType(e)
else{if(!(e instanceof ie))throw new RangeError("Invalid node type: "+e)
if(e.schema!=this)throw new RangeError("Node type from different schema used ("+e.name+")")}return e.createChecked(t,n,r)}},{key:"text",value:function(e,t){var n=this.nodes.text
return new W(n,n.defaultAttrs,e,x.setFrom(t))}},{key:"mark",value:function(e,t){return"string"==typeof e&&(e=this.marks[e]),e.create(t)}},{key:"nodeFromJSON",value:function(e){return J.fromJSON(this,e)}},{key:"markFromJSON",value:function(e){return x.fromJSON(this,e)}},{key:"nodeType",value:function(e){var t=this.nodes[e]
if(!t)throw new RangeError("Unknown node type: "+e)
return t}}]),e}()
function le(e,t){for(var n=[],r=0;r<t.length;r++){var o=t[r],i=e.marks[o],s=i
if(i)n.push(i)
else for(var a in e.marks){var c=e.marks[a];("_"==o||c.spec.group&&c.spec.group.split(" ").indexOf(o)>-1)&&n.push(s=c)}if(!s)throw new SyntaxError("Unknown mark type: '"+t[r]+"'")}return n}var ue=function(){function e(t,n){var r=this
h(this,e),this.schema=t,this.rules=n,this.tags=[],this.styles=[]
var o=this.matchedStyles=[]
n.forEach((function(e){if(function(e){return null!=e.tag}(e))r.tags.push(e)
else if(function(e){return null!=e.style}(e)){var t=/[^=]*/.exec(e.style)[0]
o.indexOf(t)<0&&o.push(t),r.styles.push(e)}})),this.normalizeLists=!this.tags.some((function(e){if(!/^(ul|ol)\b/.test(e.tag)||!e.node)return!1
var n=t.nodes[e.node]
return n.contentMatch.matchType(n)}))}return m(e,[{key:"parse",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=new ve(this,t,!1)
return n.addAll(e,x.none,t.from,t.to),n.finish()}},{key:"parseSlice",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=new ve(this,t,!0)
return n.addAll(e,x.none,t.from,t.to),M.maxOpen(n.finish())}},{key:"matchTag",value:function(e,t,n){for(var r=n?this.tags.indexOf(n)+1:0;r<this.tags.length;r++){var o=this.tags[r]
if(ye(e,o.tag)&&(void 0===o.namespace||e.namespaceURI==o.namespace)&&(!o.context||t.matchesContext(o.context))){if(o.getAttrs){var i=o.getAttrs(e)
if(!1===i)continue
o.attrs=i||void 0}return o}}}},{key:"matchStyle",value:function(e,t,n,r){for(var o=r?this.styles.indexOf(r)+1:0;o<this.styles.length;o++){var i=this.styles[o],s=i.style
if(!(0!=s.indexOf(e)||i.context&&!n.matchesContext(i.context)||s.length>e.length&&(61!=s.charCodeAt(e.length)||s.slice(e.length+1)!=t))){if(i.getAttrs){var a=i.getAttrs(t)
if(!1===a)continue
i.attrs=a||void 0}return i}}}}],[{key:"schemaRules",value:function(e){var t=[]
function n(e){for(var n=null==e.priority?50:e.priority,r=0;r<t.length;r++){var o=t[r]
if((null==o.priority?50:o.priority)<n)break}t.splice(r,0,e)}var r=function(t){var r=e.marks[t].spec.parseDOM
r&&r.forEach((function(e){n(e=ge(e)),e.mark||e.ignore||e.clearMark||(e.mark=t)}))}
for(var o in e.marks)r(o)
var i=function(t){var r=e.nodes[t].spec.parseDOM
r&&r.forEach((function(e){n(e=ge(e)),e.node||e.ignore||e.mark||(e.node=t)}))}
for(var s in e.nodes)i(s)
return t}},{key:"fromSchema",value:function(t){return t.cached.domParser||(t.cached.domParser=new e(t,e.schemaRules(t)))}}]),e}(),de={address:!0,article:!0,aside:!0,blockquote:!0,canvas:!0,dd:!0,div:!0,dl:!0,fieldset:!0,figcaption:!0,figure:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,header:!0,hgroup:!0,hr:!0,li:!0,noscript:!0,ol:!0,output:!0,p:!0,pre:!0,section:!0,table:!0,tfoot:!0,ul:!0},fe={head:!0,noscript:!0,object:!0,script:!0,style:!0,title:!0},he={ol:!0,ul:!0}
function pe(e,t,n){return null!=t?(t?1:0)|("full"===t?2:0):e&&"pre"==e.whitespace?3:-5&n}var me=function(){function e(t,n,r,o,i,s){h(this,e),this.type=t,this.attrs=n,this.marks=r,this.solid=o,this.options=s,this.content=[],this.activeMarks=x.none,this.match=i||(4&s?null:t.contentMatch)}return m(e,[{key:"findWrapping",value:function(e){if(!this.match){if(!this.type)return[]
var t=this.type.contentMatch.fillBefore(k.from(e))
if(!t){var n,r=this.type.contentMatch
return(n=r.findWrapping(e.type))?(this.match=r,n):null}this.match=this.type.contentMatch.matchFragment(t)}return this.match.findWrapping(e.type)}},{key:"finish",value:function(e){if(!(1&this.options)){var t,n=this.content[this.content.length-1]
if(n&&n.isText&&(t=/[ \t\r\n\u000c]+$/.exec(n.text))){var r=n
n.text.length==t[0].length?this.content.pop():this.content[this.content.length-1]=r.withText(r.text.slice(0,r.text.length-t[0].length))}}var o=k.from(this.content)
return!e&&this.match&&(o=o.append(this.match.fillBefore(k.empty,!0))),this.type?this.type.create(this.attrs,o,this.marks):o}},{key:"inlineContext",value:function(e){return this.type?this.type.inlineContent:this.content.length?this.content[0].isInline:e.parentNode&&!de.hasOwnProperty(e.parentNode.nodeName.toLowerCase())}}]),e}(),ve=function(){function e(t,n,r){h(this,e),this.parser=t,this.options=n,this.isOpen=r,this.open=0
var o,i=n.topNode,s=pe(null,n.preserveWhitespace,0)|(r?4:0)
o=i?new me(i.type,i.attrs,x.none,!0,n.topMatch||i.type.contentMatch,s):new me(r?null:t.schema.topNodeType,null,x.none,!0,null,s),this.nodes=[o],this.find=n.findPositions,this.needsBlock=!1}return m(e,[{key:"top",get:function(){return this.nodes[this.open]}},{key:"addDOM",value:function(e,t){3==e.nodeType?this.addTextNode(e,t):1==e.nodeType&&this.addElement(e,t)}},{key:"addTextNode",value:function(e,t){var n=e.nodeValue,r=this.top
if(2&r.options||r.inlineContext(e)||/[^ \t\r\n\u000c]/.test(n)){if(1&r.options)n=2&r.options?n.replace(/\r\n?/g,"\n"):n.replace(/\r?\n|\r/g," ")
else if(n=n.replace(/[ \t\r\n\u000c]+/g," "),/^[ \t\r\n\u000c]/.test(n)&&this.open==this.nodes.length-1){var o=r.content[r.content.length-1],i=e.previousSibling;(!o||i&&"BR"==i.nodeName||o.isText&&/[ \t\r\n\u000c]$/.test(o.text))&&(n=n.slice(1))}n&&this.insertNode(this.parser.schema.text(n),t),this.findInText(e)}else this.findInside(e)}},{key:"addElement",value:function(e,t,n){var r,o=e.nodeName.toLowerCase()
he.hasOwnProperty(o)&&this.parser.normalizeLists&&function(e){for(var t=e.firstChild,n=null;t;t=t.nextSibling){var r=1==t.nodeType?t.nodeName.toLowerCase():null
r&&he.hasOwnProperty(r)&&n?(n.appendChild(t),t=n):"li"==r?n=t:r&&(n=null)}}(e)
var i=this.options.ruleFromNode&&this.options.ruleFromNode(e)||(r=this.parser.matchTag(e,this,n))
if(i?i.ignore:fe.hasOwnProperty(o))this.findInside(e),this.ignoreFallback(e,t)
else if(!i||i.skip||i.closeParent){i&&i.closeParent?this.open=Math.max(0,this.open-1):i&&i.skip.nodeType&&(e=i.skip)
var s,a=this.top,c=this.needsBlock
if(de.hasOwnProperty(o))a.content.length&&a.content[0].isInline&&this.open&&(this.open--,a=this.top),s=!0,a.type||(this.needsBlock=!0)
else if(!e.firstChild)return void this.leafFallback(e,t)
var l=i&&i.skip?t:this.readStyles(e,t)
l&&this.addAll(e,l),s&&this.sync(a),this.needsBlock=c}else{var u=this.readStyles(e,t)
u&&this.addElementByRule(e,i,u,!1===i.consuming?r:void 0)}}},{key:"leafFallback",value:function(e,t){"BR"==e.nodeName&&this.top.type&&this.top.type.inlineContent&&this.addTextNode(e.ownerDocument.createTextNode("\n"),t)}},{key:"ignoreFallback",value:function(e,t){"BR"!=e.nodeName||this.top.type&&this.top.type.inlineContent||this.findPlace(this.parser.schema.text("-"),t)}},{key:"readStyles",value:function(e,t){var n=this,r=e.style
if(r&&r.length)for(var o=0;o<this.parser.matchedStyles.length;o++){var i=this.parser.matchedStyles[o],s=r.getPropertyValue(i)
if(s)for(var a,c=function(e){var r=n.parser.matchStyle(i,s,n,e)
return r?r.ignore?{v:null}:(t=r.clearMark?t.filter((function(e){return!r.clearMark(e)})):t.concat(n.parser.schema.marks[r.mark].create(r.attrs)),!1!==r.consuming?(l=e,0):void(l=e=r)):(l=e,0)},l=void 0;0!==(a=c(l));)if(a)return a.v}return t}},{key:"addElementByRule",value:function(e,t,n,r){var o,i,s=this
if(t.node)if((i=this.parser.schema.nodes[t.node]).isLeaf)this.insertNode(i.create(t.attrs),n)||this.leafFallback(e,n)
else{var a=this.enter(i,t.attrs||null,n,t.preserveWhitespace)
a&&(o=!0,n=a)}else{var c=this.parser.schema.marks[t.mark]
n=n.concat(c.create(t.attrs))}var l=this.top
if(i&&i.isLeaf)this.findInside(e)
else if(r)this.addElement(e,n,r)
else if(t.getContent)this.findInside(e),t.getContent(e,this.parser.schema).forEach((function(e){return s.insertNode(e,n)}))
else{var u=e
"string"==typeof t.contentElement?u=e.querySelector(t.contentElement):"function"==typeof t.contentElement?u=t.contentElement(e):t.contentElement&&(u=t.contentElement),this.findAround(e,u,!0),this.addAll(u,n)}o&&this.sync(l)&&this.open--}},{key:"addAll",value:function(e,t,n,r){for(var o=n||0,i=n?e.childNodes[n]:e.firstChild,s=null==r?null:e.childNodes[r];i!=s;i=i.nextSibling,++o)this.findAtPoint(e,o),this.addDOM(i,t)
this.findAtPoint(e,o)}},{key:"findPlace",value:function(e,t){for(var n,r,o=this.open;o>=0;o--){var i=this.nodes[o],s=i.findWrapping(e)
if(s&&(!n||n.length>s.length)&&(n=s,r=i,!s.length))break
if(i.solid)break}if(!n)return null
this.sync(r)
for(var a=0;a<n.length;a++)t=this.enterInner(n[a],null,t,!1)
return t}},{key:"insertNode",value:function(e,t){if(e.isInline&&this.needsBlock&&!this.top.type){var n=this.textblockFromContext()
n&&(t=this.enterInner(n,null,t))}var o=this.findPlace(e,t)
if(o){this.closeExtra()
var i=this.top
i.match&&(i.match=i.match.matchType(e.type))
var s,a=x.none,c=function(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]
if(!n){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return r(e,t)
var n=Object.prototype.toString.call(e).slice(8,-1)
return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(e))){n&&(e=n)
var o=0,i=function(){}
return{s:i,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,a=!0,c=!1
return{s:function(){n=n.call(e)},n:function(){var e=n.next()
return a=e.done,e},e:function(e){c=!0,s=e},f:function(){try{a||null==n.return||n.return()}finally{if(c)throw s}}}}(o.concat(e.marks))
try{for(c.s();!(s=c.n()).done;){var l=s.value;(i.type?i.type.allowsMarkType(l.type):ke(l.type,e.type))&&(a=l.addToSet(a))}}catch(e){c.e(e)}finally{c.f()}return i.content.push(e.mark(a)),!0}return!1}},{key:"enter",value:function(e,t,n,r){var o=this.findPlace(e.create(t),n)
return o&&(o=this.enterInner(e,t,n,!0,r)),o}},{key:"enterInner",value:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],o=arguments.length>4?arguments[4]:void 0
this.closeExtra()
var i=this.top
i.match=i.match&&i.match.matchType(e)
var s=pe(e,o,i.options)
4&i.options&&0==i.content.length&&(s|=4)
var a=x.none
return n=n.filter((function(t){return!(i.type?i.type.allowsMarkType(t.type):ke(t.type,e))||(a=t.addToSet(a),!1)})),this.nodes.push(new me(e,t,a,r,null,s)),this.open++,n}},{key:"closeExtra",value:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=this.nodes.length-1
if(t>this.open){for(;t>this.open;t--)this.nodes[t-1].content.push(this.nodes[t].finish(e))
this.nodes.length=this.open+1}}},{key:"finish",value:function(){return this.open=0,this.closeExtra(this.isOpen),this.nodes[0].finish(this.isOpen||this.options.topOpen)}},{key:"sync",value:function(e){for(var t=this.open;t>=0;t--)if(this.nodes[t]==e)return this.open=t,!0
return!1}},{key:"currentPos",get:function(){this.closeExtra()
for(var e=0,t=this.open;t>=0;t--){for(var n=this.nodes[t].content,r=n.length-1;r>=0;r--)e+=n[r].nodeSize
t&&e++}return e}},{key:"findAtPoint",value:function(e,t){if(this.find)for(var n=0;n<this.find.length;n++)this.find[n].node==e&&this.find[n].offset==t&&(this.find[n].pos=this.currentPos)}},{key:"findInside",value:function(e){if(this.find)for(var t=0;t<this.find.length;t++)null==this.find[t].pos&&1==e.nodeType&&e.contains(this.find[t].node)&&(this.find[t].pos=this.currentPos)}},{key:"findAround",value:function(e,t,n){if(e!=t&&this.find)for(var r=0;r<this.find.length;r++)null==this.find[r].pos&&1==e.nodeType&&e.contains(this.find[r].node)&&t.compareDocumentPosition(this.find[r].node)&(n?2:4)&&(this.find[r].pos=this.currentPos)}},{key:"findInText",value:function(e){if(this.find)for(var t=0;t<this.find.length;t++)this.find[t].node==e&&(this.find[t].pos=this.currentPos-(e.nodeValue.length-this.find[t].offset))}},{key:"matchesContext",value:function(e){var t=this
if(e.indexOf("|")>-1)return e.split(/\s*\|\s*/).some(this.matchesContext,this)
var n=e.split("/"),r=this.options.context,o=!(this.isOpen||r&&r.parent.type!=this.nodes[0].type),i=-(r?r.depth+1:0)+(o?0:1)
return function e(s,a){for(;s>=0;s--){var c=n[s]
if(""==c){if(s==n.length-1||0==s)continue
for(;a>=i;a--)if(e(s-1,a))return!0
return!1}var l=a>0||0==a&&o?t.nodes[a].type:r&&a>=i?r.node(a-i).type:null
if(!l||l.name!=c&&-1==l.groups.indexOf(c))return!1
a--}return!0}(n.length-1,this.open)}},{key:"textblockFromContext",value:function(){var e=this.options.context
if(e)for(var t=e.depth;t>=0;t--){var n=e.node(t).contentMatchAt(e.indexAfter(t)).defaultType
if(n&&n.isTextblock&&n.defaultAttrs)return n}for(var r in this.parser.schema.nodes){var o=this.parser.schema.nodes[r]
if(o.isTextblock&&o.defaultAttrs)return o}}}]),e}()
function ye(e,t){return(e.matches||e.msMatchesSelector||e.webkitMatchesSelector||e.mozMatchesSelector).call(e,t)}function ge(e){var t={}
for(var n in e)t[n]=e[n]
return t}function ke(e,t){var n,r=t.schema.nodes,o=function(){var n=r[i]
if(!n.allowsMarkType(e))return 0
var o=[]
return function e(n){o.push(n)
for(var r=0;r<n.edgeCount;r++){var i=n.edge(r),s=i.type,a=i.next
if(s==t)return!0
if(o.indexOf(a)<0&&e(a))return!0}}(n.contentMatch)?{v:!0}:void 0}
for(var i in r)if(0!==(n=o())&&n)return n.v}var be=function(){function e(t,n){h(this,e),this.nodes=t,this.marks=n}return m(e,[{key:"serializeFragment",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2?arguments[2]:void 0
r||(r=Se(n).createDocumentFragment())
var o=r,i=[]
return e.forEach((function(e){if(i.length||e.marks.length){for(var r=0,s=0;r<i.length&&s<e.marks.length;){var a=e.marks[s]
if(t.marks[a.type.name]){if(!a.eq(i[r][0])||!1===a.type.spec.spanning)break
r++,s++}else s++}for(;r<i.length;)o=i.pop()[1]
for(;s<e.marks.length;){var c=e.marks[s++],l=t.serializeMark(c,e.isInline,n)
l&&(i.push([c,o]),o.appendChild(l.dom),o=l.contentDOM||l.dom)}}o.appendChild(t.serializeNodeInner(e,n))})),r}},{key:"serializeNodeInner",value:function(e,t){var n=Oe(Se(t),this.nodes[e.type.name](e),null,e.attrs),r=n.dom,o=n.contentDOM
if(o){if(e.isLeaf)throw new RangeError("Content hole not allowed in a leaf node spec")
this.serializeFragment(e.content,t,o)}return r}},{key:"serializeNode",value:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=this.serializeNodeInner(e,t),r=e.marks.length-1;r>=0;r--){var o=this.serializeMark(e.marks[r],e.isInline,t)
o&&((o.contentDOM||o.dom).appendChild(n),n=o.dom)}return n}},{key:"serializeMark",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=this.marks[e.type.name]
return r&&Oe(Se(n),r(e,t),null,e.attrs)}}],[{key:"renderSpec",value:function(e,t){return Oe(e,t,arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,arguments.length>3?arguments[3]:void 0)}},{key:"fromSchema",value:function(t){return t.cached.domSerializer||(t.cached.domSerializer=new e(this.nodesFromSchema(t),this.marksFromSchema(t)))}},{key:"nodesFromSchema",value:function(e){var t=we(e.nodes)
return t.text||(t.text=function(e){return e.text}),t}},{key:"marksFromSchema",value:function(e){return we(e.marks)}}]),e}()
function we(e){var t={}
for(var n in e){var r=e[n].spec.toDOM
r&&(t[n]=r)}return t}function Se(e){return e.document||window.document}var xe=new WeakMap
function Oe(e,t,n,r){if("string"==typeof t)return{dom:e.createTextNode(t)}
if(null!=t.nodeType)return{dom:t}
if(t.dom&&null!=t.dom.nodeType)return t
var o,i=t[0]
if("string"!=typeof i)throw new RangeError("Invalid array passed to renderSpec")
if(r&&(o=function(e){var t=xe.get(e)
return void 0===t&&xe.set(e,t=function(e){var t=null
return function e(n){if(n&&"object"==f(n))if(Array.isArray(n))if("string"==typeof n[0])t||(t=[]),t.push(n)
else for(var r=0;r<n.length;r++)e(n[r])
else for(var o in n)e(n[o])}(e),t}(e)),t}(r))&&o.indexOf(t)>-1)throw new RangeError("Using an array from an attribute object as a DOM spec. This may be an attempted cross site scripting attack.")
var s,a=i.indexOf(" ")
a>0&&(n=i.slice(0,a),i=i.slice(a+1))
var c=n?e.createElementNS(n,i):e.createElement(i),l=t[1],u=1
if(l&&"object"==f(l)&&null==l.nodeType&&!Array.isArray(l))for(var d in u=2,l)if(null!=l[d]){var h=d.indexOf(" ")
h>0?c.setAttributeNS(d.slice(0,h),d.slice(h+1),l[d]):c.setAttribute(d,l[d])}for(var p=u;p<t.length;p++){var m=t[p]
if(0===m){if(p<t.length-1||p>u)throw new RangeError("Content hole must be the only child of its parent node")
return{dom:c,contentDOM:c}}var v=Oe(e,m,n,r),y=v.dom,g=v.contentDOM
if(c.appendChild(y),g){if(s)throw new RangeError("Multiple content holes")
s=g}}return{dom:c,contentDOM:s}}t.ContentMatch=K,t.DOMParser=ue,t.DOMSerializer=be,t.Fragment=k,t.Mark=x,t.MarkType=ae,t.Node=J,t.NodeRange=_,t.NodeType=ie,t.ReplaceError=O,t.ResolvedPos=B,t.Schema=ce,t.Slice=M},717:e=>{function t(e){this.content=e}t.prototype={constructor:t,find:function(e){for(var t=0;t<this.content.length;t+=2)if(this.content[t]===e)return t
return-1},get:function(e){var t=this.find(e)
return-1==t?void 0:this.content[t+1]},update:function(e,n,r){var o=r&&r!=e?this.remove(r):this,i=o.find(e),s=o.content.slice()
return-1==i?s.push(r||e,n):(s[i+1]=n,r&&(s[i]=r)),new t(s)},remove:function(e){var n=this.find(e)
if(-1==n)return this
var r=this.content.slice()
return r.splice(n,2),new t(r)},addToStart:function(e,n){return new t([e,n].concat(this.remove(e).content))},addToEnd:function(e,n){var r=this.remove(e).content.slice()
return r.push(e,n),new t(r)},addBefore:function(e,n,r){var o=this.remove(n),i=o.content.slice(),s=o.find(e)
return i.splice(-1==s?i.length:s,0,n,r),new t(i)},forEach:function(e){for(var t=0;t<this.content.length;t+=2)e(this.content[t],this.content[t+1])},prepend:function(e){return(e=t.from(e)).size?new t(e.content.concat(this.subtract(e).content)):this},append:function(e){return(e=t.from(e)).size?new t(this.subtract(e).content.concat(e.content)):this},subtract:function(e){var n=this
e=t.from(e)
for(var r=0;r<e.content.length;r+=2)n=n.remove(e.content[r])
return n},toObject:function(){var e={}
return this.forEach((function(t,n){e[t]=n})),e},get size(){return this.content.length>>1}},t.from=function(e){if(e instanceof t)return e
var n=[]
if(e)for(var r in e)n.push(r,e[r])
return new t(n)},e.exports=t},769:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0})
var r,o=n(459)
r=o,Object.keys(r).filter((e=>"default"!==e&&"__esModule"!==e)).forEach((e=>{t.hasOwnProperty(e)||Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:()=>r[e]})}))},788:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0})
var r=n(820),o=n(553),i=function(){function e(t,n){var r,o=this
!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.editorView=t,this.cursorPos=null,this.element=null,this.timeout=-1,this.width=null!==(r=n.width)&&void 0!==r?r:1,this.color=!1===n.color?void 0:n.color||"black",this.class=n.class,this.handlers=["dragover","dragend","drop","dragleave"].map((function(e){var n=function(t){o[e](t)}
return t.dom.addEventListener(e,n),{name:e,handler:n}}))}var t,n
return t=e,(n=[{key:"destroy",value:function(){var e=this
this.handlers.forEach((function(t){var n=t.name,r=t.handler
return e.editorView.dom.removeEventListener(n,r)}))}},{key:"update",value:function(e,t){null!=this.cursorPos&&t.doc!=e.state.doc&&(this.cursorPos>e.state.doc.content.size?this.setCursor(null):this.updateOverlay())}},{key:"setCursor",value:function(e){e!=this.cursorPos&&(this.cursorPos=e,null==e?(this.element.parentNode.removeChild(this.element),this.element=null):this.updateOverlay())}},{key:"updateOverlay",value:function(){var e,t=this.editorView.state.doc.resolve(this.cursorPos),n=!t.parent.inlineContent
if(n){var r=t.nodeBefore,o=t.nodeAfter
if(r||o){var i=this.editorView.nodeDOM(this.cursorPos-(r?r.nodeSize:0))
if(i){var s=i.getBoundingClientRect(),a=r?s.bottom:s.top
r&&o&&(a=(a+this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top)/2),e={left:s.left,right:s.right,top:a-this.width/2,bottom:a+this.width/2}}}}if(!e){var c=this.editorView.coordsAtPos(this.cursorPos)
e={left:c.left-this.width/2,right:c.left+this.width/2,top:c.top,bottom:c.bottom}}var l,u,d=this.editorView.dom.offsetParent
if(this.element||(this.element=d.appendChild(document.createElement("div")),this.class&&(this.element.className=this.class),this.element.style.cssText="position: absolute; z-index: 50; pointer-events: none;",this.color&&(this.element.style.backgroundColor=this.color)),this.element.classList.toggle("prosemirror-dropcursor-block",n),this.element.classList.toggle("prosemirror-dropcursor-inline",!n),!d||d==document.body&&"static"==getComputedStyle(d).position)l=-pageXOffset,u=-pageYOffset
else{var f=d.getBoundingClientRect()
l=f.left-d.scrollLeft,u=f.top-d.scrollTop}this.element.style.left=e.left-l+"px",this.element.style.top=e.top-u+"px",this.element.style.width=e.right-e.left+"px",this.element.style.height=e.bottom-e.top+"px"}},{key:"scheduleRemoval",value:function(e){var t=this
clearTimeout(this.timeout),this.timeout=setTimeout((function(){return t.setCursor(null)}),e)}},{key:"dragover",value:function(e){if(this.editorView.editable){var t=this.editorView.posAtCoords({left:e.clientX,top:e.clientY}),n=t&&t.inside>=0&&this.editorView.state.doc.nodeAt(t.inside),r=n&&n.type.spec.disableDropCursor,i="function"==typeof r?r(this.editorView,t,e):r
if(t&&!i){var s=t.pos
if(this.editorView.dragging&&this.editorView.dragging.slice){var a=o.dropPoint(this.editorView.state.doc,s,this.editorView.dragging.slice)
null!=a&&(s=a)}this.setCursor(s),this.scheduleRemoval(5e3)}}}},{key:"dragend",value:function(){this.scheduleRemoval(20)}},{key:"drop",value:function(){this.scheduleRemoval(20)}},{key:"dragleave",value:function(e){e.target!=this.editorView.dom&&this.editorView.dom.contains(e.relatedTarget)||this.setCursor(null)}}])&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}()
t.dropCursor=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
return new r.Plugin({view:function(t){return new i(t,e)}})}},820:(e,t,n)=>{function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(){return o="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=c(e)););return e}(e,t)
if(r){var o=Object.getOwnPropertyDescriptor(r,t)
return o.get?o.get.call(arguments.length<3?e:n):o.value}},o.apply(this,arguments)}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&s(e,t)}function s(e,t){return s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},s(e,t)}function a(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}()
return function(){var n,o=c(e)
if(t){var i=c(this).constructor
n=Reflect.construct(o,arguments,i)}else n=o.apply(this,arguments)
return function(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t
if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined")
return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}(e)}(this,n)}}function c(e){return c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},c(e)}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n]
r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function d(e,t,n){return t&&u(e.prototype,t),n&&u(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}Object.defineProperty(t,"__esModule",{value:!0})
var f=n(712),h=n(553),p=Object.create(null),m=function(){function e(t,n,r){l(this,e),this.$anchor=t,this.$head=n,this.ranges=r||[new v(t.min(n),t.max(n))]}return d(e,[{key:"anchor",get:function(){return this.$anchor.pos}},{key:"head",get:function(){return this.$head.pos}},{key:"from",get:function(){return this.$from.pos}},{key:"to",get:function(){return this.$to.pos}},{key:"$from",get:function(){return this.ranges[0].$from}},{key:"$to",get:function(){return this.ranges[0].$to}},{key:"empty",get:function(){for(var e=this.ranges,t=0;t<e.length;t++)if(e[t].$from.pos!=e[t].$to.pos)return!1
return!0}},{key:"content",value:function(){return this.$from.doc.slice(this.from,this.to,!0)}},{key:"replace",value:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:f.Slice.empty,n=t.content.lastChild,r=null,o=0;o<t.openEnd;o++)r=n,n=n.lastChild
for(var i=e.steps.length,s=this.ranges,a=0;a<s.length;a++){var c=s[a],l=c.$from,u=c.$to,d=e.mapping.slice(i)
e.replaceRange(d.map(l.pos),d.map(u.pos),a?f.Slice.empty:t),0==a&&C(e,i,(n?n.isInline:r&&r.isTextblock)?-1:1)}}},{key:"replaceWith",value:function(e,t){for(var n=e.steps.length,r=this.ranges,o=0;o<r.length;o++){var i=r[o],s=i.$from,a=i.$to,c=e.mapping.slice(n),l=c.map(s.pos),u=c.map(a.pos)
o?e.deleteRange(l,u):(e.replaceRangeWith(l,u,t),C(e,n,t.isInline?-1:1))}}},{key:"getBookmark",value:function(){return k.between(this.$anchor,this.$head).getBookmark()}}],[{key:"findFrom",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=e.parent.inlineContent?new k(e):M(e.node(0),e.parent,e.pos,e.index(),t,n)
if(r)return r
for(var o=e.depth-1;o>=0;o--){var i=t<0?M(e.node(0),e.node(o),e.before(o+1),e.index(o),t,n):M(e.node(0),e.node(o),e.after(o+1),e.index(o)+1,t,n)
if(i)return i}return null}},{key:"near",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1
return this.findFrom(e,t)||this.findFrom(e,-t)||new x(e.node(0))}},{key:"atStart",value:function(e){return M(e,e,0,0,1)||new x(e)}},{key:"atEnd",value:function(e){return M(e,e,e.content.size,e.childCount,-1)||new x(e)}},{key:"fromJSON",value:function(e,t){if(!t||!t.type)throw new RangeError("Invalid input for Selection.fromJSON")
var n=p[t.type]
if(!n)throw new RangeError("No selection type ".concat(t.type," defined"))
return n.fromJSON(e,t)}},{key:"jsonID",value:function(e,t){if(e in p)throw new RangeError("Duplicate use of selection JSON ID "+e)
return p[e]=t,t.prototype.jsonID=e,t}}]),e}()
m.prototype.visible=!0
var v=d((function e(t,n){l(this,e),this.$from=t,this.$to=n})),y=!1
function g(e){y||e.parent.inlineContent||(y=!0,console.warn("TextSelection endpoint not pointing into a node with inline content ("+e.parent.type.name+")"))}var k=function(e){i(n,e)
var t=a(n)
function n(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e
return l(this,n),g(e),g(r),t.call(this,e,r)}return d(n,[{key:"$cursor",get:function(){return this.$anchor.pos==this.$head.pos?this.$head:null}},{key:"map",value:function(e,t){var r=e.resolve(t.map(this.head))
if(!r.parent.inlineContent)return m.near(r)
var o=e.resolve(t.map(this.anchor))
return new n(o.parent.inlineContent?o:r,r)}},{key:"replace",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:f.Slice.empty
if(o(c(n.prototype),"replace",this).call(this,e,t),t==f.Slice.empty){var r=this.$from.marksAcross(this.$to)
r&&e.ensureMarks(r)}}},{key:"eq",value:function(e){return e instanceof n&&e.anchor==this.anchor&&e.head==this.head}},{key:"getBookmark",value:function(){return new b(this.anchor,this.head)}},{key:"toJSON",value:function(){return{type:"text",anchor:this.anchor,head:this.head}}}],[{key:"fromJSON",value:function(e,t){if("number"!=typeof t.anchor||"number"!=typeof t.head)throw new RangeError("Invalid input for TextSelection.fromJSON")
return new n(e.resolve(t.anchor),e.resolve(t.head))}},{key:"create",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t,r=e.resolve(t)
return new this(r,n==t?r:e.resolve(n))}},{key:"between",value:function(e,t,r){var o=e.pos-t.pos
if(r&&!o||(r=o>=0?1:-1),!t.parent.inlineContent){var i=m.findFrom(t,r,!0)||m.findFrom(t,-r,!0)
if(!i)return m.near(t,r)
t=i.$head}return e.parent.inlineContent||(0==o||(e=(m.findFrom(e,-r,!0)||m.findFrom(e,r,!0)).$anchor).pos<t.pos!=o<0)&&(e=t),new n(e,t)}}]),n}(m)
m.jsonID("text",k)
var b=function(){function e(t,n){l(this,e),this.anchor=t,this.head=n}return d(e,[{key:"map",value:function(t){return new e(t.map(this.anchor),t.map(this.head))}},{key:"resolve",value:function(e){return k.between(e.resolve(this.anchor),e.resolve(this.head))}}]),e}(),w=function(e){i(n,e)
var t=a(n)
function n(e){var r
l(this,n)
var o=e.nodeAfter,i=e.node(0).resolve(e.pos+o.nodeSize)
return(r=t.call(this,e,i)).node=o,r}return d(n,[{key:"map",value:function(e,t){var r=t.mapResult(this.anchor),o=r.deleted,i=r.pos,s=e.resolve(i)
return o?m.near(s):new n(s)}},{key:"content",value:function(){return new f.Slice(f.Fragment.from(this.node),0,0)}},{key:"eq",value:function(e){return e instanceof n&&e.anchor==this.anchor}},{key:"toJSON",value:function(){return{type:"node",anchor:this.anchor}}},{key:"getBookmark",value:function(){return new S(this.anchor)}}],[{key:"fromJSON",value:function(e,t){if("number"!=typeof t.anchor)throw new RangeError("Invalid input for NodeSelection.fromJSON")
return new n(e.resolve(t.anchor))}},{key:"create",value:function(e,t){return new n(e.resolve(t))}},{key:"isSelectable",value:function(e){return!e.isText&&!1!==e.type.spec.selectable}}]),n}(m)
w.prototype.visible=!1,m.jsonID("node",w)
var S=function(){function e(t){l(this,e),this.anchor=t}return d(e,[{key:"map",value:function(t){var n=t.mapResult(this.anchor),r=n.deleted,o=n.pos
return r?new b(o,o):new e(o)}},{key:"resolve",value:function(e){var t=e.resolve(this.anchor),n=t.nodeAfter
return n&&w.isSelectable(n)?new w(t):m.near(t)}}]),e}(),x=function(e){i(n,e)
var t=a(n)
function n(e){return l(this,n),t.call(this,e.resolve(0),e.resolve(e.content.size))}return d(n,[{key:"replace",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:f.Slice.empty
if(t==f.Slice.empty){e.delete(0,e.doc.content.size)
var r=m.atStart(e.doc)
r.eq(e.selection)||e.setSelection(r)}else o(c(n.prototype),"replace",this).call(this,e,t)}},{key:"toJSON",value:function(){return{type:"all"}}},{key:"map",value:function(e){return new n(e)}},{key:"eq",value:function(e){return e instanceof n}},{key:"getBookmark",value:function(){return O}}],[{key:"fromJSON",value:function(e){return new n(e)}}]),n}(m)
m.jsonID("all",x)
var O={map:function(){return this},resolve:function(e){return new x(e)}}
function M(e,t,n,r,o){var i=arguments.length>5&&void 0!==arguments[5]&&arguments[5]
if(t.inlineContent)return k.create(e,n)
for(var s=r-(o>0?0:1);o>0?s<t.childCount:s>=0;s+=o){var a=t.child(s)
if(a.isAtom){if(!i&&w.isSelectable(a))return w.create(e,n-(o<0?a.nodeSize:0))}else{var c=M(e,a,n+o,o<0?a.childCount:0,o,i)
if(c)return c}n+=a.nodeSize*o}return null}function C(e,t,n){var r=e.steps.length-1
if(!(r<t)){var o,i=e.steps[r];(i instanceof h.ReplaceStep||i instanceof h.ReplaceAroundStep)&&(e.mapping.maps[r].forEach((function(e,t,n,r){null==o&&(o=r)})),e.setSelection(m.near(e.doc.resolve(o),n)))}}var T=function(e){i(n,e)
var t=a(n)
function n(e){var r
return l(this,n),(r=t.call(this,e.doc)).curSelectionFor=0,r.updated=0,r.meta=Object.create(null),r.time=Date.now(),r.curSelection=e.selection,r.storedMarks=e.storedMarks,r}return d(n,[{key:"selection",get:function(){return this.curSelectionFor<this.steps.length&&(this.curSelection=this.curSelection.map(this.doc,this.mapping.slice(this.curSelectionFor)),this.curSelectionFor=this.steps.length),this.curSelection}},{key:"setSelection",value:function(e){if(e.$from.doc!=this.doc)throw new RangeError("Selection passed to setSelection must point at the current document")
return this.curSelection=e,this.curSelectionFor=this.steps.length,this.updated=-3&this.updated|1,this.storedMarks=null,this}},{key:"selectionSet",get:function(){return(1&this.updated)>0}},{key:"setStoredMarks",value:function(e){return this.storedMarks=e,this.updated|=2,this}},{key:"ensureMarks",value:function(e){return f.Mark.sameSet(this.storedMarks||this.selection.$from.marks(),e)||this.setStoredMarks(e),this}},{key:"addStoredMark",value:function(e){return this.ensureMarks(e.addToSet(this.storedMarks||this.selection.$head.marks()))}},{key:"removeStoredMark",value:function(e){return this.ensureMarks(e.removeFromSet(this.storedMarks||this.selection.$head.marks()))}},{key:"storedMarksSet",get:function(){return(2&this.updated)>0}},{key:"addStep",value:function(e,t){o(c(n.prototype),"addStep",this).call(this,e,t),this.updated=-3&this.updated,this.storedMarks=null}},{key:"setTime",value:function(e){return this.time=e,this}},{key:"replaceSelection",value:function(e){return this.selection.replace(this,e),this}},{key:"replaceSelectionWith",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this.selection
return t&&(e=e.mark(this.storedMarks||(n.empty?n.$from.marks():n.$from.marksAcross(n.$to)||f.Mark.none))),n.replaceWith(this,e),this}},{key:"deleteSelection",value:function(){return this.selection.replace(this),this}},{key:"insertText",value:function(e,t,n){var r=this.doc.type.schema
if(null==t)return e?this.replaceSelectionWith(r.text(e),!0):this.deleteSelection()
if(null==n&&(n=t),n=null==n?t:n,!e)return this.deleteRange(t,n)
var o=this.storedMarks
if(!o){var i=this.doc.resolve(t)
o=n==t?i.marks():i.marksAcross(this.doc.resolve(n))}return this.replaceRangeWith(t,n,r.text(e,o)),this.selection.empty||this.setSelection(m.near(this.selection.$to)),this}},{key:"setMeta",value:function(e,t){return this.meta["string"==typeof e?e:e.key]=t,this}},{key:"getMeta",value:function(e){return this.meta["string"==typeof e?e:e.key]}},{key:"isGeneric",get:function(){for(var e in this.meta)return!1
return!0}},{key:"scrollIntoView",value:function(){return this.updated|=4,this}},{key:"scrolledIntoView",get:function(){return(4&this.updated)>0}}]),n}(h.Transform)
function N(e,t){return t&&e?e.bind(t):e}var E=d((function e(t,n,r){l(this,e),this.name=t,this.init=N(n.init,r),this.apply=N(n.apply,r)})),D=[new E("doc",{init:function(e){return e.doc||e.schema.topNodeType.createAndFill()},apply:function(e){return e.doc}}),new E("selection",{init:function(e,t){return e.selection||m.atStart(t.doc)},apply:function(e){return e.selection}}),new E("storedMarks",{init:function(e){return e.storedMarks||null},apply:function(e,t,n,r){return r.selection.$cursor?e.storedMarks:null}}),new E("scrollToSelection",{init:function(){return 0},apply:function(e,t){return e.scrolledIntoView?t+1:t}})],A=d((function e(t,n){var r=this
l(this,e),this.schema=t,this.plugins=[],this.pluginsByKey=Object.create(null),this.fields=D.slice(),n&&n.forEach((function(e){if(r.pluginsByKey[e.key])throw new RangeError("Adding different instances of a keyed plugin ("+e.key+")")
r.plugins.push(e),r.pluginsByKey[e.key]=e,e.spec.state&&r.fields.push(new E(e.key,e.spec.state,e))}))})),P=function(){function e(t){l(this,e),this.config=t}return d(e,[{key:"schema",get:function(){return this.config.schema}},{key:"plugins",get:function(){return this.config.plugins}},{key:"apply",value:function(e){return this.applyTransaction(e).state}},{key:"filterTransaction",value:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:-1,n=0;n<this.config.plugins.length;n++)if(n!=t){var r=this.config.plugins[n]
if(r.spec.filterTransaction&&!r.spec.filterTransaction.call(r,e,this))return!1}return!0}},{key:"applyTransaction",value:function(e){if(!this.filterTransaction(e))return{state:this,transactions:[]}
for(var t=[e],n=this.applyInner(e),r=null;;){for(var o=!1,i=0;i<this.config.plugins.length;i++){var s=this.config.plugins[i]
if(s.spec.appendTransaction){var a=r?r[i].n:0,c=r?r[i].state:this,l=a<t.length&&s.spec.appendTransaction.call(s,a?t.slice(a):t,c,n)
if(l&&n.filterTransaction(l,i)){if(l.setMeta("appendedTransaction",e),!r){r=[]
for(var u=0;u<this.config.plugins.length;u++)r.push(u<i?{state:n,n:t.length}:{state:this,n:0})}t.push(l),n=n.applyInner(l),o=!0}r&&(r[i]={state:n,n:t.length})}}if(!o)return{state:n,transactions:t}}}},{key:"applyInner",value:function(t){if(!t.before.eq(this.doc))throw new RangeError("Applying a mismatched transaction")
for(var n=new e(this.config),r=this.config.fields,o=0;o<r.length;o++){var i=r[o]
n[i.name]=i.apply(t,this[i.name],this,n)}return n}},{key:"tr",get:function(){return new T(this)}},{key:"reconfigure",value:function(t){for(var n=new A(this.schema,t.plugins),r=n.fields,o=new e(n),i=0;i<r.length;i++){var s=r[i].name
o[s]=this.hasOwnProperty(s)?this[s]:r[i].init(t,o)}return o}},{key:"toJSON",value:function(e){var t={doc:this.doc.toJSON(),selection:this.selection.toJSON()}
if(this.storedMarks&&(t.storedMarks=this.storedMarks.map((function(e){return e.toJSON()}))),e&&"object"==r(e))for(var n in e){if("doc"==n||"selection"==n)throw new RangeError("The JSON fields `doc` and `selection` are reserved")
var o=e[n],i=o.spec.state
i&&i.toJSON&&(t[n]=i.toJSON.call(o,this[o.key]))}return t}}],[{key:"create",value:function(t){for(var n=new A(t.doc?t.doc.type.schema:t.schema,t.plugins),r=new e(n),o=0;o<n.fields.length;o++)r[n.fields[o].name]=n.fields[o].init(t,r)
return r}},{key:"fromJSON",value:function(t,n,r){if(!n)throw new RangeError("Invalid input for EditorState.fromJSON")
if(!t.schema)throw new RangeError("Required config field 'schema' missing")
var o=new A(t.schema,t.plugins),i=new e(o)
return o.fields.forEach((function(e){if("doc"==e.name)i.doc=f.Node.fromJSON(t.schema,n.doc)
else if("selection"==e.name)i.selection=m.fromJSON(i.doc,n.selection)
else if("storedMarks"==e.name)n.storedMarks&&(i.storedMarks=n.storedMarks.map(t.schema.markFromJSON))
else{if(r)for(var o in r){var s=r[o],a=s.spec.state
if(s.key==e.name&&a&&a.fromJSON&&Object.prototype.hasOwnProperty.call(n,o))return void(i[e.name]=a.fromJSON.call(s,t,n[o],i))}i[e.name]=e.init(t,i)}})),i}}]),e}()
function R(e,t,n){for(var r in e){var o=e[r]
o instanceof Function?o=o.bind(t):"handleDOMEvents"==r&&(o=R(o,t,{})),n[r]=o}return n}var I=function(){function e(t){l(this,e),this.spec=t,this.props={},t.props&&R(t.props,this,this.props),this.key=t.key?t.key.key:z("plugin")}return d(e,[{key:"getState",value:function(e){return e[this.key]}}]),e}(),j=Object.create(null)
function z(e){return e in j?e+"$"+ ++j[e]:(j[e]=0,e+"$")}var B=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"key"
l(this,e),this.key=z(t)}return d(e,[{key:"get",value:function(e){return e.config.pluginsByKey[this.key]}},{key:"getState",value:function(e){return e[this.key]}}]),e}()
t.AllSelection=x,t.EditorState=P,t.NodeSelection=w,t.Plugin=I,t.PluginKey=B,t.Selection=m,t.SelectionRange=v,t.TextSelection=k,t.Transaction=T},870:(e,t,n)=>{n.r(t),n.d(t,{default:()=>y})
var r,o,i,s,a,c=n(510),l=n(604),u=n(735),d=n.n(u),f=n(934),h=n(603)
const p="undefined"!=typeof FastBoot,m="routeDidChange",v=["separator","prepend","replace"]
let y=(r=(0,u.inject)("router"),o=(0,u.inject)("-document"),i=class extends(d()){constructor(e){if(super(e),(0,c.a)(this,"router",s,this),(0,c.a)(this,"document",a,this),(0,c.b)(this,"tokens",[]),(0,c.b)(this,"_defaultConfig",{separator:" | ",prepend:!0,replace:null}),(0,c.b)(this,"scheduleTitleUpdate",(()=>{(0,l.scheduleOnce)("afterRender",this,this._updateTitle)})),this._validateExistingTitleElement(),function(e){return"resolveRegistration"in e}(e)){const n=e.resolveRegistration("config:environment")
"object"==typeof(t=n)&&null!==t&&"pageTitle"in t&&v.forEach((e=>{if(!(0,f.isEmpty)(n.pageTitle[e])){const t=n.pageTitle[e]
this._defaultConfig[e]=t}}))}var t
this.router.on(m,this.scheduleTitleUpdate)}applyTokenDefaults(e){const t=this._defaultConfig.separator,n=this._defaultConfig.prepend,r=this._defaultConfig.replace
e.previous??=null,e.next??=null,null==e.separator&&(e.separator=t),null==e.prepend&&null!=n&&(e.prepend=n),null==e.replace&&null!=r&&(e.replace=r)}inheritFromPrevious(e){const t=e.previous
t&&(null==e.separator&&(e.separator=t.separator),null==e.prepend&&(e.prepend=t.prepend))}push(e){const t=this._findTokenById(e.id)
if(t){const n=this.tokens.indexOf(t),r=[...this.tokens],o=t.previous
return e.previous=o,e.next=t.next,this.inheritFromPrevious(e),this.applyTokenDefaults(e),r.splice(n,1,e),void(this.tokens=r)}const n=this.tokens.slice(-1)[0]
n&&(e.previous=n??null,n.next=e,this.inheritFromPrevious(e)),this.applyTokenDefaults(e),this.tokens=[...this.tokens,e]}remove(e){const t=this._findTokenById(e)
if(!t)return
const{next:n,previous:r}=t
n&&(n.previous=r),r&&(r.next=n),t.previous=t.next=null
const o=[...this.tokens]
o.splice(o.indexOf(t),1),this.tokens=o}get visibleTokens(){const e=this.tokens
let t=e?e.length:0
const n=[]
for(;t--;){const r=e[t]
if(r){if(r.replace){n.unshift(r)
break}n.unshift(r)}}return n}get sortedTokens(){const e=this.visibleTokens
if(!e)return[]
let t=!0,n=[]
const r=[n],o=[]
return e.forEach((e=>{if(e.front)o.unshift(e)
else if(e.prepend){t&&(t=!1,n=[],r.push(n))
const o=n[0]
o&&((e={...e}).separator=o.separator),n.unshift(e)}else t||(t=!0,n=[],r.push(n)),n.push(e)})),o.concat(r.reduce(((e,t)=>e.concat(t)),[]))}toString(){const e=this.sortedTokens,t=[]
for(let n=0,r=e.length;n<r;n++){const o=e[n]
o&&o.title&&(t.push(o.title),n+1<r&&t.push(o.separator))}return t.join("")}willDestroy(){super.willDestroy(),this.router.off(m,this.scheduleTitleUpdate)}_updateTitle(){const e=this.toString()
p?this.updateFastbootTitle(e):this.document.title=e,this.titleDidUpdate(e)}_validateExistingTitleElement(){p||(0,h.assert)("[ember-page-title]: Multiple title elements found. Check for other addons like ember-cli-head updating <title> as well.",document.head.querySelectorAll("title").length<=1)}_findTokenById(e){return this.tokens.find((t=>t.id===e))}updateFastbootTitle(e){if(!p)return
const t=this.document.head,n=t.childNodes
for(let i=0;i<n.length;i++){const e=n[i]
e&&"title"===e.nodeName.toLowerCase()&&t.removeChild(e)}const r=this.document.createElement("title"),o=this.document.createTextNode(e)
r.appendChild(o),t.appendChild(r)}titleDidUpdate(e){}},s=(0,c._)(i.prototype,"router",[r],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a=(0,c._)(i.prototype,"document",[o],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),i)},938:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0})
var r,o=n(788)
r=o,Object.keys(r).filter((e=>"default"!==e&&"__esModule"!==e)).forEach((e=>{t.hasOwnProperty(e)||Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:()=>r[e]})}))},976:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0})
const r=n(248).Node.create({name:"text",group:"inline"})
t.Text=r,t.default=r},997:(e,t,n)=>{n.r(t),n.d(t,{default:()=>d})
var r,o,i,s=n(510),a=n(735),c=n(336),l=n.n(c),u=n(666)
let d=(r=(0,a.inject)("page-title"),o=class extends(l()){constructor(e){super(e),(0,s.a)(this,"tokens",i,this),(0,s.b)(this,"tokenId",(0,u.guidFor)(this)),this.tokens.push({id:this.tokenId})}compute(e,t){const n={...t,id:this.tokenId,title:e.join("")}
return this.tokens.push(n),this.tokens.scheduleTitleUpdate(),""}willDestroy(){super.willDestroy(),this.tokens.remove(this.tokenId),this.tokens.scheduleTitleUpdate()}},i=(0,s._)(o.prototype,"tokens",[r],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),o)}}])
