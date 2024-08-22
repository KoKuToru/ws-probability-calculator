function _compress(code, text) {
  text ??= null;

  const short = code.short ?? (text ? `!${code.indent}`  : '');

  if (!code.short && text) {
    text.push(code.text);
  }

  let params = '';
  if (code.code?.length) {
    code.code.length > 2
      ? `(${code.code.slice(1).join(',')})`
      : code.code.slice(1).join();
  }

  const end = (code.short && text) ? ';' : '';

  if (!code.children.length) {
    return `${short}${params}${end}`;
  }
  const x = code.children
    .map(x => _compress(x, text))
    .join('');
  return `${short}${params}{${x}}`;
}

export function compress(code, text) {
  return code.map(x => _compress(x, text)).filter(x => x).join('');
}

function decompressParams(code) {
  let rcode = code;
  if (code[0] == '(') {
    const idx = code.indexOf(')');
    rcode = code.slice(idx + 1);
    code = code.slice(1, idx);
  } else {
    const idx = code.split('').findIndex(x => x === ';' || x === '{');
    rcode = code.slice(idx + (code[idx] === ';'));
    code = code.slice(0, idx);
  }
  return [
    code.split(',').map(x => {
      if (x == 'ncx') {
        return 'not cx';
      }
      const y = parseInt(x);
      if (isNaN(y)) {
        return x;
      }
      return y;
    }), rcode];
}

function decompressChildren(code, text, indent) {
  let rcode = code;
  if (code[0] !== '{') {
    return [[], rcode];
  }
  let idx = 0;
  let count = 0;
  for (const c of code) {
    if (c === '{') {
      count += 1;
    } else if (c === '}') {
      count -= 1;
      if (count === 0) {
        break;
      }
    }
    idx += 1;
  }
  code = code.slice(1, idx);
  rcode = rcode.slice(idx + 1);
  return [
    decompress(code, text, indent),
    rcode
  ];
}

import { syntax } from './code-parser';

export function decompress(code, text, indent = 0) {
  const res = [];
  while (code.length) {
    const l = code[0];
    let params = [];
    let children = [];
    code = code.slice(1);
    if (l !== '!') {
      [params, code] = decompressParams(code);
    }
    [children, code] = decompressChildren(code, text, indent + 2);
    if (l === '!') {
      const i = /^([0-9]*)/.exec(code[0])[0];
      code = code.slice(i.length);
      res.push({
        text: text.shift(),
        children,
        indent: i.length ? parseInt(i) : indent
      });
    } else {
      const t = [syntax.find(x => x.short === l).name, ...params];
      res.push({
        short: l,
        code: t,
        text: t.join(' '),
        children,
        indent
      });
    }
  }
  return res;
}
