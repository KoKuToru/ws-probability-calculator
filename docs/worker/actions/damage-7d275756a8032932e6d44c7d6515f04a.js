import Step from"../step-1248a01770d3952a706eba307cfb66a4.js"
import Action from"../action-3baa581546e81bfd61da2b5de024a151.js"
export default class Damage extends Action{constructor(a,e){super(a,damage(e))}}function*damage(a){yield Step.create({dmg:a})}