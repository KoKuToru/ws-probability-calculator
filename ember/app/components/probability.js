import Component from '@glimmer/component';
import { formatNumber } from 'ws/helpers/format-number';
import { service } from '@ember/service';
import { action } from '@ember/object';

export const COLORS = [
  '#e1645dDF',
  '#f79172DF',
  '#fdc388DF',
  '#ffe8a8DF',
  '#ffffcfDF',
  '#e2f3a8DF',
  '#bde290DF',
  '#8dcd8aDF',
  '#54b27cDF',
];

{
  // inject colors into CSS
  const style = document.createElement('style');
  style.textContent = COLORS.map(
    (x, i) => `.color-${i} { background-color: ${x} !important; }\n`,
  ).join('');
  document.head.append(style);
}

export default class ProbabilityComponent extends Component {
  @service state;

  setWidth(e, [data]) {
    e.style.setProperty(
      '--columns',
      data.length + 1,
    );
  }

  get rows() {
    const selected = this.state.selected.map(x => x.split(',').map(x => parseInt(x))).sort((a, b) => {
      for (let i = 0; i < Math.max(a.length, b.length); ++i) {
        if (a[i] < b[i]) {
          return 1;
        }
        if (a[i] > b[i]) {
          return -1;
        }
      }
      return 0;
    });
    return selected;
  }

  get cols() {
    return Array(this.rows.reduce((p, c) => Math.max(p, this.state.result.get(...c)?.dmg?.length ?? 0), 0)).fill().map((_,i) => i);
  }

  @action setDmg(dmg, e) {
    if (this.state.selected_dmg === dmg) {
      this.state.selected_dmg = null;
    } else {
      this.state.selected_dmg = dmg;
    }
    this.state.store();
  }
  @action isSelectedDmg(col) {
    return this.state.selected_dmg === col;
  }
  @action getTitle(row) {
    const res = this.state.result.get(...row);
    if (res) {
      console.log(res.data);
      const u1 = Math.max(0, 15-res.data.my_trg -res.data.my_w_trg);
      const u2 = Math.max(0, 50-res.data.my_size-res.data.my_w_size);
      const u3 = Math.max(0, 8 -res.data.op_cx  -res.data.op_w_cx);
      const u4 = Math.max(0, 50-res.data.op_size-res.data.op_w_size);
      function n(format, ...params) {
        const res = [];
        for (let i = 0, j = 0; i < format.length; ++i) {
          if (i != 0) {
            res.push(`${params[j++]}`.padStart(2, '0'));
          }
          res.push(format[i]);
        }
        return res.join('');
      }
      const r = [
        n`my_deck\n\ttrg ${res.data.my_trg} / ${res.data.my_size} ds`,
        n`my_waitingroom\n\ttrg ${res.data.my_w_trg} / ${res.data.my_w_size} ds`,
        n`my_unused\n\ttrg ${u1} / ${u2} ds`,
        n``,
        n`op_deck\n\tcx ${res.data.op_cx} / ${res.data.op_size} ds`,
        n`op_waitingroom\n\tcx ${res.data.op_w_cx} / ${res.data.op_w_size} ds`,
        n`op_unused\n\tcx ${u3} / ${u4} ds`,
      ].join('\n');
      console.log(r);
      return r;
    }
  }

  @action getCellValue(x, y) {
    const res = this.state.result.get(...x);
    if (!res) {
      return null;
    }
    if (res.error) {
      return 'ERR';
    }
    let v = res.dmg_acc[y];
    if (!v) {
      return null;
    }
    return v * 100;
  }
  @action getCellClass(v, y) {
    v ??= null;
    if (v === null) {
      return null;
    }
    if (v === 'ERR') {
      return 'error';
    }
    let idx;
    if (y == 0) {
      // flip color for 0
      idx = Math.min(Math.floor((100 - v) * COLORS.length / 100.), COLORS.length - 1);
    } else {
      idx = Math.min(Math.floor(v * COLORS.length / 100.), COLORS.length - 1);
    }
    return `color-${idx}`;
  }

  @action reset(e) {
    e.stopPropagation();
    if (confirm('reset?')) {
      this.state.reset_probability();
    }
  }
}
