import LinterPlugin from './linter-plugin';
import parseCode from 'ws/utils/code-parser';

export default class WsCode extends LinterPlugin {
  scan() {
    const nodes = [];
    this.doc.descendants((node, position) => {
      if (!node.isText) {
        return;
      }
      nodes.push({text: node.text, position});
    });

    let fulltext = '';
    let pos = [];
    for (const {text, position} of nodes) {
      pos.push([fulltext.length, position])
      fulltext += text + '\n';
    }

    const parsed = flattenChildren(parseCode(fulltext));

    for (const p of parsed) {
      if (!p.error && !p.code) {
        continue;
      }

      const o = pos.findLast(x => x[0] <= p.offset);
      if (!o) {
        break;
      }
      const o1 = o[1] + p.offset - o[0];
      const idx = p.text.indexOf(' ');
      const o2 = o1 + idx;
      const o3 = o1 + p.text.length;

      if (p.error) {
        this.record(
          'lint-code-error',
          o1,
          o3
        );
      } else {
        this.record(
          'lint-code-ok lint-code-ok2',
          o1,
          o2
        );
        this.record(
          'lint-code-ok',
          o2,
          o3
        );
      }
    }

    return this;
  }
}

function* flattenChildren(x) {
  for (const y of x) {
    yield y;
    if (Array.isArray(y?.children)) {
      for (const z of flattenChildren(y?.children)) {
        yield z;
      }
    }
  }
}
