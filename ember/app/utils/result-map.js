import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

class TrackedValue {
  @tracked value;
};

export default class ResultMap {
  #w;
  #h;
  #values;
  constructor(w, h) {
    this.#w = w;
    this.#h = h;
    this.#values = Array(w * h).fill(null).map(() => new TrackedValue());
  }
  clear() {
    this.#values.forEach((_, i, a) => a[i].value = undefined);
  }
  @action get(x, y) {
    return this.#values[x + y * this.#w]?.value;
  }
  @action set(x, y, value) {
    this.#values[x + y * this.#w].value = value;
  }
}
