/*
 convert the recursive code into a flat non recursive version

  action: string
  conditions: [...condition]
  condition: [stack-index, operator, value]
  operator: '<', '<=', '>', '>=', '==', '!='
  value: integer or string
  stack-index: integer (offset to the stack, mostlikely negative)
  pop: integer (how many params to remove from stack)
  params: [...value]
  dedup: true or false (if dedup is allowed)

  input format:
    code: [action, params, code]

  output format:
    code: [action, params]
*/
export default function compile(code, code_parents, stack, conditions, limits) {
  const res = [];
  stack ??= [];
  conditions ??= [];
  code_parents ??= [];
  limits ??= [];

  for (const [cmd, params, children] of code) {
    switch (cmd) {
      case 'repeat': {
        for (let i = 0; i < params[0]; ++i) {
          res.push(...compile(children, code_parents, stack, conditions, limits));
        }
      } break;
      case 'each': {
        const name = `PUSH_E${params[0].toUpperCase()}`;
        const index = stack.lastIndexOf(name);
        if (index < 0) {
          throw new Error('stack var not found');
        }
        const limit = get_limit(limits, params[0]);
        for (let i = 0; i < limit; ++i) {
          res.push(...compile(children, code_parents, stack, [...conditions, [index, 'GREATER', i]], limits));
        }
      } break;
      case 'if':
      case 'else': {
        const names = {
          'cx': [{ what: `PUSH_ICX`, op: `NOT_EQUALS` }],
          'ncx': [{ what: `PUSH_ICX`, op: `EQUALS` }],
          'trg': [{ what: `PUSH_ITRG`, op: `NOT_EQUALS` }],
          'ntrg': [{ what: `PUSH_ITRG`, op: `EQUALS` }],
          'cxtrg': [{ what: `PUSH_ICX`, op: `NOT_EQUALS` }, { what: `PUSH_ITRG`, op: `NOT_EQUALS` }],
          'ncxtrg': [{ what: `PUSH_ICX`, op: `EQUALS` }, { what: `PUSH_ITRG`, op: `NOT_EQUALS` }],
          'cxntrg': [{ what: `PUSH_ICX`, op: `NOT_EQUALS` }, { what: `PUSH_ITRG`, op: `EQUALS` }],
          'ncxntrg': [{ what: `PUSH_ICX`, op: `EQUALS` }, { what: `PUSH_ITRG`, op: `EQUALS` }],
        }[params[0]];
        let nconditions = [];
        for (let name of names) {
          const index = stack.lastIndexOf(name.what);
          if (index < 0) {
            throw new Error('stack var not found');
          }
          let op = name.op
          nconditions = [...nconditions, [index, op, 0]];
        }
        if (cmd === 'else') {
          // fliped conditions
          for (let i = nconditions.length - 1; i >= 0; --i) {
            let [index, op, value] = nconditions[i];
            switch (op) {
              case 'EQUALS':
                op = 'NOT_EQUALS'
                break;
              case 'NOT_EQUALS':
                op = 'EQUALS';
                break;
              default:
                throw new Error(`unknown op ${op}`);
            }
            const nconditions2 = [
              ...nconditions.slice(0, i),
              [ index, op, value ]
            ];
            res.push(...compile(children, code_parents, stack, [ ...conditions, ...nconditions2 ], limits));
          }
        } else {
          res.push(...compile(children, code_parents, stack, [ ...conditions, ...nconditions ], limits));
        }
      } break;
      case 'attack':
      case 'burn':
      case 'mill':
      case 'damage':
        if (['cx', 'ncx', 'trg', 'ntrg'].includes(params[0])) {
          const name = `PUSH_E${params[0].toUpperCase()}`;
          const index = stack.lastIndexOf(name);
          if (index < 0) {
            throw new Error('stack var not found');
          }
          const nstack = collect_stack(children);
          const limit = get_limit(limits, params[0]);
          for (let i = 1; i <= limit; ++i) {
            const extra_conditions = [...conditions, [index, 'EQUALS', i]];
            for (const c of extra_conditions) {
              res.push(['check', c]);
            }
            res.push([cmd, [i]]);
            for (const s of nstack) {
              res.push(['push', [s]]);
            }
            res.push(['flush']);
          }
          const new_limits = [...limits, ...next_limit(cmd, limit)];
          const new_conditions = [...conditions, [index, 'GREATER_EQUALS', 1]];
          res.push(...compile(children, [...code_parents, [cmd, params]], [...stack, ...nstack], new_conditions, new_limits));
          if (nstack.length > 0) {
            for (const c of new_conditions) {
              res.push(['check', c]);
            }
            res.push(['pop', [nstack.length]]);
            res.push(['flush']);
          }
          break;
        }
      default: {
        const nstack = collect_stack(children);
        for (const c of conditions) {
          res.push(['check', c]);
        }
        res.push([cmd, params]);
        for (const s of nstack) {
          res.push(['push', [s]]);
        }
        res.push(['flush']);
        const new_limits = [...limits, ...next_limit(cmd, params[0])];
        res.push(...compile(children, [...code_parents, [cmd, params]], [...stack, ...nstack], conditions, new_limits));
        if (nstack.length > 0) {
          for (const c of conditions) {
            res.push(['check', c]);
          }
          res.push(['pop', [nstack.length]]);
          res.push(['flush']);
        }
      }
    }
  }

  return Object.freeze(
    res.map(([action, params]) =>
      Object.freeze([
        action,
        Object.freeze(params)
      ])
    )
  );
}

function get_limit(limits, what) {
  return limits.at(-1)[what];
}

function next_limit(cmd, limit) {
  const new_limits = [];
  switch (cmd) {
    case 'attack':
      new_limits.push({ cx: 1, ncx: limit + 1, trg: 1, ntrg: 1 });
      break;
    case 'burn':
      new_limits.push({ cx: 1, ncx: limit, trg: 0, ntrg: 0 });
      break;
    case 'mill':
      new_limits.push({ cx: limit, ncx: limit, trg: 0, ntrg: 0 });
      break;
    case 'damage':
      new_limits.push({ cx: 0, ncx: 0, trg: 0, ntrg: 0 });
      break;
    case 'reveal':
      new_limits.push({ cx: limit, ncx: limit, trg: 0, ntrg: 0 });
      break;
  }
  return new_limits;
}

function collect_stack(code, stack) {
  stack ??= [];
  for (const [cmd, params, children] of code) {
    switch (cmd) {
      case 'each': {
        const name = `PUSH_E${params[0].toUpperCase()}`;
        if (!stack.includes(name)) {
          stack.push(name);
        }
        collect_stack(children, stack);
      } break;
      case 'if':
      case 'else': {
        const names = {
          'cx': [`PUSH_ICX`],
          'ncx': [`PUSH_ICX`],
          'trg': [`PUSH_ITRG`],
          'ntrg': [`PUSH_ITRG`],
          'cxtrg': [`PUSH_ICX`, `PUSH_ITRG`],
          'ncxtrg': [`PUSH_INCX`, `PUSH_ITRG`],
          'cxntrg': [`PUSH_ICX`, `PUSH_INTRG`],
          'ncxntrg': [`PUSH_INCX`, `PUSH_INTRG`],
        }[params[0]];
        for (let name of names) {
          if (!stack.includes(name)) {
            stack.push(name);
          }
        }
        collect_stack(children, stack);
      } break;
      case 'repeat':
        collect_stack(children, stack);
        break;
      case 'attack':
      case 'burn':
      case 'mill':
      case 'damage':
        if (['cx', 'ncx', 'trg', 'ntrg'].includes(params[0])) {
          const name = `PUSH_E${params[0].toUpperCase()}`;
          if (!stack.includes(name)) {
            stack.push(name);
          }
          break;
        }
      default:
        // do nothing
        break;
    }
  }
  return stack;
}
