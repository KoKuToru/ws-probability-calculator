import Component from '@glimmer/component';
import { formatNumber } from 'ws/helpers/format-number';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { COLORS } from './details';
import { tracked } from '@glimmer/tracking';

const PARALLE_SIZE = (navigator.hardwareConcurrency ?? 2) - 1;
const WORKERS = Array(PARALLE_SIZE).fill(null).map(x => new Worker('/worker/worker.js', {type: 'module'}));
WORKERS.forEach(x => x.promise = new Promise(r => r()));

export default class OverviewTable extends Component {
  @service state;
  @tracked max_mean = COLORS.length;

  setWidth(el, [data]) {
    el.style.setProperty(
      '--columns',
      data.reduce((p, c) => p + (c.column ?? 0), 0),
    );
  }

  get data() {
    const data = [];
    data.push({
      header: true,
      column: true,
      corner: true,
      class: 'header col row corner',
    });
    const columns = Array(8 + 1).fill(null).map((_, i) => i);
    for (const col of columns) {
      data.push({
        header: true,
        column: true,
        class: 'header col',
        value: col,
      });
    }
    for (const row of Array(50 - 1).fill(null).map((_, i) => i + 1)) {
      data.push({
        class: 'header row',
        header: true,
        value: row,
      });
      for (const col of columns) {
        data.push({
          value: [col, row],
        });
      }
    }
    return data;
  }

  @action getCellClass(value) {
    value = this.state.result.get(...value);
    if (!value) {
      return undefined;
    }
    const idx = Math.min(Math.floor(value.mean * COLORS.length / this.max_mean), COLORS.length - 1);
    return `color-${idx}`;
  }
  @action getCellValue(value) {
    value = this.state.result.get(...value);
    if (!value) {
      return undefined;
    }
    return formatNumber(value.mean);
  }

  #last_code;
  #abort_controller = new AbortController();
  @action async calculate(el, [code]) {
    el;
    if (this.#last_code === code) {
      return;
    }
    this.#abort_controller.abort();

    this.state.result.clear();

    this.#last_code = code;
    this.#abort_controller = new AbortController();

    const signal = this.#abort_controller.signal;
    // calculate all
    for (let ds = 1; ds <= 50; ++ds)
    for (let cx = 0; cx <= Math.min(ds, 8); ++cx) {
      // search free worker
      const free = (await Promise.race(WORKERS.map(x => x.promise.then(() => [x.promise]))))[0];
      const worker = WORKERS.find(x => x.promise === free);
      if (signal.aborted) {
        break;
      }
      // send request
      const channel = new MessageChannel();
      worker.promise = new Promise(r => channel.port1.onmessage = this.#onmessage.bind(this, r, signal, cx, ds));
      worker.postMessage({
        op_cx: cx,
        op_size: ds,
        code: '3'
      }, [ channel.port2 ]);
    }
  }

  #onmessage(resolve, signal, x, y, {data}) {
    resolve();
    if (signal.aborted) {
      return;
    }
    // store result
    if (data.mean > this.max_mean) {
      this.max_mean = data.mean;
    }
    this.state.result.set(x, y, data);
  }
}
