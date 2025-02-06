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
        const name = `push_e${params[0]}`.toUpperCase();
        const index = stack.lastIndexOf(name);
        if (index < 0) {
          throw new Error('stack var not found');
        }
        const limit = get_limit(limits, params[0]);
        for (let i = 0; i < limit; ++i) {
          res.push(...compile(children, code_parents, stack, [...conditions, [index, 'GREATER', i]], limits));
        }
      } break;
      case 'if': {
        const name = `push_icx`.toUpperCase();
        const index = stack.lastIndexOf(name);
        if (index < 0) {
          throw new Error('stack var not found');
        }
        switch (params[0]) {
          case 'cx':
            res.push(...compile(children, code_parents, stack, [...conditions, [index, 'NOT_EQUALS', 0]], limits));
            break;
          case 'ncx':
            res.push(...compile(children, code_parents, stack, [...conditions, [index, 'EQUALS', 0]], limits));
            break;
          default:
            throw new Error('stack var not found');
        }
      } break;
      case 'else': {
        const name = `push_icx`.toUpperCase();
        const index = stack.lastIndexOf(name);
        if (index < 0) {
          throw new Error('stack var not found');
        }
        switch (params[0]) {
          case 'cx':
            res.push(...compile(children, code_parents, stack, [...conditions, [index, 'EQUALS', 0]], limits));
            break;
          case 'ncx':
            res.push(...compile(children, code_parents, stack, [...conditions, [index, 'NOT_EQUALS', 0]], limits));
            break;
          default:
            throw new Error('stack var not found');
        }
      } break;
      case 'attack':
      case 'burn':
      case 'mill':
      case 'damage':
        if (params[0] === 'cx' || params[0] === 'ncx') {
          const name = `push_e${params[0]}`.toUpperCase();
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
  return limits.at(-1)[what === 'cx' ? 0 : 1];
}

function next_limit(cmd, limit) {
  const new_limits = [];
  switch (cmd) {
    case 'attack':
      new_limits.push([1, limit + 1]);
      break;
    case 'burn':
      new_limits.push([1, limit]);
      break;
    case 'mill':
      new_limits.push([limit, limit]);
      break;
    case 'damage':
      new_limits.push([limit, limit]);
      break;
  }
  return new_limits;
}

function collect_stack(code, stack) {
  stack ??= [];
  for (const [cmd, params, children] of code) {
    switch (cmd) {
      case 'each': {
        const name = `push_e${params[0]}`.toUpperCase();
        if (!stack.includes(name)) {
          stack.push(name);
        }
        collect_stack(children, stack);
      } break;
      case 'if':
      case 'else': {
        const name = `push_icx`.toUpperCase();
        if (!stack.includes(name)) {
          stack.push(name);
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
        if (params[0] === 'cx' || params[0] === 'ncx') {
          const name = `push_e${params[0]}`.toUpperCase();
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
