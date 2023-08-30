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

export default class ResultTable extends Component {
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
          return -1;
        }
        if (a[i] > b[i]) {
          return 1;
        }
      }
      return 0;
    });
    return selected;
  }

  get cols() {
    return Array(this.rows.reduce((p, c) => Math.max(p, this.state.result.get(...c)?.dmg?.length ?? 0), 0)).fill().map((_,i) => i);
  }

  @action getCellValue(x, y) {
    const res = this.state.result.get(...x);
    if (!res) {
      return null;
    }
    let v;
    if (y == 0) {
      v = res.dmg[0] * 100;
    } else {
      v = res.dmg.slice(y).reduce((p, c) => p + c, 0);
    }
    if (v === 0) {
      return null;
    }
    return v * 100;
  }
  @action getCellClass(v) {
    v ??= null;
    if (v === null) {
      return null;
    }
    const idx = Math.min(Math.floor(v * COLORS.length / 100.), COLORS.length - 1);
    return `color-${idx}`;
  }
}
