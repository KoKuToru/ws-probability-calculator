import Service from '@ember/service';
import { registerDestructor } from '@ember/destroyable';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import ResultMap from 'ws/utils/result-map';

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

  @tracked code_open;
  @tracked overview_open;
  @tracked probability_open;
}

export default class StateService extends Service {
  #private = new Private();

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
    this.store();
  }

  constructor(...args) {
    super(...args);

    window.addEventListener('popstate', this.restore);
    registerDestructor(this, () => window.removeEventListener('popstate', this.restore));
    this.restore();
  }

  @action async store() {
    const data = {
      'version': 1,
      'code': this.#private.code,
      'selected': [...this.#private.selected],
      'code_open': this.#private.code_open,
      'overview_open': this.#private.overview_open,
      'probability_open': this.#private.probability_open,
    };
    window.history.pushState('', '', `?${await serializeState(data)}`);
  }
  @action async restore() {
    try {
      if (!location.search) {
        return;
      }
      try {
        const d = await deserializeState(location.search?.slice(1));
        if (d.version != 1) {
          alert('incompatible version');
          window.history.pushState('', '', `?v=${CURRENT_VERSION}`);
          return;
        }

        this.#private.code = d.code;
        this.#private.selected = new Set(d.selected ?? []);
        this.#private.code_open = d.code_open;
        this.#private.overview_open = d.overview_open;
        this.#private.probability_open = d.probability_open;
      } catch {
        alert('incompatible state');
        window.history.pushState('', '', `?v=${CURRENT_VERSION}`);
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

  const b64 = [
    await blobToBase64(new Blob(['\u0000', data])),
    await blobToBase64(new Blob(['\u0001', await new Response(new Blob([data]).stream().pipeThrough(new CompressionStream('deflate-raw'))).blob()])),
  ].reduce((p, c) => p.length < c.length ? p : c);

  return b64 // convert to base64url
    .replace(/[+]/g, '-')
    .replace(/[/]/g, '_')
    .replace(/[=]/g, '.');
}

async function deserializeState(b64) {
  b64 = b64 // convert from base64url
    .replace(/[-]/g, '+')
    .replace(/[_]/g, '/')
    .replace(/[.]/g, '=');

  const buffer = await base64ToBlob(b64).then(x => x.arrayBuffer());

  const marker = (new Int8Array(buffer, 0, 1))[0];
  const blob = new Blob([new Int8Array(buffer, 1)]);

  let json;

  switch (marker) {
    case 0:
      json = await blob.text();
      break;
    case 1:
      json = await new Response(blob.stream().pipeThrough(new DecompressionStream('deflate-raw'))).text()
      break;
    default:
      throw new Error('marker?');
  }

  return JSON.parse(json);
}

async function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',', 2).pop())
    reader.onerror = (err) => reject(err)
    reader.readAsDataURL(blob)
  });
}

async function base64ToBlob(b64) {
  const resp = await fetch(`data:application/octet-binary;base64,${b64}`);
  const blob = await resp.blob();
  return blob;
}
