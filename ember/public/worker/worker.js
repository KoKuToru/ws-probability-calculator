import compiler from './compiler.js';

let ENGINE_RESULT = [];

function bigint_view(...res) {
  const size = res.at(-1);
  return res.slice(0, -1).map(
    x => new Uint32Array(module.instance.exports.memory.buffer, x, size)
  );
}

function read_bigint(...views) {
  return views.map(x => {
    let y = 0n;
    let j = BigInt(x.length) * 32n;
    for (let i = 0; i < x.length; ++i) {
      j -= 32n;
      y |= BigInt(x[i]) << j;
    }
    return y;
  });
}

function write_bigint(dest, value) {
  if (value > 2n ** (BigInt(dest.length) * 32n - 1n)) {
    throw Error('value to big for dest');
  }
  const x = dest;
  const y = value;
  let j = BigInt(x.length) * 32n;
  for (let i = 0; i < x.length; ++i) {
    j -= 32n;
    x[i] = Number(BigInt.asUintN(32, y >> j));
  }
}

const imports = {
  engine: {
    dump(data_ptr, size) {
      ENGINE_RESULT = [...new Float64Array(module.instance.exports.memory.buffer, data_ptr, size)];
    }
  },
  bigint: {
    add(res_ptr, a_ptr, b_ptr, size) {
      const [ res_view, a_view, b_view ] = bigint_view(res_ptr, a_ptr, b_ptr, size);
      const [ a, b ] = read_bigint(a_view, b_view);
      const res = a + b;
      write_bigint(res_view, res);
    },
    sub(res_ptr, a_ptr, b_ptr, size) {
      const [ res_view, a_view, b_view ] = bigint_view(res_ptr, a_ptr, b_ptr, size);
      const [ a, b ] = read_bigint(a_view, b_view);
      const res = a - b;
      write_bigint(res_view, res);
    },
    div(res_ptr, a_ptr, b_ptr, size) {
      const [ res_view, a_view, b_view ] = bigint_view(res_ptr, a_ptr, b_ptr, size);
      const [ a, b ] = read_bigint(a_view, b_view);
      const res = a / b;
      write_bigint(res_view, res);
    },
    mul(res_ptr, a_ptr, b_ptr, size) {
      const [ res_view, a_view, b_view ] = bigint_view(res_ptr, a_ptr, b_ptr, size);
      const [ a, b ] = read_bigint(a_view, b_view);
      const res = a * b;
      write_bigint(res_view, res);
    },
    mod(res_ptr, a_ptr, b_ptr, size) {
      const [ res_view, a_view, b_view ] = bigint_view(res_ptr, a_ptr, b_ptr, size);
      const [ a, b ] = read_bigint(a_view, b_view);
      const res = a % b;
      write_bigint(res_view, res);
    },
    gcd(res_ptr, a_ptr, b_ptr, size) {
      const [ res_view, a_view, b_view ] = bigint_view(res_ptr, a_ptr, b_ptr, size);
      const [ a, b ] = read_bigint(a_view, b_view);

      let [d, e] = [a, b];
      while (e) {
        [d, e] = [e, d % e];
      }
      write_bigint(res_view, d);
    },
    double(res_ptr, a_ptr, size) {
      const [ a_view ] = bigint_view(a_ptr, size);
      const [ a ] = read_bigint(a_view);
      const res = new Float64Array(module.instance.exports.memory.buffer, res_ptr, 1);
      res[0] = Number(a);
    }
  }
};

let module = WebAssembly.instantiateStreaming(fetch('engine.wasm'), imports).then(x => module = x);

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
