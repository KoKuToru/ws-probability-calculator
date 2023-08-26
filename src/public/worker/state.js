import Probability from './probability.js';

const SETTINGS = Object.freeze({
  // settings:
  op_refresh_cx: 8,
  op_refresh_size: 50,
  my_refresh_trg: 15,
  my_refresh_size: 50
});

const EMPTY_ARRAY = Object.freeze([]);

export default class State {
  static id = 0;
  #id = ++State.id;

  // current deck state:
  op_cx = 8;
  op_size = 50;
  my_trg = 15;
  my_size = 50;

  settings = SETTINGS;

  // current dmg
  dmg = 0;
  probability = new Probability(1, 1);

  op_deck = EMPTY_ARRAY;
  my_deck = EMPTY_ARRAY;

  constructor(obj, diff) {
    for (const k of Object.keys(this)) {
      this[k] = obj?.[k] ?? this[k];
      const d = diff?.[k] ?? null;
      if (d === null) {
        continue;
      }
      switch (k) {
        case 'probability':
          this[k] = this[k].mul(d);
          break;
        default:
          this[k] += d;
      }
    }
    if (!this.op_deck.length) {
      this.op_deck = Object.freeze([...this.op_deck, Object.freeze([ this.op_cx, this.op_size ])]);
    }
    if (!this.my_deck.length) {
      this.my_deck = Object.freeze([...this.my_deck, Object.freeze([ this.my_trg, this.my_size ])]);
    }
    Object.freeze(this);
  }

  get id() {
    return this.#id;
  }

  get key() {
    return JSON.stringify([
      this.op_cx,
      this.op_size,
      this.op_deck,

      this.my_trg,
      this.my_size,
      this.my_deck,

      this.dmg,
      this.probability
    ]);
  }
}
