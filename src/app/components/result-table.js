import Component from '@glimmer/component';
import { formatNumber } from 'ws/helpers/format-number';

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
    (x, i) => `.color-${i} { background-color: ${x}; }\n`,
  ).join('');
  document.head.append(style);
}

export default class ResultTable extends Component {
  setWidth(e, [data]) {
    e.style.setProperty(
      '--columns',
      data.reduce((p, c) => p + (c.header ?? 0), 0),
    );
  }

  get data() {
    const data = [];
    data.push({
      header: true,
      corner: true,
      class: 'header col row corner',
    });
    for (const col of [0, 1, 2, 3, 4, 5, 6, 7]) {
      data.push({
        header: true,
        class: 'header col',
        value: `≥ ${col}`,
      });
    }
    for (const row of ['3 / 29', '2 / 25']) {
      data.push({
        class: 'header row',
        value: row,
      });
      for (const col of [0, 1, 2, 3, 4, 5, 6, 7]) {
        data.push({
          class: `color-${col}`,
          value: formatNumber(Math.random() * 100),
        });
      }
    }
    return data;
  }
}
