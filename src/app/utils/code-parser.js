const syntax = [
  [/^(attack)\s+([0-9]+)\s*$/g, parseInt],
  [/^(burn)\s+([0-9]+)\s*$/g, parseInt]
];

export default function parse(code) {
  code ??= '';
  code = code.split('\n');
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

    if (offset == 0) // for now no tabbing allowed
    for (const [s, ...p] of syntax) {
      s.lastIndex = 0; //< reset the regex
      const m = s.exec(text);
      if (m) {
        return {
          text,
          indent,
          code: [m[1], ...m.slice(2).map((x, i) => p[i] ? p[i](x) : x)]
        };
      }
    }

    return { text, indent };
  });
  return ast;
}
