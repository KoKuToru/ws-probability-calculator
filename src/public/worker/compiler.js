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

  input format:
    code: [action, params, code]

  output format:
    code: [action, params, conditions]
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
        const index = stack.findLastIndex(([a, b]) => a === AsNumber && b === params[0]);
        // get the limit
        const limit_code = code_parents.findLast(x => ['attack', 'burn', 'mill'].includes(x[0]));
        const limit = limit_code[1][0] + Number(limit_code[0] === 'attack'); // attack could trigger
        for (let i = 0; i < limit; ++i) {
          res.push(...compile(children, code_parents, stack, [...conditions, [index, '>', i]]));
        }
      } break;
      case 'if': {
        const index = stack.findLastIndex(([a, b]) => a === AsBoolean && b === params[0]);
        res.push(...compile(children, code_parents, stack, [...conditions, [index, '!=', 0]]));
      } break;
      default: {
        const nstack = collect_stack(children);
        res.push([cmd, params, conditions]);
        if (nstack.length > 0) {
          res.push(['push', nstack, conditions]);
        }
        res.push(...compile(children, [...code_parents, [cmd, params]], [...stack, ...nstack], conditions));
        if (nstack.length > 0) {
          res.push(['pop', [nstack.length], conditions]);
        }
      }
    }
  }

  return Object.freeze(
    res.map(([action, params, conditions, push, pop]) =>
      Object.freeze([
        action,
        Object.freeze(params),
        Object.freeze(conditions.map(x => Object.freeze(x)))
      ])
    )
  );
}

function AsNumber(x) {
  return Number(x);
}

function AsBoolean(x) {
  return Number(Boolean(x));
}

function collect_stack(code, stack) {
  stack ??= [];
  for (const [cmd, params, children] of code) {
    switch (cmd) {
      case 'each':
        if (!stack.find(([a, b]) => a === AsNumber && b === params[0])) {
          stack.push([AsNumber, params[0]]);
        }
        // do the children
        collect_stack(children, stack);
        break;
      case 'if': {
        if (!stack.find(([a, b]) => a === AsBoolean && b === params[0])) {
          stack.push([AsBoolean, params[0]]);
        }
        // do the children
        collect_stack(children, stack);
      } break;
      case 'repeat':
        // do the children
        collect_stack(children, stack);
        break;
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
