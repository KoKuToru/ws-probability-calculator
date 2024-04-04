import compiler from './compiler.js';

let ENGINE_RESULT = [];

const imports = {
  engine: {
    dump: function(data_ptr, size) {
      ENGINE_RESULT = [...new Float64Array(module.instance.exports.memory.buffer, data_ptr, size)];
    }
  }
};

let module = WebAssembly.instantiateStreaming(fetch('engine.wasm'), imports).then(x => {
  module = x
  module.instance.exports._initialize();
});

const pushs = Object.freeze({
  PUSH_ECX:   7,
  PUSH_ENCX:  8,
  PUSH_ICX:   9,
  PUSH_INCX: 10
});

const ops = Object.freeze({
  EQUALS:         1,
  NOT_EQUALS:     2,
  LESS:           3,
  LESS_EQUALS:    4,
  GREATER:        5,
  GREATER_EQUALS: 6
});

function build_actions(engine, code) {
  const res = [];

  for (const [cmd, params] of code) {
    switch (cmd) {
      case 'burn':
        res.push([engine.burn, params[0]]);
        break;
      case 'attack':
        res.push([engine.attack, params[0]]);
        break;
      case 'damage':
        res.push([engine.damage, params[0]]);
        break;
      case 'mill':
        res.push([engine.mill, params[0]]);
        break;
      case 'pop':
        res.push([engine.pop, params[0]]);
        break;
      case 'push':
        res.push([engine.push, pushs[params[0]]]);
        break;
      case 'check':
        res.push([engine.check, params[0], ops[params[1]], params[2]]);
        break;
      case 'flush':
        res.push([engine.flush]);
        break;
    }
  }

  res.push([engine.dump]);

  return res.map(([x, ...y]) => x.bind(engine, ...y));
}

self.addEventListener('message', async (e) => {

  if (module instanceof Promise) {
    await module;
  }

  const data    = e.data;
  const code    = compiler(data.code);
  const actions = build_actions(module.instance.exports, code);

  const op_cx  = data.op_cx;
  const op_ncx = data.op_size - op_cx;
  const w_op_cx = 8 - op_cx;
  const w_op_ncx = 50 - 8 - op_ncx;

  module.instance.exports.reset(
    // oponent deck:
    op_cx,
    op_ncx,
    // opponent waiting room:
    w_op_cx,
    w_op_ncx
  );

  const start = performance.now();
  for (const ac of actions) {
    ac();
  }
  const end = performance.now();
  performance.measure('execute', { start, end });

  const dmg = ENGINE_RESULT;
  const dmg_sum = dmg.reduce((p, c) => p + c);
  let mean = dmg.reduce((p, c, i) => p + c * i, 0) * dmg_sum;

  const dmg_acc = [];
  for (let i = 0; i < dmg.length; ++i) {
    if (i == 0) {
      dmg_acc[i] = dmg[i];
      continue;
    }
    dmg_acc[i] = dmg.slice(i).reduce((c, p) => c + p);
  }

  e.ports[0].postMessage({
    data,
    code,
    dmg: dmg,
    dmg_acc: dmg_acc,
    mean: mean
  });
});
