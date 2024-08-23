import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { COLORS } from './probability';
import { tracked } from '@glimmer/tracking';
import parseCode from 'ws/utils/code-parser';
import codeExecute from 'ws/utils/code-execute';
import { compress as compressCode } from 'ws/utils/code-compressor';

export default class OverviewTable extends Component {
  @service state;
  @tracked max_mean = COLORS.length;

  setWidth(el, [data]) {
    el.style.setProperty(
      '--columns',
      data.reduce((p, c) => p + (c.column ?? 0), 0),
    );
  }

  get codeParsed() {
    return parseCode(this.state.code);
  }

  get compressed() {
    const code = compressCode(this.codeParsed);
    return code;
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
        class: 'header col selectable',
        x: col,
        value: col,
      });
    }
    for (const row of Array(50).fill(null).map((_, i) => i + 1)) {
      data.push({
        class: 'header row selectable',
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

  @action getAnyValue(value) {
    value = this.state.result.get(...value);
    return Boolean(value);
  }

  @action getCellClass(value) {
    value = this.state.result.get(...value);
    if (!value) {
      return undefined;
    }
    if (value.error) {
      const cls = ['selectable'];
      if (this.state.isSelected([value.x, value.y].join())) {
        cls.push('selected');
      }
      if (value.error === 'invalid') {
        cls.push('invalid');
      } else {
        cls.push('error');
      }
      return cls.join(' ');
    }
    let idx = null;
    const selected_dmg = this.state.selected_dmg ?? null;
    let v = value.mean;
    if (selected_dmg === null) {
      idx = Math.min(Math.floor(v * COLORS.length / this.max_mean), COLORS.length - 1);
    } else {
      if (selected_dmg == 0) {
        v = value.dmg[0];
        // flip color for 0
        idx = Math.min(Math.floor((1 - v) * COLORS.length), COLORS.length - 1);
      } else {
        v = value.dmg.slice(selected_dmg).reduce((p, c) => p + c, 0);
        idx = Math.min(Math.floor(v * COLORS.length), COLORS.length - 1);
      }
    }

    const cls = ['selectable'];
    if (v) {
     cls.push(`color-${idx}`);
    }
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
    if (value.error) {
      if (value.error == 'invalid') {
        return 'INV';
      }
      return 'ERR';
    }
    const selected_dmg = this.state.selected_dmg ?? null;
    if (selected_dmg === null) {
      return value.mean;
    }
    return value.dmg_acc[selected_dmg] * 100;
  }

  @action toggleCell(value) {
    this.state.toggleSelected(value.join());
    this.state.store();
  }
  @action toggleHeader(value) {
    if ('x' in value) {
      let all_set = true;
      for (let i = value.x; i <= 50; ++i) {
        if (!this.state.isSelected([value.x, i].join())) {
          all_set = false;
          break;
        }
      }
      for (let i = value.x; i <= 50; ++i) {
        if (all_set) {
          this.state.toggleSelected([value.x, i].join());
        } else {
          if (!this.state.isSelected([value.x, i].join())) {
            this.state.toggleSelected([value.x, i].join());
          }
        }
      }
    }
    if ('y' in value) {
      let all_set = true;
      for (let i = 0; i <= Math.min(8, value.y); ++i) {
        if (!this.state.isSelected([i, value.y].join())) {
          all_set = false;
          break;
        }
      }
      for (let i = 0; i <= Math.min(8, value.y); ++i) {
        if (all_set) {
          this.state.toggleSelected([i, value.y].join());
        } else {
          if (!this.state.isSelected([i, value.y].join())) {
            this.state.toggleSelected([i, value.y].join());
          }
        }
      }
    }
    this.state.store();
  }

  #prepare_code(code) {
    return code
      .filter(x => x.code)
      .map(x => [...x.code, this.#prepare_code(x.children)]);
  }

  #last_short_code = '';
  #abort_controller = new AbortController();
  @action async calculate(el) {
    el;

    const short_code = this.state.overview_open + this.compressed;
    if (short_code === this.#last_short_code ) {
      return;
    }
    this.#last_short_code = short_code;

    this.#abort_controller.abort();
    this.state.result.clear();
    this.max_mean = COLORS.length;

    this.#abort_controller = new AbortController();

    const code = this.#prepare_code(this.codeParsed);

    const signal = this.#abort_controller.signal;

    const my_trg    = parseInt(this.state.my_deck_trg);
    const my_size   = parseInt(this.state.my_deck_ds);
    const my_u_trg  = parseInt(this.state.my_unused_trg);
    const my_u_size = parseInt(this.state.my_unused_ds);
    const op_u_cx   = parseInt(this.state.op_unused_cx);
    const op_u_size = parseInt(this.state.op_unused_ds);

    this.state.code_error = '';
    if (my_trg < 0 || my_trg > 15) {
      this.state.code_error = 'my_deck trg must be 0-15';
      return;
    }
    if (my_size < 0 || my_size > 50) {
      this.state.code_error = 'my_deck ds must be 0-50';
      return;
    }
    if (my_u_trg < 0 || my_u_trg > 15) {
      this.state.code_error = 'my_unused trg must be 0-15';
      return;
    }
    if (my_u_size < 0 || my_u_size > 50) {
      this.state.code_error = 'my_unused ds must be 0-50';
      return;
    }
    if (my_trg > my_size) {
      this.state.code_error = 'my_deck trg must be 0-ds';
      return;
    }
    if (my_u_trg > my_u_size) {
      this.state.code_error = 'my_unused trg must be 0-ds';
      return;
    }
    if (my_trg + my_u_trg > 15) {
      this.state.code_error = 'my_deck + my_unused trg must be 0-15';
      return;
    }
    if (my_size + my_u_size > 50) {
      this.state.code_error = 'my_deck + my_unused ds must be 0-50';
      return;
    }
    if (op_u_cx < 0 || op_u_cx > 8) {
      this.state.code_error = 'op_unused cx must be 0-15';
      return;
    }
    if (op_u_size < 0 || op_u_size > 50) {
      this.state.code_error = 'op_unused ds must be 0-50';
      return;
    }
    if (op_u_cx > op_u_size) {
      this.state.code_error = 'op_unused cx must be 0-ds';
      return;
    }

    let queue = [];
    const priority = new Set([...this.state.selected]);
    for (const value of priority) {
      const [cx, ds] = value.split(',').map(x => parseInt(x));
      queue.push({cx, ds})
    }
    if (this.state.overview_open) {
      for (let ds = 1; ds <= 50; ++ds)
      for (let cx = 0; cx <= 8; ++cx) {
        if (!priority.has([cx, ds].join())) {
          queue.push({cx, ds});
        }
      }
    }
    queue = queue.filter(x => x.cx <= x.ds && 50 - ( 8 - x.cx ) >= x.ds);
    queue.forEach(x => {
      const cx = x.cx;
      const ds = x.ds;
      const op_cx     = cx;
      const op_size   = ds;
      const op_w_cx   = Math.max(-100, 8 - op_cx - op_u_cx);
      const op_w_size = Math.max(-100, 50 - op_size - op_u_size);
      const my_w_trg  = Math.max(-100, 15 - my_trg - my_u_trg);
      const my_w_size = Math.max(-100, 50 - my_size - my_u_size);

      Object.assign(x, {
        my_trg,
        my_size,
        my_w_trg,
        my_w_size,
        my_u_trg,
        my_u_size,
        op_cx,
        op_size,
        op_w_cx,
        op_w_size,
        op_u_cx,
        op_u_size,
        code
      });
    });
    queue = queue.filter(x => {
      // sanity checks
      const res = [
        // op
        Math.min(x.op_cx, x.op_w_cx, x.op_size, x.op_w_size, x.op_u_cx, x.op_u_size) >= 0,
        x.op_cx <= x.op_size,
        x.op_w_cx <= x.op_w_size,
        x.op_u_cx <= x.op_u_size,
        x.op_cx + x.op_w_cx + x.op_u_cx == 8,
        x.op_size + x.op_w_size + x.op_u_size == 50,
        // my
        Math.min(x.my_trg, x.my_w_trg, x.my_size, x.my_w_size, x.my_u_trg, x.my_u_size) >= 0,
        x.my_trg <= x.my_size,
        x.my_w_trg <= x.my_w_size,
        x.my_u_trg <= x.my_u_size,
        x.my_trg + x.my_w_trg + x.my_u_trg == 15,
        x.my_size + x.my_w_size + x.my_u_size == 50,
      ];
      x.valid = !res.some(x => !x);
      if (!x.valid) {
        this.state.result.set(x.cx, x.ds, {
          x: x.cx,
          y: x.ds,
          data: x,
          error: 'invalid'
        });
      }
      return x.valid;
    });

    let first = true;
    let error = null;
    for await (const res of codeExecute(queue, signal)) {
      signal.throwIfAborted();

      const x = res.data.op_cx;
      const y = res.data.op_size;

      // store result
      if (res.mean > this.max_mean) {
        this.max_mean = res.mean;
      }
      res.x = x;
      res.y = y;
      Object.freeze(res);
      this.state.result.set(x, y, res);

      if (first) {
        first = false;
        let tmp = [];
        let sizes = [];
        for (let [action, params] of res.code) {
          if (!tmp.length) {
            tmp.push([]);
          }
          if (action === 'check') {
            params = [...params];
            params[0] = `stack[${params[0]}]`;
          }
          const p = `e.${action}(${(params??[]).join(', ')}); `;
          sizes[tmp.at(-1).length] = Math.max(sizes[tmp.at(-1).length] ?? 0, p.length);
          tmp.at(-1).push(p);
          if (action === 'flush') {
            tmp.push([]);
          }
        }
        tmp.forEach((a) => {
          a.forEach((b, i) => {
            a[i] = b.padEnd(sizes[i], ' ');
          })
        });
        this.state.debug_code = tmp.map(x => x.join('')).join('\n');
      }
      if (!error && res.error) {
        error = res.error;
      }
    }
    this.state.code_error = error;
  }

  @action forceCalculate(el) {
    this.#last_short_code = '';
    this.calculate(el, [this.state.code]);
  }

  get overview_extra() {
    const dmg = this.state.selected_dmg ?? null;
    if (dmg === null) {
      return 'weighted average damage';
    }
    if (dmg === 0) {
      return 'dmg 0 probability %';
    }
    return `dmg ≥ ${dmg} probability %`;
  }

  @action reset(e) {
    e.stopPropagation();
    if (confirm('reset?')) {
      this.state.reset_overview();
    }
  }

  @action scrollIntoView(el) {
    if (!this.state.selected.length) {
      return;
    }
    const min_x = this.state.selected.reduce((p, c) => Math.min(p, parseInt(c.split(',')[0])), 8);
    const min_y = this.state.selected.reduce((p, c) => Math.min(p, parseInt(c.split(',')[1])), 50);
    el.querySelector(`[data-cx="${min_x}"][data-ds="${min_y}"]`)?.scrollIntoView?.();
  }
}
