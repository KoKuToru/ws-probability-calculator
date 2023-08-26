import State from '../state.js';
import Probability from '../probability.js';

export function* _soulAttack(soul, state) {
  check_trigger:
  for (const trigger of [true, false]) {
    let op_cx = state.op_cx;
    let op_size = state.op_size;
    let op_deck = state.op_deck;

    let my_trg = state.my_trg;
    let my_size = state.my_size;
    let my_deck = state.my_deck;

    let dmg = soul + trigger;
    let c_dmg = 0;

    if (
      ( trigger && my_trg <= 0) || // i can't trigger
      (!trigger && my_size <= my_trg) // i must trigger
    ) {
      continue;
    }

    // trigger check
    let probability = trigger
      ? new Probability(my_trg, my_size)
      : new Probability(my_size - my_trg, my_size);
    my_size -= 1;
    if (trigger) {
      my_trg -= 1;
    }
    if (my_size <= 0) {
      // reshuffle
      throw new Error("not implemented");
    }

    for (let n = 0; n < soul + trigger; ++n) {
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
        continue check_trigger;
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
}

export default function soulAttack(soul) {
  return _soulAttack.bind(null, soul);
}
