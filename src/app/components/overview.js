import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { COLORS } from './probability';
import { tracked } from '@glimmer/tracking';
import parseCode from 'ws/utils/code-parser';
import codeExecute from 'ws/utils/code-execute';

export default class OverviewTable extends Component {
  @service state;
  @tracked max_mean = COLORS.length;

  setWidth(el, [data]) {
    el.style.setProperty(
      '--columns',
      data.reduce((p, c) => p + (c.column ?? 0), 0),
    );
  }

  #compressed_short(code) {
    if (!code.children.length) {
      return code.short;
    }
    const x = code.children
      .filter(x => x.short)
      .map(x => this.#compressed_short(x))
      .join('');
    return `${code.short}{${x}}`;
  }

  get codeParsed() {
    return parseCode(this.state.code);
  }

  get compressed() {
    const p = this.codeParsed;
    return p
      .filter(x => x.short)
      .map(x => this.#compressed_short(x))
      .join('');
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
    const selected_dmg = this.state.selected_dmg ?? null;
    if (selected_dmg === null) {
      return value.mean;
    }
    return value.dmg_acc[selected_dmg] * 100;
  }

  @action getCellTitle(value) {
    const vv = this.getCellValue(value);
    value = this.state.result.get(...value);
    if (!value) {
      return undefined;
    }
    const selected_dmg = this.state.selected_dmg ?? null;
    const v = selected_dmg === null
      ? value.exact_mean
      : value.exact_dmg_acc[selected_dmg];
    return `${v} = ${vv}`;
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
  @action async calculate(el, [code]) {
    el;

    const short_code = this.compressed;
    if ( short_code === this.#last_short_code ) {
      return;
    }
    this.#last_short_code = short_code;

    this.#abort_controller.abort();
    this.state.result.clear();

    this.#abort_controller = new AbortController();

    code = this.#prepare_code(parseCode(code));

    const signal = this.#abort_controller.signal;

    const queue = [];
    const priority = new Set([...this.state.selected, '0,50']);
    for (const value of priority) {
      const [cx, ds] = value.split(',').map(x => parseInt(x));
      queue.push({ op_cx: cx, op_size: ds, code });
    }
    for (let ds = 1; ds <= 50; ++ds)
    for (let cx = 0; cx <= Math.min(ds, 8); ++cx) {
      if (!priority.has([cx, ds].join())) {
        queue.push({ op_cx: cx, op_size: ds, code });
      }
    }

    let first = true;
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
        const tmp = res.code.map(([action, params, condition, dedup]) => {
          if (condition.length) {
            condition = `if (${condition.map(([left, opt, right]) => `stack[${left}] ${opt} ${right}`).join(' && ')}) `;
          } else {
            condition = '';
          }
          if (!dedup) {
            return [condition, `{ ${action}(${params.join(', ')}); `, '         }'];
          } else {
            return [condition, `{ ${action}(${params.join(', ')}); `, 'dedup(); }'];
          }
        });
        {
          const condition_size = tmp.reduce((p, c) => Math.max(p, c[0].length), 0);
          tmp.forEach(a => a[0] = a[0].padEnd(condition_size, ' '));
        }
        {
          const code_size = tmp.reduce((p, c) => Math.max(p, c[1].length), 0);
          tmp.forEach(a => a[1] = a[1].padEnd(code_size, ' '));
        }
        this.state.debug_code = tmp.map(x => x.join('')).join('\n');
      }
    }
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
