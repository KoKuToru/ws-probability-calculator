export default class Probability {
  #a;
  #b;

  constructor(a, b, gcd=true) {
    this.#a = BigInt(a);
    this.#b = BigInt(b);
    if (gcd) {
      const d = this.#gcd(this.#a, this.#b);
      this.#a /= d;
      this.#b /= d;
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
    // https://www.matematikazasite.com/en/how-to-simplify-fractions-before-multiplying/
    const a = new Probability(this.numerator, other.denominator);
    const b = new Probability(other.numerator, this.denominator);
    return new Probability(a.numerator * b.numerator, a.denominator * b.denominator);
  }

  add(other) {
    if (this.denominator === other.denominator) {
      return new Probability(
        this.numerator + other.numerator,
        this.denominator,
        false
      );
    }
    // could be improved with LCM..
    return new Probability(
      this.numerator * other.denominator + other.numerator * this.denominator,
      this.denominator * other.denominator
    )
  }

  toJSON() {
    return [this.numerator.toString(), this.denominator.toString()];
  }

  toNumber() {
    // is there a better way to do this?
    let numerator = Number(this.numerator);
    let denominator = Number(this.denominator);
    if (BigInt(numerator) !== this.numerator ||
        BigInt(denominator) !== this.denominator) {
      // try to simplify
      const g = this.#gcd(this.numerator, this.denominator);
      numerator   = Number(this.numerator / g);
      denominator = Number(this.denominator / g);
    }
    // just to be sure..
    if (BigInt(numerator) !== this.numerator) {
      console.warn('Big(numerator) !== this.numerator');
    }
    if (BigInt(denominator) !== this.denominator) {
      console.warn('Big(numerator) !== this.numerator');
    }
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
};
