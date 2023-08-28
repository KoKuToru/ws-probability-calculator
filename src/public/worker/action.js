import attack from './actions/attack.js';
import burn from './actions/burn.js';

export default class Action {
  static dummy_func = function* (state) { yield state; };

  #prev;
  #func;

  constructor(prev, func) {
    this.#prev = prev;
    this.#func = func ?? Action.dummy_func;
  }

  attack(soul) {
    return new Action(this, attack(soul));
  }

  burn(soul) {
    return new Action(this, burn(soul));
  }

  *execute(state) {
    const cache = new Map();
    const skip = new Map();
    for (let nstate of this.#prev?.execute?.(state) ?? [state]) {
      // check if finish
      /*if (nstate.dmg >= 15) {
        yield nstate;
      }*/

      // skip check
      {
        const estates = skip.get(nstate.id);
        if (estates) {
          for (const estate of estates) {
            yield estate;
          }
          continue;
        }
      }

      // try to use cached estate
      const k = nstate.key;
      const EMPTY_ARRAY = [];
      const estates = cache.get(k) ?? EMPTY_ARRAY;

      if (estates !== EMPTY_ARRAY) {
        for (const estate of estates) {
          yield estate;
        }
        skip.set(nstate.id, estates);
        continue;
      }

      // calculate new estate
      for (const estate of this.#func(nstate)) {
        estates.push(estate);
        yield estate;
      }

      // store nstate -> estates
      cache.set(k, estates);
      skip.set(nstate.id, estates);
    }
  }
}
