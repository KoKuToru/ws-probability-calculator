const syntax = [
  [/^attack\s+([0-9]+)\s*$/g, parseInt, 'attack', 'a'],
  [/^burn\s+([0-9]+)\s*$/g, parseInt, 'burn', 'b'],
  [/^repeat\s+([0-9]+)\s*$/g, parseInt, 'repeat', 'r'],
  [/^each\s+(cx)\s*$/g, () => 'cx', 'each', 'e'],
  [/^each\s+(not\s+cx)\s*$/g, () => 'ncx', 'each', 'e'],
  [/^if\s+(cx)\s*$/g, () => 'cx', 'if', 'i'],
  [/^if\s+(not\s+cx)\s*$/g, () => 'ncx', 'if', 'i'],
  [/^mill\s+([0-9]+)\s*$/g, parseInt, 'mill', 'm'],
];

export default function parse(code) {
  code ??= '';
  code = code.split('\n');

  const parent_stack = [];

  const ast = code.map(text => {
    let indent = 0;
    let offset = 0;
    for (let i = 0; i < text.length; ++i) {
      if (!/\s/.exec(text[i])) {
        break;
      }
      offset += 1;
      switch (text[i]) {
        case '\t':
          indent += 2;
          break;
        default:
          indent += 1;
      }
    }

    text = text.slice(offset);

    let parent = parent_stack.at(-1);
    while (parent && parent.indent >= indent) {
      parent_stack.pop();
      parent = parent_stack.at(-1);
    }

    for (const [s, ...p] of syntax) {
      const [name, short] = p.slice(-2);
      const parsers = p.slice(0, -2);
      s.lastIndex = 0; //< reset the regex
      const m = s.exec(text);
      if (m) {
        const c = {
          short: '',
          text,
          indent,
          code: [name, m.slice(1).map((x, i) => parsers[i] ? parsers[i](x) : x)],
          children: []
        };
        if (c.code.length > 2) {
          c.short = `${short}(${c.code.slice(1).map(x => toString(x)).join(',')})`;
        } else {
          c.short = `${short}${c.code.slice(1).map(x => toString(x)).join(',')}`;
        }
        parent_stack.push(c);
        if (parent) {
          parent.children.push(c);
          return null;
        }
        return c;
      }
    }
    const c = { text, indent };
    if (parent) {
      parent.children.push(c);
      return null;
    }
    return c;
  }).filter(x => x);

  return ast;
}

function toString(x) {
  if (typeof x === 'string') {
    return `'${x}'`;
  }
  return `${x}`;
}
