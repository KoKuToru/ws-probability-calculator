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

  @action store() {
    const params = new URLSearchParams();
    params.set('v', CURRENT_VERSION);
    this.code && params.set('code', serializeCode(this.code));
    window.history.pushState('', '', `?${params}`);
  }
  @action restore() {
    if (!location.search) {
      return;
    }
    const params = new URLSearchParams(location.search);
    const version = params.get('v');
    if (version != 1) {
      alert('incompatible version');
      window.history.pushState('', '', `?v=${CURRENT_VERSION}`);
      return;
    }
    this.code = params.get('code') && deserializeCode(params.get('code'));

  }
}

function serializeCode(code) {
  // very simple dictionary compression
  const words = [];
  const serialized = code.replace(/([\w]+|[^\w]+)/gm, (match, p) => {
    let idx = words.indexOf(p);
    if (idx < 0) {
      idx = words.length;
      words[idx] = p;
    }
    return String.fromCodePoint(idx);
  });
  return stringToBase64(words.join('\u0000') + '\u0001' + serialized);
}

function deserializeCode(encoded) {
  if (!encoded) {
    return null;
  }
  try {
    encoded = base64ToString(encoded);
    const words_serialized_split_idx = encoded.indexOf('\u0001');
    if (words_serialized_split_idx < 0) {
      return null;
    }
    const words = encoded.slice(0, words_serialized_split_idx).split('\u0000');
    const serialized = encoded.slice(words_serialized_split_idx + 1);
    const decoded = serialized
      .split('')
      .map((x) => words[x.codePointAt(0)])
      .join('');
    return decoded;
  } catch (e) {
    console.error(e);
    return null;
  }
}

function base64ToString(base64) {
  const binString = atob(
    base64
      //base64url
      .replace(/[-]/g, '+')
      .replace(/[_]/g, '/')
      .replace(/[.]/g, '='),
  );
  const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0));
  return new TextDecoder().decode(bytes);
}

function stringToBase64(text) {
  const bytes = new TextEncoder().encode(text);
  const binString = Array.from(bytes, (x) => String.fromCodePoint(x)).join('');
  return (
    btoa(binString)
      //base64url
      .replace(/[+]/g, '-')
      .replace(/[/]/g, '_')
      .replace(/[=]/g, '.')
  );
}
