export class Probability {
  #a;
  #b;

  constructor(a, b, gcd=true) {
    this.#a = BigInt(a);
    this.#b = BigInt(b);
    if (this.#a == this.#b) {
      this.#a = 1n;
      this.#b = 1n;
    } else if (gcd && b !== 1) {
      const d = this.#gcd(this.#a, this.#b);
      if (d > 1) {
        this.#a /= d;
        this.#b /= d;
      }
    }

    if (this.#a < 0n || this.#b <= 0n) {
      throw new Error('something went wrong');
    }
    Object.freeze(this);
  }

  #gcd(a, b) {
    while (b !== 0n) {
      const r = a % b;
      a = b;
      b = r;
    }
    return a;
  }

  get numerator() {
    return this.#a;
  }

  get denominator() {
    return this.#b;
  }

  mul(other) {
    if (other.numerator === 1n && other.denominator === 1n) {
      return this;
    }
    // https://www.matematikazasite.com/en/how-to-simplify-fractions-before-multiplying/
    const a = new Probability(this.numerator, other.denominator);
    const b = new Probability(other.numerator, this.denominator);
    return new Probability(a.numerator * b.numerator, a.denominator * b.denominator);
  }

  add(other) {
    if (this.denominator === other.denominator) {
      return new Probability(
        this.numerator + other.numerator,
        this.denominator
      );
    }
    // could be improved with LCM..
    return new Probability(
      this.numerator * other.denominator + other.numerator * this.denominator,
      this.denominator * other.denominator
    )
  }

  toJSON() {
    return [this.numerator.toString(), this.denominator.toString()].join('/');
  }

  toNumber() {
    let n = this.numerator;
    let d = this.denominator;
    // is there a better way to do this?
    let numerator = Number(n);
    let denominator = Number(d);
    if (BigInt(numerator) !== n ||
        BigInt(denominator) !== d) {
      // try to simplify
      const g = this.#gcd(n, d);
      numerator   = Number(n / g);
      denominator = Number(d / g);
    }
    while (BigInt(numerator) !== n ||
           BigInt(denominator) !== d) {
      n /= 10n;
      d /= 10n;
      numerator   = Number(n);
      denominator = Number(d);
    }
    // just to be sure..
    /*
    if (BigInt(numerator) !== this.numerator) {
      console.warn('Big(numerator) !== this.numerator');
    }
    if (BigInt(denominator) !== this.denominator) {
      console.warn('Big(numerator) !== this.numerator');
    }
    */
    // do the division
    return numerator / denominator;
  }

  toString() {
    const n = this.numerator.toString();
    const d = this.denominator.toString();
    const ts = '⁰¹²³⁴⁵⁶⁷⁸⁹';
    const bs = '₀₁₂₃₄₅₆₇₈₉';
    const t = n.split('').map(x => ts[parseInt(x)]).join('');
    const b = d.split('').map(x => bs[parseInt(x)]).join('');
    return `${t}\u2044${b}`;
  }

  toDecimalString() {
    // do division
    const res = [];
    let n = this.numerator;
    const d = this.denominator;
    const rem = new Map();
    while (true) {
      const t = n / d;
      res.push(t);
      if (t != 0) {
        n %= d;
      }
      if (n == 0) {
        break;
      }
      if (rem.has(n)) {
        break;
      } else {
        rem.set(n, res.length);
      }
      n *= 10n;
    }
    const idx = rem.get(n);
    const sres = res.map(x => x.toString());
    if (idx) {
      sres.splice(idx, 0, '\xa0');
      sres.push('…');
    }
    const s = `${sres[0]}.${sres.slice(1).join('')}`;
    return s;
  }
};

export class ProbabilityNotExact {
  #f;
  constructor(a, b) {
    this.#f = Number(a) / Number(b);
  }
  mul(other) {
    return new ProbabilityNotExact(this.#f * other.toNumber() , 1);
  }
  add(other) {
    return new ProbabilityNotExact(this.#f + other.toNumber() , 1);
  }
  #gcd(a, b) {
    while (b !== 0n) {
      const r = a % b;
      a = b;
      b = r;
    }
    return a;
  }
  toJSON() {
    let a = this.numerator;
    let b = this.denominator;
    const d = this.#gcd(a, b);
    a /= d;
    b /= d;
    return [a.toString(), b.toString()].join('/');
  }
  toNumber() {
    return this.#f;
  }
  toString() {
    let n = this.numerator;
    let d = this.denominator;

    const dd = this.#gcd(n, d);
    n /= dd;
    d /= dd;

    n = n.toString();
    d = d.toString();

    const ts = '⁰¹²³⁴⁵⁶⁷⁸⁹';
    const bs = '₀₁₂₃₄₅₆₇₈₉';
    const t = n.split('').map(x => ts[parseInt(x)]).join('');
    const b = d.split('').map(x => bs[parseInt(x)]).join('');
    return `${t}\u2044${b}`;
  }
  get numerator() {
    return BigInt(Math.floor(this.#f * Number.MAX_SAFE_INTEGER));
  }

  get denominator() {
    return BigInt(Number.MAX_SAFE_INTEGER);
  }
}

export default ProbabilityNotExact;
