var __ember_auto_import__;(()=>{var e,r={197:(e,r,t)=>{var n,o
e.exports=(n=_eai_d,o=_eai_r,window.emberAutoImportDynamic=function(e){return 1===arguments.length?o("_eai_dyn_"+e):o("_eai_dynt_"+e)(Array.prototype.slice.call(arguments,1))},window.emberAutoImportSync=function(e){return o("_eai_sync_"+e)(Array.prototype.slice.call(arguments,1))},n("dom-element-descriptors",[],(function(){return(e=t(629))&&e.__esModule?e:Object.assign({default:e},e)
var e})),void t(287))},287:(e,r,t)=>{e.exports=function(){var e=_eai_d,r=_eai_r
function n(e){return e&&e.__esModule?e:Object.assign({default:e},e)}window.emberAutoImportDynamic=function(e){return 1===arguments.length?r("_eai_dyn_"+e):r("_eai_dynt_"+e)(Array.prototype.slice.call(arguments,1))},window.emberAutoImportSync=function(e){return r("_eai_sync_"+e)(Array.prototype.slice.call(arguments,1))},e("@tiptap/core",[],(function(){return n(t(248))})),e("@tiptap/extension-document",[],(function(){return n(t(430))})),e("@tiptap/extension-dropcursor",[],(function(){return n(t(400))})),e("@tiptap/extension-gapcursor",[],(function(){return n(t(415))})),e("@tiptap/extension-history",[],(function(){return n(t(689))})),e("@tiptap/extension-paragraph",[],(function(){return n(t(67))})),e("@tiptap/extension-text",[],(function(){return n(t(976))})),e("@tiptap/pm/state",[],(function(){return n(t(614))})),e("@tiptap/pm/view",[],(function(){return n(t(392))})),e("ember-page-title/helpers/page-title",["@ember/service","@ember/component/helper","@ember/object/internals"],(function(){return n(t(997))})),e("ember-page-title/services/page-title",["@ember/runloop","@ember/service","@ember/utils","@ember/debug"],(function(){return n(t(870))}))}()},336:e=>{"use strict"
e.exports=require("@ember/component/helper")},418:function(e,r){window._eai_r=require,window._eai_d=define},603:e=>{"use strict"
e.exports=require("@ember/debug")},604:e=>{"use strict"
e.exports=require("@ember/runloop")},629:(e,r,t)=>{"use strict"
t.r(r),t.d(r,{IS_DESCRIPTOR:()=>n,createDescriptor:()=>l,isDescriptor:()=>o,lookupDescriptorData:()=>s,registerDescriptorData:()=>u,resolveDOMElement:()=>p,resolveDOMElements:()=>a,resolveDescription:()=>c})
const n="__dom_element_descriptor_is_descriptor__"
function o(e){return"object"==typeof e&&e&&n in e}function i(){const e=window
return e.domElementDescriptorsRegistry=e.domElementDescriptorsRegistry||new WeakMap,e.domElementDescriptorsRegistry}function u(e,r){r?i().set(e,r):i().delete(e)}function s(e){return i().get(e)||null}function p(e){let r=o(e)?s(e):e
if(!r)return null
if(void 0!==r.element)return r.element
for(let t of r.elements||[])return t
return null}function a(e){let r=o(e)?s(e):e
if(!r)return[]
if(r.elements)return Array.from(r.elements)
{let e=r.element
return e?[e]:[]}}function c(e){let r=o(e)?s(e):e
return r?.description}function l(e){let r={[n]:!0}
return u(r,e),r}},666:e=>{"use strict"
e.exports=require("@ember/object/internals")},735:e=>{"use strict"
e.exports=require("@ember/service")},934:e=>{"use strict"
e.exports=require("@ember/utils")}},t={}
function n(e){var o=t[e]
if(void 0!==o)return o.exports
var i=t[e]={exports:{}}
return r[e].call(i.exports,i,i.exports,n),i.exports}n.m=r,e=[],n.O=(r,t,o,i)=>{if(!t){var u=1/0
for(c=0;c<e.length;c++){for(var[t,o,i]=e[c],s=!0,p=0;p<t.length;p++)(!1&i||u>=i)&&Object.keys(n.O).every((e=>n.O[e](t[p])))?t.splice(p--,1):(s=!1,i<u&&(u=i))
if(s){e.splice(c--,1)
var a=o()
void 0!==a&&(r=a)}}return r}i=i||0
for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1]
e[c]=[t,o,i]},n.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e
return n.d(r,{a:r}),r},n.d=(e,r)=>{for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e={524:0,582:0}
n.O.j=r=>0===e[r]
var r=(r,t)=>{var o,i,[u,s,p]=t,a=0
if(u.some((r=>0!==e[r]))){for(o in s)n.o(s,o)&&(n.m[o]=s[o])
if(p)var c=p(n)}for(r&&r(t);a<u.length;a++)i=u[a],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0
return n.O(c)},t=globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]
t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})(),n.O(void 0,[747],(()=>n(418)))
var o=n.O(void 0,[747],(()=>n(197)))
o=n.O(o),__ember_auto_import__=o})()
