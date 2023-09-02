import Service from '@ember/service';
import { registerDestructor } from '@ember/destroyable';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import ResultMap from 'ws/utils/result-map';
import CODEC from './codec';

const CURRENT_VERSION = 1;

const DEFAULT_CODE =
`attack 3
\tthis will do 3 dmg + trigger, opponent checks up to 3(+trigger) cards and might cancel with a cx
burn 1
\tthis will do 1 dmg, opponent checks up to 1 cards and might cancel with a cx

only code with a check-mark will be executed from top to bottom

the following commands are supported:
\t* attack dmg
\t* burn dmg`;

const CODE_MAPPING = [
  [/attack/g, String.fromCodePoint(0x10FFFF - 0), new RegExp(String.fromCodePoint(0x10FFFF - 0), 'g'), 'attack'],
  [/burn/g,   String.fromCodePoint(0x10FFFF - 1), new RegExp(String.fromCodePoint(0x10FFFF - 1), 'g'), 'burn'],
];

class Private {
  @tracked loaded = false;
  @tracked code;
  @tracked selected = new Set([
    '8,30',
    '8,25',
    '8,20',
    '6,30',
    '6,25',
    '6,20'
  ]);
  @tracked result = new ResultMap(9+1, 50+1);

  @tracked code_open = true;
  @tracked overview_open = true;
  @tracked probability_open = true;
  @tracked settings_open = true;

  @tracked selected_dmg = null;
}

export default class StateService extends Service {
  #private = new Private();

  reset() {
    const d = new Private();
    for (const k of [
      'selected_dmg',
      'probability_open',
      'overview_open',
      'code_open',
      'selected',
      'code',
      'result'
    ]) {
      this.#private[k] = d[k];
    }
    this.store();
  }
  reset_code() {
    const d = new Private();
    for (const k of [
      'code',
      'result'
    ]) {
      this.#private[k] = d[k];
    }
    this.store();
  }
  reset_overview() {
    const d = new Private();
    for (const k of [
      'selected',
      'selected_dmg'
    ]) {
      this.#private[k] = d[k];
    }
    this.store();
  }
  reset_probability() {
    const d = new Private();
    for (const k of [
      'selected',
      'selected_dmg'
    ]) {
      this.#private[k] = d[k];
    }
    this.store();
  }

  get loaded() {
    return this.#private.loaded;
  }

  get code() {
    return this.#private.code ?? DEFAULT_CODE;
  }
  set code(code) {
    this.#private.code = code;
  }

  get result() {
    return this.#private.result;
  }
  set result(v) {
    this.#private.result = v;
  }

  get code_open() {
    return this.#private.code_open;
  }
  set code_open(v) {
    this.#private.code_open = v;
  }
  get overview_open() {
    return this.#private.overview_open;
  }
  set overview_open(v) {
    this.#private.overview_open = v;
  }
  get probability_open() {
    return this.#private.probability_open;
  }
  set probability_open(v) {
    this.#private.probability_open = v;
  }
  get settings_open() {
    return this.#private.settings_open;
  }
  set settings_open(v) {
    this.#private.settings_open = v;
  }

  get selected_dmg() {
    return this.#private.selected_dmg;
  }
  set selected_dmg(v) {
    this.#private.selected_dmg = v;
  }

  get selected() {
    return [...this.#private.selected];
  }

  get hasSelected() {
    return Boolean(this.#private.selected.size);
  }

  isSelected(k) {
    return this.#private.selected.has(k);
  }

  toggleSelected(k) {
    if (this.#private.selected.has(k)) {
      this.#private.selected.delete(k);
    } else {
      this.#private.selected.add(k);
    }
    this.#private.selected = this.#private.selected;
  }

  constructor(...args) {
    super(...args);

    window.addEventListener('popstate', this.restore);
    registerDestructor(this, () => window.removeEventListener('popstate', this.restore));
    this.restore();
  }

  @action async store() {
    let selected = 0n;
    for (const s of this.#private.selected.values()) {
      const [a, b] = s.split(',').map(x => parseInt(x));
      selected |= 1n << BigInt(a + b * 9);
    }
    const data = [
      CURRENT_VERSION,
      CODE_MAPPING.reduce((p, c) => p.replace(c[0], c[1]), this.code),
      [
        this.#private.code_open,
        this.#private.overview_open,
        this.#private.probability_open,
        this.#private.settings_open,
      ].map(x => x ? 1 : 0).join(''),
      this.#private.selected_dmg ?? -1,
      selected.toString(2).split('').reverse().join('')
    ]
    const search = `?${await serializeState(data)}`;
    const a = new URLSearchParams(`?=${search.slice(1)}`).get('');
    const b = new URLSearchParams(`?=${location.search.slice(1)}`).get('');
    if (a !== b) {
      window.history.pushState('', '', search);
    }
  }
  @action async restore() {
    try {
      const search = new URLSearchParams(`?=${location.search?.slice?.(1) ?? ''}`).get('');
      if (!search?.length) {
        return;
      }
      try {
        const [
          version,
          code,
          open,
          dmg,
          selected
        ] = await deserializeState(search);

        if (version != CURRENT_VERSION) {
          alert('incompatible state');
          window.history.pushState('', '', `?`);
          return;
        }

        this.#private.code = CODE_MAPPING.reduce((p, c) => p.replace(c[2], c[3]), code);

        this.#private.code_open = open[0] === '1';
        this.#private.overview_open = open[1] === '1';
        this.#private.probability_open = open[2] === '1';
        this.#private.settings_open = open[3] === '1';

        this.#private.selected_dmg = dmg == -1 ? null : dmg;

        this.#private.selected = new Set(selected.split('').map((a, b) => a === '1' && [b % 9, Math.floor(b / 9)].join(',')).filter(x => x));

      } catch {
        alert('error loading state');
        window.history.pushState('', '', `?`);
        return;
      }
    } finally {
      if (!this.#private.loaded) {
        this.#private.loaded = true;
      }
    }
  }
}

async function serializeState(data) {
  data = JSON.stringify(data);

  const b64_all = [
    //await blobToBase64(new Blob(['\u0000', data])),
    await blobToBaseEncoding(new Blob(['\u0001', await new Response(new Blob([data]).stream().pipeThrough(new CompressionStream('deflate-raw'))).blob()])),
    //await blobToBase64(new Blob(['\u0002', await new Response(new Blob([data]).stream().pipeThrough(new CompressionStream('gzip'))).blob()])),
  ]
  const b64 = b64_all.reduce((p, c) => p.length < c.length ? p : c);
  //console.log("took", b64_all.indexOf(b64), b64.length, b64_all.map(x => x.length));

  return b64;
}

async function deserializeState(b64) {
  const buffer = await baseEncodingToBlob(b64).then(x => x.arrayBuffer());

  const marker = (new Int8Array(buffer, 0, 1))[0];
  const blob = new Blob([new Int8Array(buffer, 1)]);

  let json;

  switch (marker) {
    case 0:
      json = await blob.json();
      break;
    case 1:
      json = await new Response(blob.stream().pipeThrough(new DecompressionStream('deflate-raw'))).json()
      break;
    case 2:
      json = await new Response(blob.stream().pipeThrough(new DecompressionStream('gzip'))).json()
      break;
    default:
      throw new Error('marker?');
  }

  return json;
}

async function blobToBaseEncoding(blob) {
  return baseEncode(new Uint8Array(await blob.arrayBuffer()), CODEC);
}

async function baseEncodingToBlob(b64) {
  return new Blob([baseDecode(b64, CODEC)]);
}

function baseDecode(encoded, codes) {
  const codeSize = BigInt(codes.length);

  let value = 0n;
  while (encoded.length) {
    value *= codeSize;
    value += BigInt(codes.indexOf(encoded.at(-1)));
    encoded = encoded.slice(0, -1);
  }

  // convert into bytes
  let bytes = [];
  while (value !== 0n) {
    bytes.push(Number(value & 0xFFn));
    value >>= 8n;
  }

  return new Uint8Array(bytes.reverse());
}

function baseEncode(bytes, codes) {
  if (!(bytes instanceof Uint8Array)) {
    throw new Error('Must be Uint8Array')
  }
  const codeSize = BigInt(codes.length);

  // convert bytes into large bigint
  let value = bytes.reduce((p, c) => p << 8n | BigInt(c), 0n);
  let encoded = '';
  while (value !== 0n) {
    encoded += codes[value % codeSize];
    value /= codeSize;
  }

  return encoded;
}
