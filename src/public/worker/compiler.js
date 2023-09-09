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
    code: [action, params, conditions, dedup]
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
        const name = `e${params[0]}`;
        const index = stack.lastIndexOf(name);
        if (index < 0) {
          throw new Error('stack var not found');
        }
        const limit = findLimit(code_parents, name);
        for (let i = 0; i < limit; ++i) {
          res.push(...compile(children, code_parents, stack, [...conditions, [index, '>', i]]));
        }
      } break;
      case 'if': {
        const name = `i${params[0]}`;
        const index = stack.lastIndexOf(name);
        if (index < 0) {
          throw new Error('stack var not found');
        }
        res.push(...compile(children, code_parents, stack, [...conditions, [index, '!=', 0]]));
      } break;
      case 'attack':
      case 'burn':
      case 'mill':
      case 'damage':
        if (params[0] === 'cx' || params[0] === 'ncx') {
          const name = `e${params[0]}`;
          const index = stack.lastIndexOf(name);
          if (index < 0) {
            throw new Error('stack var not found');
          }
          const nstack = collect_stack(children);
          const limit = findLimit(code_parents, name);
          for (let i = 1; i <= limit; ++i) {
            const c = [...conditions, [index, '==', i]];
            res.push([cmd, [i], c, false]);
          }
          const c = [...conditions, [index, '>=', 1]];
          if (nstack.length > 0) {
            res.push(['push', nstack, c, true]);
          }
          res.push(...compile(children, [...code_parents, [cmd, params]], [...stack, ...nstack], c));
          if (nstack.length > 0) {
            res.push(['pop', [nstack.length], c, true]);
          }
          break;
        }
      default: {
        const nstack = collect_stack(children);
        res.push([cmd, params, conditions, nstack.length == 0]);
        if (nstack.length > 0) {
          res.push(['push', nstack, conditions, true]);
        }
        res.push(...compile(children, [...code_parents, [cmd, params]], [...stack, ...nstack], conditions));
        if (nstack.length > 0) {
          res.push(['pop', [nstack.length], conditions, true]);
        }
      }
    }
  }

  return Object.freeze(
    res.map(([action, params, conditions, dedup]) =>
      Object.freeze([
        action,
        Object.freeze(params),
        Object.freeze(conditions.map(x => Object.freeze(x))),
        dedup
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
  debugger;
  return limit;
}

function collect_stack(code, stack) {
  stack ??= [];
  for (const [cmd, params, children] of code) {
    switch (cmd) {
      case 'each': {
        const name = `e${params[0]}`;
        if (!stack.includes(name)) {
          stack.push(name);
        }
        // do the children
        collect_stack(children, stack);
      } break;
      case 'if': {
        const name = `i${params[0]}`;
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
          const name = `e${params[0]}`;
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

const res = compile([
  ['mill', [3], [
    ['each', ['cx'], [
      ['burn', [1], []]
    ]]
  ]]
]);
