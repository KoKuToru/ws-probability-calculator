import compiler from './compiler.js';

class EngineError extends Error {}
class EngineOutOfMemory extends Error {}

class Imports {
  result;

  setup(instance) {
    let memory;
    let memory_uint32;
    let memory_double;
    let bigint_used = [];
    let bigint_free = [];

    Object.defineProperties(this, {
      memory: {
        get() {
          if (!memory?.buffer.byteLength) {
            memory = instance.exports.memory;
          }
          return memory;
        }
      },
      memory_uint32: {
        get() {
          if (!memory_uint32?.buffer.byteLength) {
            memory_uint32 = new Uint32Array(this.memory.buffer);
          }
          return memory_uint32;
        }
      },
      memory_double: {
        get() {
          if (!memory_double?.buffer.byteLength) {
            memory_double = new Float64Array(this.memory.buffer);
          }
          return memory_double;
        }
      },
      StoreBigInt: {
        value: function (value) {
          const id = bigint_free.length ? bigint_free.pop() : bigint_used.length;
          bigint_used[id] = value;
          return id;
        }
      },
      DestroyBigInt: {
        value: function (idx) {
          bigint_free.push(idx);
        }
      },
      GetBigInt: {
        value: function (idx) {
          return bigint_used[idx];
        }
      }
    });
  }

  write_uint32(dest, value) {
    this.memory_uint32[dest >> 2] = value;
  }

  write_double(dest, value) {
    this.memory_double[dest >> 3] = value;
  }

  constructor(module) {
    this.module = module;
    this.engine = {
      dump: this.engine_dump.bind(this),
      assert: this.engine_assert.bind(this),
      oom: this.engine_oom.bind(this)
    };
    this.bigint = {
      create: this.bigint_create.bind(this),
      copy: this.bigint_copy.bind(this),
      destroy: this.bigint_destroy.bind(this),
      add: this.bigint_add.bind(this),
      sub: this.bigint_sub.bind(this),
      div: this.bigint_div.bind(this),
      mul: this.bigint_mul.bind(this),
      mod: this.bigint_mod.bind(this),
      gcd: this.bigint_gcd.bind(this),
      double: this.bigint_double.bind(this),
      equal: this.bigint_equal.bind(this),
      greater: this.bigint_greater.bind(this),
      less: this.bigint_less.bind(this)
    };
  }

  engine_dump(data_id, size) {
    this.result = [...this.memory_double.subarray(data_id >> 3, (data_id >> 3) + size)];
  }
  engine_assert(message_ptr, message_size, file_ptr, file_size, line) {
    const decoder = new TextDecoder();
    let message = decoder.decode(new Uint8Array(this.memory.buffer, message_ptr, message_size));
    let file = decoder.decode(new Uint8Array(this.memory.buffer, file_ptr, file_size));
    throw new EngineError(`condition \`${message}\` @${file}:${line} failed!`);
  }
  engine_oom(message_ptr, message_size, file_ptr, file_size, line) {
    const decoder = new TextDecoder();
    let message = decoder.decode(new Uint8Array(this.memory.buffer, message_ptr, message_size));
    let file = decoder.decode(new Uint8Array(this.memory.buffer, file_ptr, file_size));
    throw new EngineOutOfMemory(`condition \`${message}\` @${file}:${line} failed!`);
  }

  bigint_create(id_ptr, high, low) {
    const value = (BigInt(high) << 32n) + BigInt(low);
    this.write_uint32(id_ptr, this.StoreBigInt(value));
  }
  bigint_copy(id_ptr, id) {
    this.write_uint32(id_ptr, this.StoreBigInt(this.GetBigInt(id)));
  }
  bigint_destroy(id) {
    this.DestroyBigInt(id);
  }
  bigint_add(id_ptr, a_id, b_id) {
    const a = this.GetBigInt(a_id);
    const b = this.GetBigInt(b_id);
    const res = a + b;
    this.write_uint32(id_ptr, this.StoreBigInt(res));
  }
  bigint_sub(id_ptr, a_id, b_id) {
    const a = this.GetBigInt(a_id);
    const b = this.GetBigInt(b_id);
    const res = a - b;
    this.write_uint32(id_ptr, this.StoreBigInt(res));
  }
  bigint_div(id_ptr, a_id, b_id) {
    const a = this.GetBigInt(a_id);
    const b = this.GetBigInt(b_id);
    const res = a / b;
    this.write_uint32(id_ptr, this.StoreBigInt(res));
  }
  bigint_mul(id_ptr, a_id, b_id) {
    const a = this.GetBigInt(a_id);
    const b = this.GetBigInt(b_id);
    const res = a * b;
    this.write_uint32(id_ptr, this.StoreBigInt(res));
  }
  bigint_mod(id_ptr, a_id, b_id) {
    const a = this.GetBigInt(a_id);
    const b = this.GetBigInt(b_id);
    const res = a % b;
    this.write_uint32(id_ptr, this.StoreBigInt(res));
  }
  bigint_gcd(id_ptr, a_id, b_id) {
    const a = this.GetBigInt(a_id);
    const b = this.GetBigInt(b_id);

    let [d, e] = [a, b];
    while (e) {
      [d, e] = [e, d % e];
    }

    this.write_uint32(id_ptr, this.StoreBigInt(d));
  }
  bigint_double(double_ptr, a_id) {
    const a = this.GetBigInt(a_id);
    this.write_double(double_ptr, Number(a));
  }
  bigint_equal(res_ptr, a_id, b_id) {
    const a = this.GetBigInt(a_id);
    const b = this.GetBigInt(b_id);
    const res = a === b;
    this.write_uint32(res_ptr, res);
  }
  bigint_greater(res_ptr, a_id, b_id) {
    const a = this.GetBigInt(a_id);
    const b = this.GetBigInt(b_id);
    const res = a > b;
    this.write_uint32(res_ptr, res);
  }
  bigint_less(res_ptr, a_id, b_id) {
    const a = this.GetBigInt(a_id);
    const b = this.GetBigInt(b_id);
    const res = a < b;
    this.write_uint32(res_ptr, res);
  }
}

let module = WebAssembly.compileStreaming(fetch('engine.wasm')).then(x => {
  module = x;
});

function reset() {
  module.imports = new Imports();
  module.instance = new WebAssembly.Instance(module, module.imports);
  module.imports.setup(module.instance);
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
      case 'reveal':
        res.push([engine.reveal, params[0] ?? 1]);
        break;
      default:
        throw new EngineError(`Unsupported cmd=${cmd}`);
    }
  }

  res.push([engine.dump]);

  return res.map(([x, ...y]) => x.bind(engine, ...y));
}

self.addEventListener('message', async (e) => {

  if (module instanceof Promise) {
    await module;
  }

  try {
    var   data    = e.data;
    var   code    = compiler(data.code);

    reset(); //< reset everything
    const actions = build_actions(module.instance.exports, code);

    module.instance.exports.reset(
      // oponent deck:
      data.op_cx,
      data.op_size - data.op_cx,
      // opponent waiting room:
      data.op_w_cx,
      data.op_w_size - data.op_w_cx,
      // my deck:
      data.my_trg,
      data.my_size - data.my_trg,
      // my waiting room:
      data.my_w_trg,
      data.my_w_size - data.my_w_trg,
    );

    const start = performance.now();
    for (const ac of actions) {
      ac();
    }
    const end = performance.now();
    performance.measure('execute', { start, end });

    const dmg = module.imports.result;
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
    if (
      ex instanceof RangeError || //< probably out of memory
      ex instanceof EngineOutOfMemory
    ) {
      console.error(ex);
      e.ports[0].postMessage({
        data,
        outofmemory: true,
        error: 'Out Of Memory',
        code
      });
    }
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
