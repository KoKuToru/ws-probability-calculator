import State from '../state.js';
import Probability from '../probability.js';

export function* _extraAttack(soul, state) {
    let op_cx = state.op_cx;
    let op_size = state.op_size;
    let op_deck = state.op_deck;

    let my_trg = state.my_trg;
    let my_size = state.my_size;
    let my_deck = state.my_deck;

    let dmg = soul;
    let c_dmg = 0;

    let probability = new Probability(1, 1);

    for (let n = 0; n < soul; ++n) {
      if (op_cx > 0) {
        // cancel
        const pc = probability.mul(new Probability(op_cx, op_size));
        let c_op_size = op_size - 1;
        let c_op_cx = op_cx - 1;
        let c_op_deck = op_deck;
        if (c_op_size <= 0) {
          // reshuffle
          c_op_cx = state.settings.op_refresh_cx;
          c_op_size = state.settings.op_refresh_size;
          c_op_deck = Object.freeze([...c_op_deck, Object.freeze([ c_op_cx, c_op_size ])]);
          c_dmg += 1;
        }
        yield new State({ ...state, op_cx: c_op_cx, op_size: c_op_size, my_trg, my_size, op_deck: c_op_deck, my_deck }, { dmg: c_dmg, probability: pc });
      }
      if (op_size <= op_cx) {
        // nothing to "not cancel"
        return;
      }
      probability = probability.mul(new Probability(op_size - op_cx, op_size));
      op_size -= 1;
      if (op_size <= 0) {
        // reshuffle
        op_cx = state.settings.op_refresh_cx;
        op_size = state.settings.op_refresh_size;
        op_deck = Object.freeze([...op_deck, Object.freeze([ op_cx, op_size ])]);
        dmg += 1;
        c_dmg += 1;
      }
    }

    // attack state
    yield new State({ ...state, op_cx, op_size, my_trg, my_size, op_deck, my_deck }, { dmg, probability });
}

export default function extraAttack(soul) {
  return _extraAttack.bind(null, soul);
}
