import Component from '@glimmer/component';
import { formatNumber } from 'ws/helpers/format-number';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { COLORS } from './details';
import { tracked } from '@glimmer/tracking';
import parseCode from 'ws/utils/code-parser';

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
        x: col,
        value: col,
      });
    }
    for (const row of Array(50).fill(null).map((_, i) => i + 1)) {
      data.push({
        class: 'header row',
        y: row,
        header: true,
        value: row,
      });
      for (const col of columns) {
        data.push({
          x: col,
          y: row,
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
    const cls = ['selectable', `color-${idx}`];
    if (this.state.isSelected([value.x, value.y].join())) {
      cls.push('selected');
    }
    return cls.join(' ');
  }
  @action getCellValue(value) {
    value = this.state.result.get(...value);
    if (!value) {
      return undefined;
    }
    return formatNumber(value.mean);
  }
  @action toggleCell(value) {
    this.state.toggleSelected(value.join());
  }

  #last_code = [];
  #abort_controller = new AbortController();
  @action async calculate(el, [code]) {
    el;

    code = parseCode(code).filter(x => x.code).map(x => x.code);
    if (
      code.length === this.#last_code.length &&
      code.every((x, i) => x.length === this.#last_code[i]?.length && x.every((y, j) => y === this.#last_code[i][j]))
    ) {
      return;
    }
    this.#abort_controller.abort();

    this.state.result.clear();

    this.#last_code = code;
    this.#abort_controller = new AbortController();

    const signal = this.#abort_controller.signal;
    const calc = async (cx, ds) => {
      if (signal.aborted) {
        return;
      }

      // search free worker
      const free = (await Promise.race(WORKERS.map(x => x.promise.then(() => [x.promise]))))[0];
      if (signal.aborted) {
        return;
      }
      const worker = WORKERS.find(x => x.promise === free);

      // send request
      const channel = new MessageChannel();
      worker.promise = new Promise(r => channel.port1.onmessage = this.#onmessage.bind(this, r, signal, cx, ds));
      worker.postMessage({
        op_cx: cx,
        op_size: ds,
        code
      }, [ channel.port2 ]);
    };

    // calculate all
    const priority = new Set([...this.state.selected, '0,50']);
    for (const value of priority) {
      await calc(...value.split(',').map(x => parseInt(x)));
    }
    for (let ds = 1; ds <= 50; ++ds)
    for (let cx = 0; cx <= Math.min(ds, 8); ++cx) {
      if (!priority.has([cx, ds].join())) {
        await calc(cx, ds);
      }
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
    data.x = x;
    data.y = y;
    this.state.result.set(x, y, data);
  }
}
