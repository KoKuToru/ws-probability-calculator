import Service from '@ember/service';
import { registerDestructor } from '@ember/destroyable';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

const CURRENT_VERSION = 1;

const DEFAULT_CODE =
`attack 3
  this will do 3 dmg + trigger, opponent checks up to 3(+trigger) cards and might cancel with a cx
burn 1
  this will do 1 dmg, opponent checks up to 1 cards and might cancel with a cx

only code with a check-mark will be executed from top to bottom

the following commands are supported:
  * attack dmg
  * burn dmg`;

class Private {
  @tracked code;
}

export default class StateService extends Service {
  #private = new Private();

  get code() {
    return this.#private.code ?? DEFAULT_CODE;
  }
  set code(code) {
    this.#private.code = code;
  }

  constructor(...args) {
    super(...args);

    window.addEventListener('popstate', this.restore);
    registerDestructor(this, () => window.removeEventListener('popstate', this.restore));
    this.restore();
  }

  @action async store() {
    const params = new URLSearchParams();
    const data = {
      'version': 1,
      'code': this.code
    };
    params.set('d', await serializeState(data));
    window.history.pushState('', '', `?${params}`);
  }
  @action async restore() {
    if (!location.search) {
      return;
    }
    const params = new URLSearchParams(location.search);
    if (!params.has('d')) {
      return;
    }
    try {
      const d = await deserializeState(params.get('d'));
      if (d.version != 1) {
        alert('incompatible version');
        window.history.pushState('', '', `?v=${CURRENT_VERSION}`);
        return;
      }

      this.code = d.code;
    } catch {
      alert('incompatible state');
      window.history.pushState('', '', `?v=${CURRENT_VERSION}`);
      return;
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
