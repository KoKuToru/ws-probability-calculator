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
export default function compile(code, code_parents, stack, conditions) {
  const res = [];
  stack ??= [];
  conditions ??= [];
  code_parents ??= [];

  for (const [cmd, params, children] of code) {
    switch (cmd) {
      case 'repeat': {
        for (let i = 0; i < params[0]; ++i) {
          res.push(...compile(children, code_parents, stack, conditions));
        }
      } break;
      case 'each': {
        const name = `push_e${params[0]}`.toUpperCase();
        const index = stack.lastIndexOf(name);
        if (index < 0) {
          throw new Error('stack var not found');
        }
        const limit = findLimit(code_parents, name);
        for (let i = 0; i < limit; ++i) {
          res.push(...compile(children, code_parents, stack, [...conditions, [index, 'GREATER', i]]));
        }
      } break;
      case 'if': {
        const name = `push_i${params[0]}`.toUpperCase();
        const index = stack.lastIndexOf(name);
        if (index < 0) {
          throw new Error('stack var not found');
        }
        res.push(...compile(children, code_parents, stack, [...conditions, [index, 'NOT_EQUALS', 0]]));
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
          const limit = findLimit(code_parents, name);
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
          const new_conditions = [...conditions, [index, 'GREATER_EQUALS', 1]];
          res.push(...compile(children, [...code_parents, [cmd, params]], [...stack, ...nstack], new_conditions));
          if (nstack.length > 0) {
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
        res.push(...compile(children, [...code_parents, [cmd, params]], [...stack, ...nstack], conditions));
        if (nstack.length > 0) {
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

function findLimit(code_parents, name) {
  const parent =  code_parents.findLast(x => ['attack', 'burn', 'mill'].includes(x[0]) && !['cx', 'ncx'].includes(x[1]));
  if (!parent) {
    throw new Error('no parent found for limit');
  }
  let limit = 0;
  switch (parent[0]) {
    case 'attack':
      if (name !== 'ecx') {
        limit += 1; // might trigger
      }
    case 'burn':
      if (name !== 'ecx') {
        limit += parent[1][0];
      } else {
        // there will be max 1 cx
        limit += 1;
      }
      break;
    case 'mill':
      limit += parent[1][0];
      break;
  }
  return limit;
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
        // do the children
        collect_stack(children, stack);
      } break;
      case 'if': {
        const name = `push_i${params[0]}`.toUpperCase();
        if (!stack.includes(name)) {
          stack.push(name);
        }
        // do the children
        collect_stack(children, stack);
      } break;
      case 'repeat':
        // do the children
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
          // do the children
          collect_stack(children, stack);
          break;
        }
      default:
        // do nothing
        break;
    }
  }
  return stack;
}
