import compiler from './compiler.js';

let ENGINE_RESULT = [];

let MEM_CACHE;
function GET_MEM_CACHE() {
  const buffer = module.instance.exports.memory.buffer;
  if (MEM_CACHE?.buffer !== buffer) {
    MEM_CACHE = {
      buffer,
      uint32: new Uint32Array(buffer),
      double: new Float64Array(buffer)
    };
  }
  return MEM_CACHE;
}

function write_uint32(dest, value) {
  GET_MEM_CACHE().uint32[dest >> 2] = value;
}

function write_double(dest, value) {
  GET_MEM_CACHE().double[dest >> 3] = value;
}

const BIGINT_USED = [];
const BIGINT_FREE = [];
function StoreBigInt(value) {
  const id = BIGINT_FREE.length ? BIGINT_FREE.pop() : BIGINT_USED.length;
  BIGINT_USED[id] = value;
  return id;
}
function DestroyBigInt(idx) {
  BIGINT_FREE.push(idx);
}
function GetBigInt(idx) {
  return BIGINT_USED[idx];
}

class EngineError extends Error {}

const imports = {
  engine: {
    dump(data_id, size) {
      ENGINE_RESULT = [...GET_MEM_CACHE().double.subarray(data_id >> 3, (data_id >> 3) + size)];
    },
    assert(message_ptr, message_size, file_ptr, file_size, line) {
      const decoder = new TextDecoder();
      let message = decoder.decode(new Uint8Array(module.instance.exports.memory.buffer, message_ptr, message_size));
      let file = decoder.decode(new Uint8Array(module.instance.exports.memory.buffer, file_ptr, file_size));
      throw new EngineError(`condition \`${message}\` @${file}:${line} failed!`);
    }
  },
  bigint: {
    create(id_ptr, high, low) {
      const value = (BigInt(high) << 32n) + BigInt(low);
      write_uint32(id_ptr, StoreBigInt(value));
    },
    copy(id_ptr, id) {
      write_uint32(id_ptr, StoreBigInt(GetBigInt(id)));
    },
    destroy(id) {
      DestroyBigInt(id);
    },
    add(id_ptr, a_id, b_id) {
      const a = GetBigInt(a_id);
      const b = GetBigInt(b_id);
      const res = a + b;
      write_uint32(id_ptr, StoreBigInt(res));
    },
    sub(id_ptr, a_id, b_id) {
      const a = GetBigInt(a_id);
      const b = GetBigInt(b_id);
      const res = a - b;
      write_uint32(id_ptr, StoreBigInt(res));
    },
    div(id_ptr, a_id, b_id) {
      const a = GetBigInt(a_id);
      const b = GetBigInt(b_id);
      const res = a / b;
      write_uint32(id_ptr, StoreBigInt(res));
    },
    mul(id_ptr, a_id, b_id) {
      const a = GetBigInt(a_id);
      const b = GetBigInt(b_id);
      const res = a * b;
      write_uint32(id_ptr, StoreBigInt(res));
    },
    mod(id_ptr, a_id, b_id) {
      const a = GetBigInt(a_id);
      const b = GetBigInt(b_id);
      const res = a % b;
      write_uint32(id_ptr, StoreBigInt(res));
    },
    gcd(id_ptr, a_id, b_id) {
      const a = GetBigInt(a_id);
      const b = GetBigInt(b_id);

      let [d, e] = [a, b];
      while (e) {
        [d, e] = [e, d % e];
      }

      write_uint32(id_ptr, StoreBigInt(d));
    },
    double(double_ptr, a_id) {
      const a = GetBigInt(a_id);
      write_double(double_ptr, Number(a));
    },
    equal(res_ptr, a_id, b_id) {
      const a = GetBigInt(a_id);
      const b = GetBigInt(b_id);
      const res = a === b;
      write_uint32(res_ptr, res);
    },
    greater(res_ptr, a_id, b_id) {
      const a = GetBigInt(a_id);
      const b = GetBigInt(b_id);
      const res = a > b;
      write_uint32(res_ptr, res);
    },
    less(res_ptr, a_id, b_id) {
      const a = GetBigInt(a_id);
      const b = GetBigInt(b_id);
      const res = a < b;
      write_uint32(res_ptr, res);
    },
  }
};

let module = WebAssembly.compileStreaming(fetch('engine.wasm')).then(x => {
  module = x;
});
function reset() {
  module.instance = new WebAssembly.Instance(module, imports);
  // free bigint stuff
  BIGINT_USED.splice(0);
  BIGINT_FREE.splice(0);
}

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

  reset(); //< reset everything

  try {
    var   data    = e.data;
    var   code    = compiler(data.code);
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
  } catch (ex) {
    if (ex instanceof EngineError) {
      console.error(ex);
      e.ports[0].postMessage({
        data,
        error: ex.message,
        code
      });
    }
    throw ex;
  }
});
