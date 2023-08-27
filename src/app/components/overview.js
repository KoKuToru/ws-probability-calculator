import Component from '@glimmer/component';
import { formatNumber } from 'ws/helpers/format-number';

export default class OverviewTable extends Component {
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
    for (const col of [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
      data.push({
        header: true,
        class: 'header col',
        value: col,
      });
    }
    for (const row of Array(50 - 1).fill(null).map((_, i) => i + 1)) {
      data.push({
        class: 'header row',
        value: row,
      });
      for (const col of [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
        data.push({
          class: `color-${col}`,
          value: formatNumber(Math.random() * 100),
        });
      }
    }
    return data;
  }
}
