export const syntax = [
  { regex: /^attack\s+([0-9]+)\s*$/g, params: [parseInt],    name: 'attack', short: 'a', need_parent: false },
  { regex: /^burn\s+([0-9]+)\s*$/g,   params: [parseInt],    name: 'burn',   short: 'b', need_parent: false },
  { regex: /^repeat\s+([0-9]+)\s*$/g, params: [parseInt],    name: 'repeat', short: 'r', need_parent: false },
  { regex: /^each\s+(cx)\s*$/g,       params: [() => 'cx'],  name: 'each',   short: 'e', need_parent: true },
  { regex: /^each\s+(not\s+cx)\s*$/g, params: [() => 'ncx'], name: 'each',   short: 'e', need_parent: true },
  { regex: /^if\s+(cx)\s*$/g,         params: [() => 'cx'],  name: 'if',     short: 'i', need_parent: true },
  { regex: /^if\s+(not\s+cx)\s*$/g,   params: [() => 'ncx'], name: 'if',     short: 'i', need_parent: true },
  { regex: /^mill\s+([0-9]+)\s*$/g,   params: [parseInt],    name: 'mill',   short: 'm', need_parent: false },
];

export function unparse(code) {
  return code.map(x => {
    if (!x.children.length) {
      return `${' '.repeat(x.indent)}${x.text}`;
    }
    return [
      `${' '.repeat(x.indent)}${x.text}`,
      unparse(x.children)
    ].join('\n')
  }).join('\n');
}

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

    let error = null;
    for (const s of syntax) {
      s.regex.lastIndex = 0; //< reset the regex
      const m = s.regex.exec(text);
      if (m) {
        const c = {
          short: s.short,
          text,
          indent,
          code: [ s.name, m.slice(1).map((x, i) => s.params[i] ? s.params[i](x) : x) ],
          children: []
        };
        if (c.code.length > 2) {
          c.short = `${c.short}(${c.code.slice(1).join(',')})`;
        } else {
          c.short = `${c.short}${c.code.slice(1).join(',')}`;
        }
        if (!s.need_parent || parent_stack.find(x => ['attack', 'burn', 'mill'].includes(x?.code?.[0]))) {
          parent_stack.push(c);
          if (parent) {
            parent.children.push(c);
            return null;
          }
          return c;
        } else {
          error = 'needs a parent';
        }
      }
    }
    const c = { text, indent, error, children: [] };
    if (parent) {
      parent.children.push(c);
      return null;
    }
    return c;
  }).filter(x => x);

  return ast;
}
