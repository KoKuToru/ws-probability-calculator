export const syntax = [
  // attack
  { regex: /^attack\s+([0-9]+)\s*$/g,    params: [parseInt],     name: 'attack', short: 'a' },
  { regex: /^attack\s+(cx)\s*$/g,        params: [() => 'cx'],   name: 'attack', short: 'a', need_parent: true },
  { regex: /^attack\s+(not\s+cx)\s*$/g,  params: [() => 'ncx'],  name: 'attack', short: 'a', need_parent: true },
  { regex: /^attack\s+(trg)\s*$/g,       params: [() => 'trg'],  name: 'attack', short: 'a', need_parent: true },
  { regex: /^attack\s+(not\s+trg)\s*$/g, params: [() => 'ntrg'], name: 'attack', short: 'a', need_parent: true },
  // burn
  { regex: /^burn\s+([0-9]+)\s*$/g,      params: [parseInt],     name: 'burn',   short: 'b' },
  { regex: /^burn\s+(cx)\s*$/g,          params: [() => 'cx'],   name: 'burn',   short: 'b', need_parent: true },
  { regex: /^burn\s+(not\s+cx)\s*$/g,    params: [() => 'ncx'],  name: 'burn',   short: 'b', need_parent: true },
  { regex: /^burn\s+(trg)\s*$/g,         params: [() => 'trg'],  name: 'burn',   short: 'b', need_parent: true },
  { regex: /^burn\s+(not\s+trg)\s*$/g,   params: [() => 'ntrg'], name: 'burn',   short: 'b', need_parent: true },
  // mill
  { regex: /^mill\s+([0-9]+)\s*$/g,      params: [parseInt],     name: 'mill',   short: 'm' },
  { regex: /^mill\s+(cx)\s*$/g,          params: [() => 'cx'],   name: 'mill',   short: 'm', need_parent: true },
  { regex: /^mill\s+(not\s+cx)\s*$/g,    params: [() => 'ncx'],  name: 'mill',   short: 'm', need_parent: true },
  { regex: /^mill\s+(trg)\s*$/g,         params: [() => 'trg'],  name: 'mill',   short: 'm', need_parent: true },
  { regex: /^mill\s+(not\s+trg)\s*$/g,   params: [() => 'ntrg'], name: 'mill',   short: 'm', need_parent: true },
  // damage
  { regex: /^damage\s+([0-9]+)\s*$/g,    params: [parseInt],     name: 'damage', short: 'd' },
  { regex: /^damage\s+(cx)\s*$/g,        params: [() => 'cx'],   name: 'damage', short: 'd', need_parent: true },
  { regex: /^damage\s+(not cx)\s*$/g,    params: [() => 'ncx'],  name: 'damage', short: 'd', need_parent: true },
  { regex: /^damage\s+(trg)\s*$/g,       params: [() => 'trg'],  name: 'damage', short: 'd', need_parent: true },
  { regex: /^damage\s+(not trg)\s*$/g,   params: [() => 'ntrg'], name: 'damage', short: 'd', need_parent: true },
  // repeat
  { regex: /^repeat\s+([0-9]+)\s*$/g,    params: [parseInt],     name: 'repeat', short: 'r' },
  // each
  { regex: /^each\s+(cx)\s*$/g,          params: [() => 'cx'],   name: 'each',   short: 'e', need_parent: true },
  { regex: /^each\s+(not\s+cx)\s*$/g,    params: [() => 'ncx'],  name: 'each',   short: 'e', need_parent: true },
  { regex: /^each\s+(trg)\s*$/g,         params: [() => 'trg'],  name: 'each',   short: 'e', need_parent: true },
  { regex: /^each\s+(not\s+trg)\s*$/g,   params: [() => 'ntrg'], name: 'each',   short: 'e', need_parent: true },
  // if
  { regex: /^if\s+(cx)\s*$/g,            params: [() => 'cx'],   name: 'if',     short: 'i', need_parent: true },
  { regex: /^if\s+(not\s+cx)\s*$/g,      params: [() => 'ncx'],  name: 'if',     short: 'i', need_parent: true },
  { regex: /^if\s+(trg)\s*$/g,           params: [() => 'trg'],  name: 'if',     short: 'i', need_parent: true },
  { regex: /^if\s+(not\s+trg)\s*$/g,     params: [() => 'ntrg'], name: 'if',     short: 'i', need_parent: true },
  { regex: /^if\s+(not\s+cx)\s*$/g,      params: [() => 'ncx'],  name: 'if',     short: 'i', need_parent: true },
  { regex: /^if\s+(trg)\s*$/g,           params: [() => 'trg'],  name: 'if',     short: 'i', need_parent: true },
  { regex: /^if\s+(not\s+trg)\s*$/g,     params: [() => 'ntrg'], name: 'if',     short: 'i', need_parent: true },
  // if and
  { regex: /^if\s+(cx)\s*and trg\s*$/g,         params: [() => 'cxtrg'],   name: 'if',  short: 'i', need_parent: true },
  { regex: /^if\s+(trg)\s*and cx\s*$/g,         params: [() => 'cxtrg'],   name: 'if',  short: 'i', need_parent: true },
  { regex: /^if\s+(not cx)\s*and trg\s*$/g,     params: [() => 'ncxtrg'],  name: 'if',  short: 'i', need_parent: true },
  { regex: /^if\s+(trg)\s*and not cx\s*$/g,     params: [() => 'ncxtrg'],  name: 'if',  short: 'i', need_parent: true },
  { regex: /^if\s+(cx)\s*and not trg\s*$/g,     params: [() => 'cxntrg'],  name: 'if',  short: 'i', need_parent: true },
  { regex: /^if\s+(not trg)\s*and cx\s*$/g,     params: [() => 'cxntrg'],  name: 'if',  short: 'i', need_parent: true },
  { regex: /^if\s+(not cx)\s*and not trg\s*$/g, params: [() => 'ncxntrg'], name: 'if',  short: 'i', need_parent: true },
  { regex: /^if\s+(not trg)\s*and not cx\s*$/g, params: [() => 'ncxntrg'], name: 'if',  short: 'i', need_parent: true },
  // else
  { regex: /^else\s*$/g,                 params: [],             name: 'else',   short: 'j', need_prev_sibling: ['if', 'each']},
  // reveal
  { regex: /^reveal\s+([0-9]+)\s+remove\s+(cx)\s*$/g, params: [parseInt, ()=>1], name: 'reveal', short: 'p', to_text: (count) => `reveal ${count} remove cx` },
  { regex: /^reveal\s+remove\s+(cx)\s*$/g,            params: [()=>1,    ()=>1], name: 'reveal', short: 'p', to_text: (count) => `reveal ${count} remove cx` },
  { regex: /^reveal\s+([0-9]+)\s*$/g,                 params: [parseInt],        name: 'reveal', short: 'p' },
  { regex: /^(reveal)\s*$/g,                          params: [()=>1],           name: 'reveal', short: 'p' },
  // function
  { regex: /^procedure\s*([a-zA-Z_]+[a-zA-Z0-9_]*)\s*/g, params: [x => x], name: 'procedure', short: 'f', toplevel: true, unique_name: true },
  // execute
  { regex: /^execute\s*([a-zA-Z_]+[a-zA-Z0-9_]*)\s*/g, params: [x => x], name: 'execute', short: 'c', check_unique_name: true, disallow_children: true },
  // reshuffle
  { regex: /^reshuffle\s*/g, params: [], name: 'reshuffle', short: 's', toplevel: true, unique_name: true },
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

  const unique_name = new Set();
  const check_unique_name = [];
  const disallow_children = [];

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
        if (s.toplevel && indent != 0) {
          error = `needs to be toplevel, zero indent`;
          break;
        }
        if (s.unique_name) {
          const [n] = c.code[1];
          if (unique_name.has(n)) {
            error = `name ${n} already in use`;
            break;
          }
          unique_name.add(n);
        }
        if (s.check_unique_name) {
          check_unique_name.push(c);
        }
        if (s.disallow_children) {
          disallow_children.push(c);
        }
        if (c.code.length > 2) {
          c.short = `${c.short}(${c.code.slice(1).join(',')})`;
        } else {
          c.short = `${c.short}${c.code.slice(1).join(',')}`;
        }
        if (s.need_parent) {
          if (!parent_stack.find(x => ['attack', 'burn', 'mill', 'reveal'].includes(x?.code?.[0]))) {
            error = `needs a 'attack'/'burn'/'mill' or 'reveal' as parent`;
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
      const c = { text, indent, error, children: [], offset: lineoffset + offset };
      parent.children.push(c);
    }
  }

  // special check for unique names
  for (const c of check_unique_name) {
    const [n] = c.code[1];
    if (!unique_name.has(n)) {
      c.error = `there is no function with the name ${n}`;
    }
  }

  // speicla check for no children
  for (const c of disallow_children) {
    if (c.children?.length ?? 0 != 0) {
      c.error = `no children allowed`;
    }
  }

  return ast.children;
}
