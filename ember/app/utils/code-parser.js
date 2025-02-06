export const syntax = [
  { regex: /^attack\s+([0-9]+)\s*$/g,   params: [parseInt],    name: 'attack', short: 'a', need_parent: false },
  { regex: /^attack\s+(cx)\s*$/g,       params: [() => 'cx'],  name: 'attack', short: 'a', need_parent: true },
  { regex: /^attack\s+(not\s+cx)\s*$/g, params: [() => 'ncx'], name: 'attack', short: 'a', need_parent: true },
  { regex: /^burn\s+([0-9]+)\s*$/g,     params: [parseInt],    name: 'burn',   short: 'b', need_parent: false },
  { regex: /^burn\s+(cx)\s*$/g,         params: [() => 'cx'],  name: 'burn',   short: 'b', need_parent: true },
  { regex: /^burn\s+(not\s+cx)\s*$/g,   params: [() => 'ncx'], name: 'burn',   short: 'b', need_parent: true },
  { regex: /^mill\s+([0-9]+)\s*$/g,     params: [parseInt],    name: 'mill',   short: 'm', need_parent: false },
  { regex: /^mill\s+(cx)\s*$/g,         params: [() => 'cx'],  name: 'mill',   short: 'm', need_parent: true },
  { regex: /^mill\s+(not\s+cx)\s*$/g,   params: [() => 'ncx'], name: 'mill',   short: 'm', need_parent: true },
  { regex: /^damage\s+([0-9]+)\s*$/g,   params: [parseInt],    name: 'damage', short: 'd', need_parent: false },
  { regex: /^damage\s+(cx)\s*$/g,       params: [() => 'cx'],  name: 'damage', short: 'd', need_parent: true },
  { regex: /^damage\s+(not cx)\s*$/g,   params: [() => 'ncx'], name: 'damage', short: 'd', need_parent: true },
  { regex: /^repeat\s+([0-9]+)\s*$/g,   params: [parseInt],    name: 'repeat', short: 'r', need_parent: false },
  { regex: /^each\s+(cx)\s*$/g,         params: [() => 'cx'],  name: 'each',   short: 'e', need_parent: true },
  { regex: /^each\s+(not\s+cx)\s*$/g,   params: [() => 'ncx'], name: 'each',   short: 'e', need_parent: true },
  { regex: /^if\s+(cx)\s*$/g,           params: [() => 'cx'],  name: 'if',     short: 'i', need_parent: true },
  { regex: /^if\s+(not\s+cx)\s*$/g,     params: [() => 'ncx'], name: 'if',     short: 'i', need_parent: true },
  { regex: /^else\s*$/g,                params: [() => null],  name: 'else',   short: 'j', need_prev_sibling: ['if', 'each']}
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

  const rex = /^(.*)$/gm;
  const code_offset = [];
  while (true) {
    const r = rex.exec(code);
    if (!r) {
      break;
    }
    // This is necessary to avoid infinite loops with zero-width matches
    if (r.index === rex.lastIndex) {
      rex.lastIndex++;
    }
    code_offset.push({ text: r[1], lineoffset: r.index});
  }

  const ast = {
    children: []
  };
  const parent_stack = [ast];
  for (let {text, lineoffset} of code_offset) {
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
          children: [],
          offset: lineoffset + offset
        };
        if (c.code.length > 2) {
          c.short = `${c.short}(${c.code.slice(1).join(',')})`;
        } else {
          c.short = `${c.short}${c.code.slice(1).join(',')}`;
        }
        if (s.need_parent) {
          if (!parent_stack.find(x => ['attack', 'burn', 'mill'].includes(x?.code?.[0]))) {
            error = `needs a 'attack'/'burn' or 'mill' as parent`;
            break;
          }
        } else if (s.need_prev_sibling) {
          var found_if = false;
          for (let j = parent.children.length - 1; j >= 0; --j) {
            if ('code' in parent.children[j]) {
              if (!s.need_prev_sibling.includes(parent.children[j].code[0])) {
                break;
              } else {
                found_if = parent.children[j];
                break;
              }
            }
          }
          if (!found_if) {
            error = `needs a ${s.need_prev_sibling.join(',')} as previous sibling`
            break;
          }
          c.code[1] = found_if.code[1];
        }

        parent_stack.push(c);
        parent.children.push(c);
        break;
      }
    }
    if (parent === parent_stack.at(-1)) {
      const c = { text, indent, error, children: [], offset: lineoffset };
      parent.children.push(c);
    }
  }

  return ast.children;
}
